import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, ThumbsUp, ThumbsDown, MessageCircle, TrendingUp, Sparkles, Zap, View } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import ProductQA from './ProductQA';
import ARView from './ARView';

interface ProductDetailPageProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow
}) => {

    const [showQA, setShowQA] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const sentimentScore = Math.round((product.sentiment.positive / (product.sentiment.positive + product.sentiment.negative)) * 100);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-blue-600 border-b z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.button
              onClick={onClose}
              className="flex items-center gap-2 text-white hover:text-white-900 transition-colors"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </motion.button>
            
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{(sentimentScore / 20).toFixed(1)}</span>
              <span className="text-white">({product.sentiment.positive + product.sentiment.negative} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags?.slice(0, 6).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-2xl font-bold text-gray-900 mb-4">₹{product.price}</p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {product.longDescription}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Buy Now Button */}
              <motion.button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="w-6 h-6" />
                Buy Now - ₹{(product.price * quantity).toFixed(2)}
              </motion.button>

              {/* Add to Cart Button */}
              <motion.button
                onClick={handleAddToCart}
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 border-2 border-amber-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>

              {/* Know Me More Button - Smaller */}
              {/* View in AR Button */}
              {product.modelSrc && (
                <motion.button
                  onClick={() => setShowAR(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <View className="w-5 h-5" />
                  View in AR
                </motion.button>
              )}

              {/* Know Me More Button - Smaller */}
              <motion.button
                onClick={() => setShowQA(true)}
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 px-4 rounded-full font-medium text-sm hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-4 h-4" />
                Know Me More
                <Sparkles className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>

          {/* Sentiment Analysis & Reviews - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sentiment Summary</h2>
              
              {/* Overall Sentiment */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-600">Positive</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">{product.sentiment.positive}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsDown className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-600">Negative</span>
                  </div>
                  <span className="text-xl font-bold text-red-600">{product.sentiment.negative}%</span>
                </div>
              </div>

              {/* Aspect Ratings */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-gray-900">Detailed Ratings</h3>
                {Object.entries(product.sentiment.aspects).map(([aspect, score]) => (
                  <div key={aspect} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 capitalize text-sm">{aspect}</span>
                      <span className="font-bold text-gray-900">{score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-amber-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ delay: 0.6, duration: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Insight */}
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <h3 className="font-semibold text-blue-900 text-sm">AI Insights</h3>
                </div>
                <p className="text-blue-800 text-sm leading-relaxed">{product.dataAiHint}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Q&A Modal */}
      <AnimatePresence>
        {showQA && (
          <ProductQA
            product={product}
            onClose={() => setShowQA(false)}
          />
        )}
      </AnimatePresence>

      {/* AR View Modal */}
      <AnimatePresence>
        {showAR && product.modelSrc && (
          <ARView modelSrc={product.modelSrc} onClose={() => setShowAR(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetailPage;