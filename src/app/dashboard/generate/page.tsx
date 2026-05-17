"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { getLocaleFromCookies, getTranslations } from "@/lib/i18n";

type NewsletterStyle = "professional" | "casual" | "storytelling";

const STYLE_OPTIONS: { value: NewsletterStyle }[] = [
  { value: "professional" },
  { value: "casual" },
  { value: "storytelling" },
];

export default function GeneratePage() {
  const router = useRouter();
  const [bulletPoints, setBulletPoints] = useState("");
  const [style, setStyle] = useState<NewsletterStyle>("professional");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [t, setT] = useState(() => getTranslations("en"));

  useEffect(() => {
    const cookieLang = document.cookie
      .split("; ")
      .find((c) => c.startsWith("lang="))
      ?.split("=")[1];
    const lang = getLocaleFromCookies(cookieLang);
    setT(() => getTranslations(lang));
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/sign-in");
      } else {
        setIsAuthenticated(true);
      }
    });
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  async function handleGenerate() {
    const points = bulletPoints.split("\n").map((b) => b.trim()).filter((b) => b.length > 0);

    if (points.length === 0) {
      setError("Please enter at least one bullet point.");
      return;
    }

    if (points.length < 2) {
      setError(t("gen.error.min"));
      return;
    }

    setIsLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bulletPoints: points, style }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setResult(data.content);
    } catch {
      setError(t("gen.error.network"));
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-1">{t("gen.title")}</h1>
      <p className="text-gray-500 text-xs md:text-sm mb-6 md:mb-8">{t("gen.subtitle")}</p>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-8">
        {/* Input Side */}
        <div>
          <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200">
            <label className="block text-xs md:text-sm font-medium mb-1">{t("gen.label")}</label>
            <p className="text-[10px] md:text-xs text-gray-400 mb-2">{t("gen.hint")}</p>
            <textarea
              value={bulletPoints}
              onChange={(e) => setBulletPoints(e.target.value)}
              placeholder={t("gen.placeholder")}
              className="w-full h-36 md:h-48 p-3 md:p-4 border border-gray-200 rounded-lg text-xs md:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />

            <label className="block text-xs md:text-sm font-medium mt-4 md:mt-6 mb-2 md:mb-3">{t("gen.style")}</label>
            <div className="grid grid-cols-3 gap-1.5 md:grid-cols-1 md:gap-2">
              {STYLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStyle(opt.value)}
                  className={`text-left p-2.5 md:p-3 rounded-lg border text-[10px] md:text-sm transition ${
                    style === opt.value
                      ? "border-primary bg-blue-50 text-primary"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="font-medium">{t(`gen.style.${opt.value}`)}</span>
                  <span className="text-gray-400 ml-1 md:ml-2 hidden md:inline">{t(`gen.style.${opt.value}.desc`)}</span>
                </button>
              ))}
            </div>

            {error && (
              <div className="mt-3 md:mt-4 p-2.5 md:p-3 bg-red-50 text-red-600 text-xs md:text-sm rounded-lg">{error}</div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="btn-primary w-full mt-3 md:mt-4 py-2.5 md:py-3 rounded-lg text-xs md:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-3 w-3 md:h-4 md:w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t("gen.loading")}
                </>
              ) : (
                t("gen.cta")
              )}
            </button>
          </div>
        </div>

        {/* Result Side */}
        <div>
          <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-xs md:text-sm font-semibold">{t("gen.preview")}</h2>
              {result && (
                <button onClick={handleCopy} className="text-[10px] md:text-xs text-primary hover:underline">
                  📋 {t("gen.copy")}
                </button>
              )}
            </div>
            {result ? (
              <div className="newsletter-preview text-xs md:text-sm leading-relaxed whitespace-pre-wrap">{result}</div>
            ) : (
              <div className="text-center py-12 md:py-16 text-gray-400">
                <div className="text-2xl md:text-4xl mb-2 md:mb-3">📝</div>
                <p className="text-[10px] md:text-sm">
                  {isLoading ? t("gen.loading") : t("gen.placeholder.result")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
