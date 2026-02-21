'use client'

import { useState } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'
import ProtectedRoute from '@/components/dashboard/ProtectedRoute'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const sidebarWidth = sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'

  return (
    <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
      <div className="min-h-screen bg-[#020617]">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        />
        <div className={`${sidebarWidth} transition-all duration-300`}>
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-4 lg:p-7 min-h-[calc(100vh-64px)]">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
