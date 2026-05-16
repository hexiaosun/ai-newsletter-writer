import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getLocaleFromCookies, getTranslations } from "@/lib/i18n";
import { getOrCreateUser, getUserWithNewsletters } from "@/lib/db";
import type { NewsletterRecord } from "@/lib/db";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const locale = getLocaleFromCookies(cookieStore.get("lang")?.value);
  const t = getTranslations(locale);

  if (!user) return null;

  // Get or create user in Supabase
  let dbUser = await getOrCreateUser(
    user.id,
    user.email || "",
    user.user_metadata?.full_name as string
  );

  const { newsletters } = await getUserWithNewsletters(user.id, 5);

  const newsletterCount = newsletters.length;
  const totalCredits = dbUser.subscription === "pro" ? "Unlimited" : dbUser.credits;
  const plan = dbUser.subscription === "pro" ? "Pro" : "Free";
  const remaining = typeof totalCredits === "string" ? totalCredits : Math.max(0, totalCredits - newsletterCount);

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-6">
        {t("dash.welcome")}{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""} 👋
      </h1>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="dash-card p-5 md:p-6">
          <p className="text-xs md:text-sm text-gray-500 mb-1">{t("dash.plan")}</p>
          <p className="text-xl md:text-2xl font-bold">{plan}</p>
          {plan === "Free" && (
            <a href="#pricing" className="text-xs md:text-sm text-primary hover:underline mt-1 block">{t("dash.upgrade")}</a>
          )}
        </div>
        <div className="dash-card p-5 md:p-6">
          <p className="text-xs md:text-sm text-gray-500 mb-1">{t("dash.written")}</p>
          <p className="text-xl md:text-2xl font-bold">{newsletterCount}</p>
        </div>
        <div className="dash-card p-5 md:p-6">
          <p className="text-xs md:text-sm text-gray-500 mb-1">{t("dash.credits")}</p>
          <p className="text-xl md:text-2xl font-bold">{remaining}</p>
          {plan === "Free" && (
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-primary to-purple-600"
                style={{ width: `${Math.min(100, (newsletterCount / 3) * 100)}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm md:text-base font-semibold">{t("dash.recent")}</h2>
          <Link href="/dashboard/generate" className="text-xs md:text-sm text-primary hover:underline">{t("dash.writeNew")}</Link>
        </div>
        {newsletters.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {newsletters.map((nl: NewsletterRecord) => (
              <div key={nl.id} className="p-3 md:p-4 hover:bg-gray-50 transition">
                <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
                  {nl.topic || nl.content.slice(0, 80)}
                </p>
                <div className="flex items-center gap-3 mt-1 text-[10px] md:text-xs text-gray-400">
                  <span className="capitalize bg-gray-100 px-2 py-0.5 rounded">{nl.style}</span>
                  <span>{new Date(nl.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 md:p-12 text-center">
            <p className="text-gray-400 text-sm mb-4">{t("dash.empty")}</p>
            <Link
              href="/dashboard/generate"
              className="btn-primary inline-block px-5 md:px-6 py-2.5 rounded-lg text-xs md:text-sm font-medium"
            >
              {t("dash.empty.cta")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
