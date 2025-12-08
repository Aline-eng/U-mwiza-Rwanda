'use client'

import { Upload, Image, Video, FileText, X } from 'lucide-react'
import { useState } from 'react'

export default function MediaUpload() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<any[]>([])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Letters & Media Upload</h1>
        <p className="text-sm text-gray-600 mt-1">Upload photos, videos, and letters for sponsored children</p>
      </div>

      {/* Upload Area */}
      <div
        className={`bg-white rounded-xl p-8 border-2 border-dashed transition ${
          dragActive ? 'border-[#2A9D8F] bg-[#2A9D8F]/5' : 'border-gray-300'
        }`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
        }}
      >
        <div className="text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Drop files here or click to upload</h3>
          <p className="text-sm text-gray-600 mb-4">Support for photos (JPG, PNG), videos (MP4), and documents (PDF)</p>
          <button className="bg-[#1D3557] text-white px-6 py-2 rounded-lg hover:bg-[#1D3557]/90 transition">
            Browse Files
          </button>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Upload Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none">
              <option>Select a child...</option>
              <option>Amani Uwase (#1234)</option>
              <option>Jean Mugabo (#1235)</option>
              <option>Grace Ishimwe (#1236)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Image, label: 'Photo', color: 'blue' },
                { icon: Video, label: 'Video', color: 'purple' },
                { icon: FileText, label: 'Letter', color: 'green' },
              ].map((type) => (
                <button
                  key={type.label}
                  className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 rounded-lg hover:border-[#2A9D8F] hover:bg-[#2A9D8F]/5 transition"
                >
                  <type.icon className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={4}
              placeholder="Add a description or note about this upload..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2A9D8F] focus:border-transparent outline-none resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-[#1D3557] text-white px-6 py-3 rounded-lg hover:bg-[#1D3557]/90 transition font-medium">
              Upload Files
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Uploads</h3>
        <div className="space-y-3">
          {[
            { name: 'amani_school_photo.jpg', type: 'Photo', child: 'Amani Uwase', date: '2 hours ago', size: '2.4 MB' },
            { name: 'letter_to_sponsor.pdf', type: 'Letter', child: 'Jean Mugabo', date: '1 day ago', size: '156 KB' },
            { name: 'community_event.mp4', type: 'Video', child: 'Grace Ishimwe', date: '3 days ago', size: '45 MB' },
          ].map((file, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#2A9D8F] transition">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${
                  file.type === 'Photo' ? 'bg-blue-100' : file.type === 'Video' ? 'bg-purple-100' : 'bg-green-100'
                }`}>
                  {file.type === 'Photo' && <Image className="h-5 w-5 text-blue-600" />}
                  {file.type === 'Video' && <Video className="h-5 w-5 text-purple-600" />}
                  {file.type === 'Letter' && <FileText className="h-5 w-5 text-green-600" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-600">{file.child} • {file.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{file.date}</span>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
