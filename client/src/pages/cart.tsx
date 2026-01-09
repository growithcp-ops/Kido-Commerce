import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cartStore';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

import toyImage1 from '@assets/stock_images/colorful_children_to_3476a40b.jpg';
import toyImage2 from '@assets/stock_images/colorful_children_to_bb37c84f.jpg';
import toyImage3 from '@assets/stock_images/colorful_children_to_55e391d6.jpg';
import toyImage4 from '@assets/stock_images/colorful_children_to_50e5b906.jpg';
import toyImage5 from '@assets/stock_images/colorful_children_to_5b13ed19.jpg';
import toyImage6 from '@assets/stock_images/colorful_children_to_8d61e1a4.jpg';

const toyImages = [toyImage1, toyImage2, toyImage3, toyImage4, toyImage5, toyImage6];

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Looks like you haven't added any toys yet. Let's find something fun!
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full h-14 px-8 bg-gradient-kido text-foreground font-bold" data-testid="button-start-shopping">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl font-bold mb-8"
        >
          Shopping Cart 🛒
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-card overflow-hidden">
              <AnimatePresence>
                {items.map((item, index) => {
                  const productImage = toyImages[item.id % toyImages.length];
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-4 md:p-6 border-b border-muted last:border-0"
                      data-testid={`cart-item-${item.id}`}
                    >
                      <Link href={`/product/${item.id}`}>
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-kido-yellow-light/30 flex-shrink-0 cursor-pointer">
                          <img
                            src={productImage}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-semibold text-foreground text-lg hover:text-kido-yellow-dark transition-colors cursor-pointer">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-2">Ages {item.ageRange}</p>
                        <p className="font-display text-xl font-bold text-foreground">
                          ${item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center bg-muted rounded-full">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              data-testid={`button-decrease-${item.id}`}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              data-testid={`button-increase-${item.id}`}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-kido-red hover:text-kido-red hover:bg-kido-red/10 rounded-full"
                            onClick={() => removeFromCart(item.id)}
                            data-testid={`button-remove-${item.id}`}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className="hidden md:block text-right">
                        <p className="font-display text-xl font-bold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <Link href="/products">
              <Button variant="ghost" className="mt-4 rounded-full" data-testid="button-continue-shopping">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-card p-6 sticky top-24"
            >
              <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>

              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Promo code"
                    className="pl-10 rounded-full border-2"
                    data-testid="input-promo-code"
                  />
                </div>
                <Button variant="outline" className="rounded-full" data-testid="button-apply-promo">
                  Apply
                </Button>
              </div>

              <div className="space-y-3 border-t border-muted pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-kido-green font-semibold' : ''}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal < 50 && (
                  <p className="text-sm text-kido-yellow-dark bg-kido-yellow-light/50 rounded-lg p-3">
                    🚚 Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                )}
              </div>

              <div className="flex justify-between text-xl font-bold mt-6 pt-4 border-t border-muted">
                <span>Total</span>
                <span className="font-display" data-testid="text-cart-total">${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout">
                <Button
                  size="lg"
                  className="w-full mt-6 rounded-full h-14 bg-gradient-kido text-foreground font-bold text-lg btn-bounce"
                  data-testid="button-checkout"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <span>🔒 Secure Checkout</span>
                <span>•</span>
                <span>💳 All Cards Accepted</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
