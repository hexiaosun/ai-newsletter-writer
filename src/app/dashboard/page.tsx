import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: { newsletters: { orderBy: { createdAt: "desc" }, take: 5 } },
  });

  const newsletterCount = dbUser?.newsletters.length || 0;
  const creditsUsed = dbUser?.credits !== undefined ? Math.min(newsletterCount, dbUser.credits) : 0;
  const totalCredits = dbUser?.subscription === "pro" ? "Unlimited" : (dbUser?.credits || 3);
  const plan = dbUser?.subscription === "pro" ? "Pro" : "Free";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Welcome back{user.firstName ? `, ${user.firstName}` : ""} 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Plan</p>
          <p className="text-2xl font-bold">{plan}</p>
          {plan === "Free" && (
            <Link href="#pricing" className="text-sm text-primary hover:underline mt-1 block">
              Upgrade to Pro →
            </Link>
          )}
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Newsletters Written</p>
          <p className="text-2xl font-bold">{newsletterCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Credits Remaining</p>
          <p className="text-2xl font-bold">
            {typeof totalCredits === "string" ? totalCredits : totalCredits - newsletterCount}
          </p>
        </div>
      </div>

      {/* Recent Newsletters */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold">Recent Newsletters</h2>
          <Link
            href="/dashboard/generate"
            className="text-sm text-primary hover:underline"
          >
            Write New
          </Link>
        </div>
        {dbUser?.newsletters && dbUser.newsletters.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {dbUser.newsletters.map((nl) => (
              <div key={nl.id} className="p-4 hover:bg-gray-50 transition">
                <p className="font-medium text-sm text-gray-900 truncate">
                  {nl.topic || nl.content.slice(0, 80)}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="capitalize">{nl.style}</span>
                  <span>{new Date(nl.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-400 mb-4">No newsletters yet</p>
            <Link
              href="/dashboard/generate"
              className="inline-block bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition"
            >
              Create Your First Newsletter
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
