
import { useState } from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { Input } from './ui/input';
import { ThemeToggle } from './theme/theme-toggle';
import { NotificationsDialog } from './ui/notifications-dialog';
import { MessagesDialog } from './ui/messages-dialog';
import { AccountSwitcher } from './ui/account-switcher';

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
          
          <div className="relative">
            <MessagesDialog />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              2
            </span>
          </div>
          
          <div className="relative">
            <NotificationsDialog />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              2
            </span>
          </div>
          
          <AccountSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
