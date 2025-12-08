'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="U'mwiza Rwanda" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-sky-600">U'mwiza Rwanda</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-sky-600 transition font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Login Button */}
          <Link
            href="/login"
            className="hidden md:block border-2 border-sky-600 text-sky-600 px-6 py-2 rounded-lg hover:bg-sky-50 transition font-medium"
          >
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-600 hover:text-sky-600"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-slate-600 hover:text-sky-600 transition font-medium py-2"
                >
                  {link.name}
                </a>
              ))}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center border-2 border-sky-600 text-sky-600 px-6 py-2 rounded-lg hover:bg-sky-50 transition font-medium"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
