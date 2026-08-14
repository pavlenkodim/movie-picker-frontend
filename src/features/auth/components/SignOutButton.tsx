"use client";

import { cn } from "@/shared/libs/utils";
import Button from "@/shared/ui/Button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOutButton = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      variant="danger"
      size="large"
      className={cn("w-full max-w-md", className)}
      onClick={() => signOut({ callbackUrl: "/" })}
      {...props}
    >
      <LogOut /> Log out
    </Button>
  );
};

export default SignOutButton;
