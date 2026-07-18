import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Flame, Users, Atom, Boxes, Percent, ShieldCheck, Heart, Truck, GraduationCap } from "lucide-react";
import HeroBanner from "../components/HeroBanner";
import ProductCarousel from "../components/ProductCarousel";
import SpotlightSection from "../components/SpotlightSection";
import { PRODUCTS } from "../data/content";

export default function Home() {
  const navigate = useNavigate();

  // Filter 6-8 popular featured products to showcase in the slider carousel
  const featuredProducts = PRODUCTS.slice(0, 8);

  const quickLinks = [
    {
      id: "new-sets",
      title: "Новинки",
      color: "bg-emerald-500 hover:bg-emerald-600 text-white",
      icon: <Sparkles className="w-6 h-6" />,
      path: "/catalog?isNew=true",
      sub: "Свежие учебные наборы"
    },
    {
      id: "bestsellers",
      title: "Хиты продаж",
      color: "bg-lego-red hover:bg-red-700 text-white",
      icon: <Flame className="w-6 h-6" />,
      path: "/catalog?sort=rating-desc",
      sub: "Выбор большинства школ"
    },
    {
      id: "by-age",
      title: "По возрасту",
      color: "bg-lego-yellow hover:bg-amber-500 text-slate-900",
      icon: <Users className="w-6 h-6" />,
      path: "/catalog?ageRange=10%2B",
      sub: "От детского сада до школы"
    },
    {
      id: "by-subject",
      title: "По предметам",
      color: "bg-indigo-600 hover:bg-indigo-700 text-white",
      icon: <Atom className="w-6 h-6" />,
      path: "/catalog?subject=Робототехника",
      sub: "Роботы, код и механика"
    },
    {
      id: "classroom-kits",
      title: "Для классов",
      color: "bg-lego-blue hover:bg-lego-blue-dark text-white",
      icon: <Boxes className="w-6 h-6" />,
      path: "/catalog?category=Решения%20для%20классов",
      sub: "Решения для целых групп"
    },
    {
      id: "offers",
      title: "Спецпредложения",
      color: "bg-rose-500 hover:bg-rose-600 text-white",
      icon: <Percent className="w-6 h-6" />,
      path: "/catalog?priceRange=under-100",
      sub: "Запасные части и наборы"
    }
  ];

  return (
    <div className="space-y-16 pb-16" id="home-dashboard-page">
      
      {/* 1. Rotating seasonal marketing hero banner */}
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 2. Interactive quick-link tiles row */}
        <section className="space-y-6" id="quick-links-section">
          <div className="text-center sm:text-left">
            <h3 className="font-display font-black text-xl md:text-2xl tracking-tight text-slate-800">
              Обзор решений по учебным целям
            </h3>
            <p className="text-gray-500 text-sm">
              Переходите к готовым подборкам решений, составленным под конкретные классы и учебные бюджеты.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {quickLinks.map((ql) => (
              <button
                key={ql.id}
                onClick={() => navigate(ql.path)}
                className={`group flex flex-col items-center justify-center p-5 rounded-2xl transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 text-center cursor-pointer min-h-[140px] relative overflow-hidden ${ql.color}`}
              >
                {/* Visual brick stud overlay in the background */}
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/10 opacity-30 group-hover:scale-125 transition-transform" />
                <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white/10 opacity-30 group-hover:scale-125 transition-transform" />
                
                <div className="p-3 bg-white/15 rounded-xl mb-3 group-hover:rotate-6 transition-transform">
                  {ql.icon}
                </div>
                
                <span className="font-display font-black text-sm tracking-wide block leading-none">
                  {ql.title}
                </span>
                <span className="text-[9px] font-medium block mt-1 opacity-80 max-w-[110px] mx-auto leading-tight">
                  {ql.sub}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Promotional Trust highlights row */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-100 p-8 rounded-3xl border border-gray-200" id="brand-trust-section">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-lego-red text-white rounded-xl shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm text-slate-800">Прочность для классов</h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Кубики LEGO Education проходят тесты на падение, прочность и безопасность, чтобы выдержать многолетнюю работу в детских группах.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-lego-blue text-white rounded-xl shrink-0 shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm text-slate-800">Методическая поддержка</h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Каждый комплект включает более 30 часов планов уроков, соответствующих образовательным стандартам и готовых к использованию.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-lego-yellow text-slate-900 rounded-xl shrink-0 shadow-sm">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm text-slate-800">Единая система обучения</h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Соединяйте простые колеса DUPLO с продвинутыми смарт-хабами. Наша система обучения масштабируется по мере роста учеников.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500 text-white rounded-xl shrink-0 shadow-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm text-slate-800">Доставка для школ</h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                Бесплатная стандартная доставка на все комплекты решений для классов. Набор запасных деталей включен в каждый комплект.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Featured Product Carousel */}
        <section>
          <ProductCarousel
            products={featuredProducts}
            title="Самые популярные решения STEAM"
            subtitle="Изучите наши популярные робототехнические смарт-хабы и механические наборы, которым доверяют более 10 000 педагогов по всему миру."
          />
        </section>

        {/* 5. Spotlight/Editorial Editorial Columns */}
        <SpotlightSection />

        {/* 6. Curated Campaign Banner: FIRST LEGO League */}
        <section className="bg-lego-blue rounded-3xl overflow-hidden shadow-md text-white relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,213,0,0.15),transparent)] pointer-events-none" />
          <div className="p-8 md:p-12 max-w-2xl space-y-6 relative z-10">
            <span className="bg-lego-yellow text-slate-900 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              ГОТОВНОСТЬ К СОРЕВНОВАНИЯМ STEM
            </span>
            <h3 className="font-display font-black text-2xl md:text-4xl tracking-tight leading-tight">
              Подготовьтесь к состязаниям FIRST® LEGO® League Challenge!
            </h3>
            <p className="text-sky-100 text-xs sm:text-sm leading-relaxed">
              Оснастите робототехническую команду вашей школы наборами SPIKE Prime и специальными расширениями. Освойте конструирование, автономное программирование на Python и работу в команде на турнирных миссиях!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/catalog?productLine=SPIKE%20Prime")}
                className="bg-lego-yellow hover:bg-yellow-400 text-slate-950 font-display font-black text-center px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-md"
              >
                Посмотреть наборы
              </button>
              <button
                onClick={() => navigate("/gallery")}
                className="bg-white/10 hover:bg-white/20 text-white font-display font-bold text-center px-5 py-3 rounded-full text-xs transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white animate-pulse" />
                <span>Фотографии детских поделок</span>
              </button>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
