"use client";

import { useRouter } from "next/navigation";
import Button from "../Button";
import { X } from "lucide-react";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const onDismiss = () => router.back();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/50 backdrop-blur-md" onClick={onDismiss} />
      <div
        className="relative z-10 max-w-lg w-full max-h-[85vh] h-full overflow-y-auto rounded-3xl bg-background/80 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="small"
          variant="primary"
          onClick={onDismiss}
          className="absolute top-3 right-3 px-1 z-50"
        >
          <X />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
