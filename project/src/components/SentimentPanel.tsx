import React from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Product } from '../types';

interface SentimentPanelProps {
  product: Product;
  onClose: () => void;
}

const SentimentPanel: React.FC<SentimentPanelProps> = ({ product, onClose }) => {
  const aspectData = Object.entries(product.sentiment.aspects).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    score: value || 0
  }));

  const sentimentData = [
    { name: 'Positive', value: product.sentiment.positive, color: '#10B981' },
    { name: 'Negative', value: product.sentiment.negative, color: '#EF4444' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Sentiment Analysis</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600">{product.longDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Overall Sentiment
              </h4>
              <div className="mb-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Positive: {product.sentiment.positive}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Negative: {product.sentiment.negative}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                Aspect Ratings
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={aspectData}>
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis domain={[0, 100]} />
                  <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold mb-2 text-blue-900">AI Insights</h4>
            <p className="text-blue-800">{product.dataAiHint}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(product.sentiment.aspects).map(([aspect, score]) => (
              <div key={aspect} className="text-center p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-gray-900">{score || 0}%</div>
                <div className="text-sm text-gray-600 capitalize">{aspect}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SentimentPanel;