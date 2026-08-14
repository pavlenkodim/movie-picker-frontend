"use client";

import { useNotificationStore } from "@/shared/stores/notificationStore";
import Notification from "../Notification/Notification";
import { AnimatePresence, motion } from "framer-motion";

const NotificationContainer = () => {
  const notifications = useNotificationStore((s) => s.notifications);
  const removeNotification = useNotificationStore((s) => s.removeNotification);

  return (
    <div className="fixed top-4 right-4 left-4 z-50 flex flex-col-reverse gap-2">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <Notification
              type={n.type}
              hideDelay={n.duration}
              onClose={() => removeNotification(n.id)}
            >
              {n.message}
            </Notification>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;
