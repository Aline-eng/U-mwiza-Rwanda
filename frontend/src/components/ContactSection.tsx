'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Heart, CheckCircle, AlertCircle, Send, Shield } from 'lucide-react'
import { useState } from 'react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  organization: string
  subject: string
  message: string
  privacy: boolean
}

interface FormState {
  isSubmitting: boolean
  isSuccess: boolean
  error: string | null
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Our Office',
    subtitle: 'Come see our work firsthand',
    lines: ['KG 54 Ave, Kacyiru', 'Kigali, Rwanda'],
    note: 'Mon–Fri · 8:00 AM – 5:00 PM',
    color: '#3B82F6',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Phone,
    title: 'Call Us',
    subtitle: 'Speak directly with our team',
    lines: ['+250 788 123 456', '+250 789 987 654'],
    note: 'Available 24/7 for urgent matters',
    color: '#10B981',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Mail,
    title: 'Email Us',
    subtitle: 'We respond within 24 hours',
    lines: ['info@umwiza.rw', 'partnerships@umwiza.rw'],
    note: 'Average response: 12 hours',
    color: '#A78BFA',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
]

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    organization: '', subject: '', message: '', privacy: false,
  })

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false, isSuccess: false, error: null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ isSubmitting: true, isSuccess: false, error: null })
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Failed to send message')
      setFormState({ isSubmitting: false, isSuccess: true, error: null })
      setFormData({ firstName: '', lastName: '', email: '', phone: '', organization: '', subject: '', message: '', privacy: false })
    } catch (error) {
      setFormState({
        isSubmitting: false, isSuccess: false,
        error: error instanceof Error ? error.message : 'Failed to send. Please try again.',
      })
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-xl input-dark text-sm placeholder-slate-600`
  const labelClass = 'block text-sm font-medium text-slate-400 mb-2'

  return (
    <section
      id="contact"
      className="py-28 bg-[#0F172A] relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 badge-blue mb-5">
            <Heart className="h-3.5 w-3.5" strokeWidth={2} />
            Get in Touch
          </div>
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
          >
            Ready to Make a Difference?
            {/* <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              
            </span> */}
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Whether you&apos;re interested in sponsorship, partnership, or volunteering — we&apos;re here to help
            you join our mission of transforming lives in Rwanda.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="glass-card-hover rounded-2xl p-6"
              >
                <div className={`inline-flex p-3 rounded-xl ${info.bg} border ${info.border} mb-4`}>
                  <Icon className="h-5 w-5" style={{ color: info.color }} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-white mb-1">{info.title}</h3>
                <p className="text-slate-500 text-sm mb-3">{info.subtitle}</p>
                <div className="space-y-1">
                  {info.lines.map((line) => (
                    <p key={line} className="text-slate-300 text-sm font-medium">{line}</p>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                  {info.note}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-3xl mx-auto glass-card rounded-2xl p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Send Us a Message</h3>
            <p className="text-slate-400 text-sm">We&apos;ll get back to you within 24 hours</p>
          </div>

          {/* Alerts */}
          {formState.isSuccess && (
            <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-6">
              <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" strokeWidth={2} />
              <p className="text-emerald-300 text-sm font-medium">Message sent successfully! We&apos;ll respond within 24 hours.</p>
            </div>
          )}
          {formState.error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl mb-6">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" strokeWidth={2} />
              <p className="text-red-300 text-sm">{formState.error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={labelClass}>First Name <span className="text-blue-400">*</span></label>
                <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={inputClass} placeholder="John" required disabled={formState.isSubmitting} />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClass}>Last Name <span className="text-blue-400">*</span></label>
                <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={inputClass} placeholder="Doe" required disabled={formState.isSubmitting} />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>Email Address <span className="text-blue-400">*</span></label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="john.doe@example.com" required disabled={formState.isSubmitting} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className={labelClass}>Phone Number</label>
                <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="+250 XXX XXX XXX" disabled={formState.isSubmitting} />
              </div>
              <div>
                <label htmlFor="organization" className={labelClass}>Organization</label>
                <input id="organization" type="text" name="organization" value={formData.organization} onChange={handleInputChange} className={inputClass} placeholder="Your organization" disabled={formState.isSubmitting} />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className={labelClass}>Inquiry Type <span className="text-blue-400">*</span></label>
              <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} className={`${inputClass} appearance-none`} required disabled={formState.isSubmitting}>
                <option value="">Select an option</option>
                <option value="partnership">Partnership Opportunities</option>
                <option value="sponsorship">Child Sponsorship Program</option>
                <option value="volunteer">Volunteer Opportunities</option>
                <option value="donation">Donation Information</option>
                <option value="media">Media & Press Inquiry</option>
                <option value="visit">Schedule a Visit</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>Message <span className="text-blue-400">*</span></label>
              <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={5} className={inputClass} placeholder="Tell us about your inquiry. The more detail you provide, the better we can help..." required disabled={formState.isSubmitting} />
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <input type="checkbox" id="privacy" name="privacy" checked={formData.privacy} onChange={handleInputChange} className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-800 accent-blue-500" required disabled={formState.isSubmitting} />
              <label htmlFor="privacy" className="text-xs text-slate-400 leading-relaxed">
                I agree to processing of my personal data per U&apos;mwiza Rwanda&apos;s{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</a>{' '}
                for the purpose of responding to my inquiry.
              </label>
            </div>

            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full btn-electric py-4 rounded-xl inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              aria-label="Send your message"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
              {formState.isSubmitting ? 'Sending Message...' : 'Send Secure Message'}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
              <Shield className="h-3.5 w-3.5" strokeWidth={2} />
              Your information is encrypted and secure. We never share your data.
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
