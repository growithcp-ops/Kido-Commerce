import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/products?category=learning', label: 'Learning' },
    { href: '/products?category=games', label: 'Games' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href.split('?')[0]);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-kido-yellow-light/50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group" data-testid="link-home">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-kido flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <span className="text-xl md:text-2xl">🧸</span>
                </div>
                <span className="font-display text-2xl md:text-3xl font-bold text-gradient-kido">KIDO</span>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant="ghost"
                      className={`font-semibold text-base rounded-full px-5 transition-all ${
                        isActive(link.href)
                          ? 'bg-kido-yellow-light text-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-kido-yellow-light/50'
                      }`}
                      data-testid={`link-nav-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for toys..."
                  className="pl-12 pr-4 h-12 rounded-full border-2 border-muted bg-muted/30 focus:border-kido-yellow focus:bg-white transition-all"
                  data-testid="input-search"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setSearchOpen(!searchOpen)}
                data-testid="button-search-mobile"
              >
                <Search className="w-5 h-5" />
              </Button>

              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex" data-testid="button-wishlist">
                  <Heart className="w-5 h-5" />
                </Button>
              </Link>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="rounded-full relative" data-testid="button-cart">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-kido-red text-white text-xs font-bold rounded-full">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link href="/login">
                <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex" data-testid="button-login">
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden pb-4 overflow-hidden"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search for toys..."
                    className="pl-12 pr-4 h-12 rounded-full border-2 border-muted"
                    data-testid="input-search-mobile"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl lg:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display text-2xl font-bold text-gradient-kido">Menu</span>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} data-testid="button-close-menu">
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <nav className="flex flex-col gap-2">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start font-semibold text-lg h-14 rounded-2xl ${
                          isActive(link.href) ? 'bg-kido-yellow-light' : ''
                        }`}
                        data-testid={`link-mobile-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </Button>
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-muted my-6" />

                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full h-12 rounded-full bg-gradient-kido text-foreground font-bold shadow-md" data-testid="button-mobile-login">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-12 rounded-full font-semibold" data-testid="button-mobile-register">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
