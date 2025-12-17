'use client'

import { CheckSquare, Search, Filter, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Task {
  id: string
  title: string
  description?: string
  taskType: string
  priority: string
  status: string
  dueDate?: string
  completedAt?: string
  assignedByUser?: {
    firstName: string
    lastName: string
  }
  adminComments?: string
}

export default function TasksAlerts() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      // Mock data
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Update Health Records',
          description: 'Complete health record updates for sponsored children in your community',
          taskType: 'HEALTH_RECORD',
          priority: 'HIGH',
          status: 'PENDING',
          dueDate: '2025-02-15',
          assignedByUser: { firstName: 'Admin', lastName: 'User' }
        },
        {
          id: '2',
          title: 'Submit Q1 Budget',
          description: 'Prepare and submit quarterly budget for family FAM001',
          taskType: 'BUDGET',
          priority: 'URGENT',
          status: 'IN_PROGRESS',
          dueDate: '2025-01-31',
          assignedByUser: { firstName: 'Admin', lastName: 'User' }
        },
        {
          id: '3',
          title: 'Education Report Review',
          description: 'Review and verify education reports for Term 3 2024',
          taskType: 'EDUCATION_RECORD',
          priority: 'MEDIUM',
          status: 'COMPLETED',
          dueDate: '2025-01-20',
          completedAt: '2025-01-18',
          assignedByUser: { firstName: 'Admin', lastName: 'User' },
          adminComments: 'Well done! All reports are accurate and complete.'
        },
        {
          id: '4',
          title: 'Respond to Sponsor Letters',
          description: 'Help children respond to 3 pending sponsor letters',
          taskType: 'LETTER_RESPONSE',
          priority: 'MEDIUM',
          status: 'OVERDUE',
          dueDate: '2025-01-15',
          assignedByUser: { firstName: 'Admin', lastName: 'User' }
        }
      ]
      setTasks(mockTasks)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'URGENT': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'HIGH': return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case 'MEDIUM': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'LOW': return <Clock className="h-4 w-4 text-green-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-700'
      case 'HIGH': return 'bg-orange-100 text-orange-700'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700'
      case 'LOW': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'IN_PROGRESS': return <Clock className="h-4 w-4 text-blue-600" />
      case 'PENDING': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'OVERDUE': return <XCircle className="h-4 w-4 text-red-600" />
      case 'CANCELLED': return <XCircle className="h-4 w-4 text-gray-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-700'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-700'
      case 'PENDING': return 'bg-yellow-100 text-yellow-700'
      case 'OVERDUE': return 'bg-red-100 text-red-700'
      case 'CANCELLED': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'BUDGET': return 'bg-blue-100 text-blue-700'
      case 'HEALTH_RECORD': return 'bg-red-100 text-red-700'
      case 'EDUCATION_RECORD': return 'bg-green-100 text-green-700'
      case 'LETTER_RESPONSE': return 'bg-purple-100 text-purple-700'
      case 'REPORT': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'COMPLETED' || status === 'CANCELLED') return false
    return new Date(dueDate) < new Date()
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
          <h1 className="text-2xl font-bold text-gray-900">Tasks & Alerts</h1>
          <p className="text-sm text-gray-600 mt-1">Manage assigned tasks and track deadlines</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
            {tasks.filter(t => t.status === 'OVERDUE').length} Overdue
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
            {tasks.filter(t => t.status === 'PENDING').length} Pending
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks by title, type, or status..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className={`bg-white rounded-xl p-6 shadow-sm border transition ${
            task.status === 'OVERDUE' ? 'border-red-200 bg-red-50' : 
            task.priority === 'URGENT' ? 'border-orange-200' : 'border-gray-100'
          } hover:shadow-md`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  task.status === 'COMPLETED' ? 'bg-green-100' :
                  task.status === 'OVERDUE' ? 'bg-red-100' :
                  task.priority === 'URGENT' ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  <CheckSquare className={`h-6 w-6 ${
                    task.status === 'COMPLETED' ? 'text-green-600' :
                    task.status === 'OVERDUE' ? 'text-red-600' :
                    task.priority === 'URGENT' ? 'text-orange-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(task.taskType)}`}>
                      {task.taskType.replace('_', ' ')}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                      {getPriorityIcon(task.priority)}
                      <span className="ml-1">{task.priority}</span>
                    </span>
                  </div>
                  
                  {task.description && (
                    <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    {task.assignedByUser && (
                      <span>Assigned by: {task.assignedByUser.firstName} {task.assignedByUser.lastName}</span>
                    )}
                    {task.dueDate && (
                      <span className={isOverdue(task.dueDate, task.status) ? 'text-red-600 font-medium' : ''}>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    {task.completedAt && (
                      <span className="text-green-600">
                        Completed: {new Date(task.completedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {task.adminComments && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Admin Comments:</strong> {task.adminComments}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(task.status)}`}>
                {getStatusIcon(task.status)}
                <span className="text-xs font-medium">{task.status.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              {task.status === 'PENDING' && (
                <button className="flex-1 bg-[#2A9D8F] text-white px-4 py-2 rounded-lg hover:bg-[#2A9D8F]/90 transition text-sm font-medium">
                  Start Task
                </button>
              )}
              {task.status === 'IN_PROGRESS' && (
                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium">
                  Mark Complete
                </button>
              )}
              <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}