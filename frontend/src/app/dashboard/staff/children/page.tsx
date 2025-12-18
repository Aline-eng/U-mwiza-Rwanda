'use client'

import { Heart, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { apiService } from '@/services/api'

interface Child {
  id: string
  childCode: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  photoUrl?: string
  isSponsored: boolean
  gradeLevel?: string
  schoolName?: string
  status: string
  family: {
    familyCode: string
    community: {
      name: string
    }
  }
  sponsor?: {
    firstName: string
    lastName: string
  }
}

export default function SponsoredChildren() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadChildren()
  }, [])

  const loadChildren = async () => {
    try {
      setLoading(true)
      // Use mock data for now, switch to real API when backend is ready
      const response = await apiService.getMockChildren()
      setChildren(response.data)
    } catch (err) {
      setError('Failed to load children')
      console.error('Error loading children:', err)
    } finally {
      setLoading(false)
    }
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birth = new Date(dateOfBirth)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D3557]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={loadChildren} className="bg-[#1D3557] text-white px-4 py-2 rounded-lg">
          Try Again
        </button>
      </div>
    )
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sponsored Children</h1>
          <p className="text-sm text-gray-600 mt-1">Manage and track all sponsored children in your community</p>
        </div>
        <Link href="/dashboard/staff/children/add" className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Add Child
        </Link>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or school..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children.map((child) => (
          <Link key={child.id} href={`/dashboard/staff/children/${child.id}`}>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#2A9D8F] transition cursor-pointer">
              <div className="flex items-start gap-4">
                <img 
                  src={child.photoUrl || '/api/placeholder/80/80'} 
                  alt={`${child.firstName} ${child.lastName}`} 
                  className="w-20 h-20 rounded-lg object-cover" 
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{child.firstName} {child.lastName}</h3>
                  <p className="text-sm text-gray-600">ID: {child.childCode}</p>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-gray-600">Age: {calculateAge(child.dateOfBirth)} • {child.gender}</p>
                    <p className="text-xs text-gray-600">{child.schoolName || 'No school assigned'}</p>
                    <p className="text-xs text-gray-600">{child.family.community.name}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      child.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {child.status}
                    </span>
                    {child.isSponsored && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        Sponsored
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
