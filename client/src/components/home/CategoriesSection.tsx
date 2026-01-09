import { Link } from 'wouter';
import { categories } from '@/lib/data';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categoryColors: Record<string, string> = {
  'bg-kido-blue': 'bg-kido-blue/15 hover:bg-kido-blue/25 border-kido-blue/30',
  'bg-kido-pink': 'bg-kido-pink/15 hover:bg-kido-pink/25 border-kido-pink/30',
  'bg-kido-green': 'bg-kido-green/15 hover:bg-kido-green/25 border-kido-green/30',
  'bg-kido-purple': 'bg-kido-purple/15 hover:bg-kido-purple/25 border-kido-purple/30',
  'bg-kido-orange': 'bg-kido-orange/15 hover:bg-kido-orange/25 border-kido-orange/30',
  'bg-kido-red': 'bg-kido-red/15 hover:bg-kido-red/25 border-kido-red/30',
};

export function CategoriesSection() {
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
            Shop by <span className="text-gradient-kido">Category</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the perfect toy for every interest and age group
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/products?category=${category.id}`} data-testid={`link-category-${category.id}`}>
                <div className={`group p-6 rounded-3xl border-2 transition-all cursor-pointer hover-lift ${categoryColors[category.color]}`}>
                  <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">
                    {category.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {category.count} items
                  </p>
                  <ArrowRight className="w-4 h-4 mt-3 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
