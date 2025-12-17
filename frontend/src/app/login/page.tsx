'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Shield, AlertCircle } from 'lucide-react'
import { login } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
      setError('Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image with Overlay (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero-overlay z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 hover:scale-100 transition-transform duration-700"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80)'
          }}
        ></div>
        <div className="relative z-20 flex flex-col justify-center px-16 text-white">
          <div className="glass-dark p-4 rounded-2xl w-fit mb-8">
            <Shield className="h-16 w-16" />
          </div>
          <h2 className="text-5xl font-heading font-bold mb-6 leading-tight">
            Making a Difference<br />Together
          </h2>
          <p className="text-xl text-white/90 italic leading-relaxed mb-2">
            "Every family we support is a step towards a brighter Rwanda."
          </p>
          <p className="text-lg text-white/70 font-medium">— U'mwiza Rwanda Team</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo for Mobile */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex flex-col items-center gap-2">
              <img src="/logo.png" alt="U'mwiza Rwanda Logo" className="h-16 w-auto" />
              <span className="text-3xl font-heading font-bold text-gradient-primary">
                U'mwiza Rwanda
              </span>
            </Link>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-charity-xl p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">
                Staff Portal
              </h1>
              <p className="text-gray-600 flex items-center justify-center gap-2 font-medium">
                <Shield className="h-5 w-5 text-primary-500" />
                Authorized Personnel Only
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 animate-slide-down">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-smooth text-gray-900"
                    placeholder="staff@umwizarwanda.org"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-smooth text-gray-900"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login Securely'}
              </button>
            </form>

            {/* Forgot Password */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Forgot your credentials?{' '}
                <span className="text-primary-600 font-semibold">
                  Contact Admin
                </span>
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-primary-50 rounded-xl border border-primary-200">
              <p className="text-xs text-gray-600 text-center font-medium flex items-center justify-center gap-2">
                <Shield className="h-4 w-4 text-primary-600" />
                Secure portal • All login attempts are monitored
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-primary-600 transition-smooth text-sm font-medium inline-flex items-center gap-2"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
