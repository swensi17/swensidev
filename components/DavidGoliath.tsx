import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const technologies = [
  { 
    name: 'Python',
    category: 'Backend',
    desc: 'Основной язык для backend-разработки, автоматизации и парсинга. Telegram боты, API, скрипты любой сложности.',
    features: ['Django / FastAPI', 'Telegram Bots', 'Парсинг', 'Автоматизация']
  },
  { 
    name: 'React',
    category: 'Frontend',
    desc: 'Современные веб-интерфейсы и SPA приложения. Быстрые, отзывчивые и красивые сайты.',
    features: ['TypeScript', 'Next.js', 'Tailwind', 'Animations']
  },
  { 
    name: 'Node.js',
    category: 'Backend',
    desc: 'Серверная разработка на JavaScript. Real-time приложения, API, микросервисы.',
    features: ['Express', 'WebSockets', 'REST API', 'GraphQL']
  },
  { 
    name: 'Swift',
    category: 'iOS',
    desc: 'Нативные iOS приложения для iPhone и iPad. Публикация в App Store.',
    features: ['SwiftUI', 'UIKit', 'Core Data', 'Push']
  },
  { 
    name: 'Kotlin',
    category: 'Android',
    desc: 'Нативные Android приложения. Современный код, публикация в Google Play.',
    features: ['Compose', 'Room', 'Retrofit', 'Firebase']
  },
  { 
    name: 'Docker',
    category: 'DevOps',
    desc: 'Контейнеризация и деплой приложений. Настройка серверов и CI/CD пайплайнов.',
    features: ['Compose', 'Nginx', 'CI/CD', 'Linux']
  },
];

