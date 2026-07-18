import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, BookOpen, Award } from "lucide-react";
import { LegoArtwork } from "./LegoArtwork";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  ctaText: string;
  link: string;
  bgGradient: string;
  artworkType: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: "КАМПАНИЯ «СНОВА В ШКОЛУ»",
    title: "Переосмыслите программирование и робототехнику в классе",
    subtitle: "Представляем решение LEGO® Education SPIKE™ Prime",
    description: "Вовлекайте учеников 5-8 классов в критическое мышление, анализ данных и проектирование! Готовые учебные программы, соответствующие образовательным стандартам информатики, с методическими руководствами для учителей.",
    ctaText: "Изучить SPIKE Prime",
    link: "/catalog?productLine=SPIKE%20Prime",
    bgGradient: "from-[#FFD500] via-[#FFE259] to-[#FFF4B0]",
    artworkType: "spike-prime"
  },
  {
    id: 2,
    badge: "100% ЕСТЕСТВОЗНАНИЕ БЕЗ ЭКРАНОВ",
    title: "Изучение физики в движении через спортивную тематику",
    subtitle: "Наборы LEGO® Education BricQ Motion",
    description: "Изучайте основы механики на примере гимнастики, лыжного слалома и парусного спорта. Наблюдайте, как силы и законы Ньютона становятся понятными во время сборки осязаемых моделей без использования экранов.",
    ctaText: "Изучить BricQ Motion",
    link: "/catalog?productLine=BricQ%20Motion",
    bgGradient: "from-[#F97316] via-[#FB923C] to-[#FED7AA]",
    artworkType: "bricq-motion-prime"
  },
  {
    id: 3,
    badge: "СОТРУДНИЧЕСТВО С РАННИХ ЛЕТ",
    title: "Заложите основы STEAM-игры для самых маленьких",
    subtitle: "Наборы DUPLO® Education и «Юный программист»",
    description: "Познакомьте детей в игровых группах с первыми концепциями программирования: последовательностями и циклами. Крупные, прочные детали специально разработаны для маленьких рук и подкреплены методиками когнитивного развития.",
    ctaText: "Начать раннее обучение",
    link: "/catalog?productLine=DUPLO%20Education",
    bgGradient: "from-[#006DB7] via-[#38BDF8] to-[#BAE6FD]",
    artworkType: "steam-park"
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative w-full overflow-hidden bg-slate-100 border-b border-gray-200" id="hero-marketing-banner">
      {/* Dynamic Slide Background with CSS transition */}
      <div className={`w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r ${slide.bgGradient} transition-all duration-700 ease-in-out flex items-center min-h-[500px]`}>
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slide Text Panel */}
          <div className="lg:col-span-7 space-y-6 text-slate-900 z-10">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">
              <Award className="w-3.5 h-3.5 text-lego-yellow" />
              <span>{slide.badge}</span>
            </div>

            <div className="space-y-2">
              <p className="font-display font-black text-slate-800 text-lg sm:text-xl md:text-2xl tracking-tight leading-none">
                {slide.subtitle}
              </p>
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tighter">
                {slide.title}
              </h1>
            </div>

            <p className="text-slate-800 text-sm md:text-base leading-relaxed max-w-xl font-medium">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to={slide.link}
                className="bg-lego-red hover:bg-red-700 text-white font-display font-black text-center px-8 py-4 rounded-full shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm uppercase tracking-wider"
              >
                {slide.ctaText}
              </Link>
              
              <Link
                to="/catalog"
                className="bg-white/80 hover:bg-white text-slate-800 font-display font-bold text-center px-6 py-4 rounded-full shadow-sm hover:shadow-md transition-all text-sm flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-lego-blue" />
                <span>Все учебные комплекты</span>
              </Link>
            </div>

          </div>

          {/* Dynamic Graphic representation on the right */}
          <div className="lg:col-span-5 flex justify-center z-10">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] bg-white rounded-3xl overflow-hidden shadow-xl border border-white/40 flex items-center justify-center">
              <LegoArtwork
                type={slide.artworkType}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>

        </div>

      </div>

      {/* Slide Navigation Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white text-slate-800 shadow-md hover:scale-105 active:scale-95 transition-all z-20"
        title="Previous Campaign"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white text-slate-800 shadow-md hover:scale-105 active:scale-95 transition-all z-20"
        title="Next Campaign"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide indicator dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3.5 h-3.5 rounded-full transition-all ${
              currentSlide === idx ? "bg-lego-red scale-110 w-6" : "bg-white/55 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
