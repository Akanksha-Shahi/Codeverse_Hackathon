import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import ThreatMap from './components/ThreatMap';
import ReportThreat from './components/ReportThreat';
import Help from './components/Help';
import Chat from './components/Chat';
import Calendar from './components/Calendar';


const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/" element={<Layout />}>
        {/* Commander-only routes */}
        {user.role === 'COMMANDER' && (
          <>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="calendar" element={<Calendar />} />
          </>
        )}
        
        {/* Field Agent default route */}
        {user.role === 'FIELD_AGENT' && (
          <Route index element={<Navigate to="/threats" replace />} />
        )}
        
        {/* Shared routes */}
        <Route path="threats" element={<ThreatMap />} />
        <Route path="chat" element={<Chat />} />
        <Route path="help" element={<Help />} />
        
        {/* Field Agent specific routes */}
        {user.role === 'FIELD_AGENT' && (
          <Route path="report" element={<ReportThreat />} />
        )}
        
        {/* Unauthorized access */}
        <Route path="unauthorized" element={
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-defense-300">You don't have permission to access this resource.</p>
          </div>
        } />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;