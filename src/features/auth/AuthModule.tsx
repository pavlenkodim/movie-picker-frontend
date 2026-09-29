"use client";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import GoogleSignInButton from "./components/GoogleSignInButton";
import Button from "@/shared/ui/Button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useNotification } from "@/shared/hooks/useNotification";

const AuthModule = () => {
  const { push, replace } = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");
  const authError = searchParams.get("error");
  const { notify } = useNotification();
  const errorShown = useRef(false);

  // NextAuth redirects OAuth failures here with ?error=...
  useEffect(() => {
    if (!authError || errorShown.current) return;
    errorShown.current = true;
    notify("error", "Sign in with Google failed. Please try again.");
    replace("?tab=login");
  }, [authError, notify, replace]);

  return (
    <div className="w-full h-full">
      <div className="flex justify-end gap-4 mb-5">
        <Button
          variant={currentTab === "login" ? "primary" : "secondary"}
          size="small"
          className="md:min-w-12 md:max-w-24.5"
          onClick={() => push("?tab=login")}
        >
          Sign In
        </Button>
        <Button
          variant={currentTab === "register" ? "primary" : "secondary"}
          size="small"
          className="md:min-w-12 md:max-w-24.5"
          onClick={() => push("?tab=register")}
        >
          Sign Up
        </Button>
      </div>
      {currentTab === "register" ? (
        <RegisterForm
        // onSubmit={handleRegisterSubmit}
        // isLoading={registerMutation.isPending}
        // error={registerMutation.error?.message}
        />
      ) : (
        <LoginForm
        // onSubmit={handleLoginSubmit}
        // isLoading={loginMutation.isPending}
        // error={loginMutation.error?.message}
        />
      )}
      <div className="flex items-center gap-4 my-4">
        <div className="h-px flex-1 bg-foreground/20" />
        <span className="text-sm text-foreground/60">or</span>
        <div className="h-px flex-1 bg-foreground/20" />
      </div>
      <GoogleSignInButton callbackUrl="/movies" />
    </div>
  );
};

export default AuthModule;
