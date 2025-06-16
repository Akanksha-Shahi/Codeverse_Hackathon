import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Shield, 
  MapPin, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Calendar,
  Bell,
  User,
  LogOut,
  BarChart3,
  
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const { user, logout, notifications, markNotificationAsRead, unreadCount } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const getNavItems = () => {
    const baseItems = [
      { to: '/chat', icon: MessageSquare, label: 'Chat' },
      { to: '/help', icon: HelpCircle, label: 'Help' },
    ];

    if (user?.role === 'COMMANDER') {
      return [
        { to: '/', icon: Shield, label: 'Dashboard' },
        { to: '/analytics', icon: BarChart3, label: 'Analytics' },
        { to: '/threats', icon: MapPin, label: 'Threat Map' },
        { to: '/calendar', icon: Calendar, label: 'Calendar' },
        ...baseItems
      ];
    } else {
      return [
        { to: '/threats', icon: MapPin, label: 'Threat Map' },
        { to: '/report', icon: FileText, label: 'Report Threat' },
        ...baseItems
      ];
    }
  };

  const navItems = getNavItems();

  const userNotifications = notifications.filter(n => 
    n.targetRole === user?.role || n.targetRole === 'ALL'
  );

  return (
    <div className="min-h-screen bg-defense-900 text-white">
      {/* Header */}
      <header className="bg-defense-800 border-b border-defense-700 px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-amber-400" />
            <div>
              <h1 className="text-lg lg:text-xl font-bold">Defense Operations</h1>
              <p className="text-xs lg:text-sm text-defense-300">Command Center</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-defense-700 rounded-lg transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-defense-800 border border-defense-700 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-defense-700">
                    <h3 className="font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {userNotifications.length > 0 ? (
                      userNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-defense-700 hover:bg-defense-700 cursor-pointer ${
                            !notification.isRead ? 'bg-amber-900/10' : ''
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                              <p className="text-defense-300 text-xs mt-1">{notification.message}</p>
                              <p className="text-defense-400 text-xs mt-2">
                                {new Date(notification.timestamp).toLocaleString()}
                              </p>
                            </div>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-amber-400 rounded-full mt-1"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-defense-400">
                        No notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <div className="hidden lg:block text-right">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-defense-300">{user?.role.replace('_', ' ')}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-defense-700 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Hidden on mobile, shown on larger screens */}
        <nav className="hidden lg:block w-64 bg-defense-800 border-r border-defense-700 min-h-screen">
          <div className="p-6">
            <ul className="space-y-2">
              {navItems.map(({ to, icon: Icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-amber-600 text-white shadow-lg'
                          : 'text-defense-300 hover:text-white hover:bg-defense-700'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-defense-800 border-t border-defense-700 z-40">
          <div className="flex justify-around py-2">
            {navItems.slice(0, 4).map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-amber-400'
                      : 'text-defense-300'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden pb-16 lg:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default Layout;