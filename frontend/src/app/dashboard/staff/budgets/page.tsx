'use client'

import { FileText, Search, Filter, Plus, Calendar, Users, CheckCircle, Clock, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Budget {
  id: string
  budgetPeriod: string
  totalAmount: number
  currency: string
  status: string
  submittedAt?: string
  reviewedAt?: string
  reviewComments?: string
  family: {
    familyCode: string
    motherName?: string
    fatherName?: string
    guardianName?: string
    community: {
      name: string
    }
  }
  categories: {
    [key: string]: {
      amount: number
      description: string
    }
  }
}

export default function BudgetsPlans() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBudgets()
  }, [])

  const loadBudgets = async () => {
    try {
      setLoading(true)
      // Mock data
      const mockBudgets: Budget[] = [
        {
          id: '1',
          budgetPeriod: 'Q1 2025',
          totalAmount: 150000,
          currency: 'RWF',
          status: 'SUBMITTED',
          submittedAt: '2025-01-20',
          family: {
            familyCode: 'FAM001',
            motherName: 'Marie Uwase',
            fatherName: 'Jean Baptiste',
            community: { name: 'Kigali Village' }
          },
          categories: {
            education: { amount: 60000, description: 'School fees and supplies' },
            health: { amount: 30000, description: 'Medical checkups and medications' },
            nutrition: { amount: 40000, description: 'Food supplements' },
            housing: { amount: 20000, description: 'Housing improvements' }
          }
        },
        {
          id: '2',
          budgetPeriod: 'Q4 2024',
          totalAmount: 120000,
          currency: 'RWF',
          status: 'APPROVED',
          submittedAt: '2024-10-15',
          reviewedAt: '2024-10-20',
          family: {
            familyCode: 'FAM002',
            guardianName: 'Grace Mukamana',
            community: { name: 'Musanze District' }
          },
          categories: {
            education: { amount: 50000, description: 'School materials and uniforms' },
            health: { amount: 25000, description: 'Health insurance and checkups' },
            nutrition: { amount: 35000, description: 'Nutritional support' },
            emergency: { amount: 10000, description: 'Emergency fund' }
          }
        },
        {
          id: '3',
          budgetPeriod: 'Q3 2024',
          totalAmount: 100000,
          currency: 'RWF',
          status: 'DISBURSED',
          submittedAt: '2024-07-10',
          reviewedAt: '2024-07-15',
          family: {
            familyCode: 'FAM001',
            motherName: 'Marie Uwase',
            community: { name: 'Kigali Village' }
          },
          categories: {
            education: { amount: 40000, description: 'Term 3 school fees' },
            health: { amount: 20000, description: 'Medical expenses' },
            nutrition: { amount: 30000, description: 'Food support' },
            housing: { amount: 10000, description: 'Minor repairs' }
          }
        }
      ]
      setBudgets(mockBudgets)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'SUBMITTED': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'DISBURSED': return <CheckCircle className="h-4 w-4 text-blue-600" />
      case 'REJECTED': return <XCircle className="h-4 w-4 text-red-600" />
      case 'DRAFT': return <FileText className="h-4 w-4 text-gray-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-700'
      case 'SUBMITTED': return 'bg-yellow-100 text-yellow-700'
      case 'DISBURSED': return 'bg-blue-100 text-blue-700'
      case 'REJECTED': return 'bg-red-100 text-red-700'
      case 'DRAFT': return 'bg-gray-100 text-gray-700'
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budgets & Action Plans</h1>
          <p className="text-sm text-gray-600 mt-1">Manage family budgets and community development plans</p>
        </div>
        <button className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Budget
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by family code, period, or status..."
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
        {budgets.map((budget) => (
          <div key={budget.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{budget.budgetPeriod} Budget</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {budget.family.familyCode}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {budget.family.motherName || budget.family.fatherName || budget.family.guardianName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">{budget.family.community.name}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {Object.entries(budget.categories).map(([category, details]) => (
                      <div key={category} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 capitalize">{category}</p>
                        <p className="font-semibold text-gray-900">{details.amount.toLocaleString()} {budget.currency}</p>
                        <p className="text-xs text-gray-500 mt-1">{details.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {budget.submittedAt && (
                      <span>Submitted: {new Date(budget.submittedAt).toLocaleDateString()}</span>
                    )}
                    {budget.reviewedAt && (
                      <span>Reviewed: {new Date(budget.reviewedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {budget.totalAmount.toLocaleString()} {budget.currency}
                </p>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full mt-2 ${getStatusColor(budget.status)}`}>
                  {getStatusIcon(budget.status)}
                  <span className="text-xs font-medium">{budget.status}</span>
                </div>
              </div>
            </div>

            {budget.reviewComments && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Review Comments:</strong> {budget.reviewComments}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                View Details
              </button>
              {budget.status === 'DRAFT' && (
                <button className="flex-1 bg-[#2A9D8F] text-white px-4 py-2 rounded-lg hover:bg-[#2A9D8F]/90 transition text-sm font-medium">
                  Submit for Review
                </button>
              )}
              {budget.status === 'REJECTED' && (
                <button className="flex-1 bg-[#F4A261] text-white px-4 py-2 rounded-lg hover:bg-[#F4A261]/90 transition text-sm font-medium">
                  Edit & Resubmit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}