'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Heart, Mail, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-white rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              
                <img src='/logo.png' />
              
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
                  U'mwiza Rwanda
                </h2>
                <div className="text-xs text-gray-400">Hope • Love • Change</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering families, building futures together. Every child deserves hope, every family deserves support.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#https://www.facebook.com/sponsorachild"
                className="p-2 bg-white/10 rounded-lg hover:bg-green-500 transition-all duration-200"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#https://www.instagram.com/accounts/login/?next=/unboundorg/"
                className="p-2 bg-white/10 rounded-lg hover:bg-green-500 transition-all duration-200"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#https://twitter.com/unboundorg"
                className="p-2 bg-white/10 rounded-lg hover:bg-green-500 transition-all duration-200"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Column 2 - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Home', href: '#home' },
                { name: 'About Us', href: '#about' },
                { name: 'Our Programs', href: '#programs' },
                { name: 'Impact', href: '#impact' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
              
            </ul>
          </motion.div>

          {/* Column 3 - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-white mb-6">Get in Touch</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <div className="font-medium">Visit Us</div>
                  <div>KG 54 Ave, Kacyiru<br />Kigali, Rwanda</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <div className="font-medium">Call Us</div>
                  <div>+250 788 123 456</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0" />
                <div className="text-gray-300">
                  <div className="font-medium">Email</div>
                  <div>info@umwiza.rw</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 4 - Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-white mb-6">Stay Connected</h4>
            <p className="text-gray-300 mb-4 text-sm">Subscribe for updates on our work and success stories</p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm text-white placeholder-gray-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="gradient-primary px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-xs text-gray-400">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} U'mwiza Rwanda. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Child Protection</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
