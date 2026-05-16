import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { generateNewsletter, type NewsletterStyle } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
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
    let dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!dbUser) {
      // User hasn't been created yet (webhook might not have fired)
      // Create them with default free plan
      return NextResponse.json(
        { error: "Account not fully set up. Please try signing out and back in." },
        { status: 400 }
      );
    }

    // Check credits
    if (dbUser.subscription === "free") {
      const newsletterCount = await prisma.newsletter.count({
        where: { userId: dbUser.id },
      });

      if (newsletterCount >= dbUser.credits) {
        return NextResponse.json(
          {
            error: "You've used all your free credits. Upgrade to Pro for unlimited newsletters!",
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
