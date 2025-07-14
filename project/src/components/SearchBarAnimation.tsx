import React, { useState, useEffect, useRef } from "react";
import "./SearchBarAnimation.css";

const phrases = [
  "Ask me anything",
  "How to cook fried rice",
  "Show me jackets under ₹3000",
  "Sunscreen for oily skin",
  "Wireless headphones",
  "What are the best running shoes?"
];

const TYPING_SPEED = 70;
const DELETING_SPEED = 40;
const PAUSE_BETWEEN = 1200;

const SearchBarAnimation: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting && displayedText === currentPhrase) {
      timeoutRef.current = window.setTimeout(() => setIsDeleting(true), PAUSE_BETWEEN);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        setDisplayedText((prev) => {
          if (!isDeleting) {
            return currentPhrase.slice(0, prev.length + 1);
          } else {
            return currentPhrase.slice(0, prev.length - 1);
          }
        });
      }, isDeleting ? DELETING_SPEED : TYPING_SPEED);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <span className="search-bar-animation">
      {displayedText}
      <span className="cursor animate-blink">|</span>
    </span>
  );
};

export default SearchBarAnimation;
