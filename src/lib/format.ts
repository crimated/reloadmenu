import type { Lang } from "./i18n";

export function formatPrice(value: number, lang: Lang, currency: { ar: string; en: string }) {
  const n = new Intl.NumberFormat(lang === "ar" ? "ar-IQ" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);
  return `${n} ${lang === "ar" ? currency.ar : currency.en}`;
}

/** Iraqi mobile numbers: 07XXXXXXXXX / +9647XXXXXXXXX / 9647XXXXXXXXX */
export function isValidIraqiPhone(raw: string) {
  const d = raw.replace(/[^\d+]/g, "");
  return /^(\+?964|0)7\d{9}$/.test(d);
}

export function normalizeIraqiPhone(raw: string) {
  const d = raw.replace(/[^\d]/g, "");
  if (d.startsWith("964")) return `+${d}`;
  if (d.startsWith("0")) return `+964${d.slice(1)}`;
  return `+964${d}`;
}
