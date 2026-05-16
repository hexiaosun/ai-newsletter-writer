"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type NewsletterStyle = "professional" | "casual" | "storytelling";

const STYLE_OPTIONS: { value: NewsletterStyle; label: string; desc: string }[] = [
  {
    value: "professional",
    label: "Professional",
    desc: "Formal, data-driven, authoritative",
  },
  {
    value: "casual",
    label: "Casual",
    desc: "Friendly, conversational, approachable",
  },
  {
    value: "storytelling",
    label: "Storytelling",
    desc: "Narrative, engaging, emotional hooks",
  },
];

export default function GeneratePage() {
  const router = useRouter();
  const supabase = createClient();

  const [bulletPoints, setBulletPoints] = useState("");
  const [style, setStyle] = useState<NewsletterStyle>("professional");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/sign-in");
      } else {
        setIsAuthenticated(true);
      }
    });
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  async function handleGenerate() {
    const points = bulletPoints
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    if (points.length === 0) {
      setError("Please enter at least one bullet point.");
      return;
    }

    if (points.length < 2) {
      setError("Enter at least 2-3 bullet points for a good newsletter.");
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
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setResult(data.content);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Create Newsletter</h1>
      <p className="text-gray-500 text-sm mb-8">
        Write your bullet points, pick a tone, and let AI do the rest.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Side */}
        <div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <label className="block text-sm font-medium mb-2">
              Your Bullet Points
            </label>
            <p className="text-xs text-gray-400 mb-3">
              One idea per line. 3-5 points works best.
            </p>
            <textarea
              value={bulletPoints}
              onChange={(e) => setBulletPoints(e.target.value)}
              placeholder={`Example:\nLaunched our new AI feature this week\nCustomer feedback has been amazing\nPlanning the next release for Q3`}
              className="w-full h-48 p-4 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />

            <label className="block text-sm font-medium mt-6 mb-3">Style</label>
            <div className="grid grid-cols-1 gap-2">
              {STYLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStyle(opt.value)}
                  className={`text-left p-3 rounded-lg border text-sm transition ${
                    style === opt.value
                      ? "border-primary bg-blue-50 text-primary"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                  <span className="text-gray-400 ml-2">{opt.desc}</span>
                </button>
              ))}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full mt-4 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generating...
                </>
              ) : (
                "Generate Newsletter →"
              )}
            </button>
          </div>
        </div>

        {/* Result Side */}
        <div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Preview</h2>
              {result && (
                <button
                  onClick={handleCopy}
                  className="text-xs text-primary hover:underline"
                >
                  📋 Copy to Clipboard
                </button>
              )}
            </div>
            {result ? (
              <div className="newsletter-preview text-sm leading-relaxed whitespace-pre-wrap">
                {result}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <div className="text-4xl mb-3">📝</div>
                <p className="text-sm">
                  {isLoading
                    ? "AI is writing your newsletter..."
                    : "Your newsletter will appear here"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
