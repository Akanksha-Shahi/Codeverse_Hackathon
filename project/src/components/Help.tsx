import React, { useState } from 'react';
import { Phone, Mail, Clock, User, Shield, AlertTriangle, Search } from 'lucide-react';
import { mockContacts } from '../data/mockData';

const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || contact.department.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const emergencyProcedures = [
    {
      title: "Immediate Threat Response",
      steps: [
        "Assess the immediate threat level and personal safety",
        "Contact Emergency Command Center: (555) 0100",
        "Provide clear location and threat description",
        "Follow evacuation procedures if necessary",
        "Await further instructions from command"
      ]
    },
    {
      title: "Security Breach Protocol",
      steps: [
        "Isolate affected systems immediately",
        "Document all suspicious activities",
        "Report to Cybersecurity Team: (555) 0103",
        "Preserve evidence for investigation",
        "Implement backup security measures"
      ]
    },
    {
      title: "Communication Failure",
      steps: [
        "Switch to backup communication channels",
        "Contact Technical Support: (555) 0104",
        "Use alternative communication methods",
        "Report system status to command",
        "Monitor for system restoration"
      ]
    }
  ];

  const faqItems = [
    {
      question: "How do I report a security incident?",
      answer: "Use the 'Report Threat' section to submit detailed incident reports. For immediate threats, contact the Emergency Command Center directly."
    },
    {
      question: "What information should I include in a threat report?",
      answer: "Include location, time, detailed description, threat level, and any relevant evidence or observations."
    },
    {
      question: "Who has access to the command center systems?",
      answer: "Access is restricted to authorized personnel with appropriate security clearance levels."
    },
    {
      question: "How often is the threat map updated?",
      answer: "The threat map is updated in real-time as new information becomes available from field agents and monitoring systems."
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Help & Support</h1>
          <p className="text-defense-300 mt-1">Emergency contacts, procedures, and system guidance</p>
        </div>
        <div className="flex items-center space-x-2 text-green-400">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm">24/7 Support Available</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency Contacts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filter */}
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Emergency Contacts</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-defense-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white placeholder-defense-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="ALL">All Departments</option>
                <option value="Command">Command Center</option>
                <option value="Field">Field Operations</option>
                <option value="Intelligence">Intelligence</option>
                <option value="Technical">Technical Support</option>
              </select>
            </div>

            <div className="grid gap-4">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="bg-defense-700 border border-defense-600 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          contact.available ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        }`}>
                          {contact.available ? 'Available' : 'Busy'}
                        </span>
                      </div>
                      <p className="text-defense-300 mb-1">{contact.role}</p>
                      <p className="text-defense-400 text-sm mb-3">{contact.department}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-defense-400" />
                          <span className="text-white font-mono">{contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-defense-400" />
                          <span className="text-defense-300">{contact.email}</span>
                        </div>
                      </div>
                    </div>
                    <User className="h-8 w-8 text-defense-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-defense-700 pb-4 last:border-b-0">
                  <h3 className="text-white font-medium mb-2">{item.question}</h3>
                  <p className="text-defense-300 text-sm">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Procedures */}
        <div className="space-y-6">
          {/* Emergency Numbers */}
          <div className="bg-red-900/20 border border-red-400 rounded-lg p-6">
            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Emergency Numbers
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white">Emergency Line:</span>
                <span className="text-red-400 font-mono text-lg font-bold">911</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Command Center:</span>
                <span className="text-amber-400 font-mono">(555) 0100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Security Alert:</span>
                <span className="text-amber-400 font-mono">(555) 0101</span>
              </div>
            </div>
          </div>

          {/* Procedures */}
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Emergency Procedures
            </h3>
            <div className="space-y-4">
              {emergencyProcedures.map((procedure, index) => (
                <div key={index} className="border border-defense-600 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-400 mb-3">{procedure.title}</h4>
                  <ol className="space-y-1 text-sm">
                    {procedure.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-defense-300">
                        <span className="text-amber-400 font-bold">{stepIndex + 1}.</span> {step}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Support Hours
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-defense-300">Emergency Support:</span>
                <span className="text-green-400">24/7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-defense-300">General Support:</span>
                <span className="text-white">08:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-defense-300">Technical Support:</span>
                <span className="text-white">24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;