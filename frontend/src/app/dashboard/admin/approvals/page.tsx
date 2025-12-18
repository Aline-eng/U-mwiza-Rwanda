'use client'

import { CheckCircle, XCircle, Eye, Clock, FileText, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Approval {
  id: string
  type: string
  title: string
  submittedBy: string
  community: string
  date: string
  priority: string
  amount?: string
  status: string
  description?: string
}

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [reviewComments, setReviewComments] = useState('')

  useEffect(() => {
    loadApprovals()
  }, [])

  const loadApprovals = async () => {
    try {
      setLoading(true)
      // Mock data with more realistic approval items
      const mockApprovals: Approval[] = [
        {
          id: '1',
          type: 'Budget',
          title: 'Q1 2025 Community Budget',
          submittedBy: 'John Doe',
          community: 'Kigali Village',
          date: 'Jan 20, 2025',
          priority: 'High',
          amount: '150,000 RWF',
          status: 'PENDING',
          description: 'Quarterly budget for family support including education, health, and nutrition needs'
        },
        {
          id: '2',
          type: 'Health Record',
          title: 'Medical Emergency Treatment',
          submittedBy: 'Jane Smith',
          community: 'Musanze District',
          date: 'Jan 22, 2025',
          priority: 'Urgent',
          status: 'PENDING',
          description: 'Emergency medical treatment for child with malaria complications'
        },
        {
          id: '3',
          type: 'Education Record',
          title: 'Term 1 Academic Reports',
          submittedBy: 'Paul Kagame',
          community: 'Rubavu Town',
          date: 'Jan 18, 2025',
          priority: 'Medium',
          status: 'PENDING',
          description: 'Academic performance reports for 15 sponsored children'
        },
        {
          id: '4',
          type: 'Transaction',
          title: 'Emergency Fund Disbursement',
          submittedBy: 'John Doe',
          community: 'Kigali Village',
          date: 'Jan 21, 2025',
          priority: 'High',
          amount: '75,000 RWF',
          status: 'PENDING',
          description: 'Emergency medical fund for child hospitalization'
        }
      ]
      setApprovals(mockApprovals)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (approval: Approval) => {
    try {
      // Update approval status
      setApprovals(prev => prev.map(item => 
        item.id === approval.id ? { ...item, status: 'APPROVED' } : item
      ))
      setShowModal(false)
      setReviewComments('')
    } catch (error) {
      console.error('Error approving item:', error)
    }
  }

  const handleReject = async (approval: Approval) => {
    if (!reviewComments.trim()) {
      alert('Please provide review comments for rejection')
      return
    }
    
    try {
      // Update approval status
      setApprovals(prev => prev.map(item => 
        item.id === approval.id ? { ...item, status: 'REJECTED' } : item
      ))
      setShowModal(false)
      setReviewComments('')
    } catch (error) {
      console.error('Error rejecting item:', error)
    }
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
          {approvals.filter(approval => approval.status === 'PENDING').map((approval) => (
            <div key={approval.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      approval.type === 'Budget' ? 'bg-blue-100 text-blue-700' :
                      approval.type === 'Health Record' ? 'bg-red-100 text-red-700' :
                      approval.type === 'Education Record' ? 'bg-green-100 text-green-700' :
                      approval.type === 'Transaction' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {approval.type}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      approval.priority === 'Urgent' ? 'bg-red-100 text-red-700' :
                      approval.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      approval.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {approval.priority} Priority
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg">{approval.title}</h3>
                  {approval.description && (
                    <p className="text-gray-600 text-sm mt-2">{approval.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>By {approval.submittedBy}</span>
                    </div>
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
                <button 
                  onClick={() => {
                    setSelectedApproval(approval)
                    setShowModal(true)
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  <Eye className="h-4 w-4" />
                  Review
                </button>
                <button 
                  onClick={() => handleApprove(approval)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2A9D8F] text-white rounded-lg hover:bg-[#2A9D8F]/90 transition text-sm"
                >
                  <CheckCircle className="h-4 w-4" />
                  Quick Approve
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Review Modal */}
        {showModal && selectedApproval && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Review {selectedApproval.type}</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedApproval.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{selectedApproval.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Submitted by:</span>
                    <span className="ml-2 font-medium">{selectedApproval.submittedBy}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Community:</span>
                    <span className="ml-2 font-medium">{selectedApproval.community}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2 font-medium">{selectedApproval.date}</span>
                  </div>
                  {selectedApproval.amount && (
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-2 font-medium">{selectedApproval.amount}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Comments (optional for approval, required for rejection)
                </label>
                <textarea
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                  placeholder="Add your review comments here..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(selectedApproval)}
                  className="flex-1 bg-[#2A9D8F] text-white px-4 py-2 rounded-lg hover:bg-[#2A9D8F]/90 transition font-medium"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(selectedApproval)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setReviewComments('')
                  }}
                  className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
