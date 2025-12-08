'use client'

import { ArrowLeft, Heart, Activity, GraduationCap, DollarSign, FileText, Upload, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ChildProfile() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Heart },
    { id: 'health', label: 'Health', icon: Activity },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'letters', label: 'Letters', icon: Mail },
    { id: 'media', label: 'Media', icon: Upload },
  ]

  return (
    <div className="space-y-6">
      <Link href="/dashboard/staff/children" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4" />
        Back to Children
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#1D3557] to-[#2A9D8F]"></div>
        <div className="px-8 pb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6 -mt-16">
            <img src="/api/placeholder/120/120" alt="Child" className="w-32 h-32 rounded-xl border-4 border-white shadow-lg object-cover" />
            <div className="flex-1 mt-16 sm:mt-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Amani Uwase</h1>
                  <p className="text-gray-600">ID: #1234 • Age 12 • Female</p>
                </div>
                <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg">Active</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-xs text-gray-600">Village</p>
                  <p className="font-semibold text-gray-900">Kigali Village</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">School</p>
                  <p className="font-semibold text-gray-900">Kigali Primary</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Grade</p>
                  <p className="font-semibold text-gray-900">Grade 6</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Sponsor Since</p>
                  <p className="font-semibold text-gray-900">Jan 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#F4A261] text-[#F4A261]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Full Name</span>
                    <span className="font-medium">Amani Uwase</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Date of Birth</span>
                    <span className="font-medium">March 15, 2012</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Gender</span>
                    <span className="font-medium">Female</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Family ID</span>
                    <span className="font-medium">#FAM-456</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Family Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Guardian</span>
                    <span className="font-medium">Marie Uwase</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Relationship</span>
                    <span className="font-medium">Mother</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Siblings</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Address</span>
                    <span className="font-medium">Kigali Village, Sector 3</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Health Records</h3>
                <button className="bg-[#1D3557] text-white px-4 py-2 rounded-lg text-sm">Add Record</button>
              </div>
              <div className="space-y-3">
                {[
                  { date: 'Jan 15, 2025', type: 'Checkup', status: 'Healthy', notes: 'Regular checkup - all good' },
                  { date: 'Dec 10, 2024', type: 'Vaccination', status: 'Completed', notes: 'Flu vaccine administered' },
                ].map((record, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{record.type}</p>
                        <p className="text-sm text-gray-600 mt-1">{record.notes}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">{record.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{record.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Education Progress</h3>
                <button className="bg-[#1D3557] text-white px-4 py-2 rounded-lg text-sm">Add Report</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600">Current Grade</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">Grade 6</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">95%</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">85%</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'letters' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Sponsor Letters</h3>
                <button className="bg-[#1D3557] text-white px-4 py-2 rounded-lg text-sm">Upload Letter</button>
              </div>
              <div className="space-y-3">
                {[
                  { date: 'Jan 10, 2025', from: 'Sponsor', status: 'Pending Response', preview: 'Dear Amani, I hope you are doing well...' },
                  { date: 'Dec 20, 2024', from: 'Child', status: 'Sent', preview: 'Thank you for your support...' },
                ].map((letter, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-[#2A9D8F] transition cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">From: {letter.from}</p>
                        <p className="text-sm text-gray-600 mt-1">{letter.preview}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        letter.status === 'Pending Response' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }`}>{letter.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{letter.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
