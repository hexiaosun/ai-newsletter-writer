import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { generateNewsletter, type NewsletterStyle } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { bulletPoints, style } = body as {
      bulletPoints: string[];
      style: NewsletterStyle;
    };

    if (!bulletPoints || !Array.isArray(bulletPoints) || bulletPoints.length === 0) {
      return NextResponse.json(
        { error: "Please provide at least one bullet point" },
        { status: 400 }
      );
    }

    if (bulletPoints.length > 10) {
      return NextResponse.json(
        { error: "Maximum 10 bullet points allowed" },
        { status: 400 }
      );
    }

    // Get or create user in our DB
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      // Auto-create user on first API call
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email || "",
          name: user.user_metadata?.full_name || "",
          subscription: "free",
          credits: 3,
        },
      });
    }

    // Check credits
    if (dbUser.subscription === "free") {
      const newsletterCount = await prisma.newsletter.count({
        where: { userId: dbUser.id },
      });

      if (newsletterCount >= dbUser.credits) {
        return NextResponse.json(
          {
            error:
              "You've used all your free credits. Upgrade to Pro for unlimited newsletters!",
          },
          { status: 403 }
        );
      }
    }

    // Generate the newsletter
    const content = await generateNewsletter(bulletPoints, style);

    // Save to database
    await prisma.newsletter.create({
      data: {
        userId: dbUser.id,
        topic: bulletPoints[0],
        style,
        content,
        bulletPoints: JSON.stringify(bulletPoints),
      },
    });

    return NextResponse.json({ content, success: true });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate newsletter. Please try again." },
      { status: 500 }
    );
  }
}
