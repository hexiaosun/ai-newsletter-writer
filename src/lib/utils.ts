import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility to merge Tailwind class names */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date for display */
export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/** Truncate text */
export function truncate(text: string, length = 100) {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}
