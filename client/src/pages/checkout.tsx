import { useState } from 'react';
import { Link } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/lib/cartStore';
import { Progress } from '@/components/ui/progress';
import { Check, CreditCard, Truck, ShoppingBag, ArrowLeft, Lock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setOrderComplete(true);
    clearCart();
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground text-lg mb-8">Add some toys before checking out!</p>
          <Link href="/products">
            <Button size="lg" className="rounded-full h-14 px-8 bg-gradient-kido text-foreground font-bold">
              Browse Toys
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (orderComplete) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 rounded-full bg-kido-green/20 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-kido-green" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Order Confirmed! 🎉</h1>
            <p className="text-muted-foreground text-lg mb-2">
              Thank you for shopping with KIDO!
            </p>
            <p className="text-muted-foreground mb-8">
              Order #KD{Math.random().toString(36).substring(2, 8).toUpperCase()} • A confirmation email has been sent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="rounded-full h-14 px-8 bg-gradient-kido text-foreground font-bold">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="rounded-full h-14 px-8">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideFooter>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-back-to-cart">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Checkout</h1>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto mb-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index < currentStep
                      ? 'bg-kido-green text-white'
                      : index === currentStep
                      ? 'bg-kido-yellow text-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-20 h-1 mx-2 rounded ${index < currentStep ? 'bg-kido-green' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-md mx-auto text-sm">
            {steps.map((step, index) => (
              <span key={step} className={index === currentStep ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                {step}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-card p-6 md:p-8">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <Truck className="w-6 h-6 text-kido-yellow-dark" />
                      <h2 className="font-display text-xl font-bold">Shipping Information</h2>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 h-12 rounded-xl"
                        data-testid="input-email"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1 h-12 rounded-xl"
                          data-testid="input-firstName"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1 h-12 rounded-xl"
                          data-testid="input-lastName"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="123 Toy Lane"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1 h-12 rounded-xl"
                        data-testid="input-address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Funtown"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-1 h-12 rounded-xl"
                          data-testid="input-city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          placeholder="12345"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="mt-1 h-12 rounded-xl"
                          data-testid="input-zipCode"
                        />
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full rounded-full h-14 bg-gradient-kido text-foreground font-bold"
                      onClick={() => setCurrentStep(1)}
                      data-testid="button-continue-payment"
                    >
                      Continue to Payment
                    </Button>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-6 h-6 text-kido-yellow-dark" />
                      <h2 className="font-display text-xl font-bold">Payment Details</h2>
                    </div>

                    <div className="bg-kido-yellow-light/30 rounded-2xl p-4 flex items-center gap-3">
                      <Lock className="w-5 h-5 text-kido-yellow-dark" />
                      <span className="text-sm">Your payment info is secure and encrypted</span>
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="mt-1 h-12 rounded-xl"
                        data-testid="input-cardNumber"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="mt-1 h-12 rounded-xl"
                          data-testid="input-expiry"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="mt-1 h-12 rounded-xl"
                          data-testid="input-cvv"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 rounded-full h-14"
                        onClick={() => setCurrentStep(0)}
                        data-testid="button-back-shipping"
                      >
                        Back
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1 rounded-full h-14 bg-gradient-kido text-foreground font-bold"
                        onClick={() => setCurrentStep(2)}
                        data-testid="button-review-order"
                      >
                        Review Order
                      </Button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <ShoppingBag className="w-6 h-6 text-kido-yellow-dark" />
                      <h2 className="font-display text-xl font-bold">Review Your Order</h2>
                    </div>

                    <div className="bg-muted/30 rounded-2xl p-4 space-y-2">
                      <h3 className="font-semibold">Shipping to:</h3>
                      <p className="text-muted-foreground">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.zipCode}
                      </p>
                    </div>

                    <div className="bg-muted/30 rounded-2xl p-4 space-y-2">
                      <h3 className="font-semibold">Payment Method:</h3>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        •••• •••• •••• {formData.cardNumber.slice(-4) || '****'}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 rounded-full h-14"
                        onClick={() => setCurrentStep(1)}
                        data-testid="button-back-payment"
                      >
                        Back
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1 rounded-full h-14 bg-kido-green hover:bg-kido-green/90 text-white font-bold"
                        onClick={handlePlaceOrder}
                        data-testid="button-place-order"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Place Order
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-card p-6 sticky top-24">
              <h2 className="font-display text-xl font-bold mb-4">Order Summary</h2>

              <div className="max-h-64 overflow-auto space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-kido-yellow-light/30 rounded-xl flex items-center justify-center text-2xl">
                      🧸
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-muted pt-4 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-kido-green font-semibold' : ''}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-muted">
                <span>Total</span>
                <span className="font-display">${total.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
