'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, Users, GraduationCap, HandHeart, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">U'mwiza Rwanda</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-primary-600 transition">Home</a>
              <a href="#about" className="text-gray-700 hover:text-primary-600 transition">About</a>
              <a href="#programs" className="text-gray-700 hover:text-primary-600 transition">Programs</a>
              <a href="#impact" className="text-gray-700 hover:text-primary-600 transition">Impact</a>
              <a href="#events" className="text-gray-700 hover:text-primary-600 transition">Events</a>
              <a href="#contact" className="text-gray-700 hover:text-primary-600 transition">Contact</a>
            </div>
            <Link 
              href="/login" 
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Transforming Lives Through <span className="text-primary-600">Compassion</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Supporting families, connecting sponsors, and empowering children in Rwanda to reach their full potential.
              </p>
              <div className="flex gap-4">
                <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition flex items-center">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition">
                  Get Involved
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                [Hero Image Slider]
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Foundation</h2>
            <p className="text-xl text-gray-600">Guided by purpose, driven by compassion</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Mission',
                description: 'To empower vulnerable families and children in Rwanda through sustainable support, education, and community development.',
                icon: Heart
              },
              {
                title: 'Vision',
                description: 'A Rwanda where every child has the opportunity to thrive, every family has hope, and every community flourishes.',
                icon: Users
              },
              {
                title: 'Values',
                description: 'Compassion, Integrity, Empowerment, Community, and Sustainable Impact guide everything we do.',
                icon: HandHeart
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition"
              >
                <item.icon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600">Making a difference through targeted initiatives</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Family Sponsorship', icon: Users, color: 'primary' },
              { title: 'Scholarships', icon: GraduationCap, color: 'secondary' },
              { title: 'Volunteers', icon: HandHeart, color: 'primary' },
              { title: 'Community Outreach', icon: Heart, color: 'secondary' }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <program.icon className={`h-10 w-10 text-${program.color}-600 mb-4`} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 text-sm">Supporting families and children through comprehensive programs.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section id="impact" className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-primary-100">Real numbers, real change</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '450+', label: 'Families Supported' },
              { number: '980+', label: 'Children Sponsored' },
              { number: '12', label: 'Communities Reached' },
              { number: '45+', label: 'Active Volunteers' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold">U'mwiza Rwanda</span>
              </div>
              <p className="text-gray-400">Transforming lives through compassion and support.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#programs" className="hover:text-white transition">Programs</a></li>
                <li><a href="#events" className="hover:text-white transition">Events</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Kigali, Rwanda</li>
                <li>info@umwizarwanda.org</li>
                <li>+250 788 123 456</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 U'mwiza Rwanda. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
