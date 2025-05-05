"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [count, setCount] = useState(0);

  // Generate a new heart every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (hearts.length < 10) { // Limit max hearts
        addHeart();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [hearts]);

  // Remove hearts after animation completes
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (hearts.length > 0) {
        setHearts(prevHearts => prevHearts.slice(1));
      }
    }, 10000);
    
    return () => clearTimeout(timeout);
  }, [hearts]);

  const addHeart = () => {
    const newHeart: Heart = {
      id: count,
      x: Math.random() * 100, // Random horizontal position
      size: Math.random() * 15 + 10, // Random size between 10 and 25
      duration: Math.random() * 10 + 15, // Random duration between 15 and 25s
      delay: Math.random() * 2, // Random delay up to 2s
      opacity: Math.random() * 0.5 + 0.3, // Random opacity between 0.3 and 0.8
    };
    
    setHearts(prevHearts => [...prevHearts, newHeart]);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute bottom-0"
            style={{ left: `${heart.x}%` }}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ 
              y: '-100vh', 
              opacity: [0, heart.opacity, 0],
              rotate: [0, 10, -10, 5, 0, -5, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: heart.duration,
              delay: heart.delay,
              ease: 'linear',
              rotate: {
                duration: 5,
                repeat: Infinity,
                repeatType: 'mirror'
              }
            }}
          >
            <FaHeart 
              className="text-pink-500" 
              style={{ width: heart.size, height: heart.size }} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts; 