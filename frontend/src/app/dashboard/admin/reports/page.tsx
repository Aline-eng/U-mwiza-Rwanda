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
  const [dateRange, setDateRange] = useState('6months')
  const [selectedCommunity, setSelectedCommunity] = useState('all')

  useEffect(() => {
    loadReportData()
  }, [selectedReport, dateRange, selectedCommunity])

  const loadReportData = async () => {
    try {
      setLoading(true)
      // Mock report data
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
          },
          {
            name: 'Jane Smith',
            email: 'jane@umwiza.org',
            community: 'Musanze District',
            totalTasks: 18,
            completedTasks: 16,
            pendingTasks: 2,
            overdueTasks: 0
          },
          {
            name: 'Paul Kagame',
            email: 'paul@umwiza.org',
            community: 'Rubavu Town',
            totalTasks: 21,
            completedTasks: 18,
            pendingTasks: 2,
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
          },
          {
            name: 'Musanze District',
            location: 'Northern Province',
            totalFamilies: 28,
            totalChildren: 38,
            sponsoredChildren: 31
          },
          {
            name: 'Rubavu Town',
            location: 'Western Province',
            totalFamilies: 24,
            totalChildren: 33,
            sponsoredChildren: 28
          }
        ]
      }
      setReportData(mockData)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = (format: 'pdf' | 'csv') => {
    // Mock export functionality
    alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}...`)
  }

  const reportTypes = [
    { id: 'overview', name: 'System Overview', icon: BarChart3 },
    { id: 'staff', name: 'Staff Performance', icon: Users },
    { id: 'community', name: 'Community Impact', icon: Heart },
    { id: 'financial', name: 'Financial Summary', icon: DollarSign }
  ]

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
          <h1 className=\"text-2xl font-bold text-gray-900\">Reports & Analytics</h1>
          <p className=\"text-sm text-gray-600 mt-1\">Generate and export comprehensive system reports</p>
        </div>
        <div className=\"flex gap-2\">
          <button 
            onClick={() => handleExport('pdf')}
            className=\"flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm\"\n          >\n            <Download className=\"h-4 w-4\" />\n            Export PDF\n          </button>\n          <button \n            onClick={() => handleExport('csv')}\n            className=\"flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm\"\n          >\n            <Download className=\"h-4 w-4\" />\n            Export CSV\n          </button>\n        </div>\n      </div>\n\n      {/* Report Controls */}\n      <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100\">\n        <div className=\"grid grid-cols-1 md:grid-cols-4 gap-4\">\n          <div>\n            <label className=\"block text-sm font-medium text-gray-700 mb-2\">Report Type</label>\n            <select \n              value={selectedReport}\n              onChange={(e) => setSelectedReport(e.target.value)}\n              className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none\"\n            >\n              {reportTypes.map(type => (\n                <option key={type.id} value={type.id}>{type.name}</option>\n              ))}\n            </select>\n          </div>\n          \n          <div>\n            <label className=\"block text-sm font-medium text-gray-700 mb-2\">Date Range</label>\n            <select \n              value={dateRange}\n              onChange={(e) => setDateRange(e.target.value)}\n              className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none\"\n            >\n              <option value=\"1month\">Last Month</option>\n              <option value=\"3months\">Last 3 Months</option>\n              <option value=\"6months\">Last 6 Months</option>\n              <option value=\"1year\">Last Year</option>\n              <option value=\"all\">All Time</option>\n            </select>\n          </div>\n          \n          <div>\n            <label className=\"block text-sm font-medium text-gray-700 mb-2\">Community</label>\n            <select \n              value={selectedCommunity}\n              onChange={(e) => setSelectedCommunity(e.target.value)}\n              className=\"w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none\"\n            >\n              <option value=\"all\">All Communities</option>\n              <option value=\"kigali\">Kigali Village</option>\n              <option value=\"musanze\">Musanze District</option>\n              <option value=\"rubavu\">Rubavu Town</option>\n            </select>\n          </div>\n          \n          <div className=\"flex items-end\">\n            <button className=\"w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1D3557] text-white rounded-lg hover:bg-[#1D3557]/90 transition\">\n              <Filter className=\"h-4 w-4\" />\n              Apply Filters\n            </button>\n          </div>\n        </div>\n      </div>\n\n      {/* Report Content */}\n      {selectedReport === 'overview' && reportData && (\n        <div className=\"space-y-6\">\n          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6\">\n            <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100\">\n              <div className=\"flex items-center justify-between\">\n                <div>\n                  <p className=\"text-sm text-gray-600\">Total Children</p>\n                  <p className=\"text-3xl font-bold text-gray-900 mt-1\">{reportData.overview.totalChildren}</p>\n                </div>\n                <Heart className=\"h-8 w-8 text-blue-600\" />\n              </div>\n            </div>\n            \n            <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100\">\n              <div className=\"flex items-center justify-between\">\n                <div>\n                  <p className=\"text-sm text-gray-600\">Sponsored</p>\n                  <p className=\"text-3xl font-bold text-gray-900 mt-1\">{reportData.overview.sponsoredChildren}</p>\n                  <p className=\"text-xs text-green-600 mt-1\">{reportData.overview.sponsorshipRate}% rate</p>\n                </div>\n                <Users className=\"h-8 w-8 text-green-600\" />\n              </div>\n            </div>\n            \n            <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100\">\n              <div className=\"flex items-center justify-between\">\n                <div>\n                  <p className=\"text-sm text-gray-600\">Total Families</p>\n                  <p className=\"text-3xl font-bold text-gray-900 mt-1\">{reportData.overview.totalFamilies}</p>\n                </div>\n                <Users className=\"h-8 w-8 text-purple-600\" />\n              </div>\n            </div>\n            \n            <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100\">\n              <div className=\"flex items-center justify-between\">\n                <div>\n                  <p className=\"text-sm text-gray-600\">Total Support</p>\n                  <p className=\"text-3xl font-bold text-gray-900 mt-1\">{(reportData.overview.totalTransactionAmount / 1000000).toFixed(1)}M</p>\n                  <p className=\"text-xs text-gray-600 mt-1\">RWF</p>\n                </div>\n                <DollarSign className=\"h-8 w-8 text-yellow-600\" />\n              </div>\n            </div>\n          </div>\n        </div>\n      )}\n\n      {selectedReport === 'staff' && reportData && (\n        <div className=\"bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden\">\n          <div className=\"p-6 border-b border-gray-200\">\n            <h2 className=\"text-xl font-bold text-gray-900\">Staff Performance Report</h2>\n          </div>\n          <div className=\"overflow-x-auto\">\n            <table className=\"w-full\">\n              <thead className=\"bg-gray-50\">\n                <tr>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Staff Member</th>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Community</th>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Total Tasks</th>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Completed</th>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Pending</th>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Overdue</th>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Performance</th>\n                </tr>\n              </thead>\n              <tbody className=\"divide-y divide-gray-200\">\n                {reportData.staffPerformance.map((staff, i) => {\n                  const completionRate = Math.round((staff.completedTasks / staff.totalTasks) * 100)\n                  return (\n                    <tr key={i} className=\"hover:bg-gray-50\">\n                      <td className=\"px-6 py-4\">\n                        <div>\n                          <div className=\"font-medium text-gray-900\">{staff.name}</div>\n                          <div className=\"text-sm text-gray-600\">{staff.email}</div>\n                        </div>\n                      </td>\n                      <td className=\"px-6 py-4 text-sm text-gray-900\">{staff.community}</td>\n                      <td className=\"px-6 py-4 text-sm text-gray-900\">{staff.totalTasks}</td>\n                      <td className=\"px-6 py-4 text-sm text-green-600 font-medium\">{staff.completedTasks}</td>\n                      <td className=\"px-6 py-4 text-sm text-yellow-600 font-medium\">{staff.pendingTasks}</td>\n                      <td className=\"px-6 py-4 text-sm text-red-600 font-medium\">{staff.overdueTasks}</td>\n                      <td className=\"px-6 py-4\">\n                        <div className=\"flex items-center gap-2\">\n                          <div className=\"w-16 bg-gray-200 rounded-full h-2\">\n                            <div \n                              className={`h-2 rounded-full ${\n                                completionRate >= 90 ? 'bg-green-500' :\n                                completionRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'\n                              }`}\n                              style={{ width: `${completionRate}%` }}\n                            ></div>\n                          </div>\n                          <span className=\"text-sm font-medium text-gray-900\">{completionRate}%</span>\n                        </div>\n                      </td>\n                    </tr>\n                  )\n                })}\n              </tbody>\n            </table>\n          </div>\n        </div>\n      )}\n\n      {selectedReport === 'community' && reportData && (\n        <div className=\"bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden\">\n          <div className=\"p-6 border-b border-gray-200\">\n            <h2 className=\"text-xl font-bold text-gray-900\">Community Impact Report</h2>\n          </div>\n          <div className=\"overflow-x-auto\">\n            <table className=\"w-full\">\n              <thead className=\"bg-gray-50\">\n                <tr>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Community</th>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Location</th>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Families</th>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Children</th>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Sponsored</th>\n                  <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Impact Rate</th>\n                </tr>\n              </thead>\n              <tbody className=\"divide-y divide-gray-200\">\n                {reportData.communityStats.map((community, i) => {\n                  const impactRate = Math.round((community.sponsoredChildren / community.totalChildren) * 100)\n                  return (\n                    <tr key={i} className=\"hover:bg-gray-50\">\n                      <td className=\"px-6 py-4 font-medium text-gray-900\">{community.name}</td>\n                      <td className=\"px-6 py-4 text-sm text-gray-600\">{community.location}</td>\n                      <td className=\"px-6 py-4 text-sm text-gray-900\">{community.totalFamilies}</td>\n                      <td className=\"px-6 py-4 text-sm text-gray-900\">{community.totalChildren}</td>\n                      <td className=\"px-6 py-4 text-sm text-green-600 font-medium\">{community.sponsoredChildren}</td>\n                      <td className=\"px-6 py-4\">\n                        <div className=\"flex items-center gap-2\">\n                          <div className=\"w-16 bg-gray-200 rounded-full h-2\">\n                            <div \n                              className=\"bg-[#2A9D8F] h-2 rounded-full\" \n                              style={{ width: `${impactRate}%` }}\n                            ></div>\n                          </div>\n                          <span className=\"text-sm font-medium text-gray-900\">{impactRate}%</span>\n                        </div>\n                      </td>\n                    </tr>\n                  )\n                })}\n              </tbody>\n            </table>\n          </div>\n        </div>\n      )}\n    </div>\n  )\n}