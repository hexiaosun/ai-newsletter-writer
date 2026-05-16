import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function HomePage() {
  const { userId } = await auth();
  const isSignedIn = !!userId;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📬</span>
            <span className="text-xl font-bold text-gray-900">NewsLetterCraft</span>
          </div>
          <nav className="flex items-center gap-4">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </a>
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-primary text-sm px-4 py-1.5 rounded-full mb-6">
            <span>✨ Powered by GPT-4o</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Write Newsletters{" "}
            <span className="text-primary">10x Faster</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Stop staring at a blank page. Drop in your bullet points, choose a style,
            and let AI craft a polished newsletter in seconds. Not generic — actually
            good.
          </p>
          <div className="flex items-center justify-center gap-4">
            {!isSignedIn ? (
              <Link
                href="/sign-up"
                className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-primary-dark transition shadow-lg shadow-blue-200"
              >
                Start Writing Free →
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="bg-primary text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-primary-dark transition shadow-lg shadow-blue-200"
              >
                Go to Dashboard →
              </Link>
            )}
            <a
              href="#features"
              className="text-gray-600 px-8 py-3 rounded-xl text-lg font-medium border border-gray-200 hover:border-gray-300 transition"
            >
              See How It Works
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            No credit card required • 3 free generations
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            From Bullet Points to Newsletter
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-lg mx-auto">
            Three simple steps. No templates. No fluff.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📝",
                title: "Jot Down Your Ideas",
                description:
                  "Write 3-5 bullet points with the key things you want to say. That's it — no drafts, no formatting.",
              },
              {
                icon: "🎨",
                title: "Pick Your Style",
                description:
                  "Choose from Professional, Casual, or Storytelling. We set the tone so it sounds like you.",
              },
              {
                icon: "⚡",
                title: "Get Your Newsletter",
                description:
                  "AI writes a complete newsletter with subject line, intro, body, and CTA. Tweak or publish instantly.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-8 rounded-xl border border-gray-100 text-center"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple Pricing
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Start free. Upgrade when you&apos;re ready.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Tier */}
            <div className="border border-gray-200 rounded-2xl p-8 bg-white">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-3xl font-bold mb-1">
                $0<span className="text-base font-normal text-gray-500">/month</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">Perfect for trying it out</p>
              <ul className="space-y-3 mb-8">
                {["3 newsletters per month", "All 3 writing styles", "Markdown export", "Basic support"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <span className="text-green-500">✓</span> {item}
                    </li>
                  )
                )}
              </ul>
              {!isSignedIn ? (
                <Link
                  href="/sign-up"
                  className="block text-center w-full py-3 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition"
                >
                  Get Started Free
                </Link>
              ) : (
                <div className="block text-center w-full py-3 rounded-xl border border-gray-200 text-sm text-gray-500">
                  Current Plan
                </div>
              )}
            </div>

            {/* Pro Tier */}
            <div className="border-2 border-primary rounded-2xl p-8 bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-1">
                $9<span className="text-base font-normal text-gray-500">/month</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">For serious creators</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited newsletters",
                  "Priority AI processing",
                  "Save & manage history",
                  "Email export",
                  "Priority support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span> {item}
                  </li>
                ))}
              </ul>
              <form action="/api/stripe/checkout" method="POST">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition"
                >
                  Upgrade to Pro →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            Your next newsletter is 30 seconds away
          </h2>
          <p className="text-gray-400 mb-8">
            Join creators who save hours every week with AI-powered writing.
          </p>
          {!isSignedIn ? (
            <Link
              href="/sign-up"
              className="inline-block bg-primary text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-primary-dark transition"
            >
              Start Writing Free →
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="inline-block bg-primary text-white px-8 py-3 rounded-xl text-lg font-medium hover:bg-primary-dark transition"
            >
              Go to Dashboard →
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>&copy; 2026 NewsLetterCraft. Built for creators, by creators.</p>
      </footer>
    </div>
  );
}
