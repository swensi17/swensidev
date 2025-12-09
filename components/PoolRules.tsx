import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const guarantees = [
  { text: 'Сдача проектов в срок' },
  { text: 'Правки в рамках ТЗ бесплатно' },
  { text: 'Прозрачное ценообразование' },
  { text: 'Поддержка после сдачи' },
  { text: '10 000+ положительных отзывов' },
];

const PoolRules: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Horizontal scroll effect for guarantees
  const x = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  
  // 3D rotation for quote
  const quoteRotateY = useTransform(scrollYProgress, [0.3, 0.6], [-10, 10]);
  const quoteScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.95, 1, 0.95]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#050505] py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 md:px-12 pb-16">
        <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 06 / 09 ]</span>
        <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">ГАРАНТИИ</span>
      </div>

      {/* Title section */}
      <div className="px-6 md:px-12 mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#FF3B30] text-xs font-mono tracking-[0.3em] block mb-6">
            [ ПОЧЕМУ Я ]
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]">
            Гарантии<br />
            <span className="text-neutral-700">качества</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scrolling guarantees */}
      <div className="relative mb-24 md:mb-32 overflow-hidden">
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
        
        <motion.div 
          style={{ x }}
          className="flex py-12 md:py-16"
        >
          {[...guarantees, ...guarantees].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateX: 30 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % guarantees.length) * 0.1 }}
              className="flex items-center flex-shrink-0 mx-8 md:mx-12 group"
              style={{ transformPerspective: 800 }}
            >
              {/* Stylish checkmark */}
              <motion.div 
                className="relative w-8 h-8 md:w-10 md:h-10 mr-4 md:mr-6 flex items-center justify-center"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.3 }}
              >
                {/* SVG checkmark */}
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 md:w-6 md:h-6 text-[#FF3B30]"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.div>
              
              {/* Text */}
              <span className="text-xl md:text-2xl lg:text-3xl font-medium text-neutral-400 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10" />
        
        {/* Fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10" />
      </div>

      {/* 3D Quote card */}
      <div className="px-6 md:px-12">
        <motion.div
          style={{ 
            rotateY: quoteRotateY,
            scale: quoteScale,
            transformPerspective: 1200
          }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-br from-neutral-900/80 to-black border border-white/10 p-10 md:p-16 lg:p-20"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#FF3B30]" />
              <div className="absolute top-0 left-0 w-[2px] h-full bg-[#FF3B30]" />
            </div>
            <div className="absolute top-0 right-0 w-12 h-12">
              <div className="absolute top-0 right-0 w-full h-[2px] bg-[#FF3B30]" />
              <div className="absolute top-0 right-0 w-[2px] h-full bg-[#FF3B30]" />
            </div>
            <div className="absolute bottom-0 left-0 w-12 h-12">
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF3B30]" />
              <div className="absolute bottom-0 left-0 w-[2px] h-full bg-[#FF3B30]" />
            </div>
            <div className="absolute bottom-0 right-0 w-12 h-12">
              <div className="absolute bottom-0 right-0 w-full h-[2px] bg-[#FF3B30]" />
              <div className="absolute bottom-0 right-0 w-[2px] h-full bg-[#FF3B30]" />
            </div>

            {/* Quote mark */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.08, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute top-4 left-4 text-[100px] md:text-[140px] font-serif text-white leading-none pointer-events-none select-none"
            >
              "
            </motion.div>

            {/* Quote text */}
            <blockquote className="relative z-10">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-4xl lg:text-5xl text-white font-light leading-tight tracking-tight mb-8 md:mb-12"
              >
                Качество строится годами, а теряется за секунду. 
                <span className="text-neutral-500"> Поэтому каждый проект — как первый.</span>
              </motion.p>
              
              <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-[1px] bg-[#FF3B30]" />
                <span className="text-[#FF3B30] text-sm font-mono tracking-[0.2em]">SWENSI</span>
              </motion.footer>
            </blockquote>
          </motion.div>
        </motion.div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF3B30]/3 rounded-full blur-[200px]"
        />
      </div>
    </section>
  );
};

export default PoolRules;
