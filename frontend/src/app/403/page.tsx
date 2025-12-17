'use client'

import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="mb-6">
            <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
          
          <div className="space-y-3">
            <Link
              href="/dashboard/staff"
              className="block w-full bg-[#1D3557] text-white px-6 py-3 rounded-lg hover:bg-[#1D3557]/90 transition font-medium"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 w-full border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}