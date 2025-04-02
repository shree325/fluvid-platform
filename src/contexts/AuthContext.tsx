
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'creator' | 'viewer';
  isPremium: boolean;
  deviceIds?: string[]; // Track device IDs
  accounts?: User[]; // For account switching
  currentAccount?: string; // Currently active account ID
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, deviceId?: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  switchAccount: (accountId: string) => void;
  accounts: User[];
  currentAccountId: string | null;
  registerDevice: (deviceId: string) => Promise<boolean>;
  unregisterDevice: (deviceId: string) => Promise<boolean>;
  maxDevices: number;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'admin' as const,
    isPremium: true,
    deviceIds: ['device1', 'device2'],
    accounts: [],
    maxDevices: 5
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'creator' as const,
    isPremium: false,
    deviceIds: ['device3'],
    accounts: [],
    maxDevices: 3
  },
  {
    id: '3',
    name: 'Bob Viewer',
    email: 'bob@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'viewer' as const,
    isPremium: false,
    deviceIds: [],
    accounts: [],
    maxDevices: 2
  },
];

// Generate a unique device ID for tracking
const generateDeviceId = () => {
  const existingId = localStorage.getItem('fluvid_device_id');
  if (existingId) return existingId;
  
  const newId = `device_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  localStorage.setItem('fluvid_device_id', newId);
  return newId;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<User[]>([]);
  const [currentAccountId, setCurrentAccountId] = useState<string | null>(null);
  const [maxDevices, setMaxDevices] = useState<number>(3); // Default limit
  const deviceId = generateDeviceId();

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('fluvid_user');
    const savedAccounts = localStorage.getItem('fluvid_accounts');
    const savedCurrentAccount = localStorage.getItem('fluvid_current_account');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setMaxDevices(parsedUser.maxDevices || 3);
    }
    
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    }
    
    if (savedCurrentAccount) {
      setCurrentAccountId(savedCurrentAccount);
    }
    
    setIsLoading(false);
  }, []);

  const registerDevice = async (deviceId: string): Promise<boolean> => {
    if (!user) return false;
    
    // Check if maximum devices reached
    const currentDevices = user.deviceIds || [];
    if (currentDevices.length >= maxDevices) {
      toast.error(`Maximum number of devices (${maxDevices}) reached. Please log out from another device.`);
      return false;
    }
    
    // Add device if not already registered
    if (!currentDevices.includes(deviceId)) {
      const updatedDevices = [...currentDevices, deviceId];
      const updatedUser = { ...user, deviceIds: updatedDevices };
      setUser(updatedUser);
      localStorage.setItem('fluvid_user', JSON.stringify(updatedUser));
      return true;
    }
    
    return true;
  };

  const unregisterDevice = async (deviceId: string): Promise<boolean> => {
    if (!user) return false;
    
    const currentDevices = user.deviceIds || [];
    const updatedDevices = currentDevices.filter(id => id !== deviceId);
    const updatedUser = { ...user, deviceIds: updatedDevices };
    
    setUser(updatedUser);
    localStorage.setItem('fluvid_user', JSON.stringify(updatedUser));
    return true;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        
        // Check if account already exists in the account list
        let updatedAccounts = [...accounts];
        const existingAccountIndex = accounts.findIndex(acc => acc.id === foundUser.id);
        
        if (existingAccountIndex === -1) {
          // Add as a new account
          updatedAccounts.push(userWithoutPassword as User);
        } else {
          // Update existing account
          updatedAccounts[existingAccountIndex] = userWithoutPassword as User;
        }
        
        // Register this device
        const currentDevices = foundUser.deviceIds || [];
        if (currentDevices.length >= (foundUser.maxDevices || 3) && !currentDevices.includes(deviceId)) {
          toast.error(`Maximum number of devices reached. Please log out from another device.`);
          setIsLoading(false);
          return false;
        }
        
        const updatedUser = {
          ...userWithoutPassword,
          deviceIds: [...currentDevices, deviceId].filter((id, index, self) => self.indexOf(id) === index)
        } as User;
        
        setUser(updatedUser);
        setAccounts(updatedAccounts);
        setCurrentAccountId(foundUser.id);
        setMaxDevices(foundUser.maxDevices || 3);
        
        localStorage.setItem('fluvid_user', JSON.stringify(updatedUser));
        localStorage.setItem('fluvid_accounts', JSON.stringify(updatedAccounts));
        localStorage.setItem('fluvid_current_account', foundUser.id);
        
        toast.success(`Welcome back, ${foundUser.name}!`);
        setIsLoading(false);
        return true;
      } else {
        toast.error('Invalid email or password');
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong during login');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const existingUser = mockUsers.find(u => u.email === email);
      
      if (existingUser) {
        toast.error('Email already in use');
        setIsLoading(false);
        return false;
      } else {
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
          role: 'creator' as const,
          isPremium: false,
          deviceIds: [deviceId],
          maxDevices: 3
        };
        
        setUser(newUser);
        
        // Add to accounts list
        const updatedAccounts = [...accounts, newUser];
        setAccounts(updatedAccounts);
        setCurrentAccountId(newUser.id);
        
        localStorage.setItem('fluvid_user', JSON.stringify(newUser));
        localStorage.setItem('fluvid_accounts', JSON.stringify(updatedAccounts));
        localStorage.setItem('fluvid_current_account', newUser.id);
        
        toast.success(`Welcome to Fluvid, ${name}!`);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Something went wrong during registration');
      setIsLoading(false);
      return false;
    }
  };

  const switchAccount = (accountId: string) => {
    const accountToSwitch = accounts.find(acc => acc.id === accountId);
    if (!accountToSwitch) {
      toast.error("Account not found");
      return;
    }
    
    setUser(accountToSwitch);
    setCurrentAccountId(accountId);
    localStorage.setItem('fluvid_user', JSON.stringify(accountToSwitch));
    localStorage.setItem('fluvid_current_account', accountId);
    toast.success(`Switched to ${accountToSwitch.name}'s account`);
  };

  const logout = () => {
    // Unregister current device
    if (user && user.deviceIds) {
      const updatedDevices = user.deviceIds.filter(id => id !== deviceId);
      const updatedUser = { ...user, deviceIds: updatedDevices };
      
      // Update user in accounts list
      const updatedAccounts = accounts.map(acc => 
        acc.id === user.id ? { ...acc, deviceIds: updatedDevices } : acc
      );
      
      localStorage.setItem('fluvid_accounts', JSON.stringify(updatedAccounts));
    }
    
    localStorage.removeItem('fluvid_user');
    localStorage.removeItem('fluvid_current_account');
    setUser(null);
    setCurrentAccountId(null);
    toast.success('You have been logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        switchAccount,
        accounts,
        currentAccountId,
        registerDevice,
        unregisterDevice,
        maxDevices
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
