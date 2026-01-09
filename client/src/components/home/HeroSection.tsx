import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@assets/generated_images/playful_toy_store_hero_illustration.png';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[600px] md:min-h-[700px] pattern-confetti">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-5xl"
          animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          🎈
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-20 text-4xl hidden md:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          🎁
        </motion.div>
        <motion.div
          className="absolute top-60 left-1/4 text-3xl hidden lg:block"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          ✨
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-soft">
              <Sparkles className="w-4 h-4 text-kido-yellow" />
              <span className="text-sm font-medium text-foreground">New Collection 2025</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Where </span>
              <span className="text-gradient-kido">Fun</span>
              <br />
              <span className="text-foreground">Meets </span>
              <span className="text-kido-red">Learning!</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Discover amazing toys that spark imagination and bring endless joy to children ages 3-12. Safe, quality, and so much fun!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <Button
                  size="lg"
                  className="rounded-full h-14 px-8 text-lg font-bold bg-gradient-kido hover:opacity-90 text-foreground shadow-playful btn-bounce"
                  data-testid="button-shop-now"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/products?category=learning">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 px-8 text-lg font-semibold border-2 border-kido-red text-kido-red hover:bg-kido-red hover:text-white"
                  data-testid="button-explore-learning"
                >
                  Learning Toys
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 mt-10">
              <div className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-kido-yellow-dark">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Kids</div>
              </div>
              <div className="w-px h-10 bg-muted" />
              <div className="text-center">
                <div className="font-display text-2xl md:text-3xl font-bold text-kido-red">500+</div>
                <div className="text-sm text-muted-foreground">Toys</div>
              </div>
              <div className="w-px h-10 bg-muted" />
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-kido-yellow fill-kido-yellow" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">4.9/5</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Happy children playing with toys"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <motion.div
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white rounded-2xl p-4 shadow-playful"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-kido-green/20 flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <div className="font-bold text-foreground">100% Safe</div>
                  <div className="text-sm text-muted-foreground">Certified toys</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white rounded-2xl p-4 shadow-playful"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-kido-yellow/30 flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <div>
                  <div className="font-bold text-foreground">Free Shipping</div>
                  <div className="text-sm text-muted-foreground">Orders $50+</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
