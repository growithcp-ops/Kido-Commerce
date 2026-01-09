import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/data';
import { useCart } from '@/lib/cartStore';
import { ProductCard } from '@/components/products/ProductCard';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RefreshCw, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import toyImage1 from '@assets/stock_images/colorful_children_to_3476a40b.jpg';
import toyImage2 from '@assets/stock_images/colorful_children_to_bb37c84f.jpg';
import toyImage3 from '@assets/stock_images/colorful_children_to_55e391d6.jpg';
import toyImage4 from '@assets/stock_images/colorful_children_to_50e5b906.jpg';
import toyImage5 from '@assets/stock_images/colorful_children_to_5b13ed19.jpg';
import toyImage6 from '@assets/stock_images/colorful_children_to_8d61e1a4.jpg';

const toyImages = [toyImage1, toyImage2, toyImage3, toyImage4, toyImage5, toyImage6];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="font-display text-3xl font-bold mb-4">Toy Not Found</h1>
          <p className="text-muted-foreground mb-6">This toy seems to have gone on an adventure!</p>
          <Link href="/products">
            <Button className="rounded-full bg-kido-yellow text-foreground">
              Back to All Toys
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const productImage = toyImages[product.id % toyImages.length];
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-foreground">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-kido-yellow-light/30 to-white shadow-card">
              <img
                src={productImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className={`absolute top-4 left-4 rounded-full px-4 py-2 font-semibold ${
                  product.badge === 'Sale' ? 'bg-kido-red text-white' :
                  product.badge === 'New' ? 'bg-kido-blue text-white' :
                  product.badge === 'Best Seller' ? 'bg-kido-yellow text-foreground' :
                  'bg-kido-green text-white'
                }`}>
                  {product.badge}
                </Badge>
              )}
            </div>

            <div className="flex gap-3 mt-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    i === 0 ? 'border-kido-yellow' : 'border-transparent hover:border-muted'
                  }`}
                >
                  <img
                    src={toyImages[(product.id + i) % toyImages.length]}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-kido-yellow fill-kido-yellow'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4" data-testid="text-product-name">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-display text-4xl font-bold text-foreground" data-testid="text-product-price">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <Badge className="bg-kido-red-light/30 text-kido-red rounded-full">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-kido-yellow-light/50 rounded-2xl px-4 py-3">
                <span className="text-sm text-muted-foreground">Age Range</span>
                <div className="font-bold text-foreground">{product.ageRange} years</div>
              </div>
              <div className="bg-kido-blue/10 rounded-2xl px-4 py-3">
                <span className="text-sm text-muted-foreground">Category</span>
                <div className="font-bold text-foreground capitalize">{product.category}</div>
              </div>
              <div className={`rounded-2xl px-4 py-3 ${product.inStock ? 'bg-kido-green/10' : 'bg-kido-red/10'}`}>
                <span className="text-sm text-muted-foreground">Availability</span>
                <div className={`font-bold ${product.inStock ? 'text-kido-green' : 'text-kido-red'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-muted rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="button-quantity-minus"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-bold" data-testid="text-quantity">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-quantity-plus"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <Button
                size="lg"
                className={`flex-1 rounded-full h-14 font-bold text-lg btn-bounce ${
                  isAdding
                    ? 'bg-kido-green text-white'
                    : 'bg-gradient-kido text-foreground'
                }`}
                disabled={!product.inStock}
                onClick={handleAddToCart}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAdding ? 'Added to Cart!' : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`rounded-full h-14 w-14 ${isWishlisted ? 'text-kido-red border-kido-red' : ''}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
                data-testid="button-wishlist"
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-2xl">
              {[
                { icon: Truck, text: 'Free Shipping' },
                { icon: Shield, text: 'Safe Materials' },
                { icon: RefreshCw, text: 'Easy Returns' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="text-center">
                  <Icon className="w-6 h-6 mx-auto mb-1 text-kido-yellow-dark" />
                  <span className="text-xs text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
              You May Also Like 💝
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
