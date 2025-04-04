
import { useState } from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { Input } from './ui/input';
import { ThemeToggle } from './theme/theme-toggle';
import { AccountSwitcher } from './ui/account-switcher';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="w-full flex justify-start md:w-1/3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos..."
              className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Messages Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  2
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Messages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-72">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-4 p-4 hover:bg-accent cursor-pointer">
                    <Avatar className="h-9 w-9">
                      <img src={`https://i.pravatar.cc/150?img=${i}`} alt="User" />
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">User {i}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        This is a message preview that might be quite long and needs to be truncated...
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    {i <= 2 && (
                      <div className="ml-auto">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  2
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-72">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-4 p-4 hover:bg-accent cursor-pointer">
                    <Avatar className="h-9 w-9">
                      <img src={`https://i.pravatar.cc/150?img=${i + 5}`} alt="Notification" />
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Notification {i}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {i % 2 === 0 
                          ? "Someone commented on your video" 
                          : "You received a new subscriber"}
                      </p>
                      <p className="text-xs text-muted-foreground">{i} hours ago</p>
                    </div>
                    {i <= 2 && (
                      <div className="ml-auto">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <AccountSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
