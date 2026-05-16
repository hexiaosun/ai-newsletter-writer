import Link from "next/link";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/supabase/server";
import { getTranslations, getLocaleFromCookies } from "@/lib/i18n";
import LanguageToggle from "@/components/language-toggle";

export default async function HomePage() {
  const user = await getCurrentUser();
  const isSignedIn = !!user;
  const cookieStore = await cookies();
  const locale = getLocaleFromCookies(cookieStore.get("lang")?.value);
  const t = getTranslations(locale);
  const langLabel = locale === "en" ? "中文" : "English";
  const btnCta = isSignedIn ? "/dashboard" : "/sign-up";

  const NavLink = ({
    href,
    label,
    className = "",
  }: {
    href: string;
    label: string;
    className?: string;
  }) => (
    <Link
      href={href}
      className={`text-sm font-medium text-gray-400 hover:text-gray-600 transition ${className}`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">📬</span>
            <span className="text-lg md:text-xl font-bold text-gradient">
              NewsletterCraft
            </span>
          </Link>
          <div className="flex items-center gap-2 md:gap-5">
            <NavLink href="#features" label={t("nav.features")} className="hidden md:block" />
            <NavLink href="#pricing" label={t("nav.pricing")} className="hidden md:block" />
            <LanguageToggle currentLang={locale} label={langLabel} />
            <Link
              href={isSignedIn ? "/dashboard" : "/sign-up"}
              className="btn-primary text-xs md:text-sm px-5 md:px-6 py-2.5 md:py-2.5"
            >
              {isSignedIn ? t("nav.dashboard") : t("nav.getStarted")}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="glow-blue w-[500px] h-[500px] top-[-200px] left-[-100px] md:top-[-250px] md:left-[-100px]" />
        <div className="glow-purple w-[400px] h-[400px] bottom-[-150px] right-[-100px]" />
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-36 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge-premium mb-6 md:mb-8">
              <span>✨</span> {t("hero.badge")}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-5 md:mb-6 leading-[1.12]">
              {t("hero.title")}{" "}
              <span className="text-gradient">{t("hero.title.highlight")}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 max-w-lg mx-auto">
              <Link href={btnCta} className="btn-primary text-center px-8 py-4 text-sm md:text-base">
                {isSignedIn ? t("hero.cta.dashboard") : t("hero.cta")}
              </Link>
              <a href="#features" className="btn-outline text-center px-8 py-4 text-sm md:text-base">
                {t("hero.secondary")}
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-6 font-medium">
              ✋ {t("hero.note")}
            </p>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-10 md:py-12 border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
          <p className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-gray-300 mb-4 md:mb-6">
            {t("logo.title")}
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-16 text-gray-300 text-[11px] md:text-sm font-bold flex-wrap">
            <span>Substack</span>
            <span>ConvertKit</span>
            <span>Mailchimp</span>
            <span>Buttondown</span>
            <span>Beehiiv</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 bg-white relative">
        <div className="bg-grid absolute inset-0 opacity-40" />
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
          <div className="text-center mb-14 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {t("features.title")}
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-5 md:gap-8">
            {[
              { num: 1, icon: "📝", colors: ["#2563eb", "#1d4ed8"] },
              { num: 2, icon: "🎨", colors: ["#7c3aed", "#6d28d9"] },
              { num: 3, icon: "🚀", colors: ["#f59e0b", "#d97706"] },
            ].map((f) => (
              <div key={f.num} className="card-premium p-6 md:p-8 flex flex-col md:block items-start gap-4 md:gap-0">
                <div
                  className="feature-icon mb-0 md:mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${f.colors[0]}15, ${f.colors[1]}15)`,
                    boxShadow: `0 8px 24px ${f.colors[0]}20`,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 mt-0 md:mt-5">
                    {t(`features.${f.num}.title`)}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                    {t(`features.${f.num}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo/Preview Section */}
      <section className="py-16 md:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 mb-3 md:mb-4">
              {t("demo.title")}
            </h2>
            <p className="text-gray-500 text-sm md:text-lg max-w-xl mx-auto px-2">
              {t("demo.subtitle")}
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-3 md:py-4 bg-gray-50 border-b border-gray-100">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400" />
              <span className="text-[10px] md:text-xs text-gray-400 ml-2 md:ml-3 font-medium">
                NewsletterCraft — {t("demo.badge")}
              </span>
            </div>
            <div className="p-4 md:p-10 newsletter-preview text-xs md:text-base">
              <p className="text-primary font-bold text-sm md:text-lg mb-1">
                Subject: 🚀 {t("demo.subject")}
              </p>
              <p className="text-gray-400 text-[10px] md:text-xs mb-4 md:mb-6">{t("demo.dear")}</p>
              <p>{t("demo.p1")}</p>
              <h2>{t("demo.h2.1")}</h2>
              <p>{t("demo.p2")}</p>
              <h2>{t("demo.h2.2")}</h2>
              <p>{t("demo.p3")}</p>
              <h2>{t("demo.h2.3")}</h2>
              <p>{t("demo.p4")}</p>
              <p className="mt-4 md:mt-6 font-medium">
                <Link href={btnCta} className="text-primary hover:underline text-xs md:text-base">
                  {t("demo.cta")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="text-center mb-14 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {t("pricing.title")}
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              {t("pricing.subtitle")}
            </p>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {/* Free */}
            <div className="card-premium p-6 md:p-8 flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{t("pricing.free.title")}</h3>
              <div className="mb-1">
                <span className="text-4xl font-extrabold text-gray-900">{t("pricing.free.price")}</span>
                <span className="text-base font-medium text-gray-400 ml-1">/month</span>
              </div>
              <p className="text-sm text-gray-500 mb-8">{t("pricing.free.desc")}</p>
              <ul className="space-y-3.5 mb-8 flex-1">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-500 text-xs">✓</span>
                    </div>
                    {t(`pricing.free.perks.${i}`)}
                  </li>
                ))}
              </ul>
              <Link
                href={isSignedIn ? "/dashboard" : "/sign-up"}
                className="block text-center w-full py-3.5 rounded-2xl border-2 border-gray-200 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition"
              >
                {isSignedIn ? t("pricing.free.current") : t("pricing.free.cta")}
              </Link>
            </div>

            {/* Pro */}
            <div className="gradient-border p-[2px]">
              <div className="p-6 md:p-8 rounded-[18px] bg-white h-full flex flex-col">
                <div className="inline-flex items-center bg-gradient-to-r from-primary to-purple-600 text-white text-[11px] px-4 py-1.5 rounded-full font-bold w-fit mb-3 shadow-lg">
                  🏆 {t("pricing.pro.badge")}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{t("pricing.pro.title")}</h3>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold text-gray-900">{t("pricing.pro.price")}</span>
                  <span className="text-base font-medium text-gray-400 ml-1">/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-8">{t("pricing.pro.desc")}</p>
                <ul className="space-y-3.5 mb-8 flex-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-500 text-xs">✓</span>
                      </div>
                      {t(`pricing.pro.perks.${i}`)}
                    </li>
                  ))}
                </ul>
                {isSignedIn ? (
                  <form action="/api/stripe/checkout" method="POST">
                    <button type="submit" className="btn-primary w-full py-3.5 text-sm">
                      {t("pricing.pro.cta")}
                    </button>
                  </form>
                ) : (
                  <Link href="/sign-up" className="btn-primary block text-center w-full py-3.5 text-sm">
                    {t("pricing.signup")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-gradient relative overflow-hidden py-20 md:py-28 text-center">
        <div className="bg-grid-white absolute inset-0 opacity-30" />
        <div className="max-w-3xl mx-auto px-5 md:px-8 relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-sm px-5 py-2 rounded-full border border-white/10 font-medium mb-6">
            🚀 {t("cta.badge")}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            {t("cta.title")}{" "}
            <span className="text-gradient">{t("cta.title.highlight")}</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-10 max-w-lg mx-auto">
            {t("cta.subtitle")}
          </p>
          <Link href={btnCta} className="btn-primary inline-block px-10 py-4 text-base md:text-lg">
            {isSignedIn ? t("hero.cta.dashboard") : t("hero.cta")}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📬</span>
              <span className="text-lg font-bold text-white">NewsletterCraft</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#features" className="hover:text-gray-300 transition">Features</a>
              <a href="#pricing" className="hover:text-gray-300 transition">Pricing</a>
              <Link href={btnCta} className="text-primary hover:text-primary-light transition font-medium">
                {isSignedIn ? "Dashboard" : "Sign Up"}
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-600">
            <p>{`© 2026 NewsletterCraft. ${t("footer.tagline")}`}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
