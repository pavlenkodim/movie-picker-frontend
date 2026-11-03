"use client";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import GoogleSignInButton from "./components/GoogleSignInButton";
import Button from "@/shared/ui/Button/Button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useNotification } from "@/shared/hooks/useNotification";
import LocaleSwitcher from "../locale/components/LocaleSwitcher";
import { useTranslations } from "next-intl";

const AuthModule = () => {
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const authError = searchParams.get("error");
  const { notify } = useNotification();
  const errorShown = useRef(false);
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");

  // NextAuth redirects OAuth failures here with ?error=...
  useEffect(() => {
    if (!authError || errorShown.current) return;
    errorShown.current = true;
    notify("error", t("notifications.googleFailed"));
    replace("?tab=login");
  }, [authError, notify, replace, t]);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between gap-4 mb-5">
        <div className="flex items-center">
          <LocaleSwitcher />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={currentTab === "login" ? "primary" : "secondary"}
            size="small"
            className="md:min-w-12 md:max-w-24.5"
            onClick={() => push("?tab=login")}
          >
            {t("tabs.signIn")}
          </Button>
          <Button
            variant={currentTab === "register" ? "primary" : "secondary"}
            size="small"
            className="md:min-w-12 md:max-w-24.5"
            onClick={() => push("?tab=register")}
          >
            {t("tabs.signUp")}
          </Button>
        </div>
      </div>
      {currentTab === "register" ? <RegisterForm /> : <LoginForm />}
      <div className="flex items-center gap-4 my-4">
        <div className="h-px flex-1 bg-foreground/20" />
        <span className="text-sm text-foreground/60">{tCommon("or")}</span>
        <div className="h-px flex-1 bg-foreground/20" />
      </div>
      <GoogleSignInButton callbackUrl="/movies" />
      <p className="mt-4 text-center text-xs text-foreground/60">
        {t.rich("legal", {
          terms: (chunks) => (
            <Link href="/terms" target="_blank" className="underline underline-offset-2">
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link href="/privacy" target="_blank" className="underline underline-offset-2">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  );
};

export default AuthModule;
