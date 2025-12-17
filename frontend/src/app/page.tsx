'use client'

import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Heart, GraduationCap, HelpingHand } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />

      {/* Impact Stats */}
      <section id="impact" className="py-24 gradient-warm relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-pattern-dots opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Heart className="h-4 w-4" />
              Our Impact
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-6">Transforming Lives Together</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Every number represents a family's journey toward hope, dignity, and a brighter future</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: '250+', label: 'Families Supported', icon: '👨‍👩‍👧‍👦', color: 'from-primary-500 to-primary-600' },
              { number: '120', label: 'Students Sponsored', icon: '🎓', color: 'from-secondary-500 to-secondary-600' },
              { number: '5', label: 'Communities Served', icon: '🏘️', color: 'from-accent-500 to-accent-600' },
              { number: '50+', label: 'Active Volunteers', icon: '🤝', color: 'from-primary-600 to-secondary-600' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center bg-white rounded-2xl p-8 shadow-charity hover-lift cursor-default border border-gray-100"
              >
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className={`text-5xl md:text-6xl font-heading font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>{stat.number}</div>
                <div className="text-base text-gray-600 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />

      <TestimonialsSection />

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <GraduationCap className="h-4 w-4" />
              What We Do
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-6">Programs That Transform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive support that addresses the root causes of poverty and builds sustainable futures</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Family Sponsorship',
                description: 'Connect caring sponsors with vulnerable families to provide essential support including food, shelter, and educational materials. Build lasting relationships that create hope and stability.',
                icon: HelpingHand,
                impact: '250+ families supported',
                color: 'from-red-500 to-pink-500'
              },
              {
                title: 'Education Excellence',
                description: 'Empower bright students from disadvantaged backgrounds with scholarships, school supplies, and mentorship programs. Every child deserves the opportunity to reach their full potential.',
                icon: GraduationCap,
                impact: '120 students sponsored',
                color: 'from-green-500 to-teal-500'
              },
              {
                title: 'Healthcare Access',
                description: 'Ensure families have access to essential medical care, preventive services, and health education. Good health is the foundation of a brighter future for every family.',
                icon: Heart,
                impact: '5 communities served',
                color: 'from-orange-500 to-red-500'
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white p-8 rounded-2xl shadow-charity hover-lift cursor-pointer group relative overflow-hidden border border-gray-100"
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${program.color}`}></div>

                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${program.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <program.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {program.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {program.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-bold text-secondary-700 bg-secondary-50 px-4 py-2 rounded-full">
                    {program.impact}
                  </span>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="text-primary-600 font-semibold hover:text-primary-700 transition-colors flex items-center gap-1"
                  >
                    Learn More →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-lg text-gray-600 mb-8 font-medium">Ready to make a lasting impact?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-10 py-5"
            >
              Get Involved Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  )
}
