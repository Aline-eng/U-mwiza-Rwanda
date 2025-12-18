'use client'

import { TrendingUp, Users, Heart, DollarSign, Activity, GraduationCap, BarChart3, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function CommunityAnalytics() {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState({
    overview: {
      totalChildren: 342,
      sponsorshipRate: 84,
      totalFamilies: 156,
      activeCommunities: 12,
      totalTransactionAmount: 45750000,
      healthRecordsCount: 1247,
      educationRecordsCount: 892,
      totalTransactions: 1247
    },
    communities: [
      {
        name: 'Kigali Village',
        location: 'Kigali City, Gasabo',
        totalFamilies: 32,
        totalChildren: 45,
        sponsoredChildren: 42,
        sponsorshipRate: 93
      }
    ]
  })

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

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
          <h1 className="text-2xl font-bold text-gray-900">Community Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">Impact metrics and community performance insights</p>
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none">
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Children</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.overview.totalChildren}</p>
              <p className="text-xs text-green-600 mt-2">+12 this month</p>
            </div>
            <Heart className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sponsorship Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{analytics.overview.sponsorshipRate}%</p>
              <p className="text-xs text-green-600 mt-2">+2% this month</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Community Performance</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1D3557] text-white rounded-lg hover:bg-[#1D3557]/90 transition text-sm">
            <BarChart3 className="h-4 w-4" />
            Export Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Community</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {analytics.communities.map((community, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{community.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {community.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{community.sponsorshipRate}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}