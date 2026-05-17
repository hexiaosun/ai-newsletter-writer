import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getLocaleFromCookies, getTranslations } from "@/lib/i18n";
import { getOrCreateUser, getUserWithNewsletters, countNewsletters } from "@/lib/db";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const locale = getLocaleFromCookies(cookieStore.get("lang")?.value);
  const t = getTranslations(locale);

  if (!user) return null;

  const dbUser = await getOrCreateUser(
    user.id,
    user.email || "",
    user.user_metadata?.full_name as string
  );

  const newsletterCount = await countNewsletters(user.id);
  const totalCredits = dbUser.subscription === "pro" ? Infinity : dbUser.credits;
  const plan = dbUser.subscription === "pro" ? "Pro" : "Free";
  const remaining =
    totalCredits === Infinity
      ? "∞"
      : Math.max(0, totalCredits - newsletterCount);
  const usedPercent =
    totalCredits === Infinity
      ? 0
      : Math.min(100, (newsletterCount / totalCredits) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-6">
        {t("settings.title")}
      </h1>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-7 mb-5">
        <h2 className="text-sm md:text-base font-semibold mb-4">
          {t("settings.profile")}
        </h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-lg md:text-xl font-bold">
            {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
          </div>
          <div>
            <p className="text-sm md:text-base font-semibold text-gray-900">
              {user.user_metadata?.full_name || t("settings.noName")}
            </p>
            <p className="text-xs md:text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-400 mb-0.5">{t("settings.memberSince")}</p>
            <p className="font-medium text-gray-700">
              {new Date(dbUser.createdAt).toLocaleDateString(
                locale === "zh" ? "zh-CN" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-gray-400 mb-0.5">{t("settings.userId")}</p>
            <p className="font-medium text-gray-700 font-mono text-[10px] md:text-xs truncate">
              {user.id.slice(0, 16)}...
            </p>
          </div>
        </div>
      </div>

      {/* Subscription & Usage Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 md:p-7 mb-5">
        <h2 className="text-sm md:text-base font-semibold mb-4">
          {t("settings.subscription")}
        </h2>

        <div className="flex items-center justify-between mb-5 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
          <div>
            <p className="text-xs text-gray-500 mb-1">{t("settings.currentPlan")}</p>
            <p className="text-lg md:text-xl font-bold text-gray-900">{plan}</p>
          </div>
          {plan === "Free" && (
            <a
              href="#pricing"
              className="btn-primary text-xs px-4 py-2 rounded-lg whitespace-nowrap"
            >
              {t("settings.upgrade")}
            </a>
          )}
          {plan === "Pro" && (
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium">
              ✅ {t("settings.active")}
            </span>
          )}
        </div>

        {/* Usage Breakdown */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-1.5">
              <span className="text-gray-600">{t("settings.usage")}</span>
              <span className="font-semibold">
                {newsletterCount} / {totalCredits === Infinity ? "∞" : totalCredits}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              {totalCredits === Infinity ? (
                <div className="h-2 rounded-full bg-gradient-to-r from-primary to-purple-600 w-full opacity-30" />
              ) : (
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-primary to-purple-600 transition-all"
                  style={{ width: `${usedPercent}%` }}
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-lg md:text-xl font-bold text-gray-900">
                {newsletterCount}
              </p>
              <p className="text-[10px] md:text-xs text-gray-400">
                {t("settings.totalGenerated")}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-lg md:text-xl font-bold text-gray-900">
                {remaining === "∞" ? "∞" : remaining}
              </p>
              <p className="text-[10px] md:text-xs text-gray-400">
                {t("settings.remaining")}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center col-span-2 sm:col-span-1">
              <p className="text-lg md:text-xl font-bold text-gray-900">
                {dbUser.subscription === "pro" ? "Pro" : "Free"}
              </p>
              <p className="text-[10px] md:text-xs text-gray-400">
                {t("settings.plan")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-red-100 p-5 md:p-7">
        <h2 className="text-sm md:text-base font-semibold text-red-600 mb-2">
          {t("settings.danger")}
        </h2>
        <p className="text-xs md:text-sm text-gray-500 mb-4">
          {t("settings.dangerDesc")}
        </p>
        <form
          action="/api/user/delete"
          method="POST"
          onSubmit={(e) => {
            if (!confirm(t("settings.confirmDelete"))) e.preventDefault();
          }}
        >
          <button
            type="submit"
            className="text-xs md:text-sm px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition font-medium"
          >
            {t("settings.deleteAccount")}
          </button>
        </form>
      </div>
    </div>
  );
}
