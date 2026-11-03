import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale, LOCALE_COOKIE, locales } from "./config";
import { hasLocale } from "next-intl";

export default getRequestConfig(async () => {
  const candidate = (await cookies()).get(LOCALE_COOKIE)?.value;
  const locale = hasLocale(locales, candidate) ? candidate : defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
