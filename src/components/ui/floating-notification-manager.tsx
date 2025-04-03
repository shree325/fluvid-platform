
import React, { useState } from "react";
import { FloatingNotification } from "./floating-notification";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  duration?: number;
};

export const FloatingNotificationContext = React.createContext<{
  showNotification: (notification: Omit<Notification, "id">) => void;
  hideNotification: (id: string) => void;
}>({
  showNotification: () => {},
  hideNotification: () => {},
});

export function useFloatingNotification() {
  return React.useContext(FloatingNotificationContext);
}

export function FloatingNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const showNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
    return id;
  };
  
  const hideNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  return (
    <FloatingNotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <div className="floating-notifications-container">
        {notifications.map(notification => (
          <FloatingNotification
            key={notification.id}
            show={true}
            title={notification.title}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => hideNotification(notification.id)}
          />
        ))}
      </div>
    </FloatingNotificationContext.Provider>
  );
}
