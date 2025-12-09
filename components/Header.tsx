import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isScrollingRef = useRef(false);
  const targetSectionRef = useRef<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Если идёт программный скролл - не обновляем активную секцию
      if (isScrollingRef.current) return;
      
      // Проверяем, достигли ли конца страницы (для Контактов)
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (isAtBottom) {
        setActiveSection('contacts');
        return;
      }
      
      // Проверяем секции снизу вверх для правильного определения
      const sections = ['faq', 'process', 'security', 'services'];
      let found = false;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            found = true;
            break;
          }
        }
      }
      if (!found && window.scrollY < 300) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href === '#home' ? 'home' : href.slice(1);
    
    // Сразу устанавливаем активную секцию
    setActiveSection(targetId);
    targetSectionRef.current = targetId;
    isScrollingRef.current = true;
    
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(href.slice(1));
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    
    // Разблокируем отслеживание после завершения скролла
    const scrollTime = href === '#home' ? 1500 : 800;
    setTimeout(() => {
      isScrollingRef.current = false;
      targetSectionRef.current = null;
    }, scrollTime);
    
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Главная', href: '#home', id: 'home' },
    { label: 'Услуги', href: '#services', id: 'services' },
    { label: 'Безопасность', href: '#security', id: 'security' },
    { label: 'Процесс', href: '#process', id: 'process' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Контакты', href: '#contacts', id: 'contacts' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/95 backdrop-blur-xl border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-12 h-16 md:h-20">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <span className="text-white font-black text-xl tracking-tight group-hover:text-[#FF3B30] transition-colors">
              SWENSI
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center bg-white/5 rounded-full p-1">
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-5 py-2 text-[11px] font-medium tracking-widest rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-[#FF3B30] text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {item.label.toUpperCase()}
                </a>
              ))}
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA Button */}
            <a 
              href="https://t.me/swensi17" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:flex items-center justify-center px-5 py-2 bg-[#FF3B30] text-white text-[11px] font-bold tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              НАПИСАТЬ
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full bg-white/5"
            >
              <motion.span 
                animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }}
                className="w-5 h-0.5 bg-white origin-center"
              />
              <motion.span 
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                className="w-5 h-0.5 bg-white"
              />
              <motion.span 
                animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }}
                className="w-5 h-0.5 bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-xl pt-20 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-1 mt-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`flex items-center justify-between py-5 border-b border-white/5 text-3xl font-medium ${
                    activeSection === item.id ? 'text-[#FF3B30]' : 'text-white'
                  }`}
                >
                  {item.label}
                  <svg className="w-5 h-5 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </motion.a>
              ))}
            </nav>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 left-6 right-6"
            >
              <a
                href="https://t.me/swensi17"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#FF3B30] text-white font-bold text-sm tracking-widest rounded-xl"
              >
                НАПИСАТЬ В TELEGRAM
              </a>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs font-mono text-neutral-600">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>ONLINE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
