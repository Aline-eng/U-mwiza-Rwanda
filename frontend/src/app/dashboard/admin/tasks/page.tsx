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
  const [selectedStaff, setSelectedStaff] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    loadTasks()
  }, [filterStatus])

  const loadTasks = async () => {
    try {
      setLoading(true)
      // Mock task data
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
        },
        {
          id: '3',
          title: 'Education Report Review',
          description: 'Review and verify education reports for Term 3',
          taskType: 'EDUCATION_RECORD',
          priority: 'MEDIUM',
          status: 'COMPLETED',
          dueDate: '2025-01-20',
          assignedToUser: { firstName: 'Paul', lastName: 'Kagame', email: 'paul@umwiza.org' },
          createdAt: '2025-01-10'
        },
        {
          id: '4',
          title: 'Family Assessment',
          description: 'Conduct quarterly family assessment visits',
          taskType: 'OTHER',
          priority: 'MEDIUM',
          status: 'PENDING',
          dueDate: '2025-02-28',
          assignedToUser: { firstName: 'John', lastName: 'Doe', email: 'john@umwiza.org' },
          createdAt: '2025-01-22'
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-700'
      case 'HIGH': return 'bg-orange-100 text-orange-700'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700'
      case 'LOW': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'BUDGET': return 'bg-blue-100 text-blue-700'
      case 'HEALTH_RECORD': return 'bg-red-100 text-red-700'
      case 'EDUCATION_RECORD': return 'bg-green-100 text-green-700'
      case 'LETTER_RESPONSE': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleCreateTask = () => {
    // Mock task creation
    alert('Task creation functionality would be implemented here')
    setShowCreateModal(false)
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
      <div className=\"flex items-center justify-center min-h-96\">
        <div className=\"animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D3557]\"></div>
      </div>
    )
  }

  return (
    <div className=\"space-y-6\">
      <div className=\"flex items-center justify-between\">
        <div>
          <h1 className=\"text-2xl font-bold text-gray-900\">Task Monitoring</h1>
          <p className=\"text-sm text-gray-600 mt-1\">Assign and track staff tasks across all communities</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className=\"bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2\"\n        >\n          <Plus className=\"h-4 w-4\" />\n          Assign Task\n        </button>\n      </div>\n\n      {/* Task Statistics */}\n      <div className=\"grid grid-cols-1 md:grid-cols-5 gap-4\">\n        <div className=\"bg-white rounded-xl p-4 shadow-sm border border-gray-100\">\n          <div className=\"flex items-center justify-between\">\n            <div>\n              <p className=\"text-sm text-gray-600\">Total Tasks</p>\n              <p className=\"text-2xl font-bold text-gray-900\">{taskStats.total}</p>\n            </div>\n            <CheckSquare className=\"h-6 w-6 text-gray-600\" />\n          </div>\n        </div>\n        \n        <div className=\"bg-white rounded-xl p-4 shadow-sm border border-gray-100\">\n          <div className=\"flex items-center justify-between\">\n            <div>\n              <p className=\"text-sm text-gray-600\">Pending</p>\n              <p className=\"text-2xl font-bold text-yellow-600\">{taskStats.pending}</p>\n            </div>\n            <Clock className=\"h-6 w-6 text-yellow-600\" />\n          </div>\n        </div>\n        \n        <div className=\"bg-white rounded-xl p-4 shadow-sm border border-gray-100\">\n          <div className=\"flex items-center justify-between\">\n            <div>\n              <p className=\"text-sm text-gray-600\">In Progress</p>\n              <p className=\"text-2xl font-bold text-blue-600\">{taskStats.inProgress}</p>\n            </div>\n            <Clock className=\"h-6 w-6 text-blue-600\" />\n          </div>\n        </div>\n        \n        <div className=\"bg-white rounded-xl p-4 shadow-sm border border-gray-100\">\n          <div className=\"flex items-center justify-between\">\n            <div>\n              <p className=\"text-sm text-gray-600\">Completed</p>\n              <p className=\"text-2xl font-bold text-green-600\">{taskStats.completed}</p>\n            </div>\n            <CheckCircle className=\"h-6 w-6 text-green-600\" />\n          </div>\n        </div>\n        \n        <div className=\"bg-white rounded-xl p-4 shadow-sm border border-gray-100\">\n          <div className=\"flex items-center justify-between\">\n            <div>\n              <p className=\"text-sm text-gray-600\">Overdue</p>\n              <p className=\"text-2xl font-bold text-red-600\">{taskStats.overdue}</p>\n            </div>\n            <AlertTriangle className=\"h-6 w-6 text-red-600\" />\n          </div>\n        </div>\n      </div>\n\n      {/* Filters */}\n      <div className=\"bg-white rounded-xl p-4 shadow-sm border border-gray-100\">\n        <div className=\"flex gap-4\">\n          <button\n            onClick={() => setFilterStatus('all')}\n            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${\n              filterStatus === 'all' ? 'bg-[#1D3557] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'\n            }`}\n          >\n            All Tasks ({taskStats.total})\n          </button>\n          <button\n            onClick={() => setFilterStatus('PENDING')}\n            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${\n              filterStatus === 'PENDING' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'\n            }`}\n          >\n            Pending ({taskStats.pending})\n          </button>\n          <button\n            onClick={() => setFilterStatus('IN_PROGRESS')}\n            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${\n              filterStatus === 'IN_PROGRESS' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'\n            }`}\n          >\n            In Progress ({taskStats.inProgress})\n          </button>\n          <button\n            onClick={() => setFilterStatus('OVERDUE')}\n            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${\n              filterStatus === 'OVERDUE' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'\n            }`}\n          >\n            Overdue ({taskStats.overdue})\n          </button>\n        </div>\n      </div>\n\n      {/* Tasks List */}\n      <div className=\"space-y-4\">\n        {tasks.map((task) => (\n          <div key={task.id} className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition\">\n            <div className=\"flex items-start justify-between mb-4\">\n              <div className=\"flex-1\">\n                <div className=\"flex items-center gap-3 mb-2\">\n                  <h3 className=\"font-semibold text-gray-900\">{task.title}</h3>\n                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(task.taskType)}`}>\n                    {task.taskType.replace('_', ' ')}\n                  </span>\n                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>\n                    {task.priority}\n                  </span>\n                </div>\n                \n                {task.description && (\n                  <p className=\"text-gray-600 text-sm mb-3\">{task.description}</p>\n                )}\n                \n                <div className=\"flex items-center gap-4 text-sm text-gray-600\">\n                  <div className=\"flex items-center gap-1\">\n                    <Users className=\"h-4 w-4\" />\n                    <span>{task.assignedToUser.firstName} {task.assignedToUser.lastName}</span>\n                  </div>\n                  {task.dueDate && (\n                    <div className=\"flex items-center gap-1\">\n                      <Calendar className=\"h-4 w-4\" />\n                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>\n                    </div>\n                  )}\n                  <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>\n                </div>\n              </div>\n              \n              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>\n                {task.status.replace('_', ' ')}\n              </span>\n            </div>\n            \n            <div className=\"flex gap-3 pt-4 border-t border-gray-100\">\n              <button className=\"flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium\">\n                View Details\n              </button>\n              {task.status !== 'COMPLETED' && (\n                <button className=\"flex-1 bg-[#2A9D8F] text-white px-4 py-2 rounded-lg hover:bg-[#2A9D8F]/90 transition text-sm font-medium\">\n                  Update Status\n                </button>\n              )}\n              <button className=\"px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition text-sm font-medium\">\n                Cancel\n              </button>\n            </div>\n          </div>\n        ))}\n      </div>\n\n      {/* Create Task Modal */}\n      {showCreateModal && (\n        <div className=\"fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4\">\n          <div className=\"bg-white rounded-xl max-w-2xl w-full p-6\">\n            <h2 className=\"text-xl font-bold text-gray-900 mb-4\">Assign New Task</h2>\n            \n            <div className=\"space-y-4\">\n              <div>\n                <label className=\"block text-sm font-medium text-gray-700 mb-2\">Task Title</label>\n                <input\n                  type=\"text\"\n                  placeholder=\"Enter task title\"\n                  className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none\"\n                />\n              </div>\n              \n              <div>\n                <label className=\"block text-sm font-medium text-gray-700 mb-2\">Description</label>\n                <textarea\n                  rows={3}\n                  placeholder=\"Task description and requirements\"\n                  className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none\"\n                />\n              </div>\n              \n              <div className=\"grid grid-cols-2 gap-4\">\n                <div>\n                  <label className=\"block text-sm font-medium text-gray-700 mb-2\">Assign to Staff</label>\n                  <select className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none\">\n                    <option value=\"\">Select staff member</option>\n                    <option value=\"john\">John Doe - Kigali Village</option>\n                    <option value=\"jane\">Jane Smith - Musanze District</option>\n                    <option value=\"paul\">Paul Kagame - Rubavu Town</option>\n                  </select>\n                </div>\n                \n                <div>\n                  <label className=\"block text-sm font-medium text-gray-700 mb-2\">Priority</label>\n                  <select className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none\">\n                    <option value=\"LOW\">Low</option>\n                    <option value=\"MEDIUM\">Medium</option>\n                    <option value=\"HIGH\">High</option>\n                    <option value=\"URGENT\">Urgent</option>\n                  </select>\n                </div>\n              </div>\n              \n              <div className=\"grid grid-cols-2 gap-4\">\n                <div>\n                  <label className=\"block text-sm font-medium text-gray-700 mb-2\">Task Type</label>\n                  <select className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none\">\n                    <option value=\"BUDGET\">Budget</option>\n                    <option value=\"HEALTH_RECORD\">Health Record</option>\n                    <option value=\"EDUCATION_RECORD\">Education Record</option>\n                    <option value=\"LETTER_RESPONSE\">Letter Response</option>\n                    <option value=\"OTHER\">Other</option>\n                  </select>\n                </div>\n                \n                <div>\n                  <label className=\"block text-sm font-medium text-gray-700 mb-2\">Due Date</label>\n                  <input\n                    type=\"date\"\n                    className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none\"\n                  />\n                </div>\n              </div>\n            </div>\n            \n            <div className=\"flex gap-3 mt-6\">\n              <button\n                onClick={handleCreateTask}\n                className=\"flex-1 bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition font-medium\"\n              >\n                Assign Task\n              </button>\n              <button\n                onClick={() => setShowCreateModal(false)}\n                className=\"flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition font-medium\"\n              >\n                Cancel\n              </button>\n            </div>\n          </div>\n        </div>\n      )}\n    </div>\n  )\n}