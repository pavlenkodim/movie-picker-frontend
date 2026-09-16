"use client";

import Button from "@/shared/ui/Button";
import { cn } from "@/shared/libs/utils";
import { useGoogleLogin } from "../hooks/useGoogleLogin";
import GoogleIcon from "@/shared/ui/Icons/GoogleIcon";

const GoogleSignInButton = ({
  callbackUrl,
  className,
}: {
  callbackUrl?: string;
  className?: string;
}) => {
  const { mutate: loginWithGoogle, isPending } = useGoogleLogin();

  return (
    <Button
      type="button"
      variant="secondary"
      size="large"
      className={cn("w-full font-normal", className)}
      loading={isPending}
      icon={<GoogleIcon />}
      onClick={() => loginWithGoogle(callbackUrl)}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleSignInButton;
