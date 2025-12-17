'use client'

import { Users, Search, Filter, Plus } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Family {
  id: string
  familyCode: string
  motherName?: string
  fatherName?: string
  guardianName?: string
  address?: string
  totalChildren: number
  status: string
  community: {
    name: string
  }
  children: Array<{
    firstName: string
    lastName: string
    isSponsored: boolean
  }>
}

export default function FamilyProfiles() {
  const [families, setFamilies] = useState<Family[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFamilies()
  }, [])

  const loadFamilies = async () => {
    try {
      setLoading(true)
      // Mock data
      const mockFamilies: Family[] = [
        {
          id: '1',
          familyCode: 'FAM001',
          motherName: 'Marie Uwase',
          fatherName: 'Jean Baptiste',
          address: 'Kigali Village, Sector 3',
          totalChildren: 3,
          status: 'ACTIVE',
          community: { name: 'Kigali Village' },
          children: [
            { firstName: 'Amani', lastName: 'Uwase', isSponsored: true },
            { firstName: 'Jean', lastName: 'Mugabo', isSponsored: true }
          ]
        },
        {
          id: '2',
          familyCode: 'FAM002',
          guardianName: 'Grace Mukamana',
          address: 'Musanze Center, Cell Cyuve',
          totalChildren: 2,
          status: 'ACTIVE',
          community: { name: 'Musanze District' },
          children: [
            { firstName: 'Grace', lastName: 'Ishimwe', isSponsored: false }
          ]
        }
      ]
      setFamilies(mockFamilies)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D3557]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Family Profiles</h1>
          <p className="text-sm text-gray-600 mt-1">Manage family information and household members</p>
        </div>
        <button className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Family
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by family code, name, or address..."
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
        {families.map((family) => (
          <div key={family.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#2A9D8F] transition cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                family.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {family.status}
              </span>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">{family.familyCode}</h3>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p><strong>Guardian:</strong> {family.motherName || family.fatherName || family.guardianName}</p>
              <p><strong>Community:</strong> {family.community.name}</p>
              <p><strong>Address:</strong> {family.address}</p>
              <p><strong>Children:</strong> {family.totalChildren}</p>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-500 mb-2">Children in family:</p>
              <div className="space-y-1">
                {family.children.slice(0, 2).map((child, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span>{child.firstName} {child.lastName}</span>
                    {child.isSponsored && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Sponsored</span>
                    )}
                  </div>
                ))}
                {family.children.length > 2 && (
                  <p className="text-xs text-gray-400">+{family.children.length - 2} more</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}