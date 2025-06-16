import React, { useState } from 'react';
import {  AlertTriangle, Eye, Clock } from 'lucide-react';
import { mockThreatLocations } from '../data/mockData';
import { ThreatLocation } from '../types';

const ThreatMap: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<ThreatLocation | null>(null);

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return '#ef4444';
      case 'HIGH': return '#f59e0b';
      case 'MEDIUM': return '#3b82f6';
      case 'LOW': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-red-400';
      case 'CONTAINED': return 'text-amber-400';
      case 'RESOLVED': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Real-Time Threat Map</h1>
          <p className="text-defense-300 mt-1">Interactive threat monitoring and location tracking</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-defense-300">Live Feed Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
            <div className="relative">
              {/* Map Background */}
              <svg 
                viewBox="0 0 600 400" 
                className="w-full h-96 bg-defense-900 rounded-lg border border-defense-600"
              >
                {/* Grid Lines */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334e68" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Geographic Features */}
                <rect x="50" y="50" width="100" height="80" fill="#1e3a8a" opacity="0.3" rx="5" />
                <text x="100" y="95" fill="#60a5fa" fontSize="10" textAnchor="middle">River Delta</text>
                
                <polygon points="200,300 250,280 280,320 230,340" fill="#166534" opacity="0.3" />
                <text x="240" y="315" fill="#4ade80" fontSize="10" textAnchor="middle">Forest Zone</text>
                
                <rect x="400" y="100" width="150" height="60" fill="#7c2d12" opacity="0.3" rx="5" />
                <text x="475" y="135" fill="#fb923c" fontSize="10" textAnchor="middle">Urban District</text>

                {/* Threat Locations */}
                {mockThreatLocations.map((threat) => (
                  <g key={threat.id}>
                    <circle
                      cx={threat.coordinates.x}
                      cy={threat.coordinates.y}
                      r="8"
                      fill={getThreatColor(threat.threatLevel)}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => setSelectedThreat(threat)}
                    />
                    <circle
                      cx={threat.coordinates.x}
                      cy={threat.coordinates.y}
                      r="16"
                      fill="none"
                      stroke={getThreatColor(threat.threatLevel)}
                      strokeWidth="2"
                      opacity="0.5"
                      className="animate-pulse-slow"
                    />
                    <text
                      x={threat.coordinates.x}
                      y={threat.coordinates.y - 20}
                      fill="white"
                      fontSize="10"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {threat.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-defense-300">Critical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-defense-300">High</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-defense-300">Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-defense-300">Low</span>
              </div>
            </div>
          </div>
        </div>

        {/* Threat Details Panel */}
        <div className="space-y-4">
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Threat Details
            </h3>
            
            {selectedThreat ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white">{selectedThreat.name}</h4>
                  <span className={`inline-block px-2 py-1 mt-1 text-xs font-semibold rounded border ${
                    selectedThreat.threatLevel === 'CRITICAL' ? 'text-red-400 bg-red-900/20 border-red-400' :
                    selectedThreat.threatLevel === 'HIGH' ? 'text-amber-400 bg-amber-900/20 border-amber-400' :
                    selectedThreat.threatLevel === 'MEDIUM' ? 'text-blue-400 bg-blue-900/20 border-blue-400' :
                    'text-green-400 bg-green-900/20 border-green-400'
                  }`}>
                    {selectedThreat.threatLevel}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm text-defense-300 mb-2">Description:</p>
                  <p className="text-white">{selectedThreat.description}</p>
                </div>
                
                <div>
                  <p className="text-sm text-defense-300 mb-1">Status:</p>
                  <span className={`font-medium ${getStatusColor(selectedThreat.status)}`}>
                    {selectedThreat.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1 text-sm text-defense-400">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(selectedThreat.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p className="text-defense-400">Click on a threat marker to view details</p>
            )}
          </div>

          {/* Active Threats List */}
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Active Threats
            </h3>
            <div className="space-y-3">
              {mockThreatLocations.filter(t => t.status === 'ACTIVE').map((threat) => (
                <div 
                  key={threat.id}
                  className="p-3 bg-defense-700 rounded-lg cursor-pointer hover:bg-defense-600 transition-colors"
                  onClick={() => setSelectedThreat(threat)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{threat.name}</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${
                      threat.threatLevel === 'CRITICAL' ? 'bg-red-600 text-white' :
                      threat.threatLevel === 'HIGH' ? 'bg-amber-600 text-white' :
                      'bg-blue-600 text-white'
                    }`}>
                      {threat.threatLevel}
                    </span>
                  </div>
                  <p className="text-sm text-defense-300">{threat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;