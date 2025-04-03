
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type FloatingNotificationProps = {
  show: boolean;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
  onClose: () => void;
};

export function FloatingNotification({
  show,
  title,
  message,
  type = "info",
  duration = 5000,
  onClose,
}: FloatingNotificationProps) {
  const [isVisible, setIsVisible] = useState(show);
  
  useEffect(() => {
    setIsVisible(show);
    
    if (show && duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);
  
  if (!isVisible) return null;
  
  const bgColors = {
    info: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
  };
  
  return (
    <div className="fixed top-20 right-6 z-50 max-w-md animate-fade-in">
      <div className={cn(
        "rounded-lg shadow-lg p-4 text-white",
        bgColors[type]
      )}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">{title}</h3>
          <button 
            onClick={() => {
              setIsVisible(false);
              onClose();
            }}
            className="text-white/80 hover:text-white focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm mt-1">{message}</p>
      </div>
    </div>
  );
}
