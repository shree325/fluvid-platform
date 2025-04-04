
import * as React from "react";
import { Bell, Check, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: "system" | "message" | "alert";
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Comment",
    message: "Sarah commented on your video 'How to Create Interactive Tutorials'",
    timestamp: "2 hours ago",
    isRead: false,
    type: "system",
  },
  {
    id: "2",
    title: "Video Processing Complete",
    message: "Your uploaded video 'Marketing Strategy 2023' is now ready to view",
    timestamp: "5 hours ago",
    isRead: false,
    type: "system",
  },
  {
    id: "3",
    title: "New Subscriber",
    message: "John Smith subscribed to your channel",
    timestamp: "1 day ago",
    isRead: true,
    type: "alert",
  },
  {
    id: "4",
    title: "Message from Support",
    message: "We've reviewed your request and updated your account permissions",
    timestamp: "2 days ago",
    isRead: true,
    type: "message",
  },
];

export function NotificationsDialog() {
  const [open, setOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] flex flex-col">
        <DrawerHeader className="border-b">
          <DrawerTitle className="flex items-center justify-between">
            Notifications
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="mr-1 h-4 w-4" />
                Mark all read
              </Button>
              <Button variant="ghost" size="sm" onClick={deleteAllNotifications}>
                <Trash2 className="mr-1 h-4 w-4" />
                Clear all
              </Button>
            </div>
          </DrawerTitle>
          <DrawerDescription>
            Stay updated with your latest activity and alerts.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ScrollArea className="h-[60vh]">
                {notifications.length > 0 ? (
                  <div className="space-y-2 py-2">
                    {notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={markAsRead}
                        onDelete={deleteNotification}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center text-muted-foreground">
                    No notifications
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="unread">
              <ScrollArea className="h-[60vh]">
                {notifications.filter(n => !n.isRead).length > 0 ? (
                  <div className="space-y-2 py-2">
                    {notifications
                      .filter(n => !n.isRead)
                      .map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          onMarkAsRead={markAsRead}
                          onDelete={deleteNotification}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center text-muted-foreground">
                    No unread notifications
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="mentions">
              <div className="flex h-32 items-center justify-center text-muted-foreground">
                No mentions yet
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <DrawerFooter className="border-t pt-4">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between rounded-md p-3 transition-colors",
        notification.isRead ? "bg-background" : "bg-muted"
      )}
    >
      <div className="space-y-1">
        <p className="text-sm font-medium">{notification.title}</p>
        <p className="text-xs text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
      </div>
      <div className="flex space-x-1">
        {!notification.isRead && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onMarkAsRead(notification.id)}
          >
            <Check className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => onDelete(notification.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
