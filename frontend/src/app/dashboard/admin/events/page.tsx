'use client'

import { Calendar, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

const events = [
  { id: 1, title: 'Community Health Day', date: 'Feb 15, 2025', location: 'Kigali Village', status: 'Upcoming', attendees: 120 },
  { id: 2, title: 'Education Workshop', date: 'Jan 28, 2025', location: 'Musanze District', status: 'Upcoming', attendees: 45 },
  { id: 3, title: 'Christmas Celebration', date: 'Dec 25, 2024', location: 'All Communities', status: 'Completed', attendees: 350 },
]

export default function EventsManagement() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
          <p className="text-sm text-gray-600 mt-1">Create and manage community events</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-[#F4A261]/10 rounded-lg">
                <Calendar className="h-6 w-6 text-[#F4A261]" />
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                event.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {event.status}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>📅 {event.date}</p>
              <p>📍 {event.location}</p>
              <p>👥 {event.attendees} attendees</p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                <Eye className="h-4 w-4" />
                View
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Edit className="h-4 w-4 text-gray-600" />
              </button>
              <button className="p-2 border border-red-300 rounded-lg hover:bg-red-50 transition">
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none">
                  <option>Select location...</option>
                  <option>Kigali Village</option>
                  <option>Musanze District</option>
                  <option>Rubavu Town</option>
                  <option>All Communities</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the event..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload event photo</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="publish" className="rounded" />
                <label htmlFor="publish" className="text-sm text-gray-700">Publish to website</label>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition">
                  Create Event
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
