'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section A - Who We Are */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
        >
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              We Don't Just Give Aid, We Build Relationships
            </h2>
            <p className="text-lg text-slate-600 mb-4">
              At U'mwiza Rwanda, we believe in dignity over dependency. Every family we work with is a partner, not a recipient.
            </p>
            <p className="text-lg text-slate-600">
              We walk alongside families, celebrating their strengths and supporting their dreams for a better future.
            </p>
          </div>
          <div className="relative h-96">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
              alt="Community"
              className="w-full h-full object-cover rounded-3xl shadow-xl"
            />
          </div>
        </motion.div>

        {/* Section B - Our Approach (Swapped) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative h-96 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
              alt="Listening"
              className="w-full h-full object-cover rounded-3xl shadow-xl"
            />
          </div>
          <div className="md:order-2">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Listening to Families First
            </h2>
            <p className="text-lg text-slate-600 mb-4">
              We don't impose solutions. We listen. Every family knows their needs best, and we're here to support their vision.
            </p>
            <p className="text-lg text-slate-600">
              Through genuine partnership, we create sustainable change that respects culture, honors dignity, and builds lasting hope.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
