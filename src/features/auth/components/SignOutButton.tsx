"use client";

import { cn } from "@/shared/libs/utils";
import Button from "@/shared/ui/Button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

const SignOutButton = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const t = useTranslations("auth");
  return (
    <Button
      variant="danger"
      size="large"
      className={cn("w-full max-w-md", className)}
      onClick={() => signOut({ callbackUrl: "/" })}
      {...props}
    >
      <LogOut /> {t("signOut")}
    </Button>
  );
};

export default SignOutButton;
