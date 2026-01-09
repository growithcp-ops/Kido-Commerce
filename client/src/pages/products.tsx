import { useState, useMemo } from 'react';
import { useSearch } from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { products, categories, ageFilters, priceFilters, sortOptions } from '@/lib/data';
import { Search, SlidersHorizontal, X, Grid3X3, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialCategory = params.get('category') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedAge, setSelectedAge] = useState('All Ages');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [showFilters, setShowFilters] = useState(false);
  const [gridSize, setGridSize] = useState<'small' | 'large'>('large');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedAge !== 'All Ages') {
      result = result.filter(p => {
        const [min, max] = p.ageRange.split('-').map(Number);
        const [filterMin, filterMax] = selectedAge.split('-').map(Number);
        return min <= filterMax && max >= filterMin;
      });
    }

    if (selectedPrice !== 'All Prices') {
      result = result.filter(p => {
        if (selectedPrice === 'Under $20') return p.price < 20;
        if (selectedPrice === '$20-$40') return p.price >= 20 && p.price <= 40;
        if (selectedPrice === '$40-$60') return p.price >= 40 && p.price <= 60;
        if (selectedPrice === 'Over $60') return p.price > 60;
        return true;
      });
    }

    switch (sortBy) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'Best Rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedAge, selectedPrice, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedAge('All Ages');
    setSelectedPrice('All Prices');
    setSortBy('Most Popular');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedAge !== 'All Ages' || selectedPrice !== 'All Prices';

  return (
    <Layout>
      <div className="bg-gradient-hero py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {selectedCategory
                ? categories.find(c => c.id === selectedCategory)?.name || 'All Toys'
                : 'All Toys'
              } 🎁
            </h1>
            <p className="text-muted-foreground text-lg">
              Showing {filteredProducts.length} amazing toys
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-display font-bold text-lg mb-3">Categories</h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === '' ? 'default' : 'ghost'}
                    className={`w-full justify-start rounded-xl ${selectedCategory === '' ? 'bg-kido-yellow text-foreground' : ''}`}
                    onClick={() => setSelectedCategory('')}
                    data-testid="filter-category-all"
                  >
                    All Categories
                  </Button>
                  {categories.map(cat => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? 'default' : 'ghost'}
                      className={`w-full justify-start rounded-xl ${selectedCategory === cat.id ? 'bg-kido-yellow text-foreground' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                      data-testid={`filter-category-${cat.id}`}
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg mb-3">Age Range</h3>
                <div className="space-y-2">
                  {ageFilters.map(age => (
                    <label key={age} className="flex items-center gap-3 cursor-pointer py-1">
                      <Checkbox
                        checked={selectedAge === age}
                        onCheckedChange={() => setSelectedAge(age)}
                        data-testid={`filter-age-${age}`}
                      />
                      <span className="text-sm">{age}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg mb-3">Price</h3>
                <div className="space-y-2">
                  {priceFilters.map(price => (
                    <label key={price} className="flex items-center gap-3 cursor-pointer py-1">
                      <Checkbox
                        checked={selectedPrice === price}
                        onCheckedChange={() => setSelectedPrice(price)}
                        data-testid={`filter-price-${price}`}
                      />
                      <span className="text-sm">{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={clearFilters}
                  data-testid="button-clear-filters"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search toys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-full border-2 border-muted"
                  data-testid="input-search-products"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="lg:hidden rounded-full h-12"
                  onClick={() => setShowFilters(!showFilters)}
                  data-testid="button-toggle-filters"
                >
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                </Button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 h-12 rounded-full border-2" data-testid="select-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex border rounded-full overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${gridSize === 'large' ? 'bg-muted' : ''}`}
                    onClick={() => setGridSize('large')}
                    data-testid="button-grid-large"
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${gridSize === 'small' ? 'bg-muted' : ''}`}
                    onClick={() => setGridSize('small')}
                    data-testid="button-grid-small"
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory && (
                  <Badge className="bg-kido-yellow text-foreground rounded-full px-3 py-1">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('')} className="ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedAge !== 'All Ages' && (
                  <Badge className="bg-kido-blue text-white rounded-full px-3 py-1">
                    Age: {selectedAge}
                    <button onClick={() => setSelectedAge('All Ages')} className="ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedPrice !== 'All Prices' && (
                  <Badge className="bg-kido-green text-white rounded-full px-3 py-1">
                    {selectedPrice}
                    <button onClick={() => setSelectedPrice('All Prices')} className="ml-2">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden mb-6 overflow-hidden"
                >
                  <div className="bg-white rounded-2xl p-4 border shadow-soft space-y-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="rounded-xl" data-testid="select-category-mobile">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedAge} onValueChange={setSelectedAge}>
                      <SelectTrigger className="rounded-xl" data-testid="select-age-mobile">
                        <SelectValue placeholder="Age Range" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageFilters.map(age => (
                          <SelectItem key={age} value={age}>{age}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                      <SelectTrigger className="rounded-xl" data-testid="select-price-mobile">
                        <SelectValue placeholder="Price Range" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceFilters.map(price => (
                          <SelectItem key={price} value={price}>{price}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {filteredProducts.length > 0 ? (
              <div className={`grid gap-4 md:gap-6 ${
                gridSize === 'large' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
              }`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display text-2xl font-bold mb-2">No toys found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={clearFilters} className="rounded-full bg-kido-yellow text-foreground" data-testid="button-clear-filters-empty">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
