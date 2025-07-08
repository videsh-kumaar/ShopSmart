import React, { useState, useEffect } from "react";
import { ShoppingCart, Sparkles, Store } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import ProductDetailPage from "./components/ProductDetailPage";
import Cart from "./components/Cart";
import CheckoutFlow from "./components/CheckoutFlow";
import RecommendationPanel from "./components/RecommendationPanel";
import RecipeShoppingList from "./components/RecipeShoppingList";
import AISearchLoader from "./components/AISearchLoader";
import { useCart } from "./hooks/useCart";
import { products } from "./data/products";
import { Product, SearchIntent } from "./types";
import { GeminiService } from "./services/geminiService";

function App() {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [searchIntent, setSearchIntent] = useState<SearchIntent | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
    isCheckoutOpen,
    openCheckout,
    closeCheckout,
  } = useCart();

  const geminiService = GeminiService.getInstance();

  useEffect(() => {
    // Show welcome screen briefly
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Generate recommendations when cart changes
    if (cartItems.length > 0) {
      generateRecommendations();
    }
  }, [cartItems]);

  const handleSearch = async (query: string) => {
    setCurrentSearchQuery(query);
    setIsSearching(true);

    try {
      // Show loading for at least 4 seconds to display the full animation
      const searchPromise = (async () => {
        const intent = await geminiService.extractSearchIntent(query);
        setSearchIntent(intent);

        const results = searchProducts(intent);
        setSearchResults(results);

        // Generate contextual recommendations
        await generateRecommendations();
      })();

      const minLoadingTime = new Promise((resolve) =>
        setTimeout(resolve, 4000)
      );

      await Promise.all([searchPromise, minLoadingTime]);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
      setCurrentSearchQuery("");
    }
  };

  const searchProducts = (intent: SearchIntent): Product[] => {
    let filtered = products;

    // Filter by category if specified
    if (intent.category) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === intent.category?.toLowerCase()
      );
    }

    // Filter by keywords and tags
    if (intent.keywords.length > 0) {
      filtered = filtered.filter((product) => {
        const searchText = `${product.name} ${
          product.description
        } ${product.tags?.join(" ")} ${product.dataAiHint}`.toLowerCase();
        return intent.keywords.some((keyword) =>
          searchText.includes(keyword.toLowerCase())
        );
      });
    }

    // Filter by ingredients for recipes
    if (intent.ingredients && intent.ingredients.length > 0) {
      filtered = filtered.filter((product) =>
        intent.ingredients!.some(
          (ingredient) =>
            product.tags?.some((tag) =>
              tag.toLowerCase().includes(ingredient.toLowerCase())
            ) || product.name.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    }

    // Filter by skin type
    if (intent.skinType) {
      filtered = filtered.filter((product) =>
        product.tags?.includes(`${intent.skinType}-skin`)
      );
    }

    // Filter by budget
    if (intent.budget) {
      filtered = filtered.filter((product) => product.price <= intent.budget!);
    }

    // Sort by relevance (sentiment score and price)
    return filtered.sort((a, b) => {
      const aScore = a.sentiment.positive - a.sentiment.negative;
      const bScore = b.sentiment.positive - b.sentiment.negative;
      return bScore - aScore;
    });
  };

  const generateRecommendations = async () => {
    try {
      const context = {
        currentCart: cartItems,
        searchHistory: [],
        category: searchIntent?.category,
        budget: searchIntent?.budget,
      };

      // Simple recommendation logic based on categories and sentiment
      let recommended = products.filter((product) => {
        // Don't recommend items already in cart
        if (cartItems.some((item) => item.product.id === product.id))
          return false;

        // Recommend based on cart categories
        const cartCategories = cartItems.map((item) => item.product.category);
        if (
          cartCategories.length > 0 &&
          cartCategories.includes(product.category)
        ) {
          return true;
        }

        // Recommend high-sentiment products
        const sentimentScore =
          product.sentiment.positive - product.sentiment.negative;
        return sentimentScore > 70;
      });

      // Limit to 4 recommendations
      recommended = recommended.slice(0, 4);
      setRecommendations(recommended);
    } catch (error) {
      console.error("Recommendation error:", error);
    }
  };

  const handleAddAllToCart = () => {
    if (searchIntent?.type === "recipe" && searchResults.length > 0) {
      searchResults.forEach((product) => addToCart(product, 1));
    }
  };

  const handleOrderComplete = () => {
    clearCart();
    setSearchResults([]);
    setSearchIntent(null);
    setRecommendations([]);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    // Add product to cart
    addToCart(product, quantity);
    // Close product detail page
    setSelectedProduct(null);
    // Open checkout directly
    openCheckout();
  };


  // Show AI Search Loading
  if (isSearching) {
    return <AISearchLoader query={currentSearchQuery} />;
  }

  if (showWelcome) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-center text-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-6"
          >
            <Sparkles className="w-16 h-16 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">ShopSmart AI</h1>
          <p className="text-xl opacity-90">
            Your Intelligent Shopping Assistant
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // Show Product Detail Page
  if (selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onClose={handleCloseProductDetail}
        onAddToCart={addToCart}
        onBuyNow={handleBuyNow}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-sm border-b sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Store className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  ShopSmart AI
                </h1>
                <p className="text-xs text-gray-500">
                  Intelligent Shopping Assistant
                </p>
              </div>
            </motion.div>

            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What can I help you find today?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ask me anything - from recipes to skincare, I'll find exactly what
            you need
          </p>

          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </motion.div>

        {/* Recipe Shopping List */}
        <AnimatePresence>
          {searchIntent?.type === "recipe" && searchResults.length > 0 && (
            <RecipeShoppingList
              recipeName={searchIntent.keywords.join(" ")}
              ingredients={searchResults}
              onAddToCart={addToCart}
              onAddAllToCart={handleAddAllToCart}
            />
          )}
        </AnimatePresence>

        {/* Search Results */}
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {searchIntent?.type === "recipe"
                      ? "Recipe Ingredients"
                      : "Search Results"}
                  </h3>
                  <p className="text-gray-600">
                    Found {searchResults.length} products
                  </p>
                </div>

                {searchIntent && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium capitalize">
                      {searchIntent.type} Search
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onProductClick={handleProductClick}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Recommendations */}
        <RecommendationPanel
          recommendations={recommendations}
          onAddToCart={addToCart}
          onProductClick={handleProductClick}
        />

        {/* Featured Products (when no search) */}
        {searchResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Featured Products
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <Cart
            items={cartItems}
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => {
              setIsCartOpen(false);
              openCheckout();
            }}
            totalPrice={getTotalPrice()}
          />
        )}
      </AnimatePresence>

      {/* Checkout Flow */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutFlow
            isOpen={isCheckoutOpen}
            onClose={closeCheckout}
            items={cartItems}
            totalPrice={getTotalPrice()}
            onOrderComplete={handleOrderComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
