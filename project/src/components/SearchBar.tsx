import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchBarAnimation from './SearchBarAnimation';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState('');
  const [listening, setListening] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);
  // Remove recognitionRef and use a fresh instance each time
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setHasSpeechSupport(false);
      return;
    }
    setHasSpeechSupport(true);
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onstart = () => {
      setListening(true);
      console.log('Speech recognition started');
    };
    recognition.onend = () => {
      setListening(false);
      console.log('Speech recognition ended');
    };
    recognition.onerror = (event: any) => {
      setListening(false);
      console.error('Speech recognition error:', event.error);
      alert('Speech recognition error: ' + event.error);
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      console.log('Speech recognition result:', transcript);
      onSearch(transcript);
    };
    recognition.start();
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };



  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        {/* Animated gradient border wrapper */}
        <div className="relative w-full rounded-2xl p-[4px] animate-gradient-x bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300">
          {/* Search Icon (properly centered) */}
          <div className="absolute left-4 inset-y-0 flex items-center justify-center">
            <Search className="text-gray-400 w-5 h-5" />
          </div>

          {/* Animated placeholder */}
          {!query && (
            <div className="absolute left-12 top-0 bottom-0 flex items-center pointer-events-none">
              <span className="text-gray-500 text-lg">
                <SearchBarAnimation />
              </span>
            </div>
          )}

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder=""
            className="w-full pl-12 pr-28 py-4 text-lg rounded-2xl focus:outline-none bg-white shadow-lg transition-all duration-300"
          />

          {/* Mic Button */}
          {hasSpeechSupport && (
            <motion.button
              type="button"
              onClick={startListening}
              disabled={isLoading}
              className="absolute right-14 top-0 bottom-0 flex items-center justify-center h-10 w-10 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:opacity-50 transition-colors m-auto"
              whileHover={{ scale: listening ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mic className={`w-5 h-5 ${listening ? 'text-red-600 animate-pulse' : ''}`} />
            </motion.button>
          )}

          {/* Search Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-0 bottom-0 flex items-center justify-center h-10 w-10 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors m-auto"
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
    </div>
  );
};

export default SearchBar;