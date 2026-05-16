/**
 * Database layer — uses Supabase JS SDK over HTTPS (port 443) with admin key.
 * Replaces Prisma for production. Works even when direct PostgreSQL connections
 * are blocked (e.g., from Chinese cloud servers).
 */
import { createAdminClient } from "@/lib/supabase/admin";

export type UserRecord = {
  id: string;
  email: string;
  name: string | null;
  subscription: "free" | "pro";
  credits: number;
  createdAt: string;
  updatedAt: string;
};

export type NewsletterRecord = {
  id: string;
  userId: string;
  topic: string;
  style: string;
  content: string;
  bulletPoints: string;
  createdAt: string;
};

function db() {
  return createAdminClient();
}

/** Get or create a user */
export async function getOrCreateUser(
  id: string,
  email: string,
  name?: string
): Promise<UserRecord> {
  const supabase = db();
  const { data: existing } = await supabase
    .from("User")
    .select("*")
    .eq("id", id)
    .single();

  if (existing) return existing as UserRecord;

  const { data: newUser, error } = await supabase
    .from("User")
    .insert({
      id,
      email,
      name: name || "",
      subscription: "free",
      credits: 3,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to create user: ${error.message}`);
  return newUser as UserRecord;
}

/** Get user by ID */
export async function getUserById(id: string): Promise<UserRecord | null> {
  const supabase = db();
  const { data } = await supabase
    .from("User")
    .select("*")
    .eq("id", id)
    .single();
  return data as UserRecord | null;
}

/** Get user with recent newsletters */
export async function getUserWithNewsletters(
  id: string,
  take = 5
): Promise<{ user: UserRecord | null; newsletters: NewsletterRecord[] }> {
  const supabase = db();

  const { data: user } = await supabase
    .from("User")
    .select("*")
    .eq("id", id)
    .single();

  const { data: newsletters } = await supabase
    .from("Newsletter")
    .select("*")
    .eq("userId", id)
    .order("createdAt", { ascending: false })
    .limit(take);

  return {
    user: user as UserRecord | null,
    newsletters: (newsletters || []) as NewsletterRecord[],
  };
}

/** Count newsletters for a user */
export async function countNewsletters(userId: string): Promise<number> {
  const supabase = db();
  const { count } = await supabase
    .from("Newsletter")
    .select("*", { count: "exact", head: true })
    .eq("userId", userId);
  return count || 0;
}

/** Get all newsletters for a user */
export async function getNewsletters(userId: string): Promise<NewsletterRecord[]> {
  const supabase = db();
  const { data } = await supabase
    .from("Newsletter")
    .select("*")
    .eq("userId", userId)
    .order("createdAt", { ascending: false });
  return (data || []) as NewsletterRecord[];
}

/** Save a newsletter */
export async function createNewsletter(params: {
  userId: string;
  topic: string;
  style: string;
  content: string;
  bulletPoints: string[];
}): Promise<NewsletterRecord> {
  const supabase = db();
  const { data, error } = await supabase
    .from("Newsletter")
    .insert({
      userId: params.userId,
      topic: params.topic,
      style: params.style,
      content: params.content,
      bulletPoints: JSON.stringify(params.bulletPoints),
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to save newsletter: ${error.message}`);
  return data as NewsletterRecord;
}

/** Update user subscription */
export async function updateUserSubscription(
  id: string,
  subscription: "free" | "pro"
): Promise<void> {
  const supabase = db();
  const { error } = await supabase
    .from("User")
    .update({ subscription, credits: subscription === "pro" ? 99999 : 3 })
    .eq("id", id);

  if (error) throw new Error(`Failed to update subscription: ${error.message}`);
}

/** Create or update user */
export async function upsertUser(params: {
  id: string;
  email: string;
  name?: string;
}): Promise<UserRecord> {
  const existing = await getUserById(params.id);
  if (existing) {
    const supabase = db();
    const { data, error } = await supabase
      .from("User")
      .update({ email: params.email, name: params.name || "" })
      .eq("id", params.id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update user: ${error.message}`);
    return data as UserRecord;
  }

  return getOrCreateUser(params.id, params.email, params.name);
}
