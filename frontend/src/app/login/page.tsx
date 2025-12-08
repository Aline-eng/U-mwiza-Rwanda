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
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-sky-600/90 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80)'
          }}
        ></div>
        <div className="relative z-20 flex flex-col justify-center px-12 text-white">
          <Shield className="h-16 w-16 mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Making a Difference Together
          </h2>
          <p className="text-xl text-sky-100 italic">
            "Every family we support is a step towards a brighter Rwanda."
          </p>
          <p className="mt-4 text-sky-200">— U'mwiza Rwanda Team</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Logo for Mobile */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="text-3xl font-bold text-sky-600">
              U'mwiza Rwanda
            </Link>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Staff Portal Access
              </h1>
              <p className="text-slate-600 flex items-center justify-center gap-2">
                <Shield className="h-4 w-4" />
                Authorized Personnel Only
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                    placeholder="staff@umwizarwanda.org"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login Securely'}
              </button>
            </form>

            {/* Forgot Password */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Forgot your credentials?{' '}
                <span className="text-sky-600 font-medium">
                  Contact Admin to reset credentials
                </span>
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-sky-50 rounded-lg border border-sky-200">
              <p className="text-xs text-slate-600 text-center">
                🔒 This is a secure portal. All login attempts are monitored and logged.
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-slate-600 hover:text-sky-600 transition text-sm"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
