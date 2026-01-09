import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Gift, Truck, Shield, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export function PromoBanner() {
  const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: Shield, title: 'Safe & Secure', desc: 'All toys certified' },
    { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
    { icon: Gift, title: 'Gift Wrapping', desc: 'Free on request' },
  ];

  return (
    <>
      <section className="py-8 md:py-12 bg-white border-y border-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 md:gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-kido-yellow-light flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-kido-yellow-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm md:text-base">{title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-r from-kido-red to-kido-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl transform -rotate-12">🎈</div>
          <div className="absolute bottom-10 right-10 text-8xl transform rotate-12">🎁</div>
          <div className="absolute top-1/2 left-1/3 text-6xl">⭐</div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-white/20 text-white font-semibold px-4 py-1 rounded-full text-sm mb-6">
              Limited Time Offer
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Get 20% Off Your First Order! 🎉
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of happy families. Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded">KIDO20</span> at checkout.
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="rounded-full h-14 px-10 text-lg font-bold bg-white hover:bg-white/90 text-kido-red shadow-lg btn-bounce"
                data-testid="button-promo-shop"
              >
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
