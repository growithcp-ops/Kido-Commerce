import { Link } from 'wouter';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-kido-yellow-light/30 to-kido-yellow-light/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" data-testid="link-footer-home">
              <div className="w-10 h-10 rounded-2xl bg-gradient-kido flex items-center justify-center shadow-md">
                <span className="text-xl">🧸</span>
              </div>
              <span className="font-display text-2xl font-bold text-gradient-kido">KIDO</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Bringing joy to children everywhere with safe, quality toys that inspire creativity and learning.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'Youtube' }
              ].map(({ icon: Icon, label }) => (
                <Button
                  key={label}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-kido-yellow hover:bg-kido-yellow hover:border-kido-yellow"
                  data-testid={`button-social-${label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Shop All', href: '/products' },
                { label: 'New Arrivals', href: '/products?sort=newest' },
                { label: 'Best Sellers', href: '/products?sort=popular' },
                { label: 'On Sale', href: '/products?sale=true' },
                { label: 'Gift Cards', href: '/gift-cards' }
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors" data-testid={`link-footer-${link.label.toLowerCase().replace(' ', '-')}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold mb-4">Help & Support</h3>
            <ul className="space-y-3">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'FAQs', href: '/faq' },
                { label: 'Shipping Info', href: '/shipping' },
                { label: 'Returns', href: '/returns' },
                { label: 'Track Order', href: '/track-order' }
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors" data-testid={`link-footer-${link.label.toLowerCase().replace(' ', '-')}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe for exclusive deals and new toy announcements!
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-full h-11 border-2 border-muted focus:border-kido-yellow"
                data-testid="input-newsletter-email"
              />
              <Button className="rounded-full h-11 px-6 bg-kido-red hover:bg-kido-red/90 text-white font-semibold" data-testid="button-newsletter-subscribe">
                Join
              </Button>
            </div>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@kido.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1-800-KIDO-TOY</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Toy Lane, Funtown</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-kido-yellow/30 mt-10 pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {[
              { icon: Truck, label: 'Free Shipping Over $50' },
              { icon: Shield, label: 'Safe & Secure Checkout' },
              { icon: CreditCard, label: 'Easy Returns' }
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-5 h-5 text-kido-yellow-dark" />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} KIDO Toys. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link href="/privacy" className="hover:text-foreground" data-testid="link-privacy">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground" data-testid="link-terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
