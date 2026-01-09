import { Link, useLocation } from 'wouter';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cartStore';

export function MobileBottomNav() {
  const [location] = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/products', icon: Search, label: 'Shop' },
    { href: '/cart', icon: ShoppingBag, label: 'Cart', badge: cartCount },
    { href: '/wishlist', icon: Heart, label: 'Wishlist' },
    { href: '/login', icon: User, label: 'Account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-muted shadow-lg md:hidden z-40">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, icon: Icon, label, badge }) => {
          const isActive = href === '/' ? location === '/' : location.startsWith(href);
          return (
            <Link key={href} href={href} data-testid={`nav-mobile-${label.toLowerCase()}`}>
              <div className="flex flex-col items-center gap-0.5 relative px-4 py-2">
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-kido-yellow-dark' : 'text-muted-foreground'
                    }`}
                  />
                  {badge && badge > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center bg-kido-red text-white text-[10px] font-bold rounded-full">
                      {badge}
                    </Badge>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? 'text-kido-yellow-dark' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </span>
                {isActive && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-kido-yellow rounded-full" />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
