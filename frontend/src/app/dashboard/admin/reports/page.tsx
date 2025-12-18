'use client'

import { FileText, Download, Calendar, Filter, BarChart3, Users, Heart, DollarSign } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ReportData {
  overview: {
    totalChildren: number
    sponsoredChildren: number
    sponsorshipRate: number
    totalFamilies: number
    activeCommunities: number
    totalTransactions: number
    totalTransactionAmount: number
  }
  staffPerformance: Array<{
    name: string
    email: string
    community: string
    totalTasks: number
    completedTasks: number
    pendingTasks: number
    overdueTasks: number
  }>
  communityStats: Array<{
    name: string
    location: string
    totalFamilies: number
    totalChildren: number
    sponsoredChildren: number
  }>
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState('overview')

  useEffect(() => {
    loadReportData()
  }, [selectedReport])

  const loadReportData = async () => {
    try {
      setLoading(true)
      const mockData: ReportData = {
        overview: {
          totalChildren: 342,
          sponsoredChildren: 287,
          sponsorshipRate: 84,
          totalFamilies: 156,
          activeCommunities: 12,
          totalTransactions: 1247,
          totalTransactionAmount: 45750000
        },
        staffPerformance: [
          {
            name: 'John Doe',
            email: 'john@umwiza.org',
            community: 'Kigali Village',
            totalTasks: 24,
            completedTasks: 20,
            pendingTasks: 3,
            overdueTasks: 1
          }
        ],
        communityStats: [
          {
            name: 'Kigali Village',
            location: 'Kigali City, Gasabo',
            totalFamilies: 32,
            totalChildren: 45,
            sponsoredChildren: 42
          }
        ]
      }
      setReportData(mockData)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = (format: 'pdf' | 'csv') => {
    alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}...`)
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
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Generate and export comprehensive system reports</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </button>
          <button 
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select 
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
            >
              <option value="overview">System Overview</option>
              <option value="staff">Staff Performance</option>
              <option value="community">Community Impact</option>
            </select>
          </div>
        </div>
      </div>

      {selectedReport === 'overview' && reportData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Children</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{reportData.overview.totalChildren}</p>
                </div>
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sponsored</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{reportData.overview.sponsoredChildren}</p>
                  <p className="text-xs text-green-600 mt-1">{reportData.overview.sponsorshipRate}% rate</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReport === 'staff' && reportData && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Staff Performance Report</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Staff Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Community</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reportData.staffPerformance.map((staff, i) => {
                  const completionRate = Math.round((staff.completedTasks / staff.totalTasks) * 100)
                  return (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{staff.name}</div>
                          <div className="text-sm text-gray-600">{staff.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{staff.community}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{completionRate}%</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}