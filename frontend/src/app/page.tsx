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
      <section id="impact" className="py-20 gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600">Real change, real lives transformed</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '250+', label: 'Families Supported', icon: '👨‍👩‍👧‍👦' },
              { number: '120', label: 'Students Sponsored', icon: '🎓' },
              { number: '5', label: 'Communities Served', icon: '🏘️' },
              { number: '50+', label: 'Active Volunteers', icon: '🤝' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-2xl p-8 shadow-charity hover-lift"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-5xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent mb-2">{stat.number}</div>
                <div className="text-lg text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />

      <TestimonialsSection />

      {/* Programs Section */}
      <section id="programs" className="py-20 gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600">Transforming lives through targeted support and sustainable solutions</p>
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
                className="bg-white p-8 rounded-2xl shadow-charity hover-lift cursor-pointer group relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${program.color}`}></div>

                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${program.color} mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <program.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {program.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {program.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {program.impact}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-red-600 font-medium hover:text-red-700 transition-colors"
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
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6">Ready to make a difference?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover-lift"
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
