import { Notification } from "@/types";
import { toast } from "sonner";

// Mock notifications
let notifications: Notification[] = [];

export const createNotification = (
  title: string,
  message: string,
  type: 'info' | 'warning' | 'success' | 'error',
  userId: string
): Notification => {
  const notification: Notification = {
    id: `notif-${Date.now()}`,
    title,
    message,
    type,
    read: false,
    userId,
    createdAt: new Date(),
  };

  notifications.push(notification);
  
  // Show toast notification
  toast[type](title, {
    description: message,
  });
  
  return notification;
};

export const markAsRead = (notificationId: string): boolean => {
  const notification = notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    return true;
  }
  return false;
};

export const getUnreadNotificationsCount = (userId: string): number => {
  return notifications.filter(n => n.userId === userId && !n.read).length;
};

export const getUserNotifications = (userId: string): Notification[] => {
  return notifications.filter(n => n.userId === userId).sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );
};
