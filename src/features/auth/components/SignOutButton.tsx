"use client";

import Button from "@/shared/ui/Button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/" })}>
      <LogOut />
    </Button>
  );
};

export default SignOutButton;
