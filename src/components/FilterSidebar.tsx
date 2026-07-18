import React from "react";
import { X, SlidersHorizontal, Trash2, Check } from "lucide-react";
import { CATEGORIES, SUBJECTS, PRODUCT_LINES, AGE_RANGES } from "../data/content";

interface FilterState {
  category: string;
  subject: string;
  productLine: string;
  ageRange: string;
  priceRange: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  isOpen = false,
  onClose
}: FilterSidebarProps) {
  const priceRanges = [
    { label: "Все цены", value: "all" },
    { label: "До 50 000 ₸", value: "under-50k" },
    { label: "50 000 ₸ - 120 000 ₸", value: "50k-120k" },
    { label: "Более 120 000 ₸", value: "over-120k" }
  ];

  const sidebarContent = (
    <div className="space-y-6">
      
      {/* Title & Clear Action */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-lego-blue" />
          <h2 className="font-display font-black text-slate-800 uppercase tracking-wide text-sm">
            Фильтр решений
          </h2>
        </div>
        <button
          onClick={onClearFilters}
          className="text-xs text-slate-400 hover:text-lego-red font-semibold hover:underline flex items-center gap-1 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Сбросить все</span>
        </button>
      </div>

      {/* Filter Segment: Category Solutions */}
      <div className="space-y-3">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
          Целевая группа
        </label>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat || (cat === "Все решения" && filters.category === "all");
            const catValue = cat === "Все решения" ? "all" : cat;
            return (
              <button
                key={cat}
                onClick={() => onFilterChange("category", catValue)}
                className={`text-left text-sm py-2 px-3 rounded-xl transition-all flex justify-between items-center ${
                  isSelected
                    ? "bg-lego-blue text-white font-bold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 font-medium"
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Segment: Age Range */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
          Возраст учеников
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {AGE_RANGES.map((age) => {
            const ageVal = age === "Все возрасты" ? "all" : age;
            const isSelected = filters.ageRange === ageVal;
            return (
              <button
                key={age}
                onClick={() => onFilterChange("ageRange", ageVal)}
                className={`text-center py-2 px-1 text-xs rounded-lg font-bold transition-all border ${
                  isSelected
                    ? "bg-lego-yellow text-slate-900 border-lego-yellow shadow-xs"
                    : "bg-white border-gray-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {age}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Segment: Curriculum Subjects */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
          Учебный предмет
        </label>
        <div className="flex flex-wrap gap-1.5">
          {SUBJECTS.map((sub) => {
            const subVal = sub === "Все предметы" ? "all" : sub;
            const isSelected = filters.subject === subVal;
            return (
              <button
                key={sub}
                onClick={() => onFilterChange("subject", subVal)}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all border ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-white border-gray-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Segment: Specific Product Line */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
          Серия / Экосистема
        </label>
        <select
          value={filters.productLine}
          onChange={(e) => onFilterChange("productLine", e.target.value)}
          className="w-full bg-white border border-gray-200 text-sm p-2.5 rounded-xl outline-none focus:border-lego-blue focus:ring-1 focus:ring-lego-blue font-medium text-slate-700"
          aria-label="Filter by Product Line"
        >
          {PRODUCT_LINES.map((pl) => {
            const plVal = pl === "Все серии" ? "all" : pl;
            return (
              <option key={pl} value={plVal}>
                {pl}
              </option>
            );
          })}
        </select>
      </div>

      {/* Filter Segment: Budget Tier */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
          Бюджет
        </label>
        <div className="space-y-1.5">
          {priceRanges.map((pr) => {
            const isSelected = filters.priceRange === pr.value;
            return (
              <label
                key={pr.value}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? "bg-slate-100 border-slate-300 text-slate-800"
                    : "bg-white border-transparent hover:bg-slate-50 text-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="priceRange"
                  value={pr.value}
                  checked={isSelected}
                  onChange={() => onFilterChange("priceRange", pr.value)}
                  className="w-4 h-4 text-lego-blue focus:ring-lego-blue"
                />
                <span>{pr.label}</span>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Panel */}
      <div className="hidden lg:block bg-white p-6 rounded-2xl border border-gray-200 h-fit sticky top-24 w-64 shadow-xs">
        {sidebarContent}
      </div>

      {/* Mobile Drawer (Overlay Modal) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden" id="mobile-filter-drawer">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />
          <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 space-y-6 shadow-2xl flex flex-col">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-display font-black text-slate-800 text-lg">
                Поиск и фильтрация решений
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-lego-red hover:bg-slate-100 rounded-full transition-all"
                aria-label="Close Filter Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content scroll block */}
            <div className="flex-1 overflow-y-auto">
              {sidebarContent}
            </div>

            {/* Apply Action Buttons */}
            <div className="border-t border-gray-100 pt-4 flex gap-4">
              <button
                onClick={onClearFilters}
                className="flex-1 py-3 text-slate-600 font-bold bg-slate-100 hover:bg-slate-200 rounded-full text-xs text-center transition-all"
              >
                Сбросить фильтры
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 text-white font-display font-black bg-lego-blue hover:bg-lego-blue-dark rounded-full text-xs text-center shadow-md transition-all"
              >
                Применить
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
