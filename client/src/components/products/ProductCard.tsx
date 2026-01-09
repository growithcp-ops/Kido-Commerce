import { Link } from 'wouter';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/data';
import { useCart } from '@/lib/cartStore';
import { motion } from 'framer-motion';
import { useState } from 'react';

import toyImage1 from '@assets/stock_images/colorful_children_to_3476a40b.jpg';
import toyImage2 from '@assets/stock_images/colorful_children_to_bb37c84f.jpg';
import toyImage3 from '@assets/stock_images/colorful_children_to_55e391d6.jpg';
import toyImage4 from '@assets/stock_images/colorful_children_to_50e5b906.jpg';
import toyImage5 from '@assets/stock_images/colorful_children_to_5b13ed19.jpg';
import toyImage6 from '@assets/stock_images/colorful_children_to_8d61e1a4.jpg';

const toyImages = [toyImage1, toyImage2, toyImage3, toyImage4, toyImage5, toyImage6];

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const productImage = toyImages[product.id % toyImages.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/product/${product.id}`} data-testid={`card-product-${product.id}`}>
        <div className="group bg-white rounded-3xl overflow-hidden shadow-card hover-lift border border-muted/50 cursor-pointer">
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-kido-yellow-light/30 to-white">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {product.badge && (
              <Badge className={`absolute top-3 left-3 rounded-full px-3 py-1 font-semibold text-xs ${
                product.badge === 'Sale' ? 'bg-kido-red text-white' :
                product.badge === 'New' ? 'bg-kido-blue text-white' :
                product.badge === 'Best Seller' ? 'bg-kido-yellow text-foreground' :
                'bg-kido-green text-white'
              }`}>
                {product.badge}
              </Badge>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${
                isWishlisted ? 'text-kido-red' : 'text-muted-foreground'
              }`}
              onClick={handleWishlist}
              data-testid={`button-wishlist-${product.id}`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>

            {!product.inStock && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                <span className="bg-muted text-muted-foreground font-semibold px-4 py-2 rounded-full">
                  Out of Stock
                </span>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                className={`w-full rounded-full font-semibold shadow-lg btn-bounce ${
                  isAdding
                    ? 'bg-kido-green text-white'
                    : 'bg-kido-yellow hover:bg-kido-yellow-dark text-foreground'
                }`}
                disabled={!product.inStock}
                onClick={handleAddToCart}
                data-testid={`button-add-cart-${product.id}`}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isAdding ? 'Added!' : 'Add to Cart'}
              </Button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-1 mb-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'text-kido-yellow fill-kido-yellow'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">
                ({product.reviews})
              </span>
            </div>

            <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-kido-yellow-dark transition-colors">
              {product.name}
            </h3>

            <p className="text-xs text-muted-foreground mb-2">
              Ages {product.ageRange}
            </p>

            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <Badge variant="secondary" className="bg-kido-red-light/30 text-kido-red text-xs">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
