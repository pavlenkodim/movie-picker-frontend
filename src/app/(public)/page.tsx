import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";
import Header from "@/shared/ui/Header";
import { LogIn } from "lucide-react";
import packageJson from "../../../package.json";
import LocaleSwitcher from "@/features/locale/components/LocaleSwitcher";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const session = await getServerSession(options);
  const appVersion = packageJson.version;
  const t = await getTranslations("landing");
  const tCommon = await getTranslations("common");

  return (
    <div className="w-full min-h-screen">
      <Header
        right={
          !session && (
            <Link
              href="/auth?tab=login"
              className="text-sm font-semibold hover:text-gray-600 dark:hover:text-gray-400 transition"
            >
              <LogIn />
            </Link>
          )
        }
      />
      <section className="fixed top-10 left-0 w-full z-40 ">
        <div className="max-w-md mx-auto px-6 py-5 flex justify-center">
          <LocaleSwitcher />
        </div>
      </section>

      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/20 dark:border-white/20   text-sm font-medium">
              {t("hero.badge")}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight whitespace-pre-line">
            {t("hero.title")}
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <Link
            href="/auth?tab=register"
            className="flex h-14 w-full items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] font-bold text-lg cursor-pointer"
          >
            {t("hero.cta")}
          </Link>
        </div>
      </section>

      <section className="py-20 px-6 ">
        <div className="max-w-md mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">{t("howItWorks.title")}</h3>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">{t("howItWorks.steps.taste.title")}</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("howItWorks.steps.taste.description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">{t("howItWorks.steps.swipe.title")}</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("howItWorks.steps.swipe.description")}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">{t("howItWorks.steps.enjoy.title")}</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("howItWorks.steps.enjoy.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-md mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">{t("features.title")}</h3>

          <div className="grid grid-cols-1 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2">{t("features.items.quick.title")}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("features.items.quick.description")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2">{t("features.items.history.title")}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("features.items.history.description")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2">{t("features.items.smart.title")}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("features.items.smart.description")}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-black border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition">
              <h4 className="text-lg font-bold mb-2">{t("features.items.mobile.title")}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("features.items.mobile.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">{t("cta.title")}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{t("cta.subtitle")}</p>

          <Link
            href="/auth?tab=register"
            className="flex h-14 w-full items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] font-bold text-lg cursor-pointer mb-4"
          >
            {t("cta.button")}
          </Link>

          <p className="text-gray-500 dark:text-gray-500 text-xs">{t("cta.note")}</p>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-black/10 dark:border-white/10 text-center text-gray-600 dark:text-gray-400 text-sm pb-20">
        <div className="max-w-md mx-auto">
          <p>{t("footer.tagline")}</p>
          <nav className="flex justify-center gap-4 my-3">
            <Link href="/privacy" className="hover:text-foreground transition">
              {tCommon("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-foreground transition">
              {tCommon("terms")}
            </Link>
          </nav>
          <p>{t("footer.copyright", { year: new Date().getFullYear(), version: appVersion })}</p>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">{t("footer.tmdb")}</p>
        </div>
      </footer>
    </div>
  );
}
