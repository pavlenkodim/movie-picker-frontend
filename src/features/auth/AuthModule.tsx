"use client";

import { useState } from "react";
import { useLogin, useRegister } from "./hooks/auth";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

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
    <div className="w-full max-w-md">
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 rounded ${isLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Вход
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 rounded ${!isLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Регистрация
        </button>
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
