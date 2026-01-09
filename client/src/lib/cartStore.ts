import { useState, useCallback } from 'react';
import { Product, CartItem } from './data';

let cartItems: CartItem[] = [];
let listeners: (() => void)[] = [];

function notifyListeners() {
  listeners.forEach(listener => listener());
}

export function useCart() {
  const [, setTick] = useState(0);

  const subscribe = useCallback(() => {
    const listener = () => setTick(t => t + 1);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  useState(() => {
    const unsubscribe = subscribe();
    return unsubscribe;
  });

  const addToCart = useCallback((product: Product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      cartItems = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cartItems = [...cartItems, { ...product, quantity: 1 }];
    }
    notifyListeners();
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    cartItems = cartItems.filter(item => item.id !== productId);
    notifyListeners();
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      cartItems = cartItems.filter(item => item.id !== productId);
    } else {
      cartItems = cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    }
    notifyListeners();
  }, []);

  const clearCart = useCallback(() => {
    cartItems = [];
    notifyListeners();
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, []);

  const getCartCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, []);

  return {
    items: cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };
}
