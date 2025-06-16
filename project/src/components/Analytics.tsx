import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, AlertTriangle, Shield, Activity, MapPin } from 'lucide-react';
import { AnalyticsData } from '../types';


const Analytics: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('7d');
  const [locationFilter, setLocationFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    totalIncidents: 247,
    resolvedPercentage: 78,
    activeThreats: 12,
    criticalAlerts: 3,
    incidentsByType: [
      { name: 'Security', value: 45, color: '#ef4444' },
      { name: 'Cyber', value: 32, color: '#f59e0b' },
      { name: 'Physical', value: 28, color: '#3b82f6' },
      { name: 'Surveillance', value: 15, color: '#22c55e' },
      { name: 'Communication', value: 8, color: '#8b5cf6' }
    ],
    incidentsByPriority: [
      { name: 'Critical', value: 12, color: '#ef4444' },
      { name: 'High', value: 34, color: '#f59e0b' },
      { name: 'Medium', value: 89, color: '#3b82f6' },
      { name: 'Low', value: 112, color: '#22c55e' }
    ],
    threatLocations: [
      { x: 150, y: 100, intensity: 8 },
      { x: 300, y: 180, intensity: 6 },
      { x: 450, y: 120, intensity: 4 },
      { x: 200, y: 250, intensity: 7 },
      { x: 400, y: 300, intensity: 5 }
    ],
    timelineData: [
      { date: '2024-01-09', incidents: 8, resolved: 6 },
      { date: '2024-01-10', incidents: 12, resolved: 9 },
      { date: '2024-01-11', incidents: 6, resolved: 5 },
      { date: '2024-01-12', incidents: 15, resolved: 12 },
      { date: '2024-01-13', incidents: 9, resolved: 8 },
      { date: '2024-01-14', incidents: 11, resolved: 7 },
      { date: '2024-01-15', incidents: 14, resolved: 11 }
    ]
  };


  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-defense-300 mt-1">Comprehensive threat analysis and reporting</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2 lg:gap-4">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="ALL">All Locations</option>
            <option value="ALPHA">Sector Alpha</option>
            <option value="BETA">Sector Beta</option>
            <option value="GAMMA">Sector Gamma</option>
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="ALL">All Types</option>
            <option value="SECURITY">Security</option>
            <option value="CYBER">Cyber</option>
            <option value="PHYSICAL">Physical</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-defense-800 border border-defense-700 rounded-lg p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-defense-300 text-sm">Total Incidents</p>
              <p className="text-xl lg:text-2xl font-bold text-white">{analyticsData.totalIncidents}</p>
            </div>
            <Activity className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-green-400">+12%</span>
            <span className="text-defense-400 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-defense-800 border border-defense-700 rounded-lg p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-defense-300 text-sm">Resolved Rate</p>
              <p className="text-xl lg:text-2xl font-bold text-white">{analyticsData.resolvedPercentage}%</p>
            </div>
            <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-green-400" />
          </div>
          <div className="mt-2 w-full bg-defense-700 rounded-full h-2">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${analyticsData.resolvedPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-defense-800 border border-defense-700 rounded-lg p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-defense-300 text-sm">Active Threats</p>
              <p className="text-xl lg:text-2xl font-bold text-white">{analyticsData.activeThreats}</p>
            </div>
            <AlertTriangle className="h-6 w-6 lg:h-8 lg:w-8 text-amber-400" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-amber-400">-3</span>
            <span className="text-defense-400 ml-1">from yesterday</span>
          </div>
        </div>

        <div className="bg-defense-800 border border-defense-700 rounded-lg p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-defense-300 text-sm">Critical Alerts</p>
              <p className="text-xl lg:text-2xl font-bold text-white">{analyticsData.criticalAlerts}</p>
            </div>
            <div className="w-6 h-6 lg:w-8 lg:h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs lg:text-sm font-bold">!</span>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-red-400">Immediate attention required</span>
          </div>
        </div>
      </div>
          <div className="h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334e68" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9fb3c8"
                  fontSize={12}
                  tickFormatter={(value: string) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#9fb3c8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#243b53', 
                    border: '1px solid #334e68',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Area type="monotone" dataKey="incidents" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                <Area type="monotone" dataKey="resolved" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        {/* Incidents by Type */}
        <div className="bg-defense-800 border border-defense-700 rounded-lg p-4 lg:p-6">
          <h3 className="text-lg font-bold text-white mb-4">Incidents by Type</h3>
          <div className="h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.incidentsByType}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {analyticsData.incidentsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#243b53', 
                    border: '1px solid #334e68',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-defense-800 border border-defense-700 rounded-lg p-4 lg:p-6">
          <h3 className="text-lg font-bold text-white mb-4">Priority Distribution</h3>
          <div className="h-64 lg:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.incidentsByPriority}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334e68" />
                <XAxis dataKey="name" stroke="#9fb3c8" fontSize={12} />
                <YAxis stroke="#9fb3c8" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#243b53', 
                    border: '1px solid #334e68',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6">
                  {analyticsData.incidentsByPriority.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Heatmap */}
        <div className="bg-defense-800 border border-defense-700 rounded-lg p-4 lg:p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Threat Heatmap
          </h3>
          <div className="h-64 lg:h-80">
            <svg viewBox="0 0 600 300" className="w-full h-full bg-defense-900 rounded-lg border border-defense-600">
              {/* Grid */}
              <defs>
                <pattern id="heatmap-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334e68" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#heatmap-grid)" />
              
              {/* Threat Points */}
              {analyticsData.threatLocations.map((threat, index) => (
                <g key={index}>
                  <circle
                    cx={threat.x}
                    cy={threat.y}
                    r={threat.intensity * 3}
                    fill={`rgba(239, 68, 68, ${threat.intensity / 10})`}
                    className="animate-pulse-slow"
                  />
                  <circle
                    cx={threat.x}
                    cy={threat.y}
                    r="4"
                    fill="#ef4444"
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>

      {/* Recent Activity */}
      <div className="bg-defense-800 border border-defense-700 rounded-lg p-4 lg:p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Activity Summary</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-defense-700 rounded-lg">
            <h4 className="font-semibold text-amber-400 mb-2">High Priority Incidents</h4>
            <p className="text-defense-300 text-sm">3 critical incidents resolved in the last 24 hours</p>
          </div>
          <div className="p-4 bg-defense-700 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">System Performance</h4>
            <p className="text-defense-300 text-sm">Response time improved by 15% this week</p>
          </div>
          <div className="p-4 bg-defense-700 rounded-lg">
            <h4 className="font-semibold text-blue-400 mb-2">Team Efficiency</h4>
            <p className="text-defense-300 text-sm">Average resolution time: 2.3 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;