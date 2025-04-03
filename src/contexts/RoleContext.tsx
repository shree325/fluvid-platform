
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type UserRole = 'admin' | 'creator' | 'viewer';

type RoleContextType = {
  hasPermission: (permission: string) => boolean;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  permissionsMap: Record<string, UserRole[]>;
};

const defaultPermissions: Record<string, UserRole[]> = {
  'create:video': ['admin', 'creator'],
  'edit:video': ['admin', 'creator'],
  'delete:video': ['admin', 'creator'],
  'create:series': ['admin', 'creator'],
  'edit:series': ['admin', 'creator'],
  'delete:series': ['admin', 'creator'],
  'view:analytics': ['admin', 'creator'],
  'manage:users': ['admin'],
  'change:global-theme': ['admin'],
  'view:monetization': ['admin', 'creator'],
  'edit:monetization': ['admin'],
  'edit:channel': ['admin', 'creator'],
  'manage:templates': ['admin'],
  'set:video-privacy': ['admin', 'creator'],
  'set:age-restriction': ['admin'],
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>(user?.role || 'viewer');
  const [permissionsMap, setPermissionsMap] = useState<Record<string, UserRole[]>>(defaultPermissions);

  useEffect(() => {
    if (user?.role) {
      setUserRole(user.role);
    }
  }, [user?.role]);

  const hasPermission = (permission: string): boolean => {
    if (!permission || !userRole) return false;
    
    const allowedRoles = permissionsMap[permission] || [];
    return allowedRoles.includes(userRole);
  };

  return (
    <RoleContext.Provider value={{ hasPermission, userRole, setUserRole, permissionsMap }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
