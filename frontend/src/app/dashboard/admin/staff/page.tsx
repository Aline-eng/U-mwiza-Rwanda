'use client'

import { UserPlus, Search, Edit, Trash2, MapPin } from 'lucide-react'
import { useState } from 'react'

const staffMembers = [
  { id: 1, name: 'John Doe', email: 'john@umwiza.org', role: 'Staff', community: 'Kigali Village', status: 'Active', joined: 'Jan 2023' },
  { id: 2, name: 'Jane Smith', email: 'jane@umwiza.org', role: 'Staff', community: 'Musanze District', status: 'Active', joined: 'Mar 2023' },
  { id: 3, name: 'Paul Kagame', email: 'paul@umwiza.org', role: 'Staff', community: 'Rubavu Town', status: 'Active', joined: 'Jun 2023' },
]

export default function StaffManagement() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage staff members and community assignments</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Add Staff
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff by name, email, or community..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Staff Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Community</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staffMembers.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{staff.name}</p>
                      <p className="text-sm text-gray-600">{staff.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {staff.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{staff.community}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{staff.joined}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <Edit className="h-4 w-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Staff Member</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="email@umwiza.org"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none">
                  <option>Staff</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign Community</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none">
                  <option>Select community...</option>
                  <option>Kigali Village</option>
                  <option>Musanze District</option>
                  <option>Rubavu Town</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-[#1D3557] text-white px-4 py-2 rounded-lg hover:bg-[#1D3557]/90 transition">
                  Add Staff
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
