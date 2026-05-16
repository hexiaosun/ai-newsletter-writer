"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type Locale } from "@/lib/i18n";

export default function LanguageToggle({
  currentLang,
  label,
}: {
  currentLang: Locale;
  label: string;
}) {
  const router = useRouter();
  const [lang, setLang] = useState(currentLang);

  function toggle() {
    const newLang: Locale = lang === "en" ? "zh" : "en";
    setLang(newLang);
    document.cookie = `lang=${newLang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      className="text-xs md:text-sm text-gray-400 hover:text-gray-600 transition font-medium px-2 md:px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300"
    >
      {label}
    </button>
  );
}
