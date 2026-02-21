'use client'

import { useEffect, useState } from 'react'
import StatCard from '@/components/dashboard/StatCard'
import ProtectedRoute from '@/components/dashboard/ProtectedRoute'
import { motion } from 'framer-motion'
import {
  Heart, FileText, Activity, Mail, Clock, CheckCircle,
  AlertCircle, Users, ArrowUpRight, TrendingUp, MapPin,
} from 'lucide-react'
import { getCurrentUser } from '@/lib/auth'

interface DashboardData {
  user: { name: string; community: string }
  stats: { totalChildren: number; pendingBudgets: number; healthAlerts: number; newLetters: number }
}

// Mock sparklines per stat
const sparks = {
  children: [35, 38, 40, 41, 42, 43, 44, 44, 45, 45, 45, 45],
  budgets:  [0, 1, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2],
  alerts:   [0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
  letters:  [2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8],
}

const activities = [
  { icon: CheckCircle, color: 'text-emerald-400', text: 'Health record updated — Child #1234', time: '2h ago' },
  { icon: Mail,        color: 'text-blue-400',    text: 'New sponsor letter received',         time: '5h ago' },
  { icon: FileText,    color: 'text-amber-400',   text: 'Budget submitted for review',         time: '1d ago'  },
  { icon: Heart,       color: 'text-rose-400',    text: 'New child sponsorship activated',     time: '2d ago'  },
]

const alerts = [
  {
    icon: AlertCircle,
    title: 'Health Alert',
    desc: 'Child #1245 missed vaccination appointment',
    due: 'Due: Today',
    type: 'red',
    bg: 'bg-red-500/10 border-red-500/20',
    color: 'text-red-400',
    due_color: 'text-red-400',
  },
  {
    icon: FileText,
    title: 'Budget Pending',
    desc: 'Q1 2025 budget needs to be submitted',
    due: 'Due: Jan 31, 2025',
    type: 'yellow',
    bg: 'bg-amber-500/10 border-amber-500/20',
    color: 'text-amber-400',
    due_color: 'text-amber-400',
  },
  {
    icon: Mail,
    title: 'Sponsor Letters',
    desc: '8 letters awaiting your response',
    due: 'Action needed',
    type: 'blue',
    bg: 'bg-blue-500/10 border-blue-500/20',
    color: 'text-blue-400',
    due_color: 'text-blue-400',
  },
]

// Family progress cards data
const familyProgress = [
  { name: 'Muhire Family',   children: 3, status: 'Active',   progress: 92, spark: [70,75,80,82,84,86,88,90,91,92,92,92], color: '#10B981' },
  { name: 'Kagabo Family',   children: 2, status: 'Active',   progress: 78, spark: [55,58,62,65,68,70,72,74,76,77,78,78], color: '#3B82F6' },
  { name: 'Uwera Family',    children: 1, status: 'At Risk',  progress: 45, spark: [60,58,55,52,50,48,47,46,45,45,45,45], color: '#F59E0B' },
  { name: 'Nkurunziza Fam.', children: 4, status: 'Active',   progress: 85, spark: [70,72,74,76,78,80,81,82,83,84,85,85], color: '#A78BFA' },
]

export default function StaffDashboard() {
  const [user, setUser] = useState<any>(null)
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setData({
      user: { name: currentUser?.name || 'John Doe', community: currentUser?.community || 'Kigali Village' },
      stats: { totalChildren: 45, pendingBudgets: 2, healthAlerts: 1, newLetters: 8 },
    })
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={['STAFF']}>
        <div className="flex items-center justify-center min-h-96">
          <div className="h-10 w-10 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      </ProtectedRoute>
    )
  }

  const firstName = data?.user.name?.split(' ')[0] || user?.name?.split(' ')[0] || 'there'
  const community = data?.user.community || user?.community || 'your community'

  return (
    <ProtectedRoute allowedRoles={['STAFF']}>
      <div className="space-y-6">

        {/* ── Welcome banner ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-700/80 via-emerald-800/70 to-slate-900 border border-emerald-600/20 p-7"
        >
          <div className="absolute inset-0 bg-dot-pattern opacity-20" />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="badge-emerald mb-3 w-fit">
                <TrendingUp className="h-3.5 w-3.5 inline mr-1" strokeWidth={2} />Staff Dashboard
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1.5">
                Welcome back, {firstName}!
              </h1>
              <p className="text-emerald-200/80 text-sm flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
                {community} · Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Stat Cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { title: 'Sponsored Children', value: data?.stats.totalChildren || 45,   icon: Heart,     trend: '+3 this month', trendUp: true,  color: 'blue'   as const, sparkData: sparks.children },
            { title: 'Pending Budgets',    value: data?.stats.pendingBudgets || 2,    icon: FileText,  trend: 'Need review',   trendUp: false, color: 'yellow' as const, sparkData: sparks.budgets  },
            { title: 'Health Alerts',      value: data?.stats.healthAlerts || 1,      icon: Activity,  trend: 'Needs action',  trendUp: false, color: 'red'    as const, sparkData: sparks.alerts   },
            { title: 'New Letters',        value: data?.stats.newLetters || 8,        icon: Mail,      trend: 'Awaiting reply',trendUp: true,  color: 'green'  as const, sparkData: sparks.letters  },
          ].map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <StatCard {...card} />
            </motion.div>
          ))}
        </div>

        {/* ── Mid section: Community card + Activity + Alerts ───────── */}
        <div className="grid lg:grid-cols-3 gap-5">

          {/* Community Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-lg font-bold text-white tracking-tight mb-4">Your Community</h2>
            <div className="relative h-28 rounded-xl overflow-hidden mb-4">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
                alt={community}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-bold text-sm">{community}</p>
                <p className="text-white/60 text-xs flex items-center gap-1">
                  <MapPin className="h-3 w-3" strokeWidth={2} />Eastern Province, Rwanda
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Sponsored', value: '45' },
                { label: 'Families',  value: '32' },
                { label: 'Population',value: '~850' },
              ].map((s) => (
                <div key={s.label} className="text-center p-2 bg-slate-800/60 rounded-xl border border-slate-700">
                  <p className="text-lg font-bold text-white">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white tracking-tight">Recent Activity</h2>
              <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors">
                All <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              </button>
            </div>
            <div className="space-y-1">
              {activities.map((a, i) => {
                const Icon = a.icon
                return (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-slate-800 last:border-0">
                    <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg bg-slate-800">
                      <Icon className={`h-3.5 w-3.5 ${a.color}`} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-200 leading-snug">{a.text}</p>
                      <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" strokeWidth={2} />{a.time}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Alerts & Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="text-lg font-bold text-white tracking-tight mb-4">Alerts & Tasks</h2>
            <div className="space-y-3">
              {alerts.map((a, i) => {
                const Icon = a.icon
                return (
                  <div key={i} className={`p-3.5 rounded-xl border ${a.bg}`}>
                    <div className="flex items-start gap-2.5">
                      <Icon className={`h-4 w-4 ${a.color} mt-0.5 flex-shrink-0`} strokeWidth={2} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white">{a.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5 leading-snug">{a.desc}</p>
                        <p className={`text-xs font-semibold mt-1.5 ${a.due_color}`}>{a.due}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Family Progress Cards ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white tracking-tight">Family Progress</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors">
              View all families <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {familyProgress.map((fam) => (
              <div
                key={fam.name}
                className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">{fam.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <Users className="h-3 w-3" strokeWidth={2} />
                      {fam.children} {fam.children === 1 ? 'child' : 'children'}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                      fam.status === 'Active'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    }`}
                  >
                    {fam.status}
                  </span>
                </div>

                {/* Sparkline */}
                <div className="h-8 mb-3">
                  {/* inline sparkline using SVG */}
                  {(() => {
                    const d = fam.spark
                    const w = 100; const h = 32
                    const max = Math.max(...d); const min = Math.min(...d)
                    const range = max - min || 1
                    const step = w / (d.length - 1)
                    const pts = d.map((v, i) => ({ x: i * step, y: h - ((v - min) / range) * (h - 4) - 2 }))
                    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
                    const area = `${line} L ${w} ${h} L 0 ${h} Z`
                    const gId = `fp-${fam.name.replace(/\s/g, '')}`
                    return (
                      <svg width="100%" height="32" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                          <linearGradient id={gId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={fam.color} stopOpacity="0.25" />
                            <stop offset="100%" stopColor={fam.color} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d={area} fill={`url(#${gId})`} />
                        <path d={line} stroke={fam.color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )
                  })()}
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-semibold" style={{ color: fam.color }}>{fam.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fam.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: fam.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </ProtectedRoute>
  )
}
