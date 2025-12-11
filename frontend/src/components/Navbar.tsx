'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Impact', href: '#impact' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div>
              <img src='/logo.png' />
            </div>
            
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r  from-green-700 to-green-900 bg-clip-text text-transparent">
                U'mwiza Rwanda
              </span>
              <div className="text-xs text-gray-500 -mt-1">Hope • Love • Change</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Login Button */}
          <Link
            href="/login"
            className="hidden md:block gradient-primary text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-200 font-medium hover-lift"
          >
            Staff Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-green-600 transition-colors p-2"
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
            className="md:hidden overflow-hidden bg-white border-t border-orange-100 shadow-lg"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-red-600 transition-colors font-medium py-3 px-2 rounded-lg hover:bg-orange-50"
                >
                  {link.name}
                </a>
              ))}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center gradient-primary text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium mt-4"
              >
                Join Our Mission
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
