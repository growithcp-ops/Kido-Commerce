import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';
import { motion } from 'framer-motion';

export function FeaturedProducts() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-kido-yellow-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Featured <span className="text-kido-red">Toys</span> ✨
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Our most loved toys, hand-picked by kids and parents alike
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="rounded-full font-semibold group" data-testid="button-view-all-products">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
