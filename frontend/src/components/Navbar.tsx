'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Shield, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Programs', href: '#programs' },
  { name: 'Impact', href: '#impact' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-nav shadow-[0_1px_0_rgba(30,41,59,1)]'
          : 'bg-transparent border-b border-white/0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-smooth"
            aria-label="U'mwiza Rwanda — Home"
          >
            <div className="relative flex-shrink-0">
              <img
                src="/logo.png"
                alt="U'mwiza Rwanda Logo"
                className="h-10 w-auto"
              />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                U&apos;mwiza Rwanda
              </span>
              <div className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">
                Hope · Love · Change
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                role="menuitem"
                className="relative text-slate-400 hover:text-white transition-smooth font-medium text-sm px-4 py-2 rounded-lg hover:bg-slate-800/60 group"
              >
                {link.name}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-blue-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-2 btn-electric text-sm px-5 py-2.5 rounded-xl"
              aria-label="Staff portal login"
            >
              <Shield className="h-4 w-4" strokeWidth={2} />
              Staff Portal
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-400 hover:text-white transition-smooth p-2 rounded-lg hover:bg-slate-800"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden glass-nav border-t border-slate-800"
            role="menu"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-5 space-y-1">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className="block text-slate-300 hover:text-white transition-smooth font-medium py-3 px-4 rounded-xl hover:bg-slate-800"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full btn-electric py-3 px-4 rounded-xl mt-2"
                >
                  <Shield className="h-4 w-4" strokeWidth={2} />
                  Staff Portal
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
