"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaTimes, FaHeart, FaStar, FaComment, FaMusic, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaQuoteRight, FaGift, FaStethoscope, FaGraduationCap, FaBook, FaUserMd } from 'react-icons/fa';
import SplashScreen from '../components/SplashScreen';
import MusicPlayer from '../components/MusicPlayer';
import LoveNote from '../components/LoveNote';
import FloatingHearts from '../components/FloatingHearts';

// Photos data with medical journey theme
const photos = [
  { id: 1, src: '/photos/0001.jpg', alt: 'My Beautiful Kitten', caption: 'The most beautiful medical student I\'ve ever seen. So proud of how hard you\'ve worked these 4.5 years.' },
  { id: 2, src: '/photos/0002.jpg', alt: 'Future Doctor', caption: 'Your dedication to medicine is so inspiring. You\'re going to be the most amazing doctor, kitten.' },
  { id: 3, src: '/photos/0003.jpg', alt: 'Hard-working Scholar', caption: "4.5 years of sleepless nights, tough exams, and you never gave up. This final exam is just one more step." },
  { id: 4, src: '/photos/0004.jpg', alt: 'Almost There', caption: "You're so close to achieving your dream. I've seen how hard you've studied these past months." },
  { id: 5, src: '/photos/0005.jpg', alt: 'Brilliant Mind', caption: 'My brilliant kitten with the most amazing medical knowledge. You\'ve overcome so many challenges.' },
  { id: 6, src: '/photos/0006.jpg', alt: 'Unstoppable Salma', caption: "No medical exam can stop you now. You've prepared for this for years, and I'm here with you every step." },
];

