import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, GraduationCap, Laptop } from "lucide-react";
import { LegoArtwork } from "./LegoArtwork";

export default function SpotlightSection() {
  return (
    <section className="space-y-8" id="editorial-spotlight-section">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-lego-red text-xs font-extrabold uppercase tracking-widest bg-lego-red/10 px-3.5 py-1.5 rounded-full inline-block">
          Дополнение для классов
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-slate-800">
          Преобразование обучения STEM в три простых шага
        </h2>
        <p className="text-gray-500 text-sm md:text-base">
          Наши специализированные наборы для классов разработаны экспертами по педагогике. Они объединяют визуальное ПО для программирования, прочные детали LEGO и рабочие листы для учеников в готовые учебные комплекты.
        </p>
      </div>

      {/* Grid of editorial cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Spotlight Card 1 */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
          <div className="h-48 overflow-hidden relative">
            <LegoArtwork type="spike-essential" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-4 left-4 bg-lego-blue text-white p-2 rounded-lg shadow-sm">
              <Laptop className="w-4 h-4" />
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-lego-blue text-xs font-bold tracking-wider uppercase">ОТ 6 ЛЕТ • АКСЕЛЕРАТОР РОБОТОТЕХНИКИ</span>
              <h3 className="font-display font-black text-lg text-slate-800 leading-tight">
                Робототехника и электроника для начинающих
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                Освойте основы программирования с помощью готовых смарт-хабов, моторов и датчиков расстояния. Включает 28 подготовленных практических проектов по изучению механизмов, автономной навигации и обратной связи.
              </p>
            </div>
            <Link
              to="/catalog?subject=Робототехника"
              className="text-lego-blue hover:text-lego-blue-dark text-xs font-display font-bold flex items-center gap-1.5 hover:underline group-hover:translate-x-1 transition-all"
            >
              <span>Изучить наборы робототехники</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Spotlight Card 2 */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
          <div className="h-48 overflow-hidden relative">
            <LegoArtwork type="spike-prime" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-4 left-4 bg-lego-red text-white p-2 rounded-lg shadow-sm">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-lego-red text-xs font-bold tracking-wider uppercase">ДЛЯ ВСЕХ ВОЗРАСТОВ • УЧЕБНЫЕ МАТЕРИАЛЫ</span>
              <h3 className="font-display font-black text-lg text-slate-800 leading-tight">
                Учебные материалы по стандартам
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                Скачивайте пошаговые PDF-руководства, шаблоны программ Scratch, ответы к рабочим тетрадям и учебные таблицы, соответствующие стандартам образования. Подготовка учителя не требуется!
              </p>
            </div>
            <Link
              to="/catalog?category=Программирование%20и%20робототехника"
              className="text-lego-red hover:text-red-700 text-xs font-display font-bold flex items-center gap-1.5 hover:underline group-hover:translate-x-1 transition-all"
            >
              <span>Посмотреть планы уроков</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Spotlight Card 3 */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
          <div className="h-48 overflow-hidden relative">
            <LegoArtwork type="steam-park" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-4 left-4 bg-lego-yellow text-slate-900 p-2 rounded-lg shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-amber-600 text-xs font-bold tracking-wider uppercase">ОТ 3 ЛЕТ • КОГНИТИВНОЕ РАЗВИТИЕ</span>
              <h3 className="font-display font-black text-lg text-slate-800 leading-tight">
                Основы STEAM для раннего возраста
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                Заложите основу когнитивного развития с крупными яркими кубиками букв DUPLO, фигурками людей и функциональными шестеренками. Развивает пространственное мышление, фонетику и координацию движений.
              </p>
            </div>
            <Link
              to="/catalog?category=Раннее%20развитие"
              className="text-amber-600 hover:text-amber-800 text-xs font-display font-bold flex items-center gap-1.5 hover:underline group-hover:translate-x-1 transition-all"
            >
              <span>Посмотреть наборы раннего развития</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}
