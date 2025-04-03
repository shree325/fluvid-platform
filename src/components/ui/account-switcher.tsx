
import * as React from "react";
import { PlusCircle, User, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Mock accounts for demonstration
const mockAccounts = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "admin" as const,
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    role: "creator" as const,
  },
  {
    id: "3",
    name: "Company Account",
    email: "company@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "creator" as const,
  }
];

export function AccountSwitcher() {
  const { user, logout } = useAuth();
  const [accounts, setAccounts] = React.useState(mockAccounts);

  const switchAccount = (accountId: string) => {
    // In a real application, this would handle the actual account switching logic
    const newActiveAccount = accounts.find(acc => acc.id === accountId);
    if (newActiveAccount) {
      // For now, just show a console log to demonstrate
      console.log(`Switching to account: ${newActiveAccount.name}`);
      
      // This is for demonstration purposes - in a real app you'd use proper auth flow
      // Simulate a reload of the page after account switch
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Switch accounts</DropdownMenuLabel>
          {accounts.map(account => (
            <DropdownMenuItem
              key={account.id}
              className={`cursor-pointer ${account.id === "1" ? "bg-accent" : ""}`}
              onClick={() => switchAccount(account.id)}
            >
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={account.avatar} />
                  <AvatarFallback>{account.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0">
                  <p className="text-sm font-medium leading-none">{account.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {account.role}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>Add Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Users className="mr-2 h-4 w-4" />
          <span>Manage Accounts</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={logout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
