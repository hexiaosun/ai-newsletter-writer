import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { type, data } = payload;

    // Verify the webhook secret (optional but recommended)
    // In production, verify Clerk webhook signature

    switch (type) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name } = data;
        const primaryEmail = email_addresses?.[0]?.email_address || "";

        console.log(`Creating user in DB: ${id} (${primaryEmail})`);

        await prisma.user.upsert({
          where: { clerkId: id },
          update: {
            email: primaryEmail,
            name: [first_name, last_name].filter(Boolean).join(" ") || undefined,
          },
          create: {
            clerkId: id,
            email: primaryEmail,
            name: [first_name, last_name].filter(Boolean).join(" ") || "",
            subscription: "free",
            credits: 3,
          },
        });

        console.log(`User ${id} created/updated in DB`);
        break;
      }

      case "user.updated": {
        const { id, email_addresses, first_name, last_name } = data;
        const primaryEmail = email_addresses?.[0]?.email_address || "";

        await prisma.user.update({
          where: { clerkId: id },
          data: {
            email: primaryEmail,
            name: [first_name, last_name].filter(Boolean).join(" ") || undefined,
          },
        });
        break;
      }

      case "user.deleted": {
        const { id } = data;
        await prisma.user.delete({ where: { clerkId: id } }).catch(() => {
          // User might not exist in our DB
        });
        break;
      }

      default:
        console.log(`Unhandled Clerk event: ${type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Clerk webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
