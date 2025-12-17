'use client'

import { Activity, Search, Filter, Plus, Calendar, User } from 'lucide-react'
import { useEffect, useState } from 'react'

interface HealthRecord {
  id: string
  recordDate: string
  recordType: string
  title: string
  description: string
  child: {
    firstName: string
    lastName: string
    childCode: string
  }
  hospitalName?: string
  status: string
}

export default function HealthRecords() {
  const [records, setRecords] = useState<HealthRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHealthRecords()
  }, [])

  const loadHealthRecords = async () => {
    try {
      setLoading(true)
      // Mock data
      const mockRecords: HealthRecord[] = [
        {
          id: '1',
          recordDate: '2025-01-15',
          recordType: 'CHECKUP',
          title: 'Regular Health Checkup',
          description: 'Annual health screening - all indicators normal',
          child: { firstName: 'Amani', lastName: 'Uwase', childCode: 'CH001' },
          hospitalName: 'Kigali Health Center',
          status: 'COMPLETED'
        },
        {
          id: '2',
          recordDate: '2024-12-10',
          recordType: 'VACCINATION',
          title: 'Flu Vaccination',
          description: 'Annual flu vaccine administered successfully',
          child: { firstName: 'Jean', lastName: 'Mugabo', childCode: 'CH002' },
          hospitalName: 'Hope Medical Center',
          status: 'COMPLETED'
        },
        {
          id: '3',
          recordDate: '2025-01-20',
          recordType: 'ILLNESS',
          title: 'Malaria Treatment',
          description: 'Treated for malaria, recovery progressing well',
          child: { firstName: 'Grace', lastName: 'Ishimwe', childCode: 'CH003' },
          hospitalName: 'Musanze Hospital',
          status: 'ONGOING'
        }
      ]
      setRecords(mockRecords)
    } finally {
      setLoading(false)
    }
  }

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'CHECKUP': return 'bg-blue-100 text-blue-700'
      case 'VACCINATION': return 'bg-green-100 text-green-700'
      case 'ILLNESS': return 'bg-red-100 text-red-700'
      case 'HOSPITAL_VISIT': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
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
          <h1 className="text-2xl font-bold text-gray-900">Health Records</h1>
          <p className="text-sm text-gray-600 mt-1">Track medical visits and health status updates</p>
        </div>
        <button className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Record
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by child name, record type, or hospital..."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Activity className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{record.title}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getRecordTypeColor(record.recordType)}`}>
                      {record.recordType}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{record.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {record.child.firstName} {record.child.lastName} ({record.child.childCode})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{new Date(record.recordDate).toLocaleDateString()}</span>
                    </div>
                    {record.hospitalName && (
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{record.hospitalName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                record.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                record.status === 'ONGOING' ? 'bg-yellow-100 text-yellow-700' : 
                'bg-gray-100 text-gray-700'
              }`}>
                {record.status}
              </span>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                View Details
              </button>
              <button className="flex-1 bg-[#2A9D8F] text-white px-4 py-2 rounded-lg hover:bg-[#2A9D8F]/90 transition text-sm font-medium">
                Update Record
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}