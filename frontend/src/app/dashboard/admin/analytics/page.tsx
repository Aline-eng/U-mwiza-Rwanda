'use client'

import { BarChart3, TrendingUp, Users, Heart, DollarSign, GraduationCap, Activity, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CommunityStats {
  name: string
  location: string
  totalFamilies: number
  totalChildren: number
  sponsoredChildren: number
  sponsorshipRate: number
}

interface AnalyticsData {
  overview: {
    totalChildren: number
    sponsoredChildren: number
    sponsorshipRate: number
    totalFamilies: number
    activeCommunities: number
    totalTransactions: number
    totalTransactionAmount: number
    healthRecordsCount: number
    educationRecordsCount: number
  }
  communityStats: CommunityStats[]
  trends: {
    month: string
    children: number
    sponsorships: number
    transactions: number
  }[]
}

export default function CommunityAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('6months')

  useEffect(() => {
    loadAnalytics()
  }, [selectedPeriod])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      // Mock analytics data
      const mockAnalytics: AnalyticsData = {
        overview: {
          totalChildren: 342,
          sponsoredChildren: 287,
          sponsorshipRate: 84,
          totalFamilies: 156,
          activeCommunities: 12,
          totalTransactions: 1247,
          totalTransactionAmount: 45750000,
          healthRecordsCount: 892,
          educationRecordsCount: 456
        },
        communityStats: [
          {
            name: 'Kigali Village',
            location: 'Kigali City, Gasabo',
            totalFamilies: 32,
            totalChildren: 45,
            sponsoredChildren: 42,
            sponsorshipRate: 93
          },
          {
            name: 'Musanze District',
            location: 'Northern Province',
            totalFamilies: 28,
            totalChildren: 38,
            sponsoredChildren: 31,
            sponsorshipRate: 82
          },
          {
            name: 'Rubavu Town',
            location: 'Western Province',
            totalFamilies: 24,
            totalChildren: 33,
            sponsoredChildren: 28,
            sponsorshipRate: 85
          },
          {
            name: 'Huye District',
            location: 'Southern Province',
            totalFamilies: 35,
            totalChildren: 52,
            sponsoredChildren: 41,
            sponsorshipRate: 79
          },
          {
            name: 'Nyagatare Sector',
            location: 'Eastern Province',
            totalFamilies: 19,
            totalChildren: 26,
            sponsoredChildren: 22,
            sponsorshipRate: 85
          }
        ],
        trends: [
          { month: 'Aug 2024', children: 298, sponsorships: 245, transactions: 156 },
          { month: 'Sep 2024', children: 312, sponsorships: 258, transactions: 178 },
          { month: 'Oct 2024', children: 325, sponsorships: 267, transactions: 192 },
          { month: 'Nov 2024', children: 334, sponsorships: 275, transactions: 203 },
          { month: 'Dec 2024', children: 338, sponsorships: 281, transactions: 218 },
          { month: 'Jan 2025', children: 342, sponsorships: 287, transactions: 234 }
        ]
      }
      setAnalytics(mockAnalytics)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className=\"flex items-center justify-center min-h-96\">
        <div className=\"animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D3557]\"></div>
      </div>
    )
  }

  if (!analytics) return null

  return (
    <div className=\"space-y-6\">
      <div className=\"flex items-center justify-between\">
        <div>
          <h1 className=\"text-2xl font-bold text-gray-900\">Community Analytics</h1>
          <p className=\"text-sm text-gray-600 mt-1\">Impact metrics and community performance insights</p>
        </div>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className=\"px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none\"
        >
          <option value=\"3months\">Last 3 Months</option>
          <option value=\"6months\">Last 6 Months</option>
          <option value=\"1year\">Last Year</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6\">
        <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100\">
          <div className=\"flex items-center justify-between\">
            <div>
              <p className=\"text-sm text-gray-600\">Total Children</p>
              <p className=\"text-3xl font-bold text-gray-900 mt-1\">{analytics.overview.totalChildren}</p>
              <p className=\"text-xs text-green-600 mt-2\">+12 this month</p>
            </div>
            <Heart className=\"h-8 w-8 text-blue-600\" />
          </div>
        </div>

        <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100\">
          <div className=\"flex items-center justify-between\">
            <div>
              <p className=\"text-sm text-gray-600\">Sponsorship Rate</p>
              <p className=\"text-3xl font-bold text-gray-900 mt-1\">{analytics.overview.sponsorshipRate}%</p>
              <p className=\"text-xs text-green-600 mt-2\">+2% this month</p>
            </div>
            <TrendingUp className=\"h-8 w-8 text-green-600\" />
          </div>
        </div>

        <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100\">
          <div className=\"flex items-center justify-between\">
            <div>
              <p className=\"text-sm text-gray-600\">Total Families</p>
              <p className=\"text-3xl font-bold text-gray-900 mt-1\">{analytics.overview.totalFamilies}</p>
              <p className=\"text-xs text-blue-600 mt-2\">Across {analytics.overview.activeCommunities} communities</p>
            </div>
            <Users className=\"h-8 w-8 text-purple-600\" />
          </div>
        </div>

        <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100\">
          <div className=\"flex items-center justify-between\">
            <div>
              <p className=\"text-sm text-gray-600\">Total Support</p>
              <p className=\"text-3xl font-bold text-gray-900 mt-1\">{(analytics.overview.totalTransactionAmount / 1000000).toFixed(1)}M</p>
              <p className=\"text-xs text-gray-600 mt-2\">RWF disbursed</p>
            </div>
            <DollarSign className=\"h-8 w-8 text-yellow-600\" />
          </div>
        </div>
      </div>

      {/* Community Performance */}
      <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100\">
        <div className=\"flex items-center justify-between mb-6\">
          <h2 className=\"text-xl font-bold text-gray-900\">Community Performance</h2>
          <button className=\"flex items-center gap-2 px-4 py-2 bg-[#1D3557] text-white rounded-lg hover:bg-[#1D3557]/90 transition text-sm\">
            <BarChart3 className=\"h-4 w-4\" />
            Export Report
          </button>
        </div>

        <div className=\"overflow-x-auto\">
          <table className=\"w-full\">
            <thead className=\"bg-gray-50 border-b border-gray-200\">
              <tr>
                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Community</th>
                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Location</th>
                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Families</th>
                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Children</th>
                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Sponsored</th>
                <th className=\"px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase\">Rate</th>
              </tr>
            </thead>
            <tbody className=\"divide-y divide-gray-200\">
              {analytics.communityStats.map((community, i) => (
                <tr key={i} className=\"hover:bg-gray-50 transition\">
                  <td className=\"px-6 py-4\">
                    <div className=\"font-medium text-gray-900\">{community.name}</div>
                  </td>
                  <td className=\"px-6 py-4\">
                    <div className=\"flex items-center gap-2 text-sm text-gray-600\">
                      <MapPin className=\"h-4 w-4\" />
                      {community.location}
                    </div>
                  </td>
                  <td className=\"px-6 py-4 text-sm text-gray-900\">{community.totalFamilies}</td>
                  <td className=\"px-6 py-4 text-sm text-gray-900\">{community.totalChildren}</td>
                  <td className=\"px-6 py-4 text-sm text-gray-900\">{community.sponsoredChildren}</td>
                  <td className=\"px-6 py-4\">
                    <div className=\"flex items-center gap-2\">
                      <div className=\"w-16 bg-gray-200 rounded-full h-2\">
                        <div 
                          className=\"bg-[#2A9D8F] h-2 rounded-full\" 
                          style={{ width: `${community.sponsorshipRate}%` }}
                        ></div>
                      </div>\n                      <span className=\"text-sm font-medium text-gray-900\">{community.sponsorshipRate}%</span>\n                    </div>\n                  </td>\n                </tr>\n              ))}\n            </tbody>\n          </table>\n        </div>\n      </div>\n\n      {/* Trends Chart */}\n      <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100\">\n        <h2 className=\"text-xl font-bold text-gray-900 mb-6\">Growth Trends</h2>\n        <div className=\"grid grid-cols-1 lg:grid-cols-3 gap-6\">\n          <div className=\"lg:col-span-2\">\n            <div className=\"h-64 flex items-end justify-between gap-2 border-b border-gray-200 pb-4\">\n              {analytics.trends.map((trend, i) => (\n                <div key={i} className=\"flex-1 flex flex-col items-center gap-2\">\n                  <div className=\"w-full flex flex-col gap-1\">\n                    <div \n                      className=\"bg-blue-500 rounded-t\" \n                      style={{ height: `${(trend.children / 400) * 200}px` }}\n                    ></div>\n                    <div \n                      className=\"bg-green-500\" \n                      style={{ height: `${(trend.sponsorships / 400) * 200}px` }}\n                    ></div>\n                    <div \n                      className=\"bg-yellow-500 rounded-b\" \n                      style={{ height: `${(trend.transactions / 400) * 200}px` }}\n                    ></div>\n                  </div>\n                  <span className=\"text-xs text-gray-600 transform -rotate-45 origin-center\">\n                    {trend.month.split(' ')[0]}\n                  </span>\n                </div>\n              ))}\n            </div>\n          </div>\n          \n          <div className=\"space-y-4\">\n            <div className=\"flex items-center gap-3\">\n              <div className=\"w-4 h-4 bg-blue-500 rounded\"></div>\n              <span className=\"text-sm text-gray-600\">Total Children</span>\n            </div>\n            <div className=\"flex items-center gap-3\">\n              <div className=\"w-4 h-4 bg-green-500 rounded\"></div>\n              <span className=\"text-sm text-gray-600\">Sponsorships</span>\n            </div>\n            <div className=\"flex items-center gap-3\">\n              <div className=\"w-4 h-4 bg-yellow-500 rounded\"></div>\n              <span className=\"text-sm text-gray-600\">Transactions</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      {/* Quick Actions */}\n      <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6\">\n        <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center\">\n          <Activity className=\"h-8 w-8 text-red-600 mx-auto mb-3\" />\n          <h3 className=\"font-semibold text-gray-900 mb-2\">Health Records</h3>\n          <p className=\"text-2xl font-bold text-gray-900\">{analytics.overview.healthRecordsCount}</p>\n          <p className=\"text-sm text-gray-600 mt-1\">Total records</p>\n        </div>\n        \n        <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center\">\n          <GraduationCap className=\"h-8 w-8 text-blue-600 mx-auto mb-3\" />\n          <h3 className=\"font-semibold text-gray-900 mb-2\">Education Reports</h3>\n          <p className=\"text-2xl font-bold text-gray-900\">{analytics.overview.educationRecordsCount}</p>\n          <p className=\"text-sm text-gray-600 mt-1\">Academic reports</p>\n        </div>\n        \n        <div className=\"bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center\">\n          <DollarSign className=\"h-8 w-8 text-green-600 mx-auto mb-3\" />\n          <h3 className=\"font-semibold text-gray-900 mb-2\">Transactions</h3>\n          <p className=\"text-2xl font-bold text-gray-900\">{analytics.overview.totalTransactions}</p>\n          <p className=\"text-sm text-gray-600 mt-1\">Financial records</p>\n        </div>\n      </div>\n    </div>\n  )\n}