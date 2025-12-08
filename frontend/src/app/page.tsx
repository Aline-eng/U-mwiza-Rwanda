'use client'

import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Heart, GraduationCap, HelpingHand } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />

      {/* Impact Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '250+', label: 'Families' },
              { number: '120', label: 'Students' },
              { number: '5', label: 'Communities' },
              { number: '50+', label: 'Volunteers' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-sky-600 mb-2">{stat.number}</div>
                <div className="text-lg text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Programs</h2>
            <p className="text-xl text-slate-600">Making a lasting impact through targeted support</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Sponsorship',
                description: 'Connect sponsors with families to provide sustainable support and create lasting relationships.',
                icon: HelpingHand,
              },
              {
                title: 'Education',
                description: 'Provide scholarships and educational resources to bright students from disadvantaged backgrounds.',
                icon: GraduationCap,
              },
              {
                title: 'Health',
                description: 'Ensure families have access to healthcare services and medical support when needed.',
                icon: Heart,
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white p-8 rounded-xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <program.icon className="h-12 w-12 text-sky-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{program.title}</h3>
                <p className="text-slate-600">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  )
}
