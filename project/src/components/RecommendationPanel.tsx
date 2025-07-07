import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface RecommendationPanelProps {
  recommendations: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  title?: string;
  subtitle?: string;
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  recommendations,
  onAddToCart,
  onProductClick,
  title = "Recommended for you",
  subtitle = "Based on your preferences and popular choices"
}) => {
  if (recommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
          <TrendingUp className="w-4 h-4" />
          AI Powered
        </div>
      </div>
      
      <p className="text-gray-600 mb-8">{subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendations.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard 
              product={product} 
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecommendationPanel;