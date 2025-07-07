import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const quickSearches = [
    "I want to cook fried rice",
    "Show me jackets under ₹3000",
    "Sunscreen for oily skin",
    "Wireless headphones"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me anything... 'I want to cook fried rice' or 'Show me jackets under ₹3000'"
            className="w-full pl-12 pr-16 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none bg-white shadow-lg transition-all duration-300"
          />
          <motion.button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {quickSearches.map((search, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setQuery(search);
              onSearch(search);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {search}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;