import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Обсуждение',
    desc: 'Вы описываете задачу — я анализирую требования, предлагаю оптимальное решение и называю сроки. Всё прозрачно и понятно с первого сообщения.',
    features: ['Анализ требований', 'Оценка сроков', 'Прозрачность']
  },
  {
    num: '02',
    title: 'Разработка',
    desc: 'Работаю быстро и качественно. Держу в курсе прогресса. Сдаю проект в срок с полной гарантией качества.',
    features: ['Чистый код', 'Регулярные апдейты', 'Качество']
  },
  {
    num: '03',
    title: 'Тестирование',
    desc: 'Тщательно проверяю каждую функцию. Исправляю баги до релиза. Убеждаюсь, что всё работает идеально.',
    features: ['QA тестирование', 'Фикс багов', 'Стабильность']
  },
  {
    num: '04',
    title: 'Запуск',
    desc: 'Деплою проект, настраиваю сервер, передаю все доступы. Поддержка после сдачи включена.',
    features: ['Деплой', 'Документация', 'Поддержка']
  }
];

const StepDescription: React.FC<{
  step: typeof steps[0];
  index: number;
  scrollProgress: any;
}> = ({ step, index, scrollProgress }) => {
  const segmentSize = 1 / steps.length;
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
      {/* Номер шага */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[#FF3B30] font-mono text-sm tracking-[0.2em]">
          [ ШАГ {step.num} ]
        </span>
      </div>

      {/* Заголовок */}
      <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white mb-6">
        {step.title}
      </h3>

      {/* Описание */}
      <p className="text-neutral-300 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl mb-8">
        {step.desc}
      </p>

      {/* Фичи */}
      <div className="flex flex-wrap gap-3">
        {step.features.map((feature, i) => (
          <span 
            key={i}
            className="px-4 py-2 border border-white/10 rounded-full text-sm text-neutral-400"
          >
            {feature}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const StepNameItem: React.FC<{
  title: string;
  num: string;
  scrollProgress: any;
  start: number;
  peak: number;
  end: number;
}> = ({ title, num, scrollProgress, start, peak, end }) => {
  const color = useTransform(
    scrollProgress,
    [start, peak, end],
    ["rgb(64, 64, 64)", "rgb(255, 59, 48)", "rgb(64, 64, 64)"]
  );

  return (
    <motion.div
      style={{ color }}
      className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.95] text-left select-none cursor-default transition-colors duration-300 hover:text-[#FF3B30] flex items-center justify-start gap-4"
    >
      <span>{title}</span>
    </motion.div>
  );
};

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      id="process"
      ref={containerRef} 
      className="relative bg-[#050505] border-t border-white/5" 
      style={{ height: `${steps.length * 60}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 md:px-12 py-6">
          <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">[ 03 / 09 ]</span>
          <span className="text-neutral-600 text-xs tracking-[0.3em] font-mono">ПРОЦЕСС</span>
        </div>

        {/* Main content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 px-6 md:px-12 pb-8">
          
          {/* Левая часть - большие названия */}
          <div className="relative flex items-center justify-start overflow-hidden order-2 lg:order-1">
            {/* Градиенты */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
            
            <div className="flex flex-col items-start justify-center">
              {steps.map((step, index) => {
                const segmentSize = 1 / steps.length;
                const start = index * segmentSize;
                const peak = start + segmentSize / 2;
                const end = (index + 1) * segmentSize;

                return (
                  <StepNameItem
                    key={index}
                    title={step.title}
                    num={step.num}
                    scrollProgress={scrollYProgress}
                    start={start}
                    peak={peak}
                    end={end}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Правая часть - заголовок и информация */}
          <div className="flex flex-col justify-center h-full order-1 lg:order-2">
            {/* Title section - справа */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-right"
            >
              <span className="text-[#FF3B30] text-xs font-mono tracking-[0.3em] block mb-3">
                [ МОЙ ПРОЦЕСС ]
              </span>
              <h2 className="text-xl md:text-2xl font-medium tracking-[0.15em] uppercase text-neutral-400">
                КАК Я РАБОТАЮ:
              </h2>
            </motion.div>
            
            <div className="relative h-[300px] md:h-[350px]">
              {steps.map((step, index) => (
                <StepDescription 
                  key={index}
                  step={step}
                  index={index}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