// Encouraging messages for the final medical exam
const encouragements = [
  "You've conquered every medical exam so far, this one doesn't stand a chance",
  "My kitten has the most brilliant medical mind I've ever known",
  "4.5 years of hard work have prepared you perfectly for this final challenge",
  "I've seen how dedicated you are to medicine and helping others",
  "You're the most beautiful future doctor in the world",
  "Every night spent studying is about to pay off, kitten",
  "Your perseverance through medical school has been incredible",
  "So proud of how you've fought through these challenging 4.5 years",
  "You're right at the finish line of this medical journey",
  "No one deserves to be a doctor more than you"
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [likes, setLikes] = useState<Record<number, boolean>>({});
  const [stars, setStars] = useState<Record<number, number>>({});
  const [comments, setComments] = useState<Record<number, string[]>>({});
  const [newComment, setNewComment] = useState('');
  const [displayEncouragement, setDisplayEncouragement] = useState('');
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showGift, setShowGift] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * encouragements.length);
      setDisplayEncouragement(encouragements[randomIndex]);
      setShowEncouragement(true);
      
      setTimeout(() => {
        setShowEncouragement(false);
      }, 5000);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  // Show gift notification after 30 seconds
  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => {
        setShowGift(true);
      }, 30000);
      
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Swipe functionality for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && selectedId) {
      handleNext();
    }
    
    if (isRightSwipe && selectedId) {
      handlePrevious();
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  const getPhotoById = (id: number) => photos.find(photo => photo.id === id);
  
  const handleNext = () => {
    if (selectedId) {
      const nextId = selectedId === photos.length ? 1 : selectedId + 1;
      setSelectedId(nextId);
    }
  };
  
  const handlePrevious = () => {
    if (selectedId) {
      const prevId = selectedId === 1 ? photos.length : selectedId - 1;
      setSelectedId(prevId);
    }
  };

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleStarRating = (id: number, rating: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setStars(prev => ({
      ...prev,
      [id]: rating
    }));
  };
  
  const handleAddComment = (id: number, e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setComments(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), newComment]
    }));
    setNewComment('');
  };

  if (showSplash) {
    return <SplashScreen name="Salma" onComplete={() => setShowSplash(false)} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <FloatingHearts />
      
      {/* Music Player */}
      <MusicPlayer 
        songPath="/songs/Hooverphonic - Mad About You (Live at Koningin Elisabethzaal 2012).mp4" 
        songTitle="Mad About You - Hooverphonic"
      />
      
      {/* Love Note */}
      <LoveNote recipientName="Salma" />
      
      {/* Gift notification */}
      <AnimatePresence>
        {showGift && (
          <motion.div 
            className="fixed top-4 right-4 z-30 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <button 
              className="absolute -top-2 -right-2 bg-white text-rose-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md"
              onClick={() => setShowGift(false)}
              aria-label="Close notification"
            >
              <FaTimes size={12} />
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <FaGift className="text-rose-500" size={20} />
              </div>
              <div>
                <p className="font-medium text-sm">Click the envelope, kitten!</p>
                <p className="text-xs text-white/80">I wrote something special for your exam 💌</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Random encouragement popup */}
      <AnimatePresence>
        {showEncouragement && (
          <motion.div 
            className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-30 bg-white/90 backdrop-blur-sm text-purple-800 px-4 py-3 rounded-lg shadow-lg md:max-w-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-2 rounded-full shrink-0 mt-1">
                <FaStethoscope className="text-purple-700" size={18} />
              </div>
              <div>
                <div className="flex items-center text-sm font-medium mb-1">
                  <FaQuoteLeft size={10} className="mr-1 opacity-50" />
                  <span>Medical Journey</span>
                  <FaQuoteRight size={10} className="ml-1 opacity-50" />
                </div>
                <p className="text-sm">{displayEncouragement}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="py-12 px-4 md:px-12">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center gap-3 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FaHeart className="text-red-500 text-3xl md:text-4xl" />
            <FaStethoscope className="text-purple-700 text-3xl md:text-4xl" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-4">
            Salma's Medical Journey
          </h1>
          <p className="text-xl text-purple-600 max-w-2xl mx-auto">
            Celebrating 5 months together & 4.5 years of your incredible medical school journey
          </p>
          <p className="mt-4 text-lg text-purple-500 max-w-xl mx-auto">
            You're almost there, kitten. This final exam doesn't stand a chance against you.
          </p>
        </motion.div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layoutId={`photo-container-${photo.id}`}
                className="relative aspect-[3/4] bg-white rounded-xl shadow-lg overflow-hidden group touch-manipulation"
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 }
                }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedId(photo.id)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority
                  className="transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 sm:transition-opacity sm:duration-300 md:opacity-0 touch:opacity-60" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 sm:transition-all sm:duration-300 md:opacity-0 md:translate-y-4 touch:opacity-100 touch:translate-y-0">
                  <div className="flex justify-between items-center mb-1 md:mb-2">
                    <h3 className="text-base md:text-lg font-semibold truncate">{photo.alt}</h3>
                    <button 
                      onClick={(e) => toggleLike(photo.id, e)}
                      className={`p-2 rounded-full ${likes[photo.id] ? 'text-red-500' : 'text-white'}`}
                      aria-label="Like photo"
                    >
                      <FaHeart size={16} />
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-white/80 line-clamp-2">{photo.caption}</p>
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={(e) => handleStarRating(photo.id, star, e)}
                        className={`mr-1 ${stars[photo.id] >= star ? 'text-yellow-400' : 'text-white/60'}`}
                        aria-label={`Rate ${star} stars`}
                      >
                        <FaStar size={12} className="md:text-sm" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm cursor-pointer overflow-y-auto overflow-x-hidden"
          >
            <motion.div
              layoutId={`photo-container-${selectedId}`}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative w-full max-w-5xl max-h-screen bg-white rounded-xl overflow-hidden shadow-2xl">
                <button 
                  className="absolute top-3 right-3 z-10 bg-white/80 p-2 rounded-full text-black hover:bg-white transition-colors touch:p-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(null);
                  }}
                  aria-label="Close"
                >
                  <FaTimes size={18} />
                </button>
                
                {/* Mobile swipe indicators */}
                <div className="absolute top-1/2 left-4 right-4 flex justify-between pointer-events-none z-10 md:hidden">
                  <div className="bg-white/40 rounded-full p-2 backdrop-blur-sm">
                    <FaChevronLeft className="text-black/70" size={16} />
                  </div>
                  <div className="bg-white/40 rounded-full p-2 backdrop-blur-sm">
                    <FaChevronRight className="text-black/70" size={16} />
                  </div>
                </div>
                
                {/* Desktop navigation buttons */}
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full text-black hover:bg-white transition-colors hidden md:block"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  aria-label="Previous photo"
                >
                  <FaArrowLeft size={20} />
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full text-black hover:bg-white transition-colors hidden md:block"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next photo"
                >
                  <FaArrowRight size={20} />
                </button>

                <div className="relative w-full h-[65vh] md:h-[80vh]">
                  <Image
                    src={getPhotoById(selectedId)?.src || ''}
                    alt={getPhotoById(selectedId)?.alt || ''}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="100vw"
                    priority
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
                  >
                    <motion.div 
                      className="flex items-center text-white"
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <FaMusic className="mr-2" size={14} />
                      <span className="text-sm">Listen to our song, kitten</span>
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className="bg-white p-4 md:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                        {getPhotoById(selectedId)?.alt}
                      </h2>
                      <p className="text-gray-600">{getPhotoById(selectedId)?.caption}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => toggleLike(selectedId, { stopPropagation: () => {} } as React.MouseEvent)}
                        className={`p-2 rounded-full ${likes[selectedId] ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
                        aria-label="Like"
                      >
                        <FaHeart size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleStarRating(selectedId, star, { stopPropagation: () => {} } as React.MouseEvent)}
                        className={`${stars[selectedId] >= star ? 'text-yellow-400' : 'text-gray-300'} hover:scale-110 transition-transform`}
                        aria-label={`Rate ${star} stars`}
                      >
                        <FaStar size={20} />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {stars[selectedId] ? `${stars[selectedId]} stars` : 'Rate this'}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center mb-3">
                      <FaComment className="text-purple-600 mr-2" size={16} />
                      <h3 className="text-lg font-medium">Comments</h3>
                    </div>
                    
                    <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                      {(comments[selectedId] || []).map((comment, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center mb-1">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 mr-2 flex items-center justify-center text-white text-xs font-bold">
                              {i + 1}
                            </div>
                            <p className="text-gray-900 text-sm">{comment}</p>
                          </div>
                        </div>
                      ))}
                      
                      {(comments[selectedId] || []).length === 0 && (
                        <p className="text-gray-500 text-sm italic">Leave a supportive comment for my kitten's medical journey...</p>
                      )}
                    </div>
                    
                    <form onSubmit={(e) => handleAddComment(selectedId, e)} className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                      >
                        Post
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Footer */}
      <footer className="bg-purple-800 text-white py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-3 mb-4">
            <FaHeart className="text-red-400 text-2xl" />
            <FaStethoscope className="text-white text-2xl" />
            <FaGraduationCap className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold mb-2">You've Got This, Kitten!</h2>
          <p className="max-w-xl mx-auto mb-4">
            After 4.5 years of fighting through medical school, this final exam is just one more step. 
            I'm so proud of you, and I'm with you all the way.
          </p>
          <p className="text-white/70 text-sm">
            Made with love for my beautiful Salma, the future doctor who amazes me every day.
          </p>
        </div>
      </footer>
    </main>
  );
}
