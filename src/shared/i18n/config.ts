export const locales = ["en", "ru"] as const;
export const defaultLocale = "en";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const ogLocale: Record<(typeof locales)[number], string> = {
  en: "en_US",
  ru: "ru_RU",
};
