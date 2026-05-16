import Stripe from "stripe";

const API_VERSION = "2026-04-22.dahlia";

/** Lazy Stripe instance — only created when needed */
function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }
  return new Stripe(key, { apiVersion: API_VERSION, typescript: true });
}

export const PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID || "";

export async function createCheckoutSession(
  customerEmail: string,
  userId: string
): Promise<string | null> {
  const stripe = getStripe();

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
      client_reference_id: userId,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=cancel`,
    });

    return session.url;
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return null;
  }
}
