import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id, email, name } = await req.json();

    if (!id || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.user.upsert({
      where: { id },
      update: { email, name: name || "" },
      create: {
        id,
        email,
        name: name || "",
        subscription: "free",
        credits: 3,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("User create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
