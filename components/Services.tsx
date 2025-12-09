import React, { useRef } from 'react';
import { Button } from './ui/Button';
import { motion, useScroll, useTransform } from 'framer-motion';

const services = [
  { 
    name: "Telegram боты", 
    desc: "Разрабатываю ботов любой сложности — от простых информационных до сложных enterprise-решений с платежами, CRM-интеграциями и автоматизацией бизнес-процессов.",
    features: ["Платёжные системы", "CRM интеграции", "Автоматизация"]
  },
  { 
    name: "Веб-сайты", 
    desc: "Создаю современные веб-приложения на React и TypeScript. Лендинги, корпоративные сайты, SPA-приложения, админ-панели с адаптивным дизайном.",
    features: ["React / TypeScript", "Адаптивный дизайн", "Высокая скорость"]
  },
  { 
    name: "iOS / Android", 
    desc: "Нативные и кроссплатформенные мобильные приложения. Использую Swift для iOS, Kotlin и Java для Android. Публикация в App Store и Google Play.",
    features: ["Swift / Kotlin", "Публикация в сторы", "Push-уведомления"]
  },
  { 
    name: "Парсеры", 
    desc: "Автоматический сбор данных с любых сайтов. Обход защит, работа с динамическим контентом, экспорт в удобные форматы. Мониторинг цен и конкурентов.",
    features: ["Обход защит", "Динамический контент", "Экспорт данных"]
  },
  { 
    name: "API", 
    desc: "Проектирую и разрабатываю REST и GraphQL API. Интеграции с любыми внешними сервисами, платёжными системами, социальными сетями и мессенджерами.",
    features: ["REST / GraphQL", "Интеграции", "Документация"]
  },
  { 
    name: "Desktop", 
    desc: "Десктопные приложения для Windows, Linux и macOS. Утилиты, автоматизация рабочих процессов, работа с файлами и базами данных.",
    features: ["Windows / macOS", "Автоматизация", "Кроссплатформа"]
  },
  { 
    name: "CI/CD", 
    desc: "Настройка автоматического деплоя и тестирования. GitHub Actions, GitLab CI, Jenkins. Ускорение разработки и минимизация ошибок.",
    features: ["GitHub Actions", "Автотесты", "Быстрый деплой"]
  },
  { 
    name: "VPS", 
    desc: "Полная настройка серверной инфраструктуры. Docker-контейнеры, Nginx, SSL-сертификаты, мониторинг, бэкапы и защита от атак.",
    features: ["Docker / Nginx", "SSL / Безопасность", "Мониторинг"]
  },
];

const ServiceDescription: React.FC<{
  service: typeof services[0];
  index: number;
  scrollProgress: any;
}> = ({ service, index, scrollProgress }) => {
  const segmentSize = 1 / services.length;
  const start = Math.max(0, index * segmentSize - 0.02);
  const peak = index * segmentSize + segmentSize / 2;
  const end = Math.min(1, (index + 1) * segmentSize + 0.02);

  const opacity = useTransform(scrollProgress, [start, peak, end], [0, 1, 0]);
  const y = useTransform(scrollProgress, [start, peak, end], [80, 0, -80]);
  const rotateX = useTransform(scrollProgress, [start, peak, end], [25, 0, -25]);
  const scale = useTransform(scrollProgress, [start, peak, end], [0.9, 1, 0.9]);

  return (
    <motion.div
      style={{ opacity, y, rotateX, scale, transformPerspective: 1000 }}
      className="absolute inset-0 flex flex-col justify-center origin-center"
    >
      {/* Заголовок - большой и стильный */}
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white mb-6">
        {service.name}
      </h3>

      {/* Описание - крупнее и читабельнее */}
      <p className="text-neutral-300 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl mb-8">
        {service.desc}
      </p>

      {/* Номер */}
      <div className="flex items-center gap-4">
        <span className="text-[#FF3B30] font-mono text-sm tracking-[0.2em]">
          [ {String(index + 1).padStart(2, '0')} ]
        </span>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      id="services"
      ref={containerRef} 
      className="relative bg-[#050505] border-t border-white/5" 
      style={{ height: `${services.length * 60}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 md:px-12 py-6">
          <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 02 / 09 ]</span>
          <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">УСЛУГИ</span>
        </div>

        {/* Main content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 px-6 md:px-12 pb-8">
          
          {/* Левая часть - заголовок и информация */}
          <div className="flex flex-col justify-center h-full">
            {/* Title section - слева */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="text-[#FF3B30] text-xs font-mono tracking-[0.3em] block mb-3">
                [ МОИ УСЛУГИ ]
              </span>
              <h2 className="text-xl md:text-2xl font-medium tracking-[0.15em] uppercase text-neutral-400">
                ЧТО Я ДЕЛАЮ:
              </h2>
            </motion.div>
            
            <div className="relative h-[350px] md:h-[400px]">
              {services.map((service, index) => (
                <ServiceDescription 
                  key={index}
                  service={service}
                  index={index}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
            
            {/* Кнопка */}
            <div className="mt-8">
              <Button text="ОБСУДИТЬ ПРОЕКТ" />
            </div>
          </div>
          
          {/* Правая часть - большие названия */}
          <div className="relative flex items-center justify-end overflow-hidden">
            {/* Градиенты */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
            
            <div className="flex flex-col items-end justify-center">
              {services.map((service, index) => {
                const segmentSize = 1 / services.length;
                const start = index * segmentSize;
                const peak = start + segmentSize / 2;
                const end = (index + 1) * segmentSize;

                return (
                  <ServiceNameItem
                    key={index}
                    name={service.name}
                    scrollProgress={scrollYProgress}
                    start={start}
                    peak={peak}
                    end={end}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Компонент названия услуги
const ServiceNameItem: React.FC<{
  name: string;
  scrollProgress: any;
  start: number;
  peak: number;
  end: number;
}> = ({ name, scrollProgress, start, peak, end }) => {
  const color = useTransform(
    scrollProgress,
    [start, peak, end],
    ["rgb(64, 64, 64)", "rgb(255, 59, 48)", "rgb(64, 64, 64)"]
  );

  return (
    <motion.div
      style={{ color }}
      className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.95] text-right select-none cursor-default transition-colors duration-300 hover:text-[#FF3B30]"
    >
      {name}
    </motion.div>
  );
};

export default Services;
