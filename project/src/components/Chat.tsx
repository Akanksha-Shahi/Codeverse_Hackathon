import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Shield, Bell, BellOff } from 'lucide-react';
import { mockChatMessages } from '../data/mockData';
import { ChatMessage } from '../types';
import { useAuth } from '../contexts/AuthContext';

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('GENERAL');
  const [notifications, setNotifications] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: user?.name || 'Unknown User',
      message: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true,
      senderRole: user?.role || 'FIELD_AGENT',
      type: 'TEXT'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'COMMANDER': return <Shield className="h-4 w-4" />;
      case 'FIELD_AGENT': return <User className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'COMMANDER': return 'text-amber-400';
      case 'FIELD_AGENT': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const channels = [
    { id: 'GENERAL', name: 'General', count: 8, active: true },
    { id: 'OPERATIONS', name: 'Operations', count: 5, active: true },
    { id: 'INTELLIGENCE', name: 'Intelligence', count: 3, active: false },
    { id: 'TECHNICAL', name: 'Technical', count: 2, active: true }
  ];

  const onlineUsers = [
    { name: 'Commander Anil', role: 'COMMANDER', status: 'active' },
    { name: 'Agent Rudra', role: 'FIELD_AGENT', status: 'active' },
    { name: 'Agent Rani', role: 'FIELD_AGENT', status: 'away' },
    { name: 'Agent Kirti', role: 'FIELD_AGENT', status: 'active' }
  ];

  return (
    <div className="p-4 lg:p-6 h-screen max-h-screen overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Team Communications</h1>
          <p className="text-defense-300 mt-1">Secure team chat and coordination</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setNotifications(!notifications)}
            className={`p-2 rounded-lg transition-colors ${
              notifications ? 'bg-green-600 text-white' : 'bg-defense-700 text-defense-300'
            }`}
          >
            {notifications ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-defense-300 hidden lg:inline">Secure Connection</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 h-[calc(100vh-200px)] lg:h-[calc(100vh-180px)]">
        {/* Channels Sidebar - Hidden on mobile */}
        <div className="hidden lg:block bg-defense-800 border border-defense-700 rounded-lg p-4 overflow-y-auto">
          <h3 className="text-lg font-bold text-white mb-4">Channels</h3>
          <div className="space-y-2 mb-6">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedChannel === channel.id
                    ? 'bg-amber-600 text-white'
                    : 'text-defense-300 hover:bg-defense-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span># {channel.name}</span>
                    {!channel.active && (
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-xs bg-defense-600 px-2 py-1 rounded">
                    {channel.count}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <h4 className="text-md font-bold text-white mb-3">Online Now</h4>
          <div className="space-y-2">
            {onlineUsers.map((user, index) => (
              <div key={index} className="flex items-center space-x-2 px-2 py-1">
                <div className={`w-2 h-2 rounded-full ${
                  user.status === 'active' ? 'bg-green-400' : 'bg-amber-400'
                }`}></div>
                <div className="flex items-center space-x-1">
                  <span className={getRoleColor(user.role)}>
                    {getRoleIcon(user.role)}
                  </span>
                  <span className="text-defense-300 text-sm">{user.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-defense-800 border border-defense-700 rounded-lg flex flex-col h-full">
          {/* Channel Header */}
          <div className="px-4 lg:px-6 py-4 border-b border-defense-700 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white"># {selectedChannel.toLowerCase()}</h3>
                <p className="text-sm text-defense-300">
                  {channels.find(c => c.id === selectedChannel)?.count || 0} members
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-defense-300">
                <span className="hidden lg:inline">Encrypted</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.senderRole === 'COMMANDER' ? 'bg-amber-600' : 'bg-green-600'
                }`}>
                  {getRoleIcon(message.senderRole)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline space-x-2 mb-1">
                    <span className="font-semibold text-white">{message.sender}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      message.senderRole === 'COMMANDER' ? 'bg-amber-900/30 text-amber-300' : 'bg-green-900/30 text-green-300'
                    }`}>
                      {message.senderRole.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-defense-400">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-defense-200">{message.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="flex-shrink-0 p-4 lg:p-6 border-t border-defense-700">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message #${selectedChannel.toLowerCase()}...`}
                className="flex-1 px-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white placeholder-defense-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-4 lg:px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-defense-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-defense-800"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            
            <p className="text-xs text-defense-400 mt-2">
              Press Enter to send • All communications are encrypted and logged
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;