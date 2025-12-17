'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Users, BookOpen, ArrowRight } from 'lucide-react'
import { link } from 'fs'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80',
    title: 'Every Child Deserves Hope',
    subtitle: 'Transforming lives through education, healthcare, and unwavering support',
    keywords: 'children, rwanda, hope',
    cta: 'Become a Sponsor',
    link: 'https://www.unbound.org/how-sponsorship-works',
    icon: Heart
  },
  {
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80',
    title: 'Families Rising Together',
    subtitle: 'Building sustainable futures with dignity, respect, and lasting partnerships',
    keywords: 'families, community, growth',
    cta: 'Join Our Community',
    link: 'https://www.unbound.org/about',
    icon: Users
  },
  {
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80',
    title: 'Education Opens Doors',
    subtitle: 'Empowering bright minds to break cycles of poverty and create change',
    keywords: 'education, opportunity, future',
    cta: 'Support Education',
    link: 'https://www.unbound.org/get-involved/school-partnerships',
    icon: BookOpen
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative h-[92vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 gradient-hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-dark rounded-full px-5 py-2.5 mb-8 border border-white/20"
          >
            {React.createElement(slides[currentSlide].icon, { className: "h-5 w-5 text-accent-300" })}
            <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">
              {slides[currentSlide].keywords}
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {slides[currentSlide].title}
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            {slides[currentSlide].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gradient-primary text-white px-10 py-5 rounded-xl font-heading font-bold text-lg shadow-charity-xl hover-lift flex items-center gap-3 group"
            >
              {slides[currentSlide].cta}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>

            <motion.button
              type='button'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open("https://www.unbound.org/about", "_blank", "noopener,noreferrer")
              }
              className="glass-dark border-2 border-white/40 text-white px-10 py-5 rounded-xl font-heading font-semibold text-lg hover:bg-white/20 transition-smooth"
            >
              Learn Our Story
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-12 h-3 shadow-lg'
                : 'bg-white/50 w-3 h-3 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex"
      >
        <div className="w-7 h-11 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}
