import React, { useState } from 'react';
import { Shield, User, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-defense-900 via-defense-800 to-defense-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 rounded-full mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Defense Operations</h1>
          <p className="text-defense-300">Command Center Access</p>
        </div>

        {/* Login Form */}
        <div className="bg-defense-800 border border-defense-700 rounded-lg p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-900/20 border border-red-400 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defense-400" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-defense-700 border border-defense-600 rounded-lg text-white placeholder-defense-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defense-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-defense-700 border border-defense-600 rounded-lg text-white placeholder-defense-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 disabled:bg-defense-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-defense-800"
            >
              {loading ? 'Authenticating...' : 'Access Command Center'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-defense-700 rounded-lg">
            <h3 className="text-sm font-medium text-white mb-2">Demo Credentials:</h3>
            <div className="space-y-1 text-xs text-defense-300">
              <div>Commander: <span className="text-amber-400">commander / password</span></div>
              <div>Field Agent: <span className="text-green-400">agent / password</span></div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-defense-400">
            Authorized personnel only. All access is monitored and logged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;