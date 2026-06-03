"use client";

import Button from "@/shared/ui/Button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button
      variant="danger"
      size="large"
      className="w-full max-w-[448px]"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut /> Log out
    </Button>
  );
};

export default SignOutButton;
