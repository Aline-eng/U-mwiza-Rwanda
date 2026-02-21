'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'

const values = [
  { label: 'Dignity Over Dependency', desc: 'We treat every family as a partner, not a recipient.' },
  { label: 'Long-Term Relationships', desc: 'We walk alongside families for years, not just a season.' },
  { label: 'Culturally Rooted', desc: 'Solutions designed with and for Rwandan communities.' },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-28 bg-[#0F172A] relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Decorative blur */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Who We Are ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-14 items-center mb-24"
        >
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 badge-blue mb-6">
              Who We Are
            </div>
            <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight"
            >
              We Don&apos;t Just Give Aid,<br />
              {/* <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                
              </span> */}
              We Build Relationships
            </h2>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              At U&apos;mwiza Rwanda, we believe in dignity over dependency. Every family we work with is a
              partner, not a recipient. We walk alongside them, celebrating strengths and supporting dreams.
            </p>
            <div className="space-y-4 mb-8">
              {values.map((v) => (
                <div key={v.label} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <div>
                    <div className="text-white font-semibold text-sm">{v.label}</div>
                    <div className="text-slate-500 text-sm">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-smooth group"
            >
              Explore Our Programs
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </a>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-3xl blur-xl" />
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
              alt="U'mwiza Rwanda community members working together"
              className="w-full h-80 lg:h-[420px] object-cover rounded-3xl border border-slate-800 relative z-10"
            />
            {/* Floating stat card */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-5 -left-5 glass-card rounded-2xl p-4 z-20 shadow-card-dark"
            >
              <div className="text-3xl font-bold text-white">8+ Years</div>
              <div className="text-slate-400 text-sm mt-1">of community impact</div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Listening to Families ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-14 items-center"
        >
          {/* Image */}
          <div className="relative lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-3xl blur-xl" />
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
              alt="Staff member listening to a Rwandan family"
              className="w-full h-80 lg:h-[420px] object-cover rounded-3xl border border-slate-800 relative z-10"
            />
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-5 -right-5 glass-card rounded-2xl p-4 z-20"
            >
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-slate-400 text-sm mt-1">community-led solutions</div>
            </motion.div>
          </div>

          {/* Text */}
          <div className="lg:order-2">
            <div className="inline-flex items-center gap-2 badge-emerald mb-6">
              Our Approach
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Listening to Families First
              {/* <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                
              </span> */}
            </h2>
            <p className="text-slate-400 text-lg mb-4 leading-relaxed">
              We don&apos;t impose solutions. We listen. Every family knows their needs best, and we&apos;re here to
              amplify their vision — not replace it.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              Through genuine partnership, we create sustainable change that respects culture, honors
              dignity, and builds lasting hope for generations to come.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
