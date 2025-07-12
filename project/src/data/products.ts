import { Product } from '../types';

export const products: Product[] = [
  // Groceries - Rice & Grains
  {
    id: '1',
    name: 'Basmati Rice Premium Grade',
    description: 'Long grain aromatic basmati rice, perfect for biryani and fried rice',
    longDescription: 'Premium quality aged basmati rice with authentic aroma and taste. Each grain cooks to perfection, remaining separate and fluffy. Ideal for Indian, Middle Eastern, and Asian cuisines.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/4198018/pexels-photo-4198018.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groceries',
    sentiment: {
      positive: 87,
      negative: 13,
      aspects: {
        quality: 92,
        freshness: 89,
        flavor: 85,
      }
    },
    dataAiHint: 'High-quality basmati rice with excellent cooking properties, highly rated for taste and texture',
    tags: ['rice', 'basmati', 'grains', 'cooking', 'biryani', 'indian', 'aromatic']
  },
  {
    id: '2',
    name: 'Soy Sauce - Premium Dark',
    description: 'Rich, umami-packed soy sauce for authentic Asian flavors',
    longDescription: 'Traditional brewed soy sauce with deep, complex flavors. Perfect for stir-fries, marinades, and dipping sauces. No artificial additives, naturally fermented for authentic taste.',
    price: 4.49,
    image: 'https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groceries',
    sentiment: {
      positive: 91,
      negative: 9,
      aspects: {
        flavor: 94,
        quality: 88,
        userExperience: 90,
      }
    },
    dataAiHint: 'Authentic soy sauce with excellent flavor profile, essential for Asian cooking',
    tags: ['soy-sauce', 'condiment', 'asian', 'cooking', 'stir-fry', 'marinade', 'umami', 'fried-rice', 'chinese', 'wok']
  },
  {
    id: '3',
    name: 'Fresh Yellow Onions',
    description: 'Sweet, crisp yellow onions - cooking essential',
    longDescription: 'Farm-fresh yellow onions with perfect balance of sweetness and sharpness. Ideal for caramelizing, sautéing, or using raw in salads. Hand-selected for quality and freshness.',
    price: 2.99,
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groceries',
    sentiment: {
      positive: 84,
      negative: 16,
      aspects: {
        freshness: 88,
        quality: 82,
        flavor: 86,
      }
    },
    dataAiHint: 'Fresh quality onions, versatile cooking ingredient with good shelf life',
    tags: ['onions', 'vegetables', 'cooking', 'fresh', 'fried-rice', 'stir-fry', 'seasoning']
  },

  // Skincare
  {
    id: '4',
    name: 'SPF 50+ Sunscreen Ultra Protection',
    description: 'Broad spectrum protection for all skin types',
    longDescription: 'Advanced mineral sunscreen with zinc oxide and titanium dioxide. Provides superior protection against UVA and UVB rays. Water-resistant for 80 minutes, non-comedogenic, and suitable for sensitive skin.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=60',
    category: 'Skincare',
    sentiment: {
      positive: 89,
      negative: 11,
      aspects: {
        quality: 91,
        userExperience: 87,
        waterproof: 85,
      }
    },
    dataAiHint: 'High-quality sunscreen with excellent protection, suitable for sensitive and oily skin types',
    tags: ['sunscreen', 'spf50', 'skincare', 'protection', 'waterproof', 'sensitive-skin', 'oily-skin', 'mineral']
  },
  {
    id: '5',
    name: 'Gentle Cleansing Face Wash',
    description: 'Oil-free cleanser for oily and combination skin',
    longDescription: 'Dermatologist-tested face wash with salicylic acid and niacinamide. Removes excess oil without over-drying, helps prevent breakouts, and leaves skin feeling clean and refreshed.',
    price: 12.49,
    image: 'https://images.pexels.com/photos/7188324/pexels-photo-7188324.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Skincare',
    sentiment: {
      positive: 85,
      negative: 15,
      aspects: {
        quality: 88,
        userExperience: 84,
        comfort: 86,
      }
    },
    dataAiHint: 'Effective cleanser for oily skin, helps with oil control and acne prevention',
    tags: ['face-wash', 'cleanser', 'oily-skin', 'acne', 'salicylic-acid', 'oil-free', 'gentle']
  },

  // Clothing
  {
    id: '6',
    name: 'Winter Puffer Jacket - Waterproof',
    description: 'Insulated winter jacket with hood, perfect for cold weather',
    longDescription: 'Premium down-filled puffer jacket with waterproof outer shell. Features adjustable hood, multiple pockets, and wind-resistant design. Rated for temperatures down to -20°F.',
    price: 89.99,
    image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Clothing',
    sentiment: {
      positive: 92,
      negative: 8,
      aspects: {
        comfort: 90,
        durability: 94,
        waterproof: 89,
        fit: 87,
      }
    },
    dataAiHint: 'High-quality winter jacket with excellent insulation and waterproof features, great for harsh weather',
    tags: ['jacket', 'winter', 'waterproof', 'insulated', 'puffer', 'cold-weather', 'hood', 'warm']
  },
  {
    id: '7',
    name: 'Casual Cotton T-Shirt',
    description: 'Comfortable everyday t-shirt in multiple colors',
    longDescription: '100% organic cotton t-shirt with soft, breathable fabric. Pre-shrunk and color-fast. Available in various sizes and colors. Perfect for layering or wearing on its own.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=60',
    category: 'Clothing',
    sentiment: {
      positive: 88,
      negative: 12,
      aspects: {
        comfort: 92,
        fit: 85,
        quality: 87,
        durability: 84,
      }
    },
    dataAiHint: 'Comfortable cotton t-shirt with good fit and quality, versatile for casual wear',
    tags: ['t-shirt', 'cotton', 'casual', 'comfortable', 'breathable', 'everyday', 'organic']
  },

  // Electronics
  {
    id: '8',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium sound quality with noise cancellation',
    longDescription: 'Advanced wireless headphones with active noise cancellation, 30-hour battery life, and premium drivers. Features quick charge, multipoint connectivity, and comfortable over-ear design.',
    price: 149.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    sentiment: {
      positive: 91,
      negative: 9,
      aspects: {
        quality: 93,
        comfort: 89,
        userExperience: 92,
        durability: 88,
      }
    },
    dataAiHint: 'High-quality wireless headphones with excellent sound and comfort, great for music and calls',
    tags: ['headphones', 'wireless', 'bluetooth', 'noise-cancellation', 'audio', 'music', 'premium']
  },
  {
    id: '9',
    name: 'Smartphone Fast Charger',
    description: '65W USB-C fast charging adapter with cable',
    longDescription: 'Universal fast charger compatible with most smartphones and tablets. Features intelligent charging technology, over-current protection, and compact design. Includes 6ft USB-C cable.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    sentiment: {
      positive: 86,
      negative: 14,
      aspects: {
        quality: 88,
        userExperience: 85,
        durability: 84,
      }
    },
    dataAiHint: 'Reliable fast charger with safety features, compatible with multiple devices',
    tags: ['charger', 'fast-charging', 'usb-c', 'smartphone', 'adapter', 'electronics', 'portable']
  },

  {
    id: '10',
    name: 'Fresh Chicken Breast',
    description: 'Premium quality chicken breast, perfect for biryani and curries',
    longDescription: 'Fresh, tender chicken breast cuts from farm-raised poultry. High in protein, low in fat. Ideal for biryani, grilling, roasting, and various Indian and international cuisines. Hand-selected for quality and freshness.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groceries',
    sentiment: {
      positive: 88,
      negative: 12,
      aspects: {
        quality: 90,
        freshness: 92,
        flavor: 86,
      }
    },
    dataAiHint: 'High-quality fresh chicken breast, excellent for protein-rich meals and traditional recipes',
    tags: ['chicken', 'meat', 'protein', 'fresh', 'biryani', 'curry', 'grilling', 'poultry']
  },
  {
    id: '11',
    name: 'Jasmine Rice Premium Grade',
    description: 'Fragrant long-grain jasmine rice, perfect for fried rice and Asian dishes',
    longDescription: 'Premium quality jasmine rice with natural floral aroma and soft, sticky texture when cooked. Each grain is carefully selected for consistent quality. Ideal for fried rice, Thai dishes, and Asian cuisines.',
    price: 11.99,
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groceries',
    sentiment: {
      positive: 86,
      negative: 14,
      aspects: {
        quality: 91,
        freshness: 88,
        flavor: 89,
        aroma: 94
      }
    },
    dataAiHint: 'Aromatic jasmine rice with excellent texture, highly rated for Asian cooking and fried rice',
    tags: ['rice', 'jasmine', 'grains', 'cooking', 'fried-rice', 'asian', 'aromatic', 'thai']
  },
  // Additional Grocery Items
  {
    id: '12',
    name: 'Extra Virgin Olive Oil',
    description: 'Cold-pressed olive oil for cooking and dressing',
    longDescription: 'Premium extra virgin olive oil from Mediterranean olives. Cold-pressed for maximum flavor and nutrition. Perfect for cooking, salad dressings, and finishing dishes.',
    price: 16.99,
    image: 'https://images.pexels.com/photos/1022385/pexels-photo-1022385.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groceries',
    sentiment: {
      positive: 90,
      negative: 10,
      aspects: {
        quality: 93,
        flavor: 91,
        freshness: 89,
      }
    },
    dataAiHint: 'High-quality olive oil with excellent flavor, versatile for cooking and salads',
    tags: ['olive-oil', 'cooking-oil', 'extra-virgin', 'mediterranean', 'healthy', 'cooking', 'salad']
  }
];