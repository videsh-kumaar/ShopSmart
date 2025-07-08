import React, { useState } from "react";
import { X, MessageCircle, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../types";
import { GeminiService } from "../services/geminiService";

interface ProductQAProps {
  product: Product;
  onClose: () => void;
}

interface QAItem {
  question: string;
  answer: string;
  confidence: number;
  followUpQuestions: string[];
}

const ProductQA: React.FC<ProductQAProps> = ({ product, onClose }) => {
  const [question, setQuestion] = useState("");
  const [qaHistory, setQaHistory] = useState<QAItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const geminiService = GeminiService.getInstance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const response = await geminiService.answerProductQuestion(
        product.id,
        question
      );

      setQaHistory((prev) => [
        ...prev,
        {
          question: question.trim(),
          answer: response.answer,
          confidence: response.confidence,
          followUpQuestions: response.followUpQuestions,
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUpClick = (followUpQuestion: string) => {
    setQuestion(followUpQuestion);
  };

  const getProductSpecificQuestions = (product: Product): string[] => {
    const category = product.category.toLowerCase();
    
    if (category.includes('rice') || category.includes('pantry')) {
      return [
        "What's the best way to cook this rice?",
        "How much water should I use for cooking?",
        "Is this good for biryani?",
        "What's the grain size and texture?",
        "How long does this rice last?"
      ];
    }
    
    if (category.includes('running') || category.includes('shoes')) {
      return [
        "Are these suitable for long-distance running?",
        "How does the cushioning compare to other shoes?",
        "What's the durability like?",
        "How do these fit?",
        "Are they good for different terrains?"
      ];
    }
    
    if (category.includes('sunscreen') || category.includes('cream')) {
      return [
        "Is this good for sensitive skin?",
        "How often should I reapply?",
        "Is this water resistant?",
        "Does it leave a white residue?",
        "What's the SPF protection level?"
      ];
    }
    
    if (category.includes('jacket') || category.includes('clothing')) {
      return [
        "What's the warmth rating?",
        "Is this waterproof or water-resistant?",
        "How does this fit?",
        "What materials is it made from?",
        "Is this suitable for layering?"
      ];
    }
    
    if (category.includes('vegetable') || category.includes('food')) {
      return [
        "How fresh is this product?",
        "What's the best way to store this?",
        "How long does this last?",
        "What dishes can I make with this?",
        "Is this organic?"
      ];
    }
    
    // Generic fallback questions
    return [
      "What's the quality like?",
      "How does this compare to similar products?",
      "What are the main features?",
      "Is this good value for money?",
      "What do other customers say about this?"
    ];
  };

  const commonQuestions = getProductSpecificQuestions(product);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{
          scale: 1.1,
          opacity: 0,
          y: 0,
          x: 0,
          borderRadius: "1rem",
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
          x: 0,
          borderRadius: "1.5rem",
        }}
        exit={{
          scale: 0.8,
          opacity: 0,
          y: 50,
          borderRadius: "1rem",
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          duration: 0.6,
        }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-6 border-b bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <motion.h2
                className="text-2xl font-bold flex items-center gap-3"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.div>
                AI Product Assistant
              </motion.h2>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <motion.div
              className="flex items-center gap-4 bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-white/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-white/80 font-medium">${product.price}</p>
              </div>
              <motion.div
                className="ml-auto flex items-center gap-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">AI Ready</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Chat Content with Staggered Animation */}
        <motion.div
          className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {qaHistory.length === 0 ? (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>

              <motion.h3
                className="text-3xl font-bold text-gray-900 mb-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Ask me anything!
              </motion.h3>

              <motion.p
                className="text-gray-600 mb-8 text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                I'm here to help you learn everything about this product
              </motion.p>

              <div className="grid grid-cols-1 gap-3 max-w-lg mx-auto">
                {commonQuestions.map((q, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setQuestion(q)}
                    className="text-left p-4 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg group"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-gray-800 font-medium group-hover:text-blue-700 transition-colors">
                      {q}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {qaHistory.map((qa, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="space-y-4"
                  >
                    {/* User Question */}
                    <div className="flex justify-end">
                      <motion.div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl rounded-br-md p-4 max-w-xs shadow-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="font-medium">{qa.question}</p>
                      </motion.div>
                    </div>

                    {/* AI Response */}
                    <div className="flex justify-start">
                      <motion.div
                        className="bg-white rounded-2xl rounded-bl-md p-4 max-w-lg shadow-lg border border-gray-200"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <motion.div
                            className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center"
                            animate={{ rotate: [0, 360] }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Sparkles className="w-3 h-3 text-white" />
                          </motion.div>
                          <span className="text-sm text-gray-600 font-medium">
                            AI Assistant ({Math.round(qa.confidence * 100)}%
                            confidence)
                          </span>
                        </div>
                        <p className="text-gray-900 mb-4 leading-relaxed">
                          {qa.answer}
                        </p>

                        {qa.followUpQuestions.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                              Suggested questions:
                            </p>
                            <div className="space-y-2">
                              {qa.followUpQuestions.map((followUp, fIndex) => (
                                <motion.button
                                  key={fIndex}
                                  onClick={() => handleFollowUpClick(followUp)}
                                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                                  whileHover={{ x: 5 }}
                                >
                                  • {followUp}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Enhanced Input Area */}
        <motion.div
          className="p-6 border-t bg-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="flex gap-3">
            <motion.input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about features, compatibility, quality..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              disabled={isLoading}
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              type="submit"
              disabled={isLoading || !question.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
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
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductQA;
