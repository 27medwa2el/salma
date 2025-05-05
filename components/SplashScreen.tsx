"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStethoscope } from 'react-icons/fa';

interface SplashScreenProps {
  onComplete: () => void;
  name?: string;
}

export default function SplashScreen({ onComplete, name = "Kitten" }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const loadingMessages = [
    "Preparing a special surprise for my kitten...",
    "Gathering all the beautiful memories...",
    "You're the most beautiful medicine student...",
    "So proud of your 4.5-year journey...",
    "Your dedication inspires me every day...",
    "You're so close to becoming a doctor...",
    "You've fought so hard these past years...",
    "This final exam is just one more step..."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 5, 100));
        
        // Change loading message occasionally
        if (progress % 12 === 0) {
          setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
        }
      } else {
        onComplete();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-pink-500 z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center w-full max-w-xs sm:max-w-md"
      >
        <motion.div
          className="mb-6 flex justify-center gap-3"
          initial={{ scale: 0.5 }}
          animate={{ 
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <FaHeart className="text-red-400 text-5xl md:text-6xl" />
          <FaStethoscope className="text-white text-5xl md:text-6xl" />
        </motion.div>
      
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Hi, Salma!
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-xl text-white/80 mb-8 sm:mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          After 6 wonderful months together, I made this to support you through your final medical exams
        </motion.p>
        
        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4"
        >
          <motion.p 
            key={currentMessage}
            className="text-sm sm:text-base text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {loadingMessages[currentMessage]}
          </motion.p>
          
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div 
                key={i}
                className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, repeatType: "loop", duration: 0.8, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-xs sm:text-sm text-white/60">Tap anywhere to see your journey, kitten</p>
          <div 
            className="absolute inset-0 cursor-pointer"
            onClick={() => setProgress(100)}
            aria-label="Skip loading"
          />
        </motion.div>
      </motion.div>
    </div>
  );
} 