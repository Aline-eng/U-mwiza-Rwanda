'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Users, GraduationCap, Globe, Heart, TrendingUp, Zap,
  ArrowUpRight,
} from 'lucide-react'

// ── Animated Counter ──────────────────────────────────────────────────────────
interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}

function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// ── Mini Sparkline (inline SVG) ───────────────────────────────────────────────
interface SparklineProps {
  data: number[]
  color: string
  height?: number
}

function Sparkline({ data, color, height = 40 }: SparklineProps) {
  const w = 120
  const h = height
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)

  const pts = data.map((v, i) => ({
    x: i * step,
    y: h - ((v - min) / range) * (h - 6) - 3,
  }))

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`
  const gradId = `spark-${color.replace('#', '')}-${Math.random().toString(36).slice(2,6)}`

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Bento Cards ───────────────────────────────────────────────────────────────
const familyData = [12, 18, 24, 30, 40, 52, 68, 90, 140, 180, 220, 250]
const studentData = [10, 20, 30, 45, 55, 65, 75, 88, 100, 108, 115, 120]
const volunteerData = [5, 12, 18, 22, 28, 35, 38, 42, 45, 48, 50, 53]

export default function LandingImpactGrid() {
  return (
    <section
      id="impact"
      className="py-28 bg-[#020617] relative overflow-hidden"
      aria-labelledby="impact-heading"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 badge-blue mb-5">
            <Zap className="h-3.5 w-3.5" strokeWidth={2} />
            Live Impact Data
          </div>
          <h2
            id="impact-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
          >
            Numbers That Tell Real Stories
            {/* <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              
            </span> */}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every metric represents a family lifted, a child educated, a community strengthened — updated in real time.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

          {/* ── Large Card: Families ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.6 }}
            className="glass-card-hover rounded-2xl p-7 lg:row-span-2 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Users className="h-5 w-5 text-blue-400" strokeWidth={2} />
                  </div>
                  <span className="text-slate-400 font-medium text-sm">Families Supported</span>
                </div>
                <a
                  href="#programs"
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-smooth"
                  aria-label="View families program"
                >
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </a>
              </div>

              <div className="text-6xl lg:text-7xl font-bold text-white mb-1 tracking-tight tabular-nums">
                <AnimatedCounter target={250} suffix="+" />
              </div>
              <div className="badge-blue inline-flex items-center gap-1.5 mt-2">
                <TrendingUp className="h-3 w-3" strokeWidth={2} />
                +18% this quarter
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">12-Month Growth</div>
              <Sparkline data={familyData} color="#3B82F6" height={48} />
            </div>
          </motion.div>

          {/* ── Card: Students ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="glass-card-hover rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-500/8 blur-3xl rounded-full pointer-events-none" />
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <GraduationCap className="h-5 w-5 text-emerald-400" strokeWidth={2} />
                </div>
                <span className="text-slate-400 font-medium text-sm">Students Sponsored</span>
              </div>
              <div className="text-5xl font-bold text-white tracking-tight tabular-nums">
                <AnimatedCounter target={120} />
              </div>
            </div>
            <div className="mt-4">
              <Sparkline data={studentData} color="#10B981" height={36} />
            </div>
          </motion.div>

          {/* ── Card: Communities ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="glass-card-hover rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-amber-500/8 blur-3xl rounded-full pointer-events-none" />
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Globe className="h-5 w-5 text-amber-400" strokeWidth={2} />
                </div>
                <span className="text-slate-400 font-medium text-sm">Communities Served</span>
              </div>
              <div className="text-5xl font-bold text-white tracking-tight tabular-nums">
                <AnimatedCounter target={5} />
              </div>
              <div className="mt-3 text-slate-500 text-sm">Across Rwanda's provinces</div>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              {['Kigali', 'Musanze', 'Rubavu', 'Huye', 'Nyagatare'].map((city) => (
                <span key={city} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700">
                  {city}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Card: Volunteers ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card-hover rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-rose-500/8 blur-3xl rounded-full pointer-events-none" />
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <Heart className="h-5 w-5 text-rose-400" strokeWidth={2} />
                </div>
                <span className="text-slate-400 font-medium text-sm">Active Volunteers</span>
              </div>
              <div className="text-5xl font-bold text-white tracking-tight tabular-nums">
                <AnimatedCounter target={53} suffix="+" />
              </div>
            </div>
            <div className="mt-4">
              <Sparkline data={volunteerData} color="#F43F5E" height={36} />
            </div>
          </motion.div>

          {/* ── Wide Card: Success Rate ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="glass-card-hover rounded-2xl p-7 md:col-span-2 lg:col-span-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 pointer-events-none" />
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-blue-500/20">
                <TrendingUp className="h-5 w-5 text-blue-400" strokeWidth={2} />
              </div>
              <span className="text-slate-400 font-medium text-sm">Programme Success Rate</span>
            </div>
            <div className="text-5xl font-bold text-white tracking-tight tabular-nums mb-2">
              <AnimatedCounter target={94} suffix="%" />
            </div>
            <p className="text-slate-500 text-sm mb-5">of sponsored children complete primary education</p>
            {/* Progress bar */}
            <div className="space-y-3">
              {[
                { label: 'Education', value: 94, color: '#3B82F6' },
                { label: 'Healthcare', value: 89, color: '#10B981' },
                { label: 'Family Stability', value: 97, color: '#F59E0B' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-slate-300 font-medium">{item.value}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
        >
          <p className="text-slate-400 font-medium">Ready to be part of these numbers?</p>
          <motion.a
            href="https://www.unbound.org/about/approach"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-electric px-8 py-3.5 rounded-xl inline-flex items-center gap-2"
          >
            Start Your Journey
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
