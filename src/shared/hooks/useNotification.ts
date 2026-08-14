import { useNotificationStore } from "../stores/notificationStore";

export const useNotification = () => {
  const addNotification = useNotificationStore((s) => s.addNotification);
  return { notify: addNotification };
};
