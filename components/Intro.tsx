import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => onComplete(), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Background gradient pulse */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1.2], opacity: [0, 0.3, 0.1] }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,59,48,0.2)_0%,transparent_70%)]"
          />

          {/* 3D Drop animation */}
          <motion.div
            initial={{ y: -200, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: phase >= 1 ? 0 : -200, 
              opacity: phase >= 1 ? 1 : 0,
              scale: phase >= 1 ? 1 : 0.5
            }}
            transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="absolute top-[15%] w-[200px] h-[280px] md:w-[300px] md:h-[400px]"
          >
            <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(80,80,80,1)_0%,rgba(20,20,20,1)_50%,rgba(0,0,0,1)_100%)] rounded-[40%_60%_70%_30%/40%_50%_60%_50%]" />
            <div className="absolute top-[15%] left-[20%] w-[15%] h-[20%] bg-white/20 rounded-full blur-lg" />
            <div className="absolute top-[25%] left-[30%] w-[8%] h-[10%] bg-white/30 rounded-full blur-md" />
          </motion.div>

          {/* Text content */}
          <div className="relative z-10 text-center mt-[30vh]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: phase >= 1 ? 1 : 0, 
                y: phase >= 1 ? 0 : 30 
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4"
            >
              <span className="text-[#FF3B30] text-xs font-mono tracking-[0.3em]">SWENSI DEVELOPER</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: phase >= 2 ? 1 : 0, 
                y: phase >= 2 ? 0 : 50 
              }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white px-4"
            >
              Разрабатываю как стартап<br/>
              <span className="text-neutral-500">даже если вы не стартап.</span>
            </motion.h1>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              className="mt-16 flex justify-center"
            >
              <div className="w-48 h-[2px] bg-neutral-800 overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="w-full h-full bg-[#FF3B30]"
                />
              </div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.5 : 0 }}
            className="absolute top-8 left-8 text-[10px] font-mono tracking-widest text-neutral-600"
          >
            2025
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.5 : 0 }}
            className="absolute top-8 right-8 text-[10px] font-mono tracking-widest text-neutral-600"
          >
            FULL-STACK
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.5 : 0 }}
            className="absolute bottom-8 left-8 text-[10px] font-mono tracking-widest text-neutral-600"
          >
            @SWENSI17
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.5 : 0 }}
            className="absolute bottom-8 right-8 text-[10px] font-mono tracking-widest text-neutral-600"
          >
            TELEGRAM
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
