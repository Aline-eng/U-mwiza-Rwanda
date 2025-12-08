'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="U'mwiza Rwanda" className="h-8 w-auto" />
              <h3 className="text-2xl font-bold text-white">U'mwiza Rwanda</h3>
            </div>
            <p className="text-sm mb-4">Empowering families, building futures together.</p>
            <div className="flex gap-4">
              <a href="#https://www.facebook.com/sponsorachild" className="hover:text-sky-400 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#https://www.instagram.com/accounts/login/?next=/unboundorg/" className="hover:text-sky-400 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#https://twitter.com/unboundorg" className="hover:text-sky-400 transition">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-white transition">Home</a></li>
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#programs" className="hover:text-white transition">Programs</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              <li><Link href="/login" className="hover:text-white transition">Login</Link></li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition">Child Protection Policy</a></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-4">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for updates</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-sm"
              />
                
              <button className="bg-sky-600 text-white px-3 py-2 rounded-lg hover:bg-sky-700 transition text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
          <p>© 2025 U'mwiza Rwanda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
