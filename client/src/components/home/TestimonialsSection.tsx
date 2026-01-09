import { testimonials } from '@/lib/data';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Happy <span className="text-kido-yellow-dark">Families</span> 💖
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what parents are saying about KIDO toys
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-gradient-to-br from-kido-yellow-light/30 to-white rounded-3xl p-6 md:p-8 border border-kido-yellow-light shadow-card"
              data-testid={`card-testimonial-${testimonial.id}`}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-kido-yellow/30" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-kido-yellow/20 flex items-center justify-center text-3xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.childAge}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-kido-yellow fill-kido-yellow" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed">
                "{testimonial.comment}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
