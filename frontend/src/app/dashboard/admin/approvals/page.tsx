'use client'

import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react'

const approvals = [
  {
    id: 1,
    type: 'Budget',
    title: 'Q1 2025 Community Budget',
    submittedBy: 'John Doe',
    community: 'Kigali Village',
    date: 'Jan 20, 2025',
    priority: 'High',
    amount: '$12,500',
  },
  {
    id: 2,
    type: 'Action Plan',
    title: '2025 Education Initiative',
    submittedBy: 'Jane Smith',
    community: 'Musanze District',
    date: 'Jan 18, 2025',
    priority: 'Medium',
    amount: null,
  },
  {
    id: 3,
    type: 'Event',
    title: 'Community Health Day',
    submittedBy: 'Paul Kagame',
    community: 'Rubavu Town',
    date: 'Jan 15, 2025',
    priority: 'Low',
    amount: '$3,200',
  },
]

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
        <p className="text-sm text-gray-600 mt-1">Review and approve staff submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">2</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Approvals List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-[#1D3557] text-white rounded-lg text-sm font-medium">
              All (8)
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
              Budgets (3)
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
              Action Plans (2)
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
              Events (3)
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {approvals.map((approval) => (
            <div key={approval.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      approval.type === 'Budget' ? 'bg-blue-100 text-blue-700' :
                      approval.type === 'Action Plan' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {approval.type}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      approval.priority === 'High' ? 'bg-red-100 text-red-700' :
                      approval.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {approval.priority} Priority
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">{approval.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>By {approval.submittedBy}</span>
                    <span>•</span>
                    <span>{approval.community}</span>
                    <span>•</span>
                    <span>{approval.date}</span>
                    {approval.amount && (
                      <>
                        <span>•</span>
                        <span className="font-semibold text-gray-900">{approval.amount}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#2A9D8F] text-white rounded-lg hover:bg-[#2A9D8F]/90 transition text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition text-sm">
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
