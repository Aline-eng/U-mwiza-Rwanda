'use client'

import { Calendar, MapPin, Plus, Trash2, Eye, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { apiService } from '@/services/api'

interface Event {
  id: string
  title: string
  description?: string
  eventType: string
  eventDate: string
  endDate?: string
  location?: string
  status: string
  community?: {
    name: string
    location: string
  }
  createdAt: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'COMMUNITY',
    eventDate: '',
    endDate: '',
    location: ''
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await apiService.getEvents()
      setEvents(response.data || [])
    } catch (err) {
      setError('Failed to load events. Please check your connection and try again.')
      setEvents([])
      console.error('Error loading events:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)

    try {
      const response = await apiService.createEvent(formData)
      if (response.success) {
        setShowCreateForm(false)
        setFormData({
          title: '',
          description: '',
          eventType: 'COMMUNITY',
          eventDate: '',
          endDate: '',
          location: ''
        })
        loadEvents() // Refresh from backend
        alert('Event created successfully!')
      } else {
        throw new Error(response.message || 'Failed to create event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Failed to create event. Please check all fields and try again.')
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      await apiService.deleteEvent(id)
      loadEvents() // Refresh from backend
      alert('Event deleted successfully!')
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Failed to delete event. Please try again.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'COMMUNITY': return 'bg-blue-100 text-blue-700'
      case 'TRAINING': return 'bg-green-100 text-green-700'
      case 'CELEBRATION': return 'bg-purple-100 text-purple-700'
      case 'VISIT': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D3557]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={loadEvents} className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-sm text-gray-600 mt-1">Manage community events and activities</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Event
        </button>
      </div>

      {/* Create Event Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Create New Event</h3>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                  placeholder="Event title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type *</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                  required
                >
                  <option value="COMMUNITY">Community</option>
                  <option value="TRAINING">Training</option>
                  <option value="CELEBRATION">Celebration</option>
                  <option value="VISIT">Visit</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
                <input
                  type="datetime-local"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                  placeholder="Event location"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                placeholder="Event description"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={creating}
                className="bg-[#1D3557] text-white px-6 py-2 rounded-lg hover:bg-[#1D3557]/90 transition disabled:opacity-50 flex items-center gap-2"
              >
                {creating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Event'
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events List */}
      {events.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">Create your first event to get started.</p>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="bg-[#1D3557] text-white px-6 py-3 rounded-lg hover:bg-[#1D3557]/90 transition inline-flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create First Event
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.eventType)}`}>
                      {event.eventType}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-gray-600 mb-3">{event.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(event.eventDate)}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteEvent(event.id, event.title)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete event"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}