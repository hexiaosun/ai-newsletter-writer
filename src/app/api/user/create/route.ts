import { NextRequest, NextResponse } from "next/server";
import { upsertUser } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { id, email, name } = await req.json();

    if (!id || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await upsertUser({ id, email, name });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("User create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
