import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense } from "react";
import React from "react";

// Lazy load pages for better performance
const NotFound = React.lazy(() => import("@/pages/not-found"));
const HomePage = React.lazy(() => import("@/pages/home"));
const ProductsPage = React.lazy(() => import("@/pages/products"));
const ProductDetailPage = React.lazy(() => import("@/pages/product-detail"));
const CartPage = React.lazy(() => import("@/pages/cart"));
const CheckoutPage = React.lazy(() => import("@/pages/checkout"));
const LoginPage = React.lazy(() => import("@/pages/login"));
const RegisterPage = React.lazy(() => import("@/pages/register"));
const AdminPage = React.lazy(() => import("@/pages/admin"));
const WishlistPage = React.lazy(() => import("@/pages/wishlist"));

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/product/:id" component={ProductDetailPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/wishlist" component={WishlistPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
