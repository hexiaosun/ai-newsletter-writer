import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateNewsletter, type NewsletterStyle } from "@/lib/openai";
import {
  getUserById,
  getOrCreateUser,
  countNewsletters,
  createNewsletter,
} from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

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

    // Get or create user
    let dbUser = await getUserById(user.id);
    if (!dbUser) {
      dbUser = await getOrCreateUser(
        user.id,
        user.email || "",
        user.user_metadata?.full_name as string
      );
    }

    // Check credits
    if (dbUser.subscription === "free") {
      const count = await countNewsletters(dbUser.id);
      if (count >= dbUser.credits) {
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
    await createNewsletter({
      userId: dbUser.id,
      topic: bulletPoints[0],
      style,
      content,
      bulletPoints,
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
