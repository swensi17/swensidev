import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stats = [
  { value: '10K+', label: 'Отзывов', icon: '★' },
  { value: '24/7', label: 'На связи', icon: '◉' },
  { value: '100%', label: 'Гарантия', icon: '✓' },
  { value: '3+', label: 'Года опыта', icon: '◆' },
];

const AfterMoney: React.FC = () => {
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
    offset: ["start end", "end start"]
  });

  // 3D transforms - disabled on mobile
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [1, 1, 1] : [0.9, 1, 0.9]);
  
  // Parallax for words - reduced on mobile
  const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [100, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [120, -120]);
  
  // Rotation for words - disabled on mobile
  const rotate1 = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [-3, 0, 3]);
  const rotate2 = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [3, 0, -3]);
  const rotate3 = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0, 0, 0] : [-2, 0, 2]);

  // Stats 3D - disabled on mobile
  const statsRotateX = useTransform(scrollYProgress, [0.3, 0.5, 0.7], isMobile ? [0, 0, 0] : [20, 0, -20]);
  const statsScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], isMobile ? [1, 1, 1] : [0.9, 1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-black py-12 md:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 md:px-12 pb-6 md:pb-12">
        <span className="text-neutral-600 text-[10px] md:text-xs tracking-[0.3em] font-mono">[ 05 / 09 ]</span>
        <span className="text-neutral-600 text-[10px] md:text-xs tracking-[0.3em] font-mono">ПРЕИМУЩЕСТВА</span>
      </div>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#FF3B30]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#FF3B30]/5 rounded-full blur-[150px]" />
      </div>

      {/* 3D Main heading */}
      <motion.div 
        style={{ 
          rotateX,
          scale,
          transformPerspective: 1200,
        }}
        className="relative z-10 w-full mb-8 md:mb-24"
      >
        <div className="text-center">
          <div className="overflow-hidden mb-2">
            <motion.div style={{ y: y1, rotate: rotate1 }}>
              <span className="block text-[11vw] sm:text-[14vw] md:text-[14vw] lg:text-[12vw] font-black tracking-tighter text-[#FF3B30] leading-[0.85]">
                Быстро.
              </span>
            </motion.div>
          </div>
          
          <div className="overflow-hidden mb-2">
            <motion.div style={{ y: y2, rotate: rotate2 }}>
              <span className="block text-[9vw] sm:text-[12vw] md:text-[14vw] lg:text-[12vw] font-black tracking-tighter text-white leading-[0.85]">
                Качественно.
              </span>
            </motion.div>
          </div>
          
          <div className="overflow-hidden">
            <motion.div style={{ y: y3, rotate: rotate3 }}>
              <span className="block text-[11vw] sm:text-[14vw] md:text-[14vw] lg:text-[12vw] font-black tracking-tighter text-neutral-700 leading-[0.85]">
                Надёжно.
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 3D Stats */}
      <motion.div 
        style={{ 
          rotateX: isMobile ? 0 : statsRotateX,
          scale: isMobile ? 1 : statsScale,
          transformPerspective: 1000,
        }}
        className="relative z-10 w-full border-t border-b border-white/10"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative group ${index !== 3 ? 'sm:border-r border-white/10' : ''} ${index < 2 ? 'border-b sm:border-b-0' : ''}`}
              style={{ transformPerspective: 800 }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotateX: -5,
                  z: 50
                }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-12 lg:p-16 text-center relative overflow-hidden"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FF3B30]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF3B30] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                
                {/* Icon */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-[#FF3B30] text-2xl md:text-3xl mb-4 opacity-60"
                >
                  {stat.icon}
                </motion.div>
                
                {/* Value */}
                <motion.div 
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-3 tracking-tight relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {stat.value}
                </motion.div>
                
                {/* Label */}
                <div className="text-neutral-500 text-xs md:text-sm tracking-[0.3em] uppercase relative z-10">
                  {stat.label}
                </div>

                {/* Corner accents */}
                <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-white/10 group-hover:border-[#FF3B30]/50 transition-colors duration-300" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-white/10 group-hover:border-[#FF3B30]/50 transition-colors duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom quote */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 px-6 md:px-12 mt-16 md:mt-20"
      >
        <p className="text-center text-neutral-500 max-w-3xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed">
          Репутация — главный актив. Каждый проект делаю так, будто это мой собственный. 
          <span className="text-neutral-400"> Чистый код, современные технологии, честные сроки.</span>
        </p>
      </motion.div>
    </section>
  );
};

export default AfterMoney;
