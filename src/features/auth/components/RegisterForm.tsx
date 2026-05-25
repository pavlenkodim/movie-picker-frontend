import { useState } from "react";
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      <h1 className="text-center text-2xl font-bold">Register Form</h1>
      <div className="flex flex-col gap-2 mb-4">
        <Input label="Email" type="email" hSize="large" />
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          hSize="large"
          after={
            <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eye /> : <EyeClosed />}
            </span>
          }
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
        />
      </div>
      <div className="flex gap-4">
        <Link
          href="/"
          className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          Cancel
        </Link>
        <Button variant="primary" className="w-full">
          Next step
        </Button>
      </div>
    </>
  );
};

export default RegisterForm;
