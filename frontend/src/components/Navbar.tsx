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
    <nav className="sticky top-0 z-50 glass shadow-charity border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group transition-smooth">
            <div className="relative">
              <img src='/logo.png' alt="U'mwiza Rwanda Logo" className="h-12 w-auto" />
            </div>
            
            <div>
              <span className="text-2xl font-heading font-bold text-gradient-primary">
                U'mwiza Rwanda
              </span>
              <div className="text-xs text-gray-500 font-medium tracking-wide">Hope • Love • Change</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 transition-smooth font-medium relative group px-4 py-2 rounded-lg hover:bg-primary-50"
              >
                {link.name}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </div>

          {/* Login Button */}
          <Link
            href="/login"
            className="hidden md:flex items-center gap-2 btn-primary"
          >
            <Heart className="h-4 w-4" />
            Staff Portal
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600 transition-smooth p-2 rounded-lg hover:bg-primary-50"
            aria-label="Toggle menu"
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
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden glass border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-primary-600 transition-smooth font-medium py-3 px-4 rounded-lg hover:bg-primary-50"
                >
                  {link.name}
                </a>
              ))}
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full btn-primary mt-4"
              >
                <Heart className="h-4 w-4" />
                Staff Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
