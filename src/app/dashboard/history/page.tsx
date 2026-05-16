import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { formatDate, truncate } from "@/lib/utils";
import Link from "next/link";

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const newsletters = await prisma.newsletter.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">History</h1>
        <Link
          href="/dashboard/generate"
          className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          + New Newsletter
        </Link>
      </div>

      {newsletters.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-500 mb-4">No newsletters yet</p>
          <Link
            href="/dashboard/generate"
            className="inline-block bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition"
          >
            Create Your First
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {newsletters.map((nl) => (
            <details key={nl.id} className="group">
              <summary className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between list-none">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {truncate(nl.topic || nl.content, 80)}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span className="capitalize bg-gray-100 px-2 py-0.5 rounded">
                      {nl.style}
                    </span>
                    <span>{formatDate(nl.createdAt)}</span>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400 group-open:rotate-180 transition"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-4 pb-4 border-t border-gray-50">
                <div className="newsletter-preview text-sm pt-4 whitespace-pre-wrap">
                  {nl.content}
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
