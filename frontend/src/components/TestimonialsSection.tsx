'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Marie Claire',
    role: 'Mother of a child',
    location: 'Kigali, Rwanda',
    image: 'https://images.pexels.com/photos/1427035/pexels-photo-1427035.jpeg',
    content: 'U\'mwiza Rwanda changed our lives. My children now have access to education and healthcare that I could never afford. The sponsorship program gave us hope when we had none.',
    rating: 5
  },
  {
    name: 'Jean Baptiste',
    role: 'Student',
    location: 'Musanze, Rwanda',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    content: 'Thanks to the education program, I\'m now studying engineering. U\'mwiza Rwanda didn\'t just give me books and fees - they gave me a future.',
    rating: 5
  },
  {
    name: 'Sarah Johnson',
    role: 'Sponsor',
    location: 'Boston, USA',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    content: 'Being a sponsor has been incredibly rewarding. Seeing the letters and photos from the family I support reminds me why I do this work. Real change is happening.',
    rating: 5
  },
  {
    name: 'Dr. Patricia Uwimana',
    role: 'Community Health Worker',
    location: 'Huye, Rwanda',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80',
    content: 'The health program has saved lives in our community. Families now have access to medical care and preventive services that make a real difference.',
    rating: 5
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Stories of Hope & Change</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real voices from our community sharing how U'mwiza Rwanda is transforming lives and building brighter futures.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-charity hover-lift relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-green-200" />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-green-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-green-600 font-medium">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-orange-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">Want to be part of these success stories?</p>
          <motion.button
            type='button'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open("https://www.unbound.org/about/approach", "_blank", "noopener,noreferrer")
            }
            className="gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover-lift"
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
