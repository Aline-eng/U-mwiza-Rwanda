'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  X, LayoutDashboard, Users, Heart, Activity, GraduationCap,
  DollarSign, FileText, Upload, Bell, Calendar, Settings,
  UserCog, BarChart3, CheckSquare, Shield, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

const staffNav: NavItem[] = [
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

const adminNav: NavItem[] = [
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

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export default function Sidebar({ isOpen, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()
  const isAdmin = pathname?.includes('/admin')
  const navigation = isAdmin ? adminNav : staffNav

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-[#0F172A] border-r border-slate-800
          flex flex-col transition-all duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64
        `}
        aria-label="Dashboard navigation"
      >
        {/* Logo row */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 flex-shrink-0 h-16">
          <div className={`flex items-center gap-3 overflow-hidden min-w-0 ${collapsed ? 'lg:justify-center lg:w-full' : ''}`}>
            <img src="/logo.png" alt="U'mwiza Rwanda" className="h-8 w-auto flex-shrink-0" />
            <div className={`min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
              <div className="font-bold text-white text-sm tracking-tight truncate">U&apos;mwiza</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                {isAdmin ? 'Admin' : 'Staff'}
              </div>
            </div>
          </div>

          {/* Mobile close */}
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>

          {/* Desktop collapse toggle */}
          {!collapsed && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex text-slate-500 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center py-3 border-b border-slate-800 text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        )}

        {/* Role badge */}
        {!collapsed && (
          <div className="px-4 pt-4 pb-2 lg:block hidden">
            <div className={`text-center py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
              isAdmin
                ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
            }`}>
              {isAdmin ? 'Admin Portal' : 'Staff Portal'}
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5" aria-label="Sidebar navigation">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                title={collapsed ? item.name : undefined}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                  ${collapsed ? 'lg:justify-center lg:px-0' : ''}
                  ${isActive
                    ? 'bg-blue-500/15 text-white border border-blue-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500 rounded-r-full" />
                )}
                <Icon
                  className={`h-4.5 w-4.5 flex-shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`}
                  strokeWidth={2}
                  style={{ width: '1.125rem', height: '1.125rem' }}
                />
                <span className={`text-sm font-medium truncate ${collapsed ? 'lg:hidden' : ''}`}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Settings */}
        <div className="border-t border-slate-800 p-3 flex-shrink-0">
          <Link
            href="/dashboard/settings"
            onClick={onClose}
            title={collapsed ? 'Settings' : undefined}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors
              ${collapsed ? 'lg:justify-center lg:px-0' : ''}
            `}
            aria-label="Settings"
          >
            <Settings
              className="flex-shrink-0 text-slate-500"
              strokeWidth={2}
              style={{ width: '1.125rem', height: '1.125rem' }}
            />
            <span className={`text-sm font-medium ${collapsed ? 'lg:hidden' : ''}`}>Settings</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
