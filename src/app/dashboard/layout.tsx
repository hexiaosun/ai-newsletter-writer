import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">📬</span>
            <span className="font-bold text-gray-900">NewsLetterCraft</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/generate"
              className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
            >
              + New Newsletter
            </Link>
            <div className="flex items-center gap-2">
              {user?.email && (
                <span className="text-xs text-gray-400 hidden sm:block">
                  {user.email}
                </span>
              )}
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Sub-nav */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 flex gap-6">
          <Link
            href="/dashboard"
            className="text-sm py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/generate"
            className="text-sm py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition"
          >
            Generate
          </Link>
          <Link
            href="/dashboard/history"
            className="text-sm py-3 text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition"
          >
            History
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
