import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});

export const PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID || "";

export async function createCheckoutSession(
  customerEmail: string,
  clerkUserId: string
): Promise<string | null> {
  if (!PRO_PRICE_ID) {
    console.error("STRIPE_PRO_PRICE_ID is not set");
    return null;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: PRO_PRICE_ID, quantity: 1 }],
      customer_email: customerEmail,
      client_reference_id: clerkUserId,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=cancel`,
    });

    return session.url;
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return null;
  }
}
