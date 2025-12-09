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

const DavidGoliath: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

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
    <section className="relative bg-[#050505] py-20 md:py-28 overflow-hidden border-t border-white/5">
      {/* Header */}
      <div className="flex justify-between items-center px-6 md:px-12 pb-8">
        <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 04 / 09 ]</span>
        <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">ТЕХНОЛОГИИ</span>
      </div>

      {/* Бегущая строка */}
      <div className="py-6 md:py-8 overflow-hidden border-y border-white/5 mb-16">
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

      {/* 3D Carousel */}
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
                    className={`w-[300px] md:w-[360px] ${position !== 0 ? 'hidden md:block' : ''}`}
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
                        <h3 className={`text-4xl md:text-5xl font-bold tracking-tight mb-6 ${isCenter ? 'text-white' : 'text-neutral-700'}`}>
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
    </section>
  );
};

export default DavidGoliath;
