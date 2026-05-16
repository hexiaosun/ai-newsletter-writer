"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getLocaleFromCookies, getTranslations } from "@/lib/i18n";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [t, setT] = useState(() => getTranslations("en"));
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

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await fetch("/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data.user.id, email, name }),
      });
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
            {t("signup.title")}
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-1">{t("signup.subtitle")}</p>
        </div>

        <form onSubmit={handleSignUp} className="bg-white/80 backdrop-blur-sm p-5 md:p-8 rounded-2xl shadow-lg border border-gray-100">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("signup.name")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("signup.placeholder.name")}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white/50"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("signup.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white/50"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("signup.password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("signup.placeholder.password")}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white/50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-blue-200"
          >
            {loading ? t("signup.loading") : t("signup.cta")}
          </button>

          <p className="text-center text-xs md:text-sm text-gray-500 mt-4">
            {t("signup.hasAccount")}{" "}
            <Link href="/sign-in" className="text-primary hover:underline font-medium">
              {t("signup.signin")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
