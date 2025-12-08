'use client'

import { useEffect, useState } from 'react'
import StatCard from '@/components/dashboard/StatCard'
import { Heart, FileText, Activity, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'

export default function StaffDashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#1D3557] to-[#2A9D8F] rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h1>
        <p className="text-white/80">Here's what's happening in {user?.community || 'your community'} today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Sponsored Children" value={45} icon={Heart} trend="+3 this month" color="blue" />
        <StatCard title="Pending Budgets" value={2} icon={FileText} color="yellow" />
        <StatCard title="Health Alerts" value={1} icon={Activity} color="red" />
        <StatCard title="New Letters" value={8} icon={Mail} trend="Awaiting response" color="green" />
      </div>

      {/* Community Profile Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Community</h2>
        <div className="flex items-start gap-4">
          <img src="/api/placeholder/100/100" alt="Community" className="w-24 h-24 rounded-lg object-cover" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{user?.community || 'Kigali Village'}</h3>
            <p className="text-sm text-gray-600 mb-3">Eastern Province, Rwanda</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-[#1D3557]">45</p>
                <p className="text-xs text-gray-600">Sponsored Children</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1D3557]">32</p>
                <p className="text-xs text-gray-600">Families</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1D3557]">~850</p>
                <p className="text-xs text-gray-600">Population</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Timeline */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { icon: CheckCircle, color: 'text-green-600', text: 'Health record updated for Child #1234', time: '2 hours ago' },
              { icon: Mail, color: 'text-blue-600', text: 'New sponsor letter received', time: '5 hours ago' },
              { icon: FileText, color: 'text-yellow-600', text: 'Budget submitted for review', time: '1 day ago' },
              { icon: Heart, color: 'text-red-600', text: 'New child sponsorship activated', time: '2 days ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <activity.icon className={`h-5 w-5 ${activity.color} mt-0.5`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Alerts & Tasks</h2>
          <div className="space-y-3">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">Health Alert</p>
                  <p className="text-xs text-gray-600 mt-1">Child #1245 missed vaccination appointment</p>
                  <p className="text-xs text-red-600 mt-2 font-medium">Due: Today</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">Budget Pending</p>
                  <p className="text-xs text-gray-600 mt-1">Q1 2025 budget needs to be filled</p>
                  <p className="text-xs text-yellow-600 mt-2 font-medium">Due: Jan 31, 2025</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">Sponsor Letters</p>
                  <p className="text-xs text-gray-600 mt-1">8 letters awaiting response</p>
                  <p className="text-xs text-blue-600 mt-2 font-medium">Action needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
