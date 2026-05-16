import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserWithNewsletters } from "@/lib/db";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user: dbUser, newsletters } = await getUserWithNewsletters(user.id, 99999);

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const usedCredits = newsletters.length;
    const totalCredits =
      dbUser.subscription === "pro" ? Infinity : dbUser.credits;

    return NextResponse.json({
      subscription: dbUser.subscription,
      usedCredits,
      totalCredits,
      remainingCredits:
        totalCredits === Infinity ? "unlimited" : totalCredits - usedCredits,
      newsletterCount: newsletters.length,
    });
  } catch (error) {
    console.error("Usage error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
