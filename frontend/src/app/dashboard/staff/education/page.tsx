'use client'

import { GraduationCap, Search, Filter, Plus, Calendar, User, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

interface EducationRecord {
  id: string
  academicYear: string
  term: string
  gradeLevel: string
  schoolName: string
  attendancePercentage: number
  overallPercentage: number
  rankInClass?: number
  totalStudents?: number
  child: {
    firstName: string
    lastName: string
    childCode: string
  }
  teacherName?: string
  teacherComments?: string
}

export default function EducationReports() {
  const [records, setRecords] = useState<EducationRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEducationRecords()
  }, [])

  const loadEducationRecords = async () => {
    try {
      setLoading(true)
      // Mock data
      const mockRecords: EducationRecord[] = [
        {
          id: '1',
          academicYear: '2024',
          term: 'Term 3',
          gradeLevel: 'Grade 6',
          schoolName: 'Kigali Primary School',
          attendancePercentage: 95.5,
          overallPercentage: 87.5,
          rankInClass: 3,
          totalStudents: 45,
          child: { firstName: 'Amani', lastName: 'Uwase', childCode: 'CH001' },
          teacherName: 'Mrs. Uwimana',
          teacherComments: 'Excellent student with strong performance in mathematics and science'
        },
        {
          id: '2',
          academicYear: '2024',
          term: 'Term 3',
          gradeLevel: 'Grade 4',
          schoolName: 'Hope Academy',
          attendancePercentage: 92.0,
          overallPercentage: 78.5,
          rankInClass: 8,
          totalStudents: 32,
          child: { firstName: 'Jean', lastName: 'Mugabo', childCode: 'CH002' },
          teacherName: 'Mr. Nkusi',
          teacherComments: 'Good progress in all subjects, particularly enjoys science experiments'
        },
        {
          id: '3',
          academicYear: '2024',
          term: 'Term 3',
          gradeLevel: 'Grade 8',
          schoolName: 'St. Mary Secondary',
          attendancePercentage: 98.0,
          overallPercentage: 91.2,
          rankInClass: 2,
          totalStudents: 38,
          child: { firstName: 'Grace', lastName: 'Ishimwe', childCode: 'CH003' },
          teacherName: 'Mrs. Mukamana',
          teacherComments: 'Outstanding academic performance, shows leadership qualities'
        }
      ]
      setRecords(mockRecords)
    } finally {
      setLoading(false)
    }
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600'
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getGradeColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-green-100 text-green-700'
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
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
          <h1 className="text-2xl font-bold text-gray-900">Education Reports</h1>
          <p className="text-sm text-gray-600 mt-1">Track academic progress and school performance</p>
        </div>
        <button className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Report
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by child name, school, or academic year..."
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
                <div className="p-3 bg-blue-100 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{record.academicYear} - {record.term}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {record.gradeLevel}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {record.child.firstName} {record.child.lastName} ({record.child.childCode})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{record.schoolName}</span>
                    </div>
                  </div>

                  {record.teacherComments && (
                    <p className="text-gray-600 text-sm italic mb-4">"{record.teacherComments}"</p>
                  )}
                </div>
              </div>
              
              <span className={`px-4 py-2 text-lg font-bold rounded-lg ${getGradeColor(record.overallPercentage)}`}>
                {record.overallPercentage}%
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Attendance</p>
                <p className={`text-lg font-bold ${getPerformanceColor(record.attendancePercentage)}`}>
                  {record.attendancePercentage}%
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Overall Score</p>
                <p className={`text-lg font-bold ${getPerformanceColor(record.overallPercentage)}`}>
                  {record.overallPercentage}%
                </p>
              </div>
              {record.rankInClass && (
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Class Rank</p>
                  <p className="text-lg font-bold text-gray-900">
                    {record.rankInClass}/{record.totalStudents}
                  </p>
                </div>
              )}
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">Teacher</p>
                <p className="text-sm font-medium text-gray-900">{record.teacherName}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                View Report Card
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