'use client'

import { CheckSquare, Plus, Users, Calendar, AlertTriangle, Clock, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Task {
  id: string
  title: string
  description?: string
  taskType: string
  priority: string
  status: string
  dueDate?: string
  assignedToUser: {
    firstName: string
    lastName: string
    email: string
  }
  createdAt: string
}

export default function TaskMonitoring() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    loadTasks()
  }, [filterStatus])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Update Health Records',
          description: 'Complete health record updates for sponsored children',
          taskType: 'HEALTH_RECORD',
          priority: 'HIGH',
          status: 'IN_PROGRESS',
          dueDate: '2025-02-15',
          assignedToUser: { firstName: 'John', lastName: 'Doe', email: 'john@umwiza.org' },
          createdAt: '2025-01-20'
        },
        {
          id: '2',
          title: 'Submit Q1 Budget',
          description: 'Prepare quarterly budget for community families',
          taskType: 'BUDGET',
          priority: 'URGENT',
          status: 'OVERDUE',
          dueDate: '2025-01-31',
          assignedToUser: { firstName: 'Jane', lastName: 'Smith', email: 'jane@umwiza.org' },
          createdAt: '2025-01-15'
        }
      ]
      
      if (filterStatus !== 'all') {
        setTasks(mockTasks.filter(task => task.status === filterStatus))
      } else {
        setTasks(mockTasks)
      }
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-700'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700'
      case 'PENDING': return 'bg-yellow-100 text-yellow-700'
      case 'OVERDUE': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'PENDING').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
    overdue: tasks.filter(t => t.status === 'OVERDUE').length
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D3557]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Monitoring</h1>
          <p className="text-sm text-gray-600 mt-1">Assign and track staff tasks across all communities</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Assign Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{taskStats.total}</p>
            </div>
            <CheckSquare className="h-6 w-6 text-gray-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{taskStats.pending}</p>
            </div>
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                {task.description && (
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{task.assignedToUser.firstName} {task.assignedToUser.lastName}</span>
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                {task.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Assign New Task</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition font-medium"
              >
                Assign Task
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}