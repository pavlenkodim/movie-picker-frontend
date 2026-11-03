"use server";

import { hasLocale } from "next-intl";
import { cookies } from "next/headers";
import { LOCALE_COOKIE, locales } from "./config";

export async function setLocale(locale: string) {
  if (!hasLocale(locales, locale)) return;

  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
