
import * as React from "react";
import { MessageSquare, Check, Trash2, Send } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
};

const mockConversations = [
  {
    id: "1",
    person: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "https://via.placeholder.com/40",
    },
    lastMessage: "Can you review my latest video edit?",
    timestamp: "10:30 AM",
    unreadCount: 2,
  },
  {
    id: "2",
    person: {
      id: "user2",
      name: "Michael Chen",
      avatar: "https://via.placeholder.com/40",
    },
    lastMessage: "Thanks for the feedback!",
    timestamp: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "3",
    person: {
      id: "user3",
      name: "Lisa Rodriguez",
      avatar: "https://via.placeholder.com/40",
    },
    lastMessage: "Let's schedule a meeting to discuss the project",
    timestamp: "2 days ago",
    unreadCount: 0,
  },
];

const mockMessages = [
  {
    id: "m1",
    sender: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "https://via.placeholder.com/40",
    },
    content: "Hi there! I was wondering if you could take a look at my latest video edit?",
    timestamp: "10:28 AM",
    isRead: false,
  },
  {
    id: "m2",
    sender: {
      id: "me",
      name: "Me",
      avatar: "https://via.placeholder.com/40",
    },
    content: "Sure, I'll check it out. Can you send me the link?",
    timestamp: "10:29 AM",
    isRead: true,
  },
  {
    id: "m3",
    sender: {
      id: "user1",
      name: "Sarah Johnson",
      avatar: "https://via.placeholder.com/40",
    },
    content: "Here you go: https://example.com/video123",
    timestamp: "10:30 AM",
    isRead: false,
  },
];

export function MessagesDialog() {
  const [open, setOpen] = React.useState(false);
  const [conversations, setConversations] = React.useState(mockConversations);
  const [messages, setMessages] = React.useState(mockMessages);
  const [activeConversation, setActiveConversation] = React.useState<string | null>(null);
  const [newMessage, setNewMessage] = React.useState("");
  
  const unreadCount = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);
  
  const markConversationAsRead = (id: string) => {
    setConversations(conversations.map(conv => 
      conv.id === id ? { ...conv, unreadCount: 0 } : conv
    ));
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;
    
    // Add new message
    const newMsg = {
      id: `new-${Date.now()}`,
      sender: {
        id: "me",
        name: "Me",
        avatar: "https://via.placeholder.com/40",
      },
      content: newMessage,
      timestamp: "Just now",
      isRead: true,
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };
  
  const handleConversationSelect = (id: string) => {
    setActiveConversation(id);
    markConversationAsRead(id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Messages</DialogTitle>
          <DialogDescription>
            Chat with team members and collaborators.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex h-[400px]">
          {/* Conversations list */}
          <div className="w-1/3 border-r pr-2">
            <ScrollArea className="h-full">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors",
                    activeConversation === conv.id ? "bg-accent" : "hover:bg-muted",
                    conv.unreadCount > 0 ? "font-medium" : ""
                  )}
                  onClick={() => handleConversationSelect(conv.id)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={conv.person.avatar} />
                      <AvatarFallback>{conv.person.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{conv.person.name}</p>
                      <p className="max-w-[100px] truncate text-xs text-muted-foreground">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                    {conv.unreadCount > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          
          {/* Message thread */}
          <div className="flex w-2/3 flex-col pl-2">
            <ScrollArea className="flex-1">
              <div className="space-y-4 p-2">
                {activeConversation && messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2",
                      message.sender.id === "me" ? "flex-row-reverse" : ""
                    )}
                  >
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={message.sender.avatar} />
                      <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "max-w-[70%] rounded-lg p-3",
                        message.sender.id === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
                
                {!activeConversation && (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Select a conversation to view messages
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {activeConversation && (
              <div className="mt-auto flex gap-2 p-2">
                <Input 
                  placeholder="Type your message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
