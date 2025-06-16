import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Notification } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (id: string) => void;
  unreadCount: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'commander',
    role: 'COMMANDER',
    name: 'Commander Anil',
    lastActive: new Date().toISOString()
  },
  {
    id: '2',
    username: 'agent',
    role: 'FIELD_AGENT',
    name: 'Agent Rudra',
    lastActive: new Date().toISOString()
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('defense_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Initialize with some demo notifications
    const demoNotifications: Notification[] = [
      {
        id: '1',
        title: 'New Threat Reported',
        message: 'Critical threat reported in Sector Alpha-7',
        type: 'THREAT_UPLOADED',
        timestamp: new Date().toISOString(),
        isRead: false,
        targetRole: 'COMMANDER'
      },
      {
        id: '2',
        title: 'Status Updated',
        message: 'Perimeter breach investigation completed',
        type: 'STATUS_UPDATED',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        isRead: false,
        targetRole: 'FIELD_AGENT'
      }
    ];
    setNotifications(demoNotifications);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('defense_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('defense_user');
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => 
    !n.isRead && (n.targetRole === user?.role || n.targetRole === 'ALL')
  ).length;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      notifications,
      addNotification,
      markNotificationAsRead,
      unreadCount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};