'use client'

import StatCard from '@/components/dashboard/StatCard'
import { Users, Heart, CheckCircle, AlertTriangle, TrendingUp, Activity } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1D3557] to-[#2A9D8F] rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-white/80">System overview and management</p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Staff" value={24} icon={Users} trend="+2 this month" color="blue" />
        <StatCard title="Sponsored Children" value={342} icon={Heart} trend="+15 this month" color="green" />
        <StatCard title="Pending Approvals" value={8} icon={AlertTriangle} color="yellow" />
        <StatCard title="Active Communities" value={12} icon={Activity} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Staff Performance</h2>
          <div className="space-y-4">
            {[
              { name: 'John Doe', community: 'Kigali Village', tasks: 12, completed: 10 },
              { name: 'Jane Smith', community: 'Musanze District', tasks: 8, completed: 8 },
              { name: 'Paul Kagame', community: 'Rubavu Town', tasks: 15, completed: 12 },
            ].map((staff, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{staff.name}</p>
                    <p className="text-sm text-gray-600">{staff.community}</p>
                  </div>
                  <span className="text-sm font-medium text-[#2A9D8F]">{Math.round((staff.completed / staff.tasks) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#2A9D8F] h-2 rounded-full"
                    style={{ width: `${(staff.completed / staff.tasks) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">{staff.completed} of {staff.tasks} tasks completed</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Approvals</h2>
          <div className="space-y-3">
            {[
              { type: 'Budget', staff: 'John Doe', item: 'Q1 2025 Budget', priority: 'High' },
              { type: 'Event', staff: 'Jane Smith', item: 'Community Gathering', priority: 'Medium' },
              { type: 'Report', staff: 'Paul Kagame', item: 'Monthly Report', priority: 'Low' },
            ].map((approval, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-[#2A9D8F] transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{approval.item}</p>
                    <p className="text-sm text-gray-600">By {approval.staff}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    approval.priority === 'High' ? 'bg-red-100 text-red-700' :
                    approval.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>{approval.priority}</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 bg-[#2A9D8F] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2A9D8F]/90 transition">
                    Approve
                  </button>
                  <button className="flex-1 border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Financial Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600">Total Budget</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">$125,000</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600">Spent</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">$87,500</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-600">Remaining</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">$37,500</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-gray-600">Utilization</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">70%</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent System Activity</h2>
        <div className="space-y-3">
          {[
            { action: 'New staff member added', user: 'Admin', time: '1 hour ago' },
            { action: 'Budget approved for Kigali Village', user: 'Admin', time: '3 hours ago' },
            { action: 'Event published to website', user: 'Admin', time: '5 hours ago' },
            { action: 'Monthly report generated', user: 'System', time: '1 day ago' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">By {activity.user}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
