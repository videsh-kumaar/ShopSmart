import React from 'react';
import { ChefHat, ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface RecipeShoppingListProps {
  recipeName: string;
  ingredients: Product[];
  onAddToCart: (product: Product) => void;
  onAddAllToCart: () => void;
}

const RecipeShoppingList: React.FC<RecipeShoppingListProps> = ({
  recipeName,
  ingredients,
  onAddToCart,
  onAddAllToCart
}) => {
  const totalPrice = ingredients.reduce((sum, product) => sum + product.price, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200 mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <ChefHat className="w-6 h-6 text-orange-600" />
        <h3 className="text-2xl font-bold text-gray-900">Recipe Shopping List</h3>
      </div>
      
      <p className="text-gray-700 mb-6">
        Perfect ingredients for making <span className="font-semibold text-orange-700">{recipeName}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {ingredients.map((ingredient, index) => (
          <motion.div
            key={ingredient.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 shadow-sm border"
          >
            <div className="flex items-center gap-3">
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{ingredient.name}</h4>
                <p className="text-orange-600 font-bold">${ingredient.price}</p>
              </div>
              <motion.button
                onClick={() => onAddToCart(ingredient)}
                className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between bg-white rounded-lg p-4 border-2 border-orange-200">
        <div>
          <p className="text-gray-600">Total for recipe ingredients:</p>
          <p className="text-2xl font-bold text-orange-600">${totalPrice.toFixed(2)}</p>
        </div>
        <motion.button
          onClick={onAddAllToCart}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart className="w-5 h-5" />
          Add All to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RecipeShoppingList;