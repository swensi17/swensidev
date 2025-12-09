import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BASE_URL = import.meta.env.BASE_URL || '/';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects - disabled on mobile
  const titleY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 200]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, isMobile ? 1 : 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, isMobile ? 1 : 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-16 md:pt-0"
    >
      {/* Background image with bars mask effect - simplified on mobile */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${BASE_URL}image-optimized.webp)`,
            ...(isMobile ? {} : {
              WebkitMaskImage: `repeating-linear-gradient(
                to right,
                transparent 0px,
                transparent 8px,
                black 8px,
                black calc((100% - 88px) / 10 + 8px)
              )`,
              maskImage: `repeating-linear-gradient(
                to right,
                transparent 0px,
                transparent 8px,
                black 8px,
                black calc((100% - 88px) / 10 + 8px)
              )`
            })
          }}
        />
      </div>

      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>
      </div>

      {/* Gradient orbs - hidden on mobile for performance */}
      {!isMobile && (
        <>
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF3B30]/5 rounded-full blur-[150px] pointer-events-none"
          />
          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none"
          />
        </>
      )}

      {/* 3D floating shapes - hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <motion.div
          animate={{ 
            rotateX: [0, 360],
            rotateY: [0, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[15%] w-20 h-20 border border-white/10"
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          animate={{ 
            rotateZ: [0, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[30%] left-[10%] w-32 h-32 border border-[#FF3B30]/20 rounded-full"
        />
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotateZ: [0, 180, 360]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[20%] w-4 h-4 bg-[#FF3B30]/30"
        />
      </div>

      {/* Main content */}
      <motion.div 
        style={{ y: titleY, opacity: titleOpacity, scale }}
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
      >
        {/* Subtitle top */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[10px] sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] text-neutral-400 uppercase mb-4 sm:mb-6"
        >
          Full-Stack Разработчик
        </motion.p>

        {/* Main title */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-white mb-2 sm:mb-4"
        >
          SWENSI
        </motion.h1>

        {/* Subtitle bottom */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-lg md:text-xl tracking-[0.15em] sm:tracking-[0.2em] text-neutral-400 uppercase mb-10 sm:mb-16"
        >
          Разработка под ключ
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a 
            href="https://t.me/swensi17" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-[#FF3B30] text-white font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-300 w-full sm:w-auto justify-center"
          >
            НАПИСАТЬ
            <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <a 
            href="https://t.me/swensiorder" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex group px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-xs sm:text-sm tracking-widest uppercase items-center gap-2 sm:gap-3 hover:bg-[#FF3B30] hover:text-white transition-colors duration-300"
          >
            АРХИВ
            <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-neutral-600 text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>

    </section>
  );
};

export default Hero;
