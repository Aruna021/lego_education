import React, { useState } from "react";
import { Sparkles, Trophy, BookOpen, Search, FilterX } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Creation } from "../types";
import UploadForm from "../components/UploadForm";
import GalleryCard from "../components/GalleryCard";
import Lightbox from "../components/Lightbox";

export default function Gallery() {
  const { creations } = useApp();
  const [selectedCreation, setSelectedCreation] = useState<Creation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter creations based on user search query
  const filteredCreations = creations.filter((creation) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const matchTitle = creation.title.toLowerCase().includes(query);
    const matchCreator = (creation.displayName || "").toLowerCase().includes(query);
    const matchCaption = (creation.caption || "").toLowerCase().includes(query);
    return matchTitle || matchCreator || matchCaption;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="creations-gallery-page">
      
      {/* Page Title & Pitch Banner */}
      <div className="bg-gradient-to-r from-lego-blue to-cyan-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,213,0,0.2),transparent)] pointer-events-none" />
        
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="bg-lego-yellow text-slate-900 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm">
            <Trophy className="w-4 h-4 text-amber-700" />
            <span>ГЛОБАЛЬНЫЙ КАТАЛОГ ДЕТСКИХ ИЗОБРЕТЕНИЙ</span>
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none">
            Выставка изобретений
          </h1>
          <p className="text-sky-100 text-xs sm:text-sm leading-relaxed">
            Добро пожаловать в нашу общую лабораторию идей! Посмотрите, что юные робототехники, школьные кружки программирования и группы раннего развития создали с помощью решений LEGO® Education. Опубликуйте работу вашего класса анонимно, чтобы вдохновить других учителей!
          </p>
        </div>
      </div>

      {/* Main split grid: Form Left (col-span-4) • Grid right (col-span-8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Upload creation widget */}
        <div className="lg:col-span-4 sticky top-24">
          <UploadForm />
        </div>

        {/* Right Column: Searchable gallery timeline */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Gallery controls & specifically Search bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-slate-800 text-sm tracking-wide">
                Показано поделок: {filteredCreations.length}
              </span>
            </div>

            {/* Gallery Search query */}
            <div className="relative max-w-sm w-full">
              <input
                type="text"
                placeholder="Поиск поделок, школ, названий..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 hover:bg-slate-200/50 focus:bg-white pl-4 pr-10 py-2 rounded-xl text-xs border border-transparent focus:border-lego-blue outline-none transition-all font-medium text-slate-700"
                aria-label="Search Gallery"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Core Grid timeline */}
          {filteredCreations.length === 0 ? (
            /* Empty State */
            <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-6">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
                <FilterX className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-slate-800 text-base">
                  Подходящие поделки не найдены
                </h3>
                <p className="text-gray-500 text-xs max-w-xs mx-auto">
                  Мы не нашли детских поделок по запросу «{searchQuery}». Попробуйте использовать другие ключевые слова, например «ровер», «SPIKE» или «DUPLO».
                </p>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition-all cursor-pointer"
              >
                Очистить фильтр поиска
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="gallery-creations-grid">
              {filteredCreations.map((creation) => (
                <GalleryCard
                  key={creation.id}
                  creation={creation}
                  onClick={() => setSelectedCreation(creation)}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Lightbox details overlay */}
      <Lightbox
        creation={selectedCreation}
        onClose={() => setSelectedCreation(null)}
      />

    </div>
  );
}
