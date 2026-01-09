import { useState } from 'react';
import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import { useCart } from '@/lib/cartStore';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import toyImage1 from '@assets/stock_images/colorful_children_to_3476a40b.jpg';
import toyImage2 from '@assets/stock_images/colorful_children_to_bb37c84f.jpg';
import toyImage3 from '@assets/stock_images/colorful_children_to_55e391d6.jpg';
import toyImage4 from '@assets/stock_images/colorful_children_to_50e5b906.jpg';
import toyImage5 from '@assets/stock_images/colorful_children_to_5b13ed19.jpg';
import toyImage6 from '@assets/stock_images/colorful_children_to_8d61e1a4.jpg';

const toyImages = [toyImage1, toyImage2, toyImage3, toyImage4, toyImage5, toyImage6];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(products.slice(0, 4));
  const { addToCart } = useCart();

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
  };

  const moveToCart = (product: typeof products[0]) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-8xl mb-6">💝</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Start adding toys you love and save them for later!
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full h-14 px-8 bg-gradient-kido text-foreground font-bold" data-testid="button-browse-toys">
                <Heart className="w-5 h-5 mr-2" />
                Browse Toys
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">My Wishlist 💝</h1>
            <p className="text-muted-foreground mt-1">{wishlistItems.length} items saved</p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="rounded-full" data-testid="button-continue-browsing">
              Continue Browsing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence>
            {wishlistItems.map((item, index) => {
              const productImage = toyImages[item.id % toyImages.length];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-3xl shadow-card overflow-hidden border border-muted/50 flex"
                  data-testid={`wishlist-item-${item.id}`}
                >
                  <Link href={`/product/${item.id}`}>
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-kido-yellow-light/30 flex-shrink-0 cursor-pointer">
                      <img
                        src={productImage}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 p-4 flex flex-col">
                    <Link href={`/product/${item.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-kido-yellow-dark transition-colors cursor-pointer">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">Ages {item.ageRange}</p>
                    <p className="font-display text-xl font-bold text-foreground mb-auto">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        className="flex-1 rounded-full bg-kido-yellow text-foreground font-semibold"
                        onClick={() => moveToCart(item)}
                        data-testid={`button-move-to-cart-${item.id}`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full text-kido-red hover:text-kido-red hover:bg-kido-red/10"
                        onClick={() => removeFromWishlist(item.id)}
                        data-testid={`button-remove-wishlist-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
