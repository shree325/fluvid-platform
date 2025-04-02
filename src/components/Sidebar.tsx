
import { Link, useLocation } from 'react-router-dom';
import { Home, Play, BarChart3, Settings, DollarSign, LogOut, Plus, UserCircle, Folders } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/editor', label: 'Editor', icon: Play },
    { path: '/series', label: 'Series', icon: Folders },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/profile', label: 'Profile', icon: UserCircle },
    { path: '/monetization', label: 'Monetization', icon: DollarSign },
  ];

  return (
    <aside className="w-[280px] border-r bg-background flex flex-col h-screen">
      <div className="p-6">
        <div className="flex items-center gap-x-3">
          <div className="bg-primary rounded-md p-1">
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
          <h1 className="text-xl font-semibold">Fluvid</h1>
        </div>
      </div>

      <div className="flex-1 px-3 py-2">
        <div className="mb-6">
          <Button variant="outline" className="w-full justify-start gap-2" asChild>
            <Link to="/editor">
              <Plus className="h-4 w-4" />
              New Video
            </Link>
          </Button>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Tooltip key={item.path} delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
                    isActive(item.path) && "bg-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={user?.avatar} 
            alt={user?.name} 
            className="h-8 w-8 rounded-full object-cover" 
          />
          <div>
            <p className="text-sm font-medium line-clamp-1">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.role}</p>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start gap-2" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
