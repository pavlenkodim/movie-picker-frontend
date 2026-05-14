"use client";

import { useState } from "react";
import { useLogin, useRegister } from "./hooks/auth";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Button from "@/shared/ui/Button/Button";

const AuthModule = () => {
  const [isLogin, setIsLogin] = useState(true);
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLoginSubmit = (data: { email: string; password: string }) => {
    loginMutation.mutate(data);
  };

  const handleRegisterSubmit = (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-end gap-4 mb-5">
        <Button
          variant={isLogin ? "primary" : "secondary"}
          size="small"
          className="md:min-w-[48px] md:max-w-[98px]"
          onClick={() => setIsLogin(true)}
        >
          Login
        </Button>
        <Button
          variant={isLogin ? "secondary" : "primary"}
          size="small"
          className="md:min-w-[48px] md:max-w-[98px]"
          onClick={() => setIsLogin(false)}
        >
          Register
        </Button>
      </div>

      {isLogin ? (
        <LoginForm
        // onSubmit={handleLoginSubmit}
        // isLoading={loginMutation.isPending}
        // error={loginMutation.error?.message}
        />
      ) : (
        <RegisterForm
        // onSubmit={handleRegisterSubmit}
        // isLoading={registerMutation.isPending}
        // error={registerMutation.error?.message}
        />
      )}
    </div>
  );
};

export default AuthModule;
