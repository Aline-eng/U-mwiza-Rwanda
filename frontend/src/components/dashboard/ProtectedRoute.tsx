'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: ('STAFF' | 'ADMIN')[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    
    if (!currentUser) {
      router.push('/login')
      return
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      router.push('/403')
      return
    }

    setUser(currentUser)
    setLoading(false)
  }, [router, allowedRoles])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D3557] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}