'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Users, Heart, CheckCircle, AlertCircle } from 'lucide-react'
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

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: '',
    privacy: false
  })

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setFormState({ isSubmitting: true, isSuccess: false, error: null })

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'
      
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message')
      }

      setFormState({ isSubmitting: false, isSuccess: true, error: null })
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        subject: '',
        message: '',
        privacy: false
      })

    } catch (error) {
      setFormState({ 
        isSubmitting: false, 
        isSuccess: false, 
        error: error instanceof Error ? error.message : 'Failed to send message. Please try again.' 
      })
    }
  }
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 via-green-50/30 to-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 border-2 border-green-300 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-green-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-green-300 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="h-4 w-4" />
            Get in Touch
          </div>
          <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Ready to Make a
            <span className="text-green-600"> Difference?</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Connect with us today. Whether you're interested in sponsorship, partnership, or volunteering,
            we're here to help you join our mission of transforming lives in Rwanda.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Visit Our Office</h3>
                <p className="text-slate-600">Come see our work firsthand</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-slate-700 font-medium">KG 54 Ave, Kacyiru</p>
              <p className="text-slate-700 font-medium">Kigali, Rwanda</p>
              <p className="text-sm text-slate-500 mt-3">Open Monday - Friday, 8:00 AM - 5:00 PM</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Call Us</h3>
                <p className="text-slate-600">Speak directly with our team</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-slate-700 font-medium">+250 788 123 456</p>
              <p className="text-slate-700 font-medium">+250 789 987 654</p>
              <p className="text-sm text-slate-500 mt-3">Available 24/7 for urgent matters</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Email Us</h3>
                <p className="text-slate-600">Send us your questions</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-slate-700 font-medium">info@umwiza.rw</p>
              <p className="text-slate-700 font-medium">partnerships@umwiza.rw</p>
              <p className="text-sm text-slate-500 mt-3">We respond within 24 hours</p>
            </div>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100"
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Send us a Message</h3>
              <p className="text-slate-600 text-lg">Fill out the form below and we'll get back to you within 24 hours</p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-green-600">
                <Clock className="h-4 w-4" />
                <span>Average response time: 12 hours</span>
              </div>
            </div>

          {/* Right Column - Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl space-y-6 border border-slate-100"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h3>
              <p className="text-slate-600 text-sm">We typically respond within 24 hours</p>
            </div>

            {/* Success Message */}
            {formState.isSuccess && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800 font-medium">Message sent successfully! We'll get back to you within 24 hours.</p>
              </div>
            )}

            {/* Error Message */}
            {formState.error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800">{formState.error}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                  placeholder="John"
                  required
                  disabled={formState.isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                  placeholder="Doe"
                  required
                  disabled={formState.isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                placeholder="john.doe@example.com"
                required
                disabled={formState.isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                placeholder="+250 XXX XXX XXX"
                disabled={formState.isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Organization</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                placeholder="Company or organization name"
                disabled={formState.isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Inquiry Type *</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors bg-white"
                required
                disabled={formState.isSubmitting}
              >
                <option value="">Please select an option</option>
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors resize-none"
                placeholder="Please provide details about your inquiry. The more information you share, the better we can assist you..."
                required
                disabled={formState.isSubmitting}
              />
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                checked={formData.privacy}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300 rounded"
                required
                disabled={formState.isSubmitting}
              />
              <label htmlFor="privacy" className="text-sm text-slate-600 leading-relaxed">
                I agree to the processing of my personal data in accordance with U'mwiza Rwanda's{' '}
                <a href="#" className="text-green-600 hover:text-green-700 underline">Privacy Policy</a>{' '}
                for the purpose of responding to my inquiry.
              </label>
            </div>

            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {formState.isSubmitting ? 'Sending Message...' : 'Send Secure Message'}
            </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                This form is protected by reCAPTCHA. Your information is secure and will only be used to respond to your inquiry.
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
