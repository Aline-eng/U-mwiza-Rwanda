'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ArrowRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Marie Claire',
    role: 'Mother of a Sponsored Child',
    location: 'Kigali, Rwanda',
    image: 'https://images.pexels.com/photos/1427035/pexels-photo-1427035.jpeg',
    content:
      "U'mwiza Rwanda changed our lives. My children now have access to education and healthcare I could never afford alone. The sponsorship program gave us hope when we had none.",
    rating: 5,
    accent: '#3B82F6',
  },
  {
    name: 'Jean Baptiste',
    role: 'Engineering Student',
    location: 'Musanze, Rwanda',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    content:
      "Thanks to the education program, I'm now studying engineering. U'mwiza Rwanda didn't just give me books and fees — they gave me a future I couldn't have imagined.",
    rating: 5,
    accent: '#10B981',
  },
  {
    name: 'Sarah Johnson',
    role: 'International Sponsor',
    location: 'Boston, USA',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    content:
      'Being a sponsor has been incredibly rewarding. Seeing photos and letters from the family I support reminds me why I do this. Real, tangible change is happening.',
    rating: 5,
    accent: '#F59E0B',
  },
  {
    name: 'Dr. Patricia Uwimana',
    role: 'Community Health Worker',
    location: 'Huye, Rwanda',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80',
    content:
      'The health program has saved lives in our community. Families now access medical care and preventive services that make a real, measurable difference.',
    rating: 5,
    accent: '#A78BFA',
  },
]

export default function TestimonialsSection() {
  return (
    <section
      className="py-28 bg-[#020617] relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 badge-blue mb-5">
            <Star className="h-3.5 w-3.5" strokeWidth={2} />
            Stories of Impact
          </div>
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
          >
            Voices of Hope & Change
            {/* <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              
            </span> */}
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Real stories from families, students, sponsors, and health workers sharing how U&apos;mwiza Rwanda
            is creating lasting change.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-card-hover rounded-2xl p-7 relative overflow-hidden group"
              aria-label={`Testimonial from ${t.name}`}
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-6 right-6 h-8 w-8 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ color: t.accent }}
                strokeWidth={2}
              />

              {/* Accent top line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${t.accent}, transparent)` }}
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-5" aria-label={`${t.rating} out of 5 stars`}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={0} />
                ))}
              </div>

              <blockquote className="text-slate-300 leading-relaxed mb-6 italic text-sm">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={`Portrait of ${t.name}`}
                  className="w-11 h-11 rounded-full object-cover border-2"
                  style={{ borderColor: `${t.accent}40` }}
                />
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-xs" style={{ color: t.accent }}>{t.role}</div>
                  <div className="text-slate-500 text-xs">{t.location}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-slate-500 mb-5">Want to be part of these success stories?</p>
          <motion.a
            href="https://www.unbound.org/about/approach"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-electric px-8 py-4 rounded-xl inline-flex items-center gap-2"
          >
            Start Your Journey Today
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
