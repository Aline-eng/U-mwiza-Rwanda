'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Users, BookOpen, ArrowRight } from 'lucide-react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80',
    title: 'Every Child Deserves Hope',
    subtitle: 'Transforming lives through education, healthcare, and unwavering support',
    keywords: 'children, rwanda, hope',
    cta: 'Become a Sponsor',
    icon: Heart
  },
  {
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80',
    title: 'Families Rising Together',
    subtitle: 'Building sustainable futures with dignity, respect, and lasting partnerships',
    keywords: 'families, community, growth',
    cta: 'Join Our Community',
    icon: Users
  },
  {
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80',
    title: 'Education Opens Doors',
    subtitle: 'Empowering bright minds to break cycles of poverty and create change',
    keywords: 'education, opportunity, future',
    cta: 'Support Education',
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
    <section id="home" className="relative h-[90vh] overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-green-900/40 to-green-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20"
          >
            {React.createElement(slides[currentSlide].icon, { className: "h-5 w-5 text-orange-300" })}
            <span className="text-orange-200 font-medium text-sm uppercase tracking-wide">
              {slides[currentSlide].keywords}
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>

          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            {slides[currentSlide].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover-lift flex items-center gap-2 group"
            >
              {slides[currentSlide].cta}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-200 hover-lift"
            >
              Learn Our Story
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-orange-400 w-12 h-3 shadow-lg'
                : 'bg-white/40 w-3 h-3 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}
