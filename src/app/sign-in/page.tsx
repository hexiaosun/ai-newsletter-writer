"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getLocaleFromCookies, getTranslations, type Locale } from "@/lib/i18n";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [t, setT] = useState<ReturnType<typeof getTranslations>>(() => getTranslations("en"));
  const router = useRouter();

  useEffect(() => {
    const lang = getLocaleFromCookies(
      document.cookie
        .split("; ")
        .find((c) => c.startsWith("lang="))
        ?.split("=")[1]
    );
    setT(() => getTranslations(lang));
  }, []);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 md:mb-8">
          <span className="text-3xl md:text-4xl mb-2 md:mb-3 block">📬</span>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {t("signin.title")}
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">{t("signin.subtitle")}</p>
        </div>

        <form
          onSubmit={handleSignIn}
          className="bg-white/80 backdrop-blur-sm p-5 md:p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("signin.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("signin.placeholder.email")}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white/50"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("signin.password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-blue-200"
          >
            {loading ? t("signin.loading") : t("signin.cta")}
          </button>

          <p className="text-center text-xs md:text-sm text-gray-500 mt-4">
            {t("signin.noAccount")}{" "}
            <Link href="/sign-up" className="text-primary hover:underline font-medium">
              {t("signin.signup")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
