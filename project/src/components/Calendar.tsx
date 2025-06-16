import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, AlertTriangle } from 'lucide-react';
import { mockCalendarEvents } from '../data/mockData';
import { CalendarEvent } from '../types';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);

  const [newEvent, setNewEvent] = useState<{
    title: string;
    description: string;
    date: string;
    time: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    type: 'MISSION' | 'TRAINING' | 'MEETING' | 'MAINTENANCE';
  }>({
    title: '',
    description: '',
    date: '',
    time: '',
    priority: 'MEDIUM',
    type: 'MISSION'
  });

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (dateStr: string) => {
    return events.filter(event => event.date === dateStr);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-600';
      case 'HIGH': return 'bg-amber-600';
      case 'MEDIUM': return 'bg-blue-600';
      case 'LOW': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'MISSION': return '🎯';
      case 'TRAINING': return '🎓';
      case 'MEETING': return '👥';
      case 'MAINTENANCE': return '⚙️';
      default: return '📅';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: CalendarEvent = {
      id: Date.now().toString(),
      ...newEvent,
      status: 'SCHEDULED'
    };
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      priority: 'MEDIUM',
      type: 'MISSION'
    });
    setShowAddEvent(false);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const today = formatDate(new Date());

  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const dayNumber = index - firstDayOfMonth + 1;
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
      return {
        day: dayNumber,
        date: dateStr,
        isCurrentMonth: true,
        isToday: dateStr === today,
        events: getEventsForDate(dateStr)
      };
    }
    return null;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Mission Calendar</h1>
          <p className="text-defense-300 mt-1">Schedule and track missions, training, and operations</p>
        </div>
        <button
          onClick={() => setShowAddEvent(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-defense-700 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-defense-700 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Day Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center text-sm font-medium text-defense-300">
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((day, index) => (
                <div key={index} className="min-h-[100px] border border-defense-600 rounded p-2">
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-1 ${
                        day.isToday ? 'text-amber-400' : 'text-white'
                      }`}>
                        {day.day}
                      </div>
                      <div className="space-y-1">
                        {day.events.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${getPriorityColor(event.priority)} text-white`}
                          >
                              <span>{getTypeIcon(event.type)}</span>
                              <span className="truncate">{event.title}</span>
                          </div>
                        ))}
                        {day.events.length > 2 && (
                          <div className="text-xs text-defense-400">
                            +{day.events.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Today's Events */}
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Today's Schedule
            </h3>
            <div className="space-y-3">
              {getEventsForDate(today).length > 0 ? (
                getEventsForDate(today).map(event => (
                  <div key={event.id} className="p-3 bg-defense-700 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium text-white">{event.title}</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${getPriorityColor(event.priority)} text-white`}>
                        {event.priority}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-defense-300 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <p className="text-sm text-defense-300">{event.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-defense-400 text-sm">No events scheduled for today</p>
              )}
            </div>
          </div>

          {/* Upcoming Critical Events */}
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Critical Upcoming
            </h3>
            <div className="space-y-3">
              {events.filter(e => e.priority === 'CRITICAL' && e.date >= today).slice(0, 3).map(event => (
                <div key={event.id} className="p-3 bg-red-900/20 border border-red-400 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-medium text-white">{event.title}</span>
                    <span className="text-xs text-red-400">{event.type}</span>
                  </div>
                  <div className="text-sm text-defense-300">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">This Month</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-defense-300">Total Events:</span>
                <span className="text-white font-semibold">{events.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-defense-300">Missions:</span>
                <span className="text-white font-semibold">
                  {events.filter(e => e.type === 'MISSION').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-defense-300">Critical:</span>
                <span className="text-red-400 font-semibold">
                  {events.filter(e => e.priority === 'CRITICAL').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-defense-800 border border-defense-700 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-white mb-4">Add New Event</h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-3 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full px-3 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-3 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Time</label>
                  <input
                    type="time"
                    required
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-3 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Priority</label>
                  <select
                    value={newEvent.priority}
                    onChange={(e) => setNewEvent({...newEvent, priority: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'})}
                    className="w-full px-3 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value as 'MISSION' | 'TRAINING' | 'MEETING' | 'MAINTENANCE'})}
                    className="w-full px-3 py-2 bg-defense-700 border border-defense-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="MISSION">Mission</option>
                    <option value="TRAINING">Training</option>
                    <option value="MEETING">Meeting</option>
                    <option value="MAINTENANCE">Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddEvent(false)}
                  className="px-4 py-2 text-defense-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;