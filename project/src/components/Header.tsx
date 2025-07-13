import { motion } from 'framer-motion';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { TbBrandWalmart } from 'react-icons/tb';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  showSearchBar?: boolean;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onCartClick,
  showSearchBar = true,
  onSearch = () => {},
}) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-[#0071dc] text-white sticky top-0 z-40 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col py-2">
          {/* Top Row */}
          <div className="flex items-center justify-between h-14">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <TbBrandWalmart className="w-8 h-8 text-yellow-500" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">WalSmart AI</h1>
                <p className="text-xs text-blue-100">Intelligent Shopping Website</p>
              </div>
            </motion.div>

            <motion.button
              onClick={onCartClick}
              className="relative p-2 bg-transparent hover:bg-blue-600 rounded-md transition-colors flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">Cart</span>
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Search Bar - Only show if enabled */}
          {showSearchBar && (
            <motion.div
              className="mt-2 mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SearchBar onSearch={onSearch} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
