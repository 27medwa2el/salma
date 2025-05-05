"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaMusic, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  songPath: string;
  songTitle: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ songPath, songTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(songPath);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      
      // Clean up on unmount
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [songPath]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // This will handle the autoplay restrictions in some browsers
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Playback prevented:", error);
            // User interaction may be required first
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        className="bg-purple-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowControls(prev => !prev)}
        aria-label={showControls ? "Hide music controls" : "Show music controls"}
      >
        <FaMusic size={18} />
      </motion.button>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            className="absolute bottom-0 right-12 bg-purple-700/95 backdrop-blur-sm rounded-lg p-3 text-white shadow-lg flex items-center"
          >
            <div className="mr-3 hidden sm:block">
              <p className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{songTitle}</p>
              <p className="text-xs text-white/70">Our soundtrack</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={togglePlay}
                className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
              </button>
              
              <button
                onClick={toggleMute}
                className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors"
                aria-label={isMuted ? "Unmute music" : "Mute music"}
              >
                {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-2 bg-white/30 rounded-full appearance-none cursor-pointer"
                aria-label="Volume control"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer; 