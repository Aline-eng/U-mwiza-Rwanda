'use client'

import { Heart, Search, Filter } from 'lucide-react'
import Link from 'next/link'

const children = [
  { id: 1234, name: 'Amani Uwase', age: 12, gender: 'Female', school: 'Kigali Primary', status: 'Active', photo: '/api/placeholder/80/80' },
  { id: 1235, name: 'Jean Mugabo', age: 10, gender: 'Male', school: 'Hope Academy', status: 'Active', photo: '/api/placeholder/80/80' },
  { id: 1236, name: 'Grace Ishimwe', age: 14, gender: 'Female', school: 'St. Mary Secondary', status: 'Active', photo: '/api/placeholder/80/80' },
  { id: 1237, name: 'David Nkusi', age: 8, gender: 'Male', school: 'Kigali Primary', status: 'Active', photo: '/api/placeholder/80/80' },
]

export default function SponsoredChildren() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sponsored Children</h1>
          <p className="text-sm text-gray-600 mt-1">Manage and track all sponsored children in your community</p>
        </div>
        <button className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2">
          <Heart className="h-4 w-4" />
          Add Child
        </button>
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
                <img src={child.photo} alt={child.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{child.name}</h3>
                  <p className="text-sm text-gray-600">ID: #{child.id}</p>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-gray-600">Age: {child.age} • {child.gender}</p>
                    <p className="text-xs text-gray-600">{child.school}</p>
                  </div>
                  <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    {child.status}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
