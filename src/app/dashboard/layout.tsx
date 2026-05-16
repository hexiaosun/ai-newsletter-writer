import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getLocaleFromCookies, getTranslations } from "@/lib/i18n";
import SignOutButton from "./sign-out-button";
import LanguageToggle from "@/components/language-toggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const locale = getLocaleFromCookies(cookieStore.get("lang")?.value);
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">📬</span>
            <span className="font-bold text-gradient">
              {t("brand.name")}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:block text-xs text-gray-400 hover:text-gray-600 transition"
            >
              Home
            </Link>
            <Link
              href="/dashboard/generate"
              className="btn-primary text-xs md:text-sm px-4 py-2 rounded-lg font-medium"
            >
              {t("dash.new")}
            </Link>
            <LanguageToggle currentLang={locale} label={locale === "en" ? "中文" : "English"} />
            <div className="flex items-center gap-2">
              {user?.email && (
                <span className="text-xs text-gray-400 hidden sm:block">{user.email}</span>
              )}
              <SignOutButton label={t("nav.signOut")} />
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex gap-6">
          <Link href="/dashboard" className="text-sm py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition">
            {t("dash.overview")}
          </Link>
          <Link href="/dashboard/generate" className="text-sm py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition">
            {t("dash.generate")}
          </Link>
          <Link href="/dashboard/history" className="text-sm py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition">
            {t("dash.history")}
          </Link>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
