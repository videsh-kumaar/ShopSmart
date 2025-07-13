import React, { useState, useEffect, useRef } from "react";
import "./TextAnimation.css";

const phrases = [
  "Smart Shopper Assistant",
  "Find the Best Deals",
  "AI Product Guide",
  "Your Shopping Copilot"
];

const TYPING_SPEED = 70; // ms per character
const DELETING_SPEED = 40;
const PAUSE_BETWEEN = 1200; // ms to show full phrase

const TextAnimation: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Cursor blink
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

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
    <span className="text-animation">
      {displayedText}
      <span className={"cursor" + (cursorVisible ? "" : " hidden")}>|</span>
    </span>
  );
};

export default TextAnimation;
