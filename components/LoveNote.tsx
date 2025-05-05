"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaEnvelope, FaTimes, FaStethoscope, FaGraduationCap, FaUserMd, FaBook } from 'react-icons/fa';

interface LoveNoteProps {
  recipientName: string;
}

const LoveNote: React.FC<LoveNoteProps> = ({ recipientName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(0);
  
  const loveNotes = [
    `My beautiful kitten ${recipientName}, these past 5 months together have been amazing. I see how hard you've been working on your medical studies, and I'm so proud of you.`,
    
    `4.5 years of medical school has been such a challenging journey, but you've never given up. Your dedication and perseverance are truly inspiring.`,
    
    `This final medical exam is the last step in your incredible journey. You've studied so hard, prepared so thoroughly - I have no doubt you'll succeed, kitten.`,
        
    `Your passion for medicine shows in how intensely you study and how deeply you care about helping others. You're going to be an amazing doctor, kitten.`,
    
    `I made this gallery to remind you of how far you've come. 4.5 years of fighting for your dream, and now you're almost there. I'm with you every step of the way.`
  ];
  
  const nextNote = () => {
    setCurrentNote((prev) => (prev + 1) % loveNotes.length);
  };
  
  const prevNote = () => {
    setCurrentNote((prev) => (prev - 1 + loveNotes.length) % loveNotes.length);
  };

  return (
    <>
      <motion.button
        className="fixed top-4 left-4 z-40 bg-pink-500 text-white rounded-full p-3 shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open love note"
      >
        <FaEnvelope size={18} />
        <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative bg-gradient-to-br from-pink-50 to-purple-100 max-w-md w-full rounded-2xl shadow-2xl p-6 overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" 
                onClick={() => setIsOpen(false)}
                aria-label="Close love note"
              >
                <FaTimes size={20} />
              </button>
              
              <div className="flex justify-center mb-4 gap-3">
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    transition: { 
                      repeat: Infinity, 
                      duration: 1.5 
                    }
                  }}
                >
                  <FaHeart className="text-red-500" size={28} />
                </motion.div>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    transition: { 
                      repeat: Infinity, 
                      duration: 1.5,
                      delay: 0.5
                    }
                  }}
                >
                  <FaStethoscope className="text-purple-600" size={28} />
                </motion.div>
              </div>
              
              <h3 className="text-center text-xl font-semibold text-purple-800 mb-2">
                To My Beautiful Kitten {recipientName}
              </h3>
              
              <div className="h-[180px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={currentNote}
                    className="text-sm md:text-base text-gray-700 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {loveNotes[currentNote]}
                  </motion.p>
                </AnimatePresence>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-purple-200 hover:bg-purple-300 text-purple-800 px-4 py-2 rounded-full text-sm transition-colors"
                  onClick={prevNote}
                  aria-label="Previous note"
                >
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {loveNotes.map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-2 h-2 rounded-full ${index === currentNote ? 'bg-purple-600' : 'bg-purple-200'}`}
                    />
                  ))}
                </div>
                
                <button
                  className="bg-purple-200 hover:bg-purple-300 text-purple-800 px-4 py-2 rounded-full text-sm transition-colors"
                  onClick={nextNote}
                  aria-label="Next note"
                >
                  Next
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoveNote; 