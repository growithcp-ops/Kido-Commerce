import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { products } from '@/lib/data';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  UserCheck,
  MoreHorizontal,
  Plus,
  Eye,
  Edit,
  Trash2,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Package, label: 'Products', badge: '12' },
  { icon: ShoppingCart, label: 'Orders', badge: '5' },
  { icon: Users, label: 'Customers' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

const recentOrders = [
  { id: 'KD-2847', customer: 'Sarah M.', items: 3, total: 89.97, status: 'Completed', date: 'Jan 9, 2026' },
  { id: 'KD-2846', customer: 'David K.', items: 1, total: 29.99, status: 'Processing', date: 'Jan 9, 2026' },
  { id: 'KD-2845', customer: 'Emily R.', items: 5, total: 154.95, status: 'Shipped', date: 'Jan 8, 2026' },
  { id: 'KD-2844', customer: 'Michael T.', items: 2, total: 64.98, status: 'Completed', date: 'Jan 8, 2026' },
  { id: 'KD-2843', customer: 'Anna L.', items: 4, total: 119.96, status: 'Completed', date: 'Jan 7, 2026' },
];

const statusColors: Record<string, string> = {
  Completed: 'bg-kido-green/15 text-kido-green',
  Processing: 'bg-kido-yellow/20 text-kido-yellow-dark',
  Shipped: 'bg-kido-blue/15 text-kido-blue',
  Cancelled: 'bg-kido-red/15 text-kido-red',
};

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: '$12,847', change: '+14.5%', positive: true },
    { icon: ShoppingBag, label: 'Orders', value: '324', change: '+8.2%', positive: true },
    { icon: Package, label: 'Products', value: '156', change: '+12', positive: true },
    { icon: UserCheck, label: 'Customers', value: '1,248', change: '+23.1%', positive: true },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-muted transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-muted">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-kido flex items-center justify-center shadow-md">
              <span className="text-xl">🧸</span>
            </div>
            <div>
              <span className="font-display text-xl font-bold text-gradient-kido">KIDO</span>
              <span className="text-xs text-muted-foreground block">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarItems.map(({ icon: Icon, label, badge, active }) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === label
                  ? 'bg-kido-yellow/20 text-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
              data-testid={`nav-admin-${label.toLowerCase()}`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </div>
              {badge && (
                <Badge className="bg-kido-red text-white text-xs rounded-full px-2">
                  {badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-muted">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" data-testid="button-admin-logout">
              <LogOut className="w-5 h-5 mr-3" />
              Back to Store
            </Button>
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-muted px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                data-testid="button-toggle-sidebar"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <h1 className="font-display text-xl md:text-2xl font-bold">{activeTab}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 w-64 h-10 rounded-xl border-muted"
                  data-testid="input-admin-search"
                />
              </div>

              <Button variant="ghost" size="icon" className="rounded-xl relative" data-testid="button-notifications">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-kido-red rounded-full" />
              </Button>

              <div className="flex items-center gap-2 ml-2">
                <div className="w-9 h-9 rounded-full bg-kido-yellow flex items-center justify-center font-bold">
                  A
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ icon: Icon, label, value, change, positive }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-4 md:p-5 shadow-card border border-muted/50"
                data-testid={`stat-card-${label.toLowerCase().replace(' ', '-')}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-kido-yellow-light flex items-center justify-center">
                    <Icon className="w-5 h-5 text-kido-yellow-dark" />
                  </div>
                  <span className={`text-xs font-semibold flex items-center gap-1 ${positive ? 'text-kido-green' : 'text-kido-red'}`}>
                    <TrendingUp className="w-3 h-3" />
                    {change}
                  </span>
                </div>
                <p className="text-2xl md:text-3xl font-display font-bold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-muted/50 overflow-hidden">
              <div className="p-4 md:p-5 border-b border-muted flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">Recent Orders</h2>
                <Button variant="ghost" size="sm" className="text-kido-red" data-testid="button-view-all-orders">
                  View All
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30 text-left">
                    <tr>
                      <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Order ID</th>
                      <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Customer</th>
                      <th className="px-4 py-3 text-sm font-semibold text-muted-foreground hidden md:table-cell">Items</th>
                      <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Total</th>
                      <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-sm font-semibold text-muted-foreground hidden lg:table-cell">Date</th>
                      <th className="px-4 py-3 text-sm font-semibold text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={order.id} className="border-b border-muted last:border-0 hover:bg-muted/20" data-testid={`order-row-${order.id}`}>
                        <td className="px-4 py-3 font-semibold text-sm">{order.id}</td>
                        <td className="px-4 py-3 text-sm">{order.customer}</td>
                        <td className="px-4 py-3 text-sm hidden md:table-cell">{order.items}</td>
                        <td className="px-4 py-3 font-semibold text-sm">${order.total.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <Badge className={`rounded-full text-xs ${statusColors[order.status]}`}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{order.date}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card border border-muted/50 overflow-hidden">
              <div className="p-4 md:p-5 border-b border-muted flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">Top Products</h2>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" data-testid="button-add-product">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-4 space-y-4">
                {products.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center gap-3" data-testid={`top-product-${product.id}`}>
                    <div className="w-12 h-12 rounded-xl bg-kido-yellow-light/50 flex items-center justify-center text-xl">
                      🧸
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.reviews} sales</p>
                    </div>
                    <span className="font-semibold text-sm">${product.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card border border-muted/50 overflow-hidden">
            <div className="p-4 md:p-5 border-b border-muted flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">Product Management</h2>
              <Button className="rounded-xl bg-kido-yellow text-foreground font-semibold" data-testid="button-add-new-product">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30 text-left">
                  <tr>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Product</th>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground hidden md:table-cell">Category</th>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Price</th>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground hidden lg:table-cell">Stock</th>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground hidden md:table-cell">Rating</th>
                    <th className="px-4 py-3 text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 6).map((product) => (
                    <tr key={product.id} className="border-b border-muted last:border-0 hover:bg-muted/20" data-testid={`product-row-${product.id}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-kido-yellow-light/50 flex items-center justify-center text-lg">
                            🧸
                          </div>
                          <span className="font-semibold text-sm">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm capitalize hidden md:table-cell">{product.category}</td>
                      <td className="px-4 py-3 font-semibold text-sm">${product.price}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <Badge className={product.inStock ? 'bg-kido-green/15 text-kido-green' : 'bg-kido-red/15 text-kido-red'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm hidden md:table-cell">⭐ {product.rating}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" data-testid={`button-view-${product.id}`}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" data-testid={`button-edit-${product.id}`}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-kido-red hover:text-kido-red" data-testid={`button-delete-${product.id}`}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
