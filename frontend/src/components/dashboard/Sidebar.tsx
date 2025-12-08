'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, LayoutDashboard, Users, Heart, Activity, GraduationCap, DollarSign, FileText, Upload, Bell, Calendar, Settings, UserCog, BarChart3, CheckSquare, Shield } from 'lucide-react'

const staffNav = [
  { name: 'Dashboard', href: '/dashboard/staff', icon: LayoutDashboard },
  { name: 'Sponsored Children', href: '/dashboard/staff/children', icon: Heart },
  { name: 'Family Profiles', href: '/dashboard/staff/families', icon: Users },
  { name: 'Health Records', href: '/dashboard/staff/health', icon: Activity },
  { name: 'Education Reports', href: '/dashboard/staff/education', icon: GraduationCap },
  { name: 'Transactions', href: '/dashboard/staff/transactions', icon: DollarSign },
  { name: 'Budgets & Plans', href: '/dashboard/staff/budgets', icon: FileText },
  { name: 'Letters & Media', href: '/dashboard/staff/media', icon: Upload },
  { name: 'Tasks & Alerts', href: '/dashboard/staff/tasks', icon: Bell },
  { name: 'Events', href: '/dashboard/staff/events', icon: Calendar },
]

const adminNav = [
  { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Staff Management', href: '/dashboard/admin/staff', icon: UserCog },
  { name: 'Sponsorship Overview', href: '/dashboard/admin/sponsorships', icon: Heart },
  { name: 'Community Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
  { name: 'Task Monitoring', href: '/dashboard/admin/tasks', icon: CheckSquare },
  { name: 'Approvals', href: '/dashboard/admin/approvals', icon: Shield },
  { name: 'Events', href: '/dashboard/admin/events', icon: Calendar },
  { name: 'Reports', href: '/dashboard/admin/reports', icon: FileText },
  { name: 'Audit Logs', href: '/dashboard/admin/logs', icon: Activity },
]

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const isAdmin = pathname?.includes('/admin')
  const navigation = isAdmin ? adminNav : staffNav

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#1D3557] text-white transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <span className="font-bold text-lg">U'mwiza</span>
          </div>
          <button onClick={onClose} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-[#F4A261] text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
