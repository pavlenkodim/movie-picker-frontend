"use client";

import { cn } from "@/shared/libs/utils";
import { CircleCheck, CircleX, Info, TriangleAlert, X } from "lucide-react";
import Button from "../Button";
import { useCallback, useEffect } from "react";

export type NotificationType = "info" | "success" | "warning" | "error";

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  type: NotificationType;
  icon?: React.ReactNode;
  autoHide?: boolean;
  hideDelay?: number;
  onClose: () => void;
}

const typeClasses = {
  info: "text-blue-600",
  success: "text-green-600",
  warning: "text-yellow-600",
  error: "text-red-600",
};

const typeIcons = {
  info: <Info />,
  success: <CircleCheck />,
  warning: <TriangleAlert />,
  error: <CircleX />,
};

const typeTitles = {
  info: "Info",
  success: "Success",
  warning: "Warning",
  error: "Error",
};

const Notification = ({
  children,
  autoHide = true,
  hideDelay = 15000,
  icon,
  type,
  className,
  onClose,
  ...props
}: NotificationProps) => {
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!autoHide) return;
    const timeoutId = setTimeout(handleClose, hideDelay);
    return () => clearTimeout(timeoutId);
  }, [autoHide, hideDelay, handleClose]);

  return (
    <div
      className={cn(
        "bg-linear-to-t from-white/10 to-white/5 backdrop-blur-md border rounded-2xl border-black/10 dark:border-white/10",
        "p-3 min-w-2xs grid grid-cols-[24px_1fr_24px] gap-2 items-center relative",
        className,
      )}
      {...props}
    >
      <div className={cn(typeClasses[type])}>{icon ? icon : typeIcons[type]}</div>
      <div>
        <div className={cn("font-bold", typeClasses[type])}>{typeTitles[type]}</div>
        {children}
      </div>
      <div className="absolute top-3 right-3">
        <Button onClick={handleClose} className="bg-none backdrop-blur-none">
          <X />
        </Button>
      </div>
    </div>
  );
};

export default Notification;