// Mobile carousel with touch swipe and auto-scroll
const MobileCarousel: React.FC<{ technologies: typeof technologies }> = ({ technologies }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isUserScrolling, setIsUserScrolling] = React.useState(false);
  
  // Auto-scroll
  React.useEffect(() => {
    if (isUserScrolling) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (activeIndex + 1) % technologies.length;
        const cardWidth = 280 + 16; // card width + gap
        scrollRef.current.scrollTo({
          left: nextIndex * cardWidth,
          behavior: 'smooth'
        });
        setActiveIndex(nextIndex);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isUserScrolling, technologies.length]);
  
  // Handle scroll to update active index
  const handleScroll = () => {
    if (scrollRef.current) {
      const cardWidth = 280 + 16;
      const newIndex = Math.round(scrollRef.current.scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, technologies.length - 1));
    }
  };
  
  // Pause auto-scroll on touch
  const handleTouchStart = () => setIsUserScrolling(true);
  const handleTouchEnd = () => {
    setTimeout(() => setIsUserScrolling(false), 5000); // Resume after 5s
  };

  return (
    <div className="pb-8">
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-[calc(50vw-140px)]"
        style={{ 
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {technologies.map((tech, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-[280px] border border-white/10 bg-gradient-to-b from-neutral-900 to-black p-5"
            style={{ scrollSnapAlign: 'center' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#FF3B30] text-[10px] font-mono tracking-[0.2em]">[ {tech.category.toUpperCase()} ]</span>
              <span className="text-neutral-600 text-[10px] font-mono">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{tech.name}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">{tech.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {tech.features.map((f, i) => (
                <span key={i} className="px-2 py-1 text-[9px] font-mono bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20 rounded">{f}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {technologies.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (scrollRef.current) {
                const cardWidth = 260 + 16;
                scrollRef.current.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                setActiveIndex(i);
              }
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-[#FF3B30]' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
      
      {/* Swipe hint */}
      <div className="flex items-center justify-center gap-2 mt-3 text-neutral-600">
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
        <span className="text-[9px] font-mono tracking-widest">СВАЙП</span>
      </div>
    </div>
  );
};

const DavidGoliath: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + technologies.length) % technologies.length;
    setPage([page + newDirection, newDirection]);
    setCurrentIndex(newIndex);
  };

  const getCardStyle = (position: number) => {
    // position: -1 = left, 0 = center, 1 = right
    const styles = {
      left: {
        x: -280,
        rotateY: 35,
        scale: 0.75,
        z: -150,
        opacity: 0.4,
      },
      center: {
        x: 0,
        rotateY: 0,
        scale: 1,
        z: 0,
        opacity: 1,
      },
      right: {
        x: 280,
        rotateY: -35,
        scale: 0.75,
        z: -150,
        opacity: 0.4,
      }
    };
    
    if (position === -1) return styles.left;
    if (position === 1) return styles.right;
    return styles.center;
  };

  const getVisibleCards = () => {
    const prev = (currentIndex - 1 + technologies.length) % technologies.length;
    const next = (currentIndex + 1) % technologies.length;
    return [
      { index: prev, position: -1 },
      { index: currentIndex, position: 0 },
      { index: next, position: 1 },
    ];
  };

  return (
    <section className="relative bg-[#050505] py-12 md:py-28 overflow-hidden border-t border-white/5">
      {/* Header */}
      <div className="flex justify-between items-center px-6 md:px-12 pb-8">
        <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 04 / 09 ]</span>
        <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">ТЕХНОЛОГИИ</span>
      </div>

      {/* Бегущая строка */}
      <div className="py-4 md:py-8 overflow-hidden border-y border-white/5 mb-8 md:mb-16">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ 
            duration: 25, 
            ease: 'linear', 
            repeat: Infinity 
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-neutral-800 mx-4">
                TECH STACK
              </span>
              <span className="text-[#FF3B30] text-2xl md:text-4xl mx-4">■</span>
              <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-neutral-800 mx-4">
                FULL-STACK
              </span>
              <span className="text-[#FF3B30] text-2xl md:text-4xl mx-4">■</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile: Touch swipeable cards with auto-scroll */}
      {isMobile ? (
        <MobileCarousel technologies={technologies} />
      ) : (
      /* Desktop: 3D Carousel */
      <div className="relative px-4 md:px-8">
        <div className="flex items-center justify-center">
          
          {/* Left Arrow */}
          <motion.button
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-4 md:left-16 lg:left-24 z-30 w-12 h-12 md:w-14 md:h-14 border border-white/20 bg-black/80 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-[#FF3B30] transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          {/* Cards Container */}
          <div 
            className="relative h-[450px] md:h-[500px] w-full max-w-4xl mx-auto flex items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            <AnimatePresence mode="popLayout">
              {getVisibleCards().map(({ index, position }) => {
                const tech = technologies[index];
                const style = getCardStyle(position);
                const isCenter = position === 0;

                return (
                  <motion.div
                    key={`${index}-${position}`}
                    initial={{ 
                      x: direction > 0 ? 400 : -400,
                      rotateY: direction > 0 ? -45 : 45,
                      scale: 0.6,
                      opacity: 0
                    }}
                    animate={{
                      x: style.x,
                      rotateY: style.rotateY,
                      scale: style.scale,
                      z: style.z,
                      opacity: style.opacity,
                    }}
                    exit={{
                      x: direction > 0 ? -400 : 400,
                      rotateY: direction > 0 ? 45 : -45,
                      scale: 0.6,
                      opacity: 0
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      mass: 1
                    }}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      position: 'absolute'
                    }}
                    className={`w-[280px] sm:w-[300px] md:w-[360px] ${position !== 0 ? 'hidden md:block' : ''}`}
                  >
                    {/* Card */}
                    <div 
                      className={`relative overflow-hidden transition-shadow duration-500 ${
                        isCenter 
                          ? 'bg-gradient-to-b from-neutral-900 to-black border border-white/15 shadow-2xl shadow-black/50' 
                          : 'bg-neutral-950 border border-white/5'
                      }`}
                    >
                      {/* Top accent line */}
                      {isCenter && (
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF3B30] to-transparent" />
                      )}

                      <div className="p-8 md:p-10">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-10">
                          <span className={`text-xs font-mono tracking-[0.2em] ${isCenter ? 'text-[#FF3B30]' : 'text-neutral-700'}`}>
                            [ {tech.category.toUpperCase()} ]
                          </span>
                          <span className={`text-xs font-mono ${isCenter ? 'text-neutral-500' : 'text-neutral-800'}`}>
                            {String(index + 1).padStart(2, '0')}/{String(technologies.length).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Tech name */}
                        <h3 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 ${isCenter ? 'text-white' : 'text-neutral-700'}`}>
                          {tech.name}
                        </h3>

                        {/* Description */}
                        <p className={`text-sm md:text-base leading-relaxed mb-10 ${isCenter ? 'text-neutral-400' : 'text-neutral-800'}`}>
                          {tech.desc}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {tech.features.map((feature, i) => (
                            <span 
                              key={i}
                              className={`px-4 py-2 text-xs tracking-wide ${
                                isCenter 
                                  ? 'bg-white/5 text-neutral-400 border border-white/10' 
                                  : 'bg-white/[0.02] text-neutral-700 border border-white/5'
                              }`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Corner accents */}
                      {isCenter && (
                        <>
                          <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-[#FF3B30]/50" />
                          <div className="absolute bottom-0 left-0 w-[1px] h-8 bg-[#FF3B30]/50" />
                          <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-[#FF3B30]/50" />
                          <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-[#FF3B30]/50" />
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <motion.button
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 md:right-16 lg:right-24 z-30 w-12 h-12 md:w-14 md:h-14 border border-white/20 bg-black/80 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-[#FF3B30] transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {technologies.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const diff = index - currentIndex;
                if (diff !== 0) {
                  setPage([page + diff, diff > 0 ? 1 : -1]);
                  setCurrentIndex(index);
                }
              }}
              className="group relative py-2"
            >
              <div className={`h-[2px] transition-all duration-500 ${
                index === currentIndex 
                  ? 'bg-[#FF3B30] w-10' 
                  : 'bg-white/20 w-6 group-hover:bg-white/40'
              }`} />
            </button>
          ))}
        </div>
      </div>
      )}
    </section>
  );
};

export default DavidGoliath;
