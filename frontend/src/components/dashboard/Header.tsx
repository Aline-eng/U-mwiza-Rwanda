'use client'

import { Menu, Bell, Search, LogOut, ChevronDown, User, Shield } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, logout } from '@/lib/auth'
import { motion, AnimatePresence } from 'framer-motion'

const notifications = [
  { id: 1, title: 'Budget Pending', desc: 'Q1 2025 budget needs submission', type: 'warning', time: '2h ago' },
  { id: 2, title: 'New Sponsor Letter', desc: 'Letter received for Child #1234', type: 'info', time: '5h ago' },
  { id: 3, title: 'Health Alert', desc: 'Child #1245 missed vaccination', type: 'error', time: '1d ago' },
]

const notifColors: Record<string, string> = {
  warning: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  error: 'bg-red-500/10 border-red-500/20 text-red-400',
}

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const notifRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false)
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const isAdmin = user?.role === 'ADMIN'
  const initials = user?.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'U'

  return (
    <header
      className="sticky top-0 z-30 h-16 bg-[#0F172A]/80 backdrop-blur-xl border-b border-slate-800 px-4 lg:px-7 flex items-center justify-between shadow-[0_1px_0_rgba(30,41,59,1)]"
      aria-label="Dashboard header"
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" strokeWidth={2} />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2.5 bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2 w-80 focus-within:border-blue-500/40 focus-within:bg-slate-800 transition-all duration-200">
          <Search className="h-4 w-4 text-slate-500 flex-shrink-0" strokeWidth={2} />
          <input
            type="search"
            placeholder="Search children, families, tasks…"
            className="bg-transparent outline-none w-full text-sm text-slate-300 placeholder-slate-600"
            aria-label="Search dashboard"
          />
          <kbd className="hidden sm:inline-flex text-xs text-slate-600 bg-slate-700 border border-slate-600 rounded px-1.5 py-0.5">⌘K</kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false) }}
            className="relative p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            aria-label={`Notifications (${notifications.length} unread)`}
            aria-expanded={showNotifications}
          >
            <Bell className="h-4.5 w-4.5" strokeWidth={2} style={{ width: '1.125rem', height: '1.125rem' }} />
            <span className="absolute top-2 right-2 h-2 w-2 bg-blue-500 rounded-full ring-2 ring-[#0F172A]" aria-hidden="true" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 glass-card rounded-2xl shadow-card-dark-lg overflow-hidden"
                role="dialog"
                aria-label="Notifications panel"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                  <span className="text-sm font-semibold text-white">Notifications</span>
                  <span className="badge-blue text-xs">{notifications.length} new</span>
                </div>
                <div className="divide-y divide-slate-800">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-4 hover:bg-slate-800/40 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          n.type === 'warning' ? 'bg-amber-400' :
                          n.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">{n.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                          <p className="text-xs text-slate-600 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-slate-800">
                  <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium w-full text-center">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-800 mx-1" aria-hidden="true" />

        {/* User menu */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false) }}
            className="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-slate-800 transition-colors group"
            aria-label="User menu"
            aria-expanded={showUserMenu}
          >
            {/* Avatar */}
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-glow-blue">
              {initials}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-white leading-none">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                {isAdmin ? (
                  <><Shield className="h-2.5 w-2.5 text-blue-400" strokeWidth={2} /> Admin</>
                ) : (
                  <><User className="h-2.5 w-2.5 text-emerald-400" strokeWidth={2} /> Staff</>
                )}
              </p>
            </div>
            <ChevronDown
              className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
              strokeWidth={2}
            />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-52 glass-card rounded-2xl shadow-card-dark-lg overflow-hidden"
                role="menu"
              >
                <div className="px-4 py-3 border-b border-slate-800">
                  <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    role="menuitem"
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-sm font-medium"
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4" strokeWidth={2} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
