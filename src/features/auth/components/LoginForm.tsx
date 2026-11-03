"use client";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import { Eye, EyeClosed } from "lucide-react";
import { useNotification } from "@/shared/hooks/useNotification";
import { useTranslations } from "next-intl";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const { notify } = useNotification();
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    login(data, {
      onSuccess: () => {
        notify("success", t("notifications.loginSuccess"));
        router.push("/movies");
      },
      onError: (error) => {
        notify("error", error.message);
        setError("root", { message: error.message });
      },
    });
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold">{t("login.title")}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mb-4">
          <Input
            id="email"
            label={t("fields.email")}
            type="email"
            hSize="large"
            error={{ isError: !!errors.email, message: errors.email?.message }}
            {...register("email")}
          />
          <Input
            id="password"
            label={t("fields.password")}
            type={showPassword ? "text" : "password"}
            hSize="large"
            error={{ isError: !!errors.password, message: errors.password?.message }}
            {...register("password")}
            after={
              <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye /> : <EyeClosed />}
              </span>
            }
          />
        </div>
        <div className="flex gap-4">
          <Button
            variant="primary"
            size="large"
            type="submit"
            className="w-full font-normal"
            loading={isPending}
          >
            {t("login.submit")}
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="secondary"
            size="large"
            type="button"
            className="w-full font-normal"
            disabled={isPending}
          >
            {tCommon("cancel")}
          </Button>
        </div>
        <div className="mt-4 text-center">
          <Link href="auth/forgot-password" className="text-sm hover:underline">
            {t("login.forgotPassword")}
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
