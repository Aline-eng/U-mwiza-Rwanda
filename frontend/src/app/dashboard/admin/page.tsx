'use client'

import StatCard from '@/components/dashboard/StatCard'
import ProtectedRoute from '@/components/dashboard/ProtectedRoute'
import MiniSparkline from '@/components/dashboard/MiniSparkline'
import { motion } from 'framer-motion'
import {
  Users, Heart, AlertTriangle, Activity, TrendingUp,
  CheckCircle, Clock, ArrowUpRight, BarChart3, Shield,
  Circle, DollarSign,
} from 'lucide-react'

// Mock sparkline data
const spark = {
  staff:    [18, 19, 20, 21, 20, 22, 23, 24, 24, 24, 24, 24],
  children: [280, 295, 305, 310, 318, 322, 328, 335, 338, 340, 341, 342],
  approvals:[4, 6, 5, 8, 7, 9, 6, 8, 7, 9, 8, 8],
  comms:    [8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 12],
}

const staffPerformance = [
  { name: 'John Doe',         community: 'Kigali Village',    tasks: 12, done: 10 },
  { name: 'Jane Smith',       community: 'Musanze District',  tasks: 8,  done: 8  },
  { name: 'Paul Nkurunziza',  community: 'Rubavu Town',       tasks: 15, done: 12 },
  { name: 'Alice Uwimana',    community: 'Huye Province',     tasks: 10, done: 9  },
]

const pendingApprovals = [
  { type: 'Budget',  staff: 'John Doe',   item: 'Q1 2025 Budget Plan',      priority: 'High' },
  { type: 'Event',   staff: 'Jane Smith', item: 'Community Gathering March', priority: 'Medium' },
  { type: 'Report',  staff: 'Paul N.',    item: 'Monthly Field Report',      priority: 'Low' },
]

const recentActivity = [
  { action: 'New staff member onboarded',       user: 'Admin',  time: '1h ago',  icon: Users,       color: 'text-blue-400' },
  { action: 'Budget approved — Kigali Village', user: 'Admin',  time: '3h ago',  icon: DollarSign,  color: 'text-emerald-400' },
  { action: 'Monthly report generated',         user: 'System', time: '1d ago',  icon: BarChart3,   color: 'text-purple-400' },
  { action: 'New child sponsorship activated',  user: 'Staff',  time: '2d ago',  icon: Heart,       color: 'text-rose-400' },
]

const priorityColors: Record<string, string> = {
  High:   'badge-red',
  Medium: 'badge-amber',
  Low:    'badge-blue',
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <div className="space-y-6">

        {/* ── Welcome banner ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/90 to-blue-800/90 border border-blue-500/20 p-7"
        >
          <div className="absolute inset-0 bg-dot-pattern opacity-20" />
          <div className="absolute right-0 top-0 h-full w-64 bg-gradient-radial from-white/5 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 badge-blue mb-3 w-fit bg-white/15 border-white/20 text-white/90">
              <Shield className="h-3.5 w-3.5" strokeWidth={2} /> Admin Portal
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-1.5">Admin Dashboard</h1>
            <p className="text-blue-200 text-sm">System-wide overview · All communities · Real-time data</p>
          </div>
        </motion.div>

        {/* ── Stat Cards — Bento ────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { title: 'Total Staff',        value: 24,  icon: Users,         trend: '+2 this month', trendUp: true,  color: 'blue'   as const, sparkData: spark.staff    },
            { title: 'Sponsored Children', value: 342, icon: Heart,         trend: '+15 this month',trendUp: true,  color: 'green'  as const, sparkData: spark.children  },
            { title: 'Pending Approvals',  value: 8,   icon: AlertTriangle, trend: '2 high priority',trendUp: false, color: 'yellow' as const, sparkData: spark.approvals },
            { title: 'Active Communities', value: 12,  icon: Activity,      trend: '+1 this month', trendUp: true,  color: 'purple' as const, sparkData: spark.comms    },
          ].map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <StatCard {...card} />
            </motion.div>
          ))}
        </div>

        {/* ── Mid Row ───────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-5">

          {/* Staff Performance — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white tracking-tight">Staff Performance</h2>
              <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium flex items-center gap-1">
                View all <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              </button>
            </div>
            <div className="space-y-4">
              {staffPerformance.map((staff) => {
                const pct = Math.round((staff.done / staff.tasks) * 100)
                return (
                  <div key={staff.name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                          {staff.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{staff.name}</p>
                          <p className="text-xs text-slate-500">{staff.community}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold ${pct >= 90 ? 'text-emerald-400' : pct >= 70 ? 'text-amber-400' : 'text-red-400'}`}>
                        {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                        className={`h-full rounded-full ${pct >= 90 ? 'bg-emerald-500' : pct >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                      />
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{staff.done} of {staff.tasks} tasks</p>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Pending Approvals — 1 col */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white tracking-tight">Approvals</h2>
              <span className="badge-amber">{pendingApprovals.length} pending</span>
            </div>
            <div className="space-y-3">
              {pendingApprovals.map((item, i) => (
                <div key={i} className="p-3.5 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500/30 transition-colors">
                  <div className="flex items-start justify-between mb-2.5">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{item.item}</p>
                      <p className="text-xs text-slate-500 mt-0.5">By {item.staff}</p>
                    </div>
                    <span className={`${priorityColors[item.priority]} ml-2 flex-shrink-0`}>{item.priority}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 btn-emerald py-1.5 text-xs rounded-lg">Approve</button>
                    <button className="flex-1 py-1.5 text-xs rounded-lg border border-slate-700 text-slate-400 hover:border-red-500/30 hover:text-red-400 transition-colors">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Row ────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-5">

          {/* Financial Overview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-lg font-bold text-white tracking-tight mb-5">Financial Overview</h2>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: 'Total Budget',  value: '$125,000', color: 'border-blue-500/30 bg-blue-500/5' },
                { label: 'Spent',         value: '$87,500',  color: 'border-emerald-500/30 bg-emerald-500/5' },
                { label: 'Remaining',     value: '$37,500',  color: 'border-amber-500/30 bg-amber-500/5' },
                { label: 'Utilization',   value: '70%',      color: 'border-purple-500/30 bg-purple-500/5' },
              ].map((item) => (
                <div key={item.label} className={`p-3.5 rounded-xl border ${item.color}`}>
                  <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
            {/* Budget utilization bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500">Budget utilization</span>
                <span className="text-amber-400 font-semibold">70%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-lg font-bold text-white tracking-tight mb-5">Recent Activity</h2>
            <div className="space-y-1">
              {recentActivity.map((a, i) => {
                const Icon = a.icon
                return (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-slate-800 last:border-0">
                    <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg bg-slate-800">
                      <Icon className={`h-3.5 w-3.5 ${a.color}`} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-200">{a.action}</p>
                      <p className="text-xs text-slate-500 mt-0.5">By {a.user}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-600 flex-shrink-0">
                      <Clock className="h-3 w-3" strokeWidth={2} />
                      {a.time}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </ProtectedRoute>
  )
}
