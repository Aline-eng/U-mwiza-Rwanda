'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Our Programs', href: '#programs' },
  { name: 'Impact', href: '#impact' },
  { name: 'Contact', href: '#contact' },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Use', href: '#' },
  { name: 'Child Protection', href: '#' },
]

export default function Footer() {
  return (
    <footer
      className="bg-[#0F172A] border-t border-slate-800 relative overflow-hidden"
      aria-label="Site footer"
    >
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_0.9fr_1fr_1.2fr] gap-x-8 gap-y-12">

          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link href="/" className="flex items-center gap-3 mb-5 group" aria-label="U'mwiza Rwanda home">
              <img src="/logo.png" alt="U'mwiza Rwanda" className="h-10 w-auto" />
              <div>
                <div className="font-bold text-white text-lg tracking-tight">U&apos;mwiza Rwanda</div>
                <div className="text-xs text-slate-500 tracking-widest uppercase">Hope · Love · Change</div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering families, building futures together. Every child deserves hope, every family deserves dignity.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/sponsorachild', label: 'Facebook' },
                { icon: Instagram, href: 'https://www.instagram.com/unboundorg/', label: 'Instagram' },
                { icon: Twitter, href: 'https://twitter.com/unboundorg', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  whileHover={{ scale: 1.1 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-blue-500/20 border border-slate-700 hover:border-blue-500/30 text-slate-400 hover:text-blue-400 transition-smooth"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white text-sm transition-smooth flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-blue-400" strokeWidth={2} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Get in Touch</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <div className="text-slate-400">
                  <div>KG 54 Ave, Kacyiru</div>
                  <div>Kigali, Rwanda</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" strokeWidth={2} />
                <span className="text-slate-400">+250 788 123 456</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-purple-400 flex-shrink-0" strokeWidth={2} />
                <span className="text-slate-400">info@umwiza.rw</span>
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">Stay Connected</h4>
            <p className="text-slate-400 text-sm mb-4">Subscribe for updates on our work and impact stories.</p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl input-dark text-sm"
                  aria-label="Email address for newsletter"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-electric px-4 py-2.5 rounded-xl whitespace-nowrap text-sm"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-xs text-slate-600">We respect your privacy. Unsubscribe anytime.</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm flex items-center gap-1.5">
              &copy; {new Date().getFullYear()} U&apos;mwiza Rwanda · All rights reserved.
            </p>
            <div className="flex gap-6">
              {legalLinks.map((l) => (
                <a key={l.name} href={l.href} className="text-slate-500 hover:text-slate-300 text-xs transition-smooth">
                  {l.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
