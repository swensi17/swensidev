import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Security Dashboard with time and counters
const SecurityDashboard: React.FC = () => {
  const [time, setTime] = useState({ local: '', utc: '', date: '', tz: '', day: '' });
  const [counters, setCounters] = useState({ projects: 0, uptime: 0, threats: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const offset = -now.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const h = Math.floor(Math.abs(offset) / 60);
      setTime({
        local: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        utc: now.toUTCString().slice(17, 25),
        date: now.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }),
        day: now.toLocaleDateString('ru-RU', { weekday: 'long' }).toUpperCase(),
        tz: `UTC${sign}${h}`
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Animate counters on mount
  useEffect(() => {
    const targets = { projects: 147, uptime: 99.9, threats: 0 };
    const duration = 2000;
    const start = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      
      setCounters({
        projects: Math.floor(targets.projects * ease),
        uptime: Math.round(targets.uptime * ease * 10) / 10,
        threats: Math.floor(targets.threats * ease)
      });
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const badges = ['AES-256', 'SSL/TLS', 'NDA', '2FA', 'END-TO-END', 'HTTPS', 'SHA-256', 'RSA-4096'];

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Top section with status and time */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-8">
        {/* Status indicator */}
        <div className="flex items-center gap-3 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-green-500 text-[10px] font-mono tracking-widest">СИСТЕМА АКТИВНА</span>
        </div>

        {/* Main time display - smaller */}
        <div className="mb-6">
          <div className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-[0.08em] tabular-nums leading-none">
            {time.local}
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs font-mono">
            <span className="text-neutral-400">{time.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#FF3B30]" />
            <span className="text-neutral-500">{time.day}</span>
            <span className="text-neutral-600">• {time.tz}</span>
          </div>
        </div>

        {/* Security counters - compact */}
        <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
          <div>
            <div className="text-2xl md:text-3xl font-light text-white tabular-nums">
              {counters.projects}
            </div>
            <div className="mt-1 text-[9px] font-mono text-neutral-600 tracking-widest">
              ПРОЕКТОВ
            </div>
          </div>
          <div className="border-x border-white/5 px-3">
            <div className="text-2xl md:text-3xl font-light text-[#FF3B30] tabular-nums">
              {counters.uptime}%
            </div>
            <div className="mt-1 text-[9px] font-mono text-neutral-600 tracking-widest">
              UPTIME
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-light text-green-500 tabular-nums">
              {counters.threats}
            </div>
            <div className="mt-1 text-[9px] font-mono text-neutral-600 tracking-widest">
              УГРОЗ
            </div>
          </div>
        </div>
      </div>

      {/* Security badges marquee - at bottom */}
      <div className="border-t border-white/5 py-3 overflow-hidden">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {badges.map((badge, i) => (
                <span key={`${setIndex}-${i}`} className="flex items-center mx-6">
                  <span className="text-[#FF3B30] mr-2 text-[8px]">●</span>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500">{badge}</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/5" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-white/5" />
    </div>
  );
};

const SecuritySection: React.FC = () => {
  const features = [
    { num: '01', title: 'Консультация', desc: 'Обсуждаем задачу и подбираем оптимальное решение' },
    { num: '02', title: 'Договор NDA', desc: 'Подписываем соглашение о конфиденциальности' },
    { num: '03', title: 'Разработка', desc: 'Создаём продукт с регулярными отчётами' },
    { num: '04', title: 'Поддержка', desc: 'Сопровождаем проект после запуска' },
  ];

  return (
    <section id="security" className="relative bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]"
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Tech marquee */}
      <div className="relative z-10 overflow-hidden border-b border-white/5 py-4">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center">
              {['Python', 'React', 'Node.js', 'TypeScript', 'Swift', 'Kotlin', 'Docker', 'PostgreSQL'].map((tech, i) => (
                <span key={`${setIndex}-${i}`} className="flex items-center mx-8">
                  <span className="text-[#FF3B30] mr-3 text-xs">■</span>
                  <span className="text-xs font-mono tracking-widest text-neutral-600 hover:text-white transition-colors">{tech}</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6">
        <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 05 / 09 ]</span>
        <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">ЗАЩИТА</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-6 md:px-12 py-12 lg:py-24 min-h-[80vh] items-center">
        
        {/* Left side - Content */}
        <div className="flex flex-col justify-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-[#FF3B30] text-xs font-mono tracking-[0.3em]">
              [ БЕЗОПАСНОСТЬ ]
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-[1.05] text-white mb-6"
          >
            Ваш проект под<br />
            <span className="text-[#FF3B30]">надёжной защитой</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
          >
            Полная конфиденциальность, NDA и безопасность
            ваших данных на каждом этапе работы.
          </motion.p>

          {/* Features grid with 3D numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 mb-10"
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative p-6 border border-white/5 bg-white/[0.02] hover:border-[#FF3B30]/30 hover:bg-[#FF3B30]/5 transition-all duration-500 overflow-hidden"
              >
                {/* Large 3D number in background */}
                <div className="absolute -right-2 -top-4 text-[100px] font-black leading-none text-transparent select-none pointer-events-none"
                  style={{
                    WebkitTextStroke: '1px rgba(255,255,255,0.04)',
                    textShadow: '0 0 60px rgba(255,59,48,0.08)'
                  }}
                >
                  {feature.num}
                </div>
                
                {/* Content */}
                <h4 className="relative z-10 text-white font-bold text-xl mb-2 group-hover:text-[#FF3B30] transition-colors">
                  {feature.title}
                </h4>
                <p className="relative z-10 text-neutral-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF3B30] group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="https://t.me/swensi17" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:bg-[#FF3B30] hover:border-[#FF3B30] transition-all duration-300"
            >
              УЗНАТЬ ПОДРОБНЕЕ
              <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Right side - Security Dashboard */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[550px] border border-white/5 bg-white/[0.01]">
          <SecurityDashboard />
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
