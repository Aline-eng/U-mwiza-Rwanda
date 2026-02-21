'use client'

import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import LandingImpactGrid from '@/components/LandingImpactGrid'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Heart, GraduationCap, Shield, ArrowRight, CheckCircle } from 'lucide-react'

const programs = [
  {
    title: 'Family Sponsorship',
    description:
      'Connect caring sponsors with vulnerable families to provide essential support — food, shelter, education. Build lasting relationships that create hope and stability across generations.',
    icon: Heart,
    impact: '250+ families supported',
    color: '#3B82F6',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    features: ['Monthly support packages', 'Progress updates', 'Direct communication'],
  },
  {
    title: 'Education Excellence',
    description:
      'Empower bright students from disadvantaged backgrounds with scholarships, school supplies, and mentorship. Every child deserves the opportunity to reach their full potential.',
    icon: GraduationCap,
    impact: '120 students sponsored',
    color: '#10B981',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    features: ['Full tuition coverage', 'School materials', 'Mentorship programs'],
  },
  {
    title: 'Healthcare Access',
    description:
      'Ensure families have access to essential medical care, preventive services, and health education. Good health is the foundation of a brighter future for every family.',
    icon: Shield,
    impact: '5 communities served',
    color: '#F59E0B',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    features: ['Medical check-ups', 'Preventive care', 'Health education'],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Navbar />
      <HeroSlider />
      <LandingImpactGrid />
      <AboutSection />

      {/* Programs Section */}
      <section
        id="programs"
        className="py-28 bg-[#0F172A] relative overflow-hidden"
        aria-labelledby="programs-heading"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 badge-emerald mb-5">
              <GraduationCap className="h-3.5 w-3.5" strokeWidth={2} />
              What We Do
            </div>
            <h2
              id="programs-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
            >
              Programs That Transform
              {/* <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                
              </span> */}
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Comprehensive support that addresses root causes of poverty and builds sustainable, dignified futures.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.6 }}
                  className="glass-card-hover rounded-2xl p-7 group flex flex-col"
                >
                  {/* Top accent line */}
                  <div
                    className="h-0.5 w-full rounded-full mb-7 opacity-60"
                    style={{ background: `linear-gradient(90deg, ${program.color}, transparent)` }}
                  />

                  <div className={`inline-flex p-3 rounded-xl ${program.bg} border ${program.border} mb-6 w-fit`}>
                    <Icon className={`h-6 w-6 ${program.text}`} strokeWidth={2} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors tracking-tight">
                    {program.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{program.description}</p>

                  <div className="space-y-2 mb-6">
                    {program.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle
                          className="h-3.5 w-3.5 flex-shrink-0"
                          style={{ color: program.color }}
                          strokeWidth={2}
                        />
                        <span className="text-slate-400">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-slate-800">
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: `${program.color}15`,
                        color: program.color,
                        border: `1px solid ${program.color}30`,
                      }}
                    >
                      {program.impact}
                    </span>
                    <button
                      className={`${program.text} text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all`}
                      aria-label={`Learn more about ${program.title}`}
                    >
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <p className="text-slate-500 mb-6 font-medium">Ready to make a lasting impact?</p>
            <motion.a
              href="https://www.unbound.org/about/approach"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-electric text-base px-10 py-4 rounded-xl inline-flex items-center gap-2"
            >
              Start Your Journey Today
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
