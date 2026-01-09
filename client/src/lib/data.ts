export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  ageRange: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  featured?: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  childAge: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const categories: Category[] = [
  { id: 'cars', name: 'Cars & Vehicles', icon: '🚗', color: 'bg-kido-blue', count: 45 },
  { id: 'dolls', name: 'Dolls & Figures', icon: '🧸', color: 'bg-kido-pink', count: 38 },
  { id: 'games', name: 'Games & Puzzles', icon: '🎮', color: 'bg-kido-green', count: 52 },
  { id: 'learning', name: 'Learning Toys', icon: '📚', color: 'bg-kido-purple', count: 41 },
  { id: 'outdoor', name: 'Outdoor Fun', icon: '⚽', color: 'bg-kido-orange', count: 29 },
  { id: 'building', name: 'Building Blocks', icon: '🧱', color: 'bg-kido-red', count: 36 },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Rainbow Stacking Blocks',
    price: 24.99,
    originalPrice: 34.99,
    image: '/api/placeholder/300/300',
    category: 'building',
    ageRange: '3-6',
    rating: 4.8,
    reviews: 124,
    description: 'Colorful wooden blocks that help develop motor skills and creativity. Made from eco-friendly materials.',
    inStock: true,
    featured: true,
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Cuddly Teddy Bear',
    price: 19.99,
    image: '/api/placeholder/300/300',
    category: 'dolls',
    ageRange: '0-12',
    rating: 4.9,
    reviews: 256,
    description: 'Super soft and huggable teddy bear made with premium plush fabric. Perfect bedtime companion.',
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: 'Remote Control Race Car',
    price: 39.99,
    originalPrice: 49.99,
    image: '/api/placeholder/300/300',
    category: 'cars',
    ageRange: '6-12',
    rating: 4.7,
    reviews: 89,
    description: 'High-speed RC car with LED lights and realistic engine sounds. Includes rechargeable battery.',
    inStock: true,
    featured: true,
    badge: 'New'
  },
  {
    id: 4,
    name: 'ABC Learning Tablet',
    price: 29.99,
    image: '/api/placeholder/300/300',
    category: 'learning',
    ageRange: '3-8',
    rating: 4.6,
    reviews: 178,
    description: 'Interactive learning tablet with letters, numbers, and fun games. Develops early reading skills.',
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: 'Dinosaur Puzzle Set',
    price: 14.99,
    image: '/api/placeholder/300/300',
    category: 'games',
    ageRange: '4-10',
    rating: 4.5,
    reviews: 92,
    description: 'Set of 4 dinosaur puzzles with different difficulty levels. Educational and fun!',
    inStock: true
  },
  {
    id: 6,
    name: 'Princess Castle Playset',
    price: 54.99,
    originalPrice: 69.99,
    image: '/api/placeholder/300/300',
    category: 'dolls',
    ageRange: '4-10',
    rating: 4.8,
    reviews: 145,
    description: 'Magical castle with princess figures, furniture, and accessories. Hours of imaginative play!',
    inStock: true,
    badge: 'Sale'
  },
  {
    id: 7,
    name: 'Construction Truck Set',
    price: 34.99,
    image: '/api/placeholder/300/300',
    category: 'cars',
    ageRange: '3-8',
    rating: 4.7,
    reviews: 67,
    description: 'Set of 5 construction vehicles including excavator, dump truck, and crane.',
    inStock: true
  },
  {
    id: 8,
    name: 'Science Experiment Kit',
    price: 44.99,
    image: '/api/placeholder/300/300',
    category: 'learning',
    ageRange: '8-12',
    rating: 4.9,
    reviews: 203,
    description: '50+ safe experiments to learn chemistry, physics, and biology. Includes lab coat!',
    inStock: true,
    featured: true,
    badge: 'Top Rated'
  },
  {
    id: 9,
    name: 'Bouncy Ball Set',
    price: 12.99,
    image: '/api/placeholder/300/300',
    category: 'outdoor',
    ageRange: '3-12',
    rating: 4.4,
    reviews: 56,
    description: 'Set of 6 super bouncy balls in vibrant colors. Great for outdoor play!',
    inStock: true
  },
  {
    id: 10,
    name: 'Wooden Train Set',
    price: 49.99,
    originalPrice: 59.99,
    image: '/api/placeholder/300/300',
    category: 'building',
    ageRange: '3-8',
    rating: 4.8,
    reviews: 134,
    description: '40-piece wooden train set with tracks, bridges, and accessories. Compatible with major brands.',
    inStock: true
  },
  {
    id: 11,
    name: 'Musical Instrument Set',
    price: 32.99,
    image: '/api/placeholder/300/300',
    category: 'learning',
    ageRange: '3-10',
    rating: 4.6,
    reviews: 88,
    description: 'Includes tambourine, xylophone, maracas, and more. Develop rhythm and creativity!',
    inStock: true
  },
  {
    id: 12,
    name: 'Space Rocket Playset',
    price: 42.99,
    image: '/api/placeholder/300/300',
    category: 'building',
    ageRange: '5-12',
    rating: 4.7,
    reviews: 76,
    description: 'Build your own space rocket with astronaut figures and launch pad. Lights and sounds included!',
    inStock: false
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah M.',
    avatar: '👩',
    rating: 5,
    comment: 'My kids absolutely love the toys from KIDO! The quality is amazing and they arrive so quickly. Will definitely order again!',
    childAge: 'Mom of 2 (ages 4 & 7)'
  },
  {
    id: 2,
    name: 'David K.',
    avatar: '👨',
    rating: 5,
    comment: 'Finally found a toy store that prioritizes safety. The educational toys have really helped my daughter learn while having fun.',
    childAge: 'Dad of 1 (age 5)'
  },
  {
    id: 3,
    name: 'Emily R.',
    avatar: '👩‍🦰',
    rating: 5,
    comment: 'Best customer service ever! They helped me find the perfect birthday gift. My son was over the moon!',
    childAge: 'Mom of 3 (ages 3, 6 & 9)'
  }
];

export const ageFilters = ['All Ages', '0-2', '3-5', '6-8', '9-12'];
export const priceFilters = ['All Prices', 'Under $20', '$20-$40', '$40-$60', 'Over $60'];
export const sortOptions = ['Most Popular', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Rated'];
