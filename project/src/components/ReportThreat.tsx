import React, { useState } from 'react';
import { Send, AlertTriangle, MapPin, Clock, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ReportThreat: React.FC = () => {
  const { user, addNotification } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    location: '',
    category: 'SECURITY',
    urgency: 'NORMAL',
    contactInfo: '',
    coordinates: { lat: '', lng: '' }
  });

  const [submitted, setSubmitted] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create threat report
    const threatReport = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: `threat-${Date.now()}`,
      reportedBy: user?.name,
      attachments: attachments.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }))
    };

    console.log('Threat Report Submitted:', threatReport);

    // Add notification for commanders
    addNotification({
      title: 'New Threat Reported',
      message: `${formData.priority} priority threat reported: ${formData.title}`,
      type: 'THREAT_UPLOADED',
      targetRole: 'COMMANDER',
      isRead: false
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'MEDIUM',
      location: '',
      category: 'SECURITY',
      urgency: 'NORMAL',
      contactInfo: '',
      coordinates: { lat: '', lng: '' }
    });
    setAttachments([]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCoordinateChange = (field: 'lat' | 'lng', value: string) => {
    setFormData({
      ...formData,
      coordinates: {
        ...formData.coordinates,
        [field]: value
      }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            coordinates: {
              lat: position.coords.latitude.toString(),
              lng: position.coords.longitude.toString()
            }
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Report Threat</h1>
        <p className="text-defense-300">Submit detailed threat reports for immediate analysis and response</p>
      </div>

      {submitted && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-400 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-green-400 font-medium">Threat report submitted successfully. Report ID: #{Date.now()}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-defense-800 border border-defense-700 rounded-lg p-4 lg:p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                Threat Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white placeholder-defense-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Brief description of the threat"
              />
            </div>

            {/* Priority and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-white mb-2">
                  Priority Level *
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
                  Threat Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="SECURITY">Security Breach</option>
                  <option value="CYBER">Cyber Attack</option>
                  <option value="PHYSICAL">Physical Threat</option>
                  <option value="SURVEILLANCE">Surveillance</option>
                  <option value="COMMUNICATION">Communication</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
                Location *
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white placeholder-defense-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Specific location or address"
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  title="Get current location"
                >
                  <MapPin className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Latitude
                </label>
                <input
                  type="text"
                  value={formData.coordinates.lat}
                  onChange={(e) => handleCoordinateChange('lat', e.target.value)}
                  className="w-full px-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white placeholder-defense-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="e.g., 40.7128"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Longitude
                </label>
                <input
                  type="text"
                  value={formData.coordinates.lng}
                  onChange={(e) => handleCoordinateChange('lng', e.target.value)}
                  className="w-full px-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white placeholder-defense-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="e.g., -74.0060"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white placeholder-defense-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                placeholder="Provide detailed information about the threat, including time, circumstances, and any relevant observations..."
              />
            </div>

            {/* File Attachments */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Attachments
              </label>
              <div className="border-2 border-dashed border-defense-600 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="h-8 w-8 text-defense-400 mb-2" />
                  <span className="text-defense-300 text-sm">Click to upload files</span>
                  <span className="text-defense-400 text-xs">Images, videos, documents</span>
                </label>
              </div>
              
              {/* Attachment List */}
              {attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-defense-700 rounded">
                      <span className="text-white text-sm">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Urgency */}
            <div>
              <label htmlFor="urgency" className="block text-sm font-medium text-white mb-2">
                Response Urgency
              </label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="NORMAL">Normal Response</option>
                <option value="EXPEDITED">Expedited Response</option>
                <option value="IMMEDIATE">Immediate Response Required</option>
              </select>
            </div>

            {/* Contact Info */}
            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-white mb-2">
                Contact Information
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white placeholder-defense-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Phone number or radio call sign for follow-up"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-defense-800"
              >
                <Send className="h-5 w-5" />
                <span>Submit Threat Report</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Submission Info */}
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-4 lg:p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Submission Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-defense-300">Timestamp:</span>
                <span className="text-white font-mono text-xs lg:text-sm">{new Date().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-defense-300">Reporter:</span>
                <span className="text-white font-mono text-xs lg:text-sm">{user?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-defense-300">Session:</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>

          {/* Priority Guide */}
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-4 lg:p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Priority Guide
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <div className="text-red-400 font-medium">Critical</div>
                  <div className="text-defense-300">Immediate threat to life or security</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <div className="text-amber-400 font-medium">High</div>
                  <div className="text-defense-300">Significant security concern</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <div className="text-blue-400 font-medium">Medium</div>
                  <div className="text-defense-300">Moderate threat requiring attention</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                <div>
                  <div className="text-green-400 font-medium">Low</div>
                  <div className="text-defense-300">Minor issue for documentation</div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-900/20 border border-red-400 rounded-lg p-4 lg:p-6">
            <h3 className="text-lg font-bold text-red-400 mb-4">Emergency Contact</h3>
            <p className="text-defense-300 text-sm mb-3">
              For immediate threats requiring emergency response:
            </p>
            <div className="space-y-2">
              <div className="text-white font-mono text-lg">EMERGENCY: 911</div>
              <div className="text-white font-mono">COMMAND: (555) 0100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportThreat;