import React from 'react';
import { AlertTriangle, Shield, Clock, CheckCircle, Activity } from 'lucide-react';
import { mockIncidents } from '../data/mockData';
import { Incident } from '../types';

const Dashboard: React.FC = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'text-red-400 bg-red-900/20 border-red-400';
      case 'HIGH': return 'text-amber-400 bg-amber-900/20 border-amber-400';
      case 'MEDIUM': return 'text-blue-400 bg-blue-900/20 border-blue-400';
      case 'LOW': return 'text-green-400 bg-green-900/20 border-green-400';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-red-400';
      case 'INVESTIGATING': return 'text-amber-400';
      case 'RESOLVED': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const activeIncidents = mockIncidents.filter(i => i.status === 'ACTIVE').length;
  const criticalIncidents = mockIncidents.filter(i => i.priority === 'CRITICAL').length;
  const resolvedToday = mockIncidents.filter(i => i.status === 'RESOLVED').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Operations Dashboard</h1>
          <p className="text-defense-300 mt-1">Real-time security monitoring and incident management</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-defense-300">Last Updated</p>
          <p className="text-white font-mono">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-defense-300 text-sm">Active Incidents</p>
              <p className="text-2xl font-bold text-white">{activeIncidents}</p>
            </div>
            <Activity className="h-8 w-8 text-red-400" />
          </div>
        </div>

        <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-defense-300 text-sm">Critical Alerts</p>
              <p className="text-2xl font-bold text-white">{criticalIncidents}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-amber-400" />
          </div>
        </div>

        <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-defense-300 text-sm">Resolved Today</p>
              <p className="text-2xl font-bold text-white">{resolvedToday}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-defense-300 text-sm">System Status</p>
              <p className="text-2xl font-bold text-green-400">SECURE</p>
            </div>
            <Shield className="h-8 w-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-defense-800 border border-defense-700 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-defense-700">
          <h2 className="text-xl font-bold text-white">Recent Incidents</h2>
        </div>
        <div className="divide-y divide-defense-700">
          {mockIncidents.map((incident: Incident) => (
            <div key={incident.id} className="p-6 hover:bg-defense-750 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded border ${getPriorityColor(incident.priority)}`}>
                      {incident.priority}
                    </span>
                    <span className={`text-sm font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{incident.title}</h3>
                  <p className="text-defense-300 mb-3">{incident.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-defense-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(incident.timestamp).toLocaleString()}</span>
                    </div>
                    {incident.location && (
                      <div className="flex items-center space-x-1">
                        <span>📍 {incident.location}</span>
                      </div>
                    )}
                    {incident.assignedTo && (
                      <div className="flex items-center space-x-1">
                        <span>👤 {incident.assignedTo}</span>
                      </div>
                    )}
                  </div>
                  {incident.solution && (
                    <div className="mt-3 p-3 bg-green-900/20 border border-green-700 rounded">
                      <p className="text-green-300 text-sm">
                        <strong>Solution:</strong> {incident.solution}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;