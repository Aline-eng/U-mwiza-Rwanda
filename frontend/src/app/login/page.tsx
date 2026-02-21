'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Mail, Lock, Shield, AlertCircle, Eye, EyeOff,
  ArrowLeft, Fingerprint, Key, CheckCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { login } from '@/lib/auth'

const securityFeatures = [
  { icon: Fingerprint, label: 'Biometric Ready', desc: 'Secure device authentication' },
  { icon: Key, label: 'JWT Secured', desc: 'Token-based session management' },
  { icon: Shield, label: 'Encrypted', desc: 'End-to-end data protection' },
]

const trustIndicators = [
  '256-bit AES encryption',
  'Multi-factor authentication',
  'Audit log monitoring',
  'GDPR compliant',
]

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const user = login(email, password)
    if (user) {
      if (user.role === 'ADMIN') {
        router.push('/dashboard/admin')
      } else {
        router.push('/dashboard/staff')
      }
    } else {
      setError('Invalid email or password. Please check your credentials.')
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-[#020617] flex relative overflow-hidden"
      aria-label="Login page"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/8 blur-[120px] rounded-full pointer-events-none" />

      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-14 overflow-hidden">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/95 via-[#020617]/80 to-[#020617]/70" />
          {/* Left edge fade */}
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group" aria-label="Back to homepage">
            <img src="/logo.png" alt="U'mwiza Rwanda" className="h-10 w-auto" />
            <div>
              <div className="font-bold text-white">U&apos;mwiza Rwanda</div>
              <div className="text-xs text-slate-500 tracking-widest uppercase">Hope · Love · Change</div>
            </div>
          </Link>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 badge-blue mb-6">
              <Shield className="h-3.5 w-3.5" strokeWidth={2} />
              Staff Secure Portal
            </div>

            <h1 className="text-4xl font-bold text-white mb-5 tracking-tight leading-tight">
              Making a Difference,<br /> Together.
              {/* <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                
              </span> */}
            </h1>

            <blockquote className="text-slate-400 text-lg italic leading-relaxed mb-2 border-l-2 border-blue-500/40 pl-5">
              &ldquo;Every family we support is a step towards a brighter Rwanda.&rdquo;
            </blockquote>
            <p className="text-slate-600 text-sm pl-5">— U&apos;mwiza Rwanda Team</p>
          </motion.div>

          {/* Security features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-10 grid grid-cols-3 gap-4"
          >
            {securityFeatures.map((feat) => {
              const Icon = feat.icon
              return (
                <div key={feat.label} className="glass-card rounded-xl p-4 text-center">
                  <div className="inline-flex p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-2">
                    <Icon className="h-4 w-4 text-blue-400" strokeWidth={2} />
                  </div>
                  <div className="text-white text-xs font-semibold">{feat.label}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{feat.desc}</div>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom trust */}
        <div className="relative z-10">
          <div className="glass-card rounded-xl p-4">
            <div className="text-slate-400 text-xs font-medium mb-3 uppercase tracking-wider">Security Standards</div>
            <div className="grid grid-cols-2 gap-2">
              {trustIndicators.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle className="h-3 w-3 text-emerald-400 flex-shrink-0" strokeWidth={2} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel — Login Form ─────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 relative">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex flex-col items-center gap-2" aria-label="Homepage">
              <img src="/logo.png" alt="U'mwiza Rwanda" className="h-14 w-auto" />
              <span className="text-2xl font-bold text-white tracking-tight">U&apos;mwiza Rwanda</span>
            </Link>
          </div>

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="glass-card rounded-3xl p-8 md:p-10 shadow-card-dark-lg"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
                <Shield className="h-7 w-7 text-blue-400" strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mb-1.5">Staff Portal</h2>
              <p className="text-slate-400 text-sm font-medium flex items-center justify-center gap-1.5">
                <Lock className="h-3.5 w-3.5" strokeWidth={2} />
                Authorized Personnel Only
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6"
                role="alert"
              >
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" strokeWidth={2} />
                <span className="text-sm text-red-300 font-medium">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
                    strokeWidth={2}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full  py-3.5 th input-dark rounded-xl !pl-12 !pr-4"
                    placeholder="staff@umwiza.org"
                    aria-label="Email address"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
                    strokeWidth={2}
                  />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full py-3.5 input-dark rounded-xl !pl-14 !pr-12"
                    placeholder="••••••••"
                    aria-label="Password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-smooth"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" strokeWidth={2} />
                    ) : (
                      <Eye className="h-4 w-4" strokeWidth={2} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-electric py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                aria-label="Login securely"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" strokeWidth={2} />
                    Login Securely
                  </>
                )}
              </button>
            </form>

            {/* Forgot credentials */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Forgot your credentials?{' '}
                <span className="text-blue-400 font-semibold cursor-pointer hover:text-blue-300 transition-smooth">
                  Contact Admin
                </span>
              </p>
            </div>

            {/* Security badge */}
            <div className="mt-6 p-3.5 bg-slate-800/60 border border-slate-700 rounded-xl">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Shield className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2} />
                All login attempts are monitored · JWT secured · Encrypted session
              </div>
            </div>
          </motion.div>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-smooth text-sm group"
              aria-label="Back to homepage"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
