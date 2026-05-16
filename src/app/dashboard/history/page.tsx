import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getLocaleFromCookies, getTranslations } from "@/lib/i18n";
import { getNewsletters } from "@/lib/db";
import { formatDate, truncate } from "@/lib/utils";
import Link from "next/link";
import type { NewsletterRecord } from "@/lib/db";

export default async function HistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  const locale = getLocaleFromCookies(cookieStore.get("lang")?.value);
  const t = getTranslations(locale);

  if (!user) return null;

  const newsletters = await getNewsletters(user.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold">{t("history.title")}</h1>
        <Link
          href="/dashboard/generate"
          className="btn-primary text-xs md:text-sm px-4 py-2 rounded-lg font-medium"
        >
          {t("dash.new")}
        </Link>
      </div>

      {newsletters.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 md:p-16 text-center">
          <div className="text-3xl md:text-4xl mb-3">📭</div>
          <p className="text-gray-500 text-sm mb-4">{t("history.empty")}</p>
          <Link
            href="/dashboard/generate"
            className="btn-primary inline-block px-5 md:px-6 py-2.5 rounded-lg text-xs md:text-sm font-medium"
          >
            {t("history.empty.cta")}
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {newsletters.map((nl: NewsletterRecord) => (
            <details key={nl.id} className="group">
              <summary className="p-3 md:p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between list-none">
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
                    {truncate(nl.topic || nl.content, 80)}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] md:text-xs text-gray-400">
                    <span className="capitalize bg-gray-100 px-2 py-0.5 rounded">{nl.style}</span>
                    <span>{formatDate(nl.createdAt)}</span>
                  </div>
                </div>
                <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-open:rotate-180 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-3 md:px-4 pb-3 md:pb-4 border-t border-gray-50">
                <div className="newsletter-preview text-xs md:text-sm pt-3 md:pt-4 whitespace-pre-wrap">{nl.content}</div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
