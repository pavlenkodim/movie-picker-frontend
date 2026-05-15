"use client";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Button from "@/shared/ui/Button/Button";
import { useRouter, useSearchParams } from "next/navigation";

const AuthModule = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  return (
    <div className="w-full h-full">
      <div className="flex justify-end gap-4 mb-5">
        <Button
          variant={currentTab === "login" ? "primary" : "secondary"}
          size="small"
          className="md:min-w-[48px] md:max-w-[98px]"
          onClick={() => push("?tab=login")}
        >
          Sign In
        </Button>
        <Button
          variant={currentTab === "register" ? "primary" : "secondary"}
          size="small"
          className="md:min-w-[48px] md:max-w-[98px]"
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
    </div>
  );
};

export default AuthModule;
