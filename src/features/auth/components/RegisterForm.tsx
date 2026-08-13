"use client";
import { useState } from "react";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import { Eye, EyeClosed } from "lucide-react";
import { useRegister } from "../hooks/useRegister";
import { useForm } from "react-hook-form";
import { RegisterFormValues, registerSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: registration, isPending } = useRegister();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    registration(data, {
      onSuccess: () => {
        router.push("/profile/create");
      },
      onError: (error) => {
        setError("root", { message: error.message });
      },
    });
  };

  return (
    <>
      <h1 className="text-center text-2xl font-bold">Register Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mb-4">
          <Input
            id="email"
            label="Email"
            type="email"
            hSize="large"
            error={{ isError: !!errors.email, message: errors.email?.message }}
            {...register("email")}
          />
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            hSize="large"
            after={
              <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Eye /> : <EyeClosed />}
              </span>
            }
            error={{ isError: !!errors.password, message: errors.password?.message }}
            {...register("password")}
          />
          <Input
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            hSize="large"
            after={
              <span
                className="cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye /> : <EyeClosed />}
              </span>
            }
            error={{ isError: !!errors.confirmPassword, message: errors.confirmPassword?.message }}
            {...register("confirmPassword")}
          />
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/")}
            variant="secondary"
            size="large"
            type="button"
            className="w-full font-normal"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="large"
            className="w-full font-normal"
            type="submit"
            loading={isPending}
          >
            Next step
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
