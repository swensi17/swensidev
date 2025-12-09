import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const [time, setTime] = useState({ local: '', date: '', day: '' });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime({
        local: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        date: now.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }),
        day: now.toLocaleDateString('ru-RU', { weekday: 'long' }).toUpperCase()
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const links = [
    { label: 'Telegram', href: 'https://t.me/swensi17' },
    { label: 'Отзывы 10К+', href: 'https://t.me/amirjanjik' },
    { label: 'Архив заказов', href: 'https://t.me/swensiorder' }
  ];

  const stats = [
    { value: '142+', label: 'ПРОЕКТОВ' },
    { value: '85+', label: 'КЛИЕНТОВ' },
    { value: '99.9%', label: 'UPTIME' },
    { value: '<50ms', label: 'СКОРОСТЬ' }
  ];

  return (
    <footer id="contacts" className="bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,59,48,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Large background text */}
      <div className="absolute inset-0 flex items-end justify-end pointer-events-none select-none overflow-hidden">
        <span 
          className="text-[20vw] font-black leading-none tracking-tighter translate-x-[5%] translate-y-[30%]"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.03)', color: 'transparent' }}
        >
          SWENSI
        </span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/5">
        <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 09 / 09 ]</span>
        <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">КОНТАКТЫ</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left - Brand */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#FF3B30] text-xs font-mono tracking-widest block mb-6">
                [ РАЗРАБОТЧИК ]
              </span>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
                SWENSI
                <span className="block text-neutral-600">.DEV</span>
              </h2>
              
              <p className="text-neutral-500 max-w-sm text-sm leading-relaxed mb-8">
                Разработка под ключ. Боты, веб-приложения, мобильные решения. 
                Качество и скорость без компромиссов.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-8 border-t border-white/5">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-xl md:text-2xl font-light text-white tabular-nums">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[9px] font-mono text-neutral-600 tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right - Links & Contact */}
          <div className="lg:col-span-7">
            {/* Links */}
            <div className="mb-12">
              {links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex items-center justify-between py-6 border-t border-white/10 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono tracking-widest text-neutral-600 group-hover:text-[#FF3B30] transition-colors">
                      [ 0{index + 1} ]
                    </span>
                    <span className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-300 group-hover:text-white transition-colors">
                      {link.label}
                    </span>
                  </div>
                  <svg 
                    className="w-5 h-5 text-neutral-600 group-hover:text-[#FF3B30] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </motion.a>
              ))}
              <div className="border-t border-white/10" />
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div>
                <p className="text-neutral-400 text-sm mb-2">Готов обсудить ваш проект?</p>
                <p className="text-white text-lg font-medium">Напишите — отвечу в течение часа</p>
              </div>
              
              <a
                href="https://t.me/swensi17"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#FF3B30] text-white font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
              >
                НАПИСАТЬ
                <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/5 px-6 md:px-12 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
          {/* Status */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-neutral-500 tracking-widest">ONLINE</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-4 text-neutral-600">
            <span>{time.local}</span>
            <span className="w-1 h-1 rounded-full bg-[#FF3B30]" />
            <span>{time.day}</span>
          </div>

          {/* Copyright */}
          <span className="text-neutral-600 tracking-widest">© 2025 SWENSI</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
