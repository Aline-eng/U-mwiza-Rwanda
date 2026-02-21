'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Users, BookOpen, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface Slide {
  image: string
  title: string
  subtitle: string
  badge: string
  cta: string
  ctaLink: string
  icon: React.ElementType
  accent: string
}

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80',
    title: 'Every Child\nDeserves Hope',
    subtitle: 'Transforming lives through education, healthcare, and unwavering support for Rwanda\'s most vulnerable families.',
    badge: 'Child Sponsorship',
    cta: 'Become a Sponsor',
    ctaLink: 'https://www.unbound.org/how-sponsorship-works',
    icon: Heart,
    accent: '#3B82F6',
  },
  {
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80',
    title: 'Families\nRising Together',
    subtitle: 'Building sustainable futures with dignity, respect, and lasting partnerships that create generational change.',
    badge: 'Family Support',
    cta: 'Join Our Community',
    ctaLink: 'https://www.unbound.org/about',
    icon: Users,
    accent: '#10B981',
  },
  {
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80',
    title: 'Education\nOpens Doors',
    subtitle: 'Empowering bright minds to break cycles of poverty and become agents of change in their communities.',
    badge: 'Education Program',
    cta: 'Support Education',
    ctaLink: 'https://www.unbound.org/get-involved/school-partnerships',
    icon: BookOpen,
    accent: '#F59E0B',
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(1)

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  const prev = () => goToSlide((currentSlide - 1 + slides.length) % slides.length)
  const next = () => goToSlide((currentSlide + 1) % slides.length)

  useEffect(() => {
    const timer = setInterval(next, 7000)
    return () => clearInterval(timer)
  }, [currentSlide])

  const slide = slides[currentSlide]
  const Icon = slide.icon

  return (
    <section
      id="home"
      className="relative h-screen min-h-[680px] overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
            role="img"
            aria-label={slide.title.replace('\n', ' ')}
          />
          {/* Multi-layer dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/90 via-[#020617]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-[#020617]/20" />
        </motion.div>
      </AnimatePresence>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-white/10"
            >
              <span
                className="flex h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: slide.accent }}
              />
              <Icon className="h-4 w-4 text-white/80" strokeWidth={2} />
              <span className="text-white/90 font-semibold text-xs uppercase tracking-widest">
                {slide.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-6 leading-[1.05] tracking-tight whitespace-pre-line">
              {slide.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href={slide.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 btn-electric text-base px-8 py-4 rounded-xl group"
                aria-label={slide.cta}
              >
                {slide.cta}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </motion.a>

              <motion.a
                href="#about"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 btn-ghost text-base px-8 py-4 rounded-xl"
              >
                Learn Our Story
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Indicators */}
          <div className="flex items-center gap-3" role="tablist" aria-label="Slide navigation">
            {slides.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentSlide
                    ? 'bg-white w-10 h-2'
                    : 'bg-white/30 w-2 h-2 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="glass p-2.5 rounded-xl hover:bg-white/15 transition-smooth"
            >
              <ChevronLeft className="h-5 w-5 text-white" strokeWidth={2} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="glass p-2.5 rounded-xl hover:bg-white/15 transition-smooth"
            >
              <ChevronRight className="h-5 w-5 text-white" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-28 right-8 hidden lg:block z-20"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="text-[10px] uppercase tracking-widest rotate-90 origin-center mb-4">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-500 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
