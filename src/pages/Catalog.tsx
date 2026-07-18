import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, ChevronDown, Sparkles, X, SlidersHorizontal, BookOpen } from "lucide-react";
import { PRODUCTS } from "../data/content";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

interface FilterState {
  category: string;
  subject: string;
  productLine: string;
  ageRange: string;
  priceRange: string;
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize filter state from search parameters
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    subject: "all",
    productLine: "all",
    ageRange: "all",
    priceRange: "all"
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  // Read search parameters on load/change
  useEffect(() => {
    const q = searchParams.get("search") || "";
    const cat = searchParams.get("category") || "all";
    const sub = searchParams.get("subject") || "all";
    const pl = searchParams.get("productLine") || "all";
    const age = searchParams.get("ageRange") || "all";
    const pr = searchParams.get("priceRange") || "all";

    setSearchQuery(q);
    setFilters({
      category: cat,
      subject: sub,
      productLine: pl,
      ageRange: age,
      priceRange: pr
    });
  }, [searchParams]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const nextFilters = { ...filters, [key]: value };
    setFilters(nextFilters);

    // Update query parameters in URL to keep state shareable
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setFilters({
      category: "all",
      subject: "all",
      productLine: "all",
      ageRange: "all",
      priceRange: "all"
    });
    setSearchParams(new URLSearchParams());
  };

  const removeSingleFilter = (key: keyof FilterState) => {
    handleFilterChange(key, "all");
  };

  // Main Filter Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Category Filter
    if (filters.category !== "all" && product.category !== filters.category) {
      return false;
    }
    // 2. Subject Filter
    if (filters.subject !== "all" && product.subject !== filters.subject) {
      return false;
    }
    // 3. Product Line Filter
    if (filters.productLine !== "all" && product.productLine !== filters.productLine) {
      return false;
    }
    // 4. Age Range Filter
    if (filters.ageRange !== "all" && product.ageRange !== filters.ageRange) {
      return false;
    }
    // 5. Special filters (IsNew query check from Home shortcut)
    const isNewShortcut = searchParams.get("isNew") === "true";
    if (isNewShortcut && !product.isNew) {
      return false;
    }
    // 6. Price Range Filter
    if (filters.priceRange !== "all") {
      const priceKzt = product.price * 470;
      if (filters.priceRange === "under-50k" && priceKzt >= 50000) return false;
      if (filters.priceRange === "50k-120k" && (priceKzt < 50000 || priceKzt > 120000)) return false;
      if (filters.priceRange === "over-120k" && priceKzt <= 120000) return false;
    }
    // 7. Text Search Query Matching
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(query);
      const matchDesc = product.description.toLowerCase().includes(query);
      const matchLine = product.productLine.toLowerCase().includes(query);
      const matchTags = product.tags.some((tag) => tag.toLowerCase().includes(query));
      if (!matchTitle && !matchDesc && !matchLine && !matchTags) {
        return false;
      }
    }

    return true;
  });

  // Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "rating-desc") {
      return b.rating - a.rating;
    }
    // Default 'recommended' puts new / exclusive items first
    const aWeight = (a.isExclusive ? 2 : 0) + (a.isNew ? 1 : 0);
    const bWeight = (b.isExclusive ? 2 : 0) + (b.isNew ? 1 : 0);
    return bWeight - aWeight;
  });

  // Gather list of actively applied filters for chips display
  const activeChips = Object.entries(filters).filter(([_, val]) => val !== "all");

  const getChipLabel = (key: string, val: string) => {
    if (key === "priceRange") {
      if (val === "under-50k") return "До 50 000 ₸";
      if (val === "50k-120k") return "50 000 ₸ - 120 000 ₸";
      if (val === "over-120k") return "Более 120 000 ₸";
    }
    return val;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="catalog-solutions-page">
      
      {/* 1. Header Hero section */}
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mb-10 shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,109,183,0.3),transparent)] pointer-events-none" />
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="bg-lego-yellow text-slate-900 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-sm animate-pulse">
            <Sparkles className="w-3.5 h-3.5 fill-slate-900" />
            <span>Стандартизированные решения STEAM</span>
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none">
            Учебные комплекты кубиков
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Оснастите свои учебные классы высокопрочными наборами LEGO с поддержкой запасных частей, встроенным ПО на Scratch/Python, методическими планами уроков и ресурсами для учителей.
          </p>
        </div>
      </div>

      {/* 2. Controls Row (Sort and Filter mobile triggers) */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 mb-6 shadow-xs">
        
        {/* Results indicator & search label */}
        <div className="flex items-center gap-2">
          <span className="text-slate-800 font-display font-black text-sm tracking-wide">
            Найдено решений для классов: {sortedProducts.length}
          </span>
          {searchQuery && (
            <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold">
              Поиск: «{searchQuery}»
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          {/* Mobile Filter toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 hover:border-lego-blue rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
            aria-label="Toggle Mobile Filters"
          >
            <SlidersHorizontal className="w-4.5 h-4.5 text-lego-blue" />
            <span>Фильтр</span>
          </button>

          {/* Sorter Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline text-xs font-semibold text-gray-400 uppercase tracking-wider">Сортировка:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-slate-100/70 border border-gray-200 text-xs font-bold text-slate-700 py-2.5 pl-4 pr-10 rounded-xl outline-none focus:border-lego-blue cursor-pointer"
                aria-label="Sort products dropdown"
              >
                <option value="recommended">Рекомендуемые</option>
                <option value="rating-desc">Высокий рейтинг ⭐</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

      </div>

      {/* 3. Filter Chips Panel */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center mb-8">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1">Активные фильтры:</span>
          {activeChips.map(([key, val]) => (
            <button
              key={key}
              onClick={() => removeSingleFilter(key as keyof FilterState)}
              className="flex items-center gap-1.5 bg-lego-blue/15 hover:bg-lego-red/15 text-lego-blue hover:text-lego-red px-3 py-1.5 rounded-full text-xs font-bold transition-all border border-transparent"
              title={`Удалить фильтр ${val}`}
            >
              <span>{getChipLabel(key, val as string)}</span>
              <X className="w-3.5 h-3.5" />
            </button>
          ))}
          <button
            onClick={handleClearFilters}
            className="text-xs font-bold text-slate-500 hover:text-lego-red hover:underline ml-1"
          >
            Сбросить все
          </button>
        </div>
      )}

      {/* 4. Main Body Split */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Sticky filters (desktop) / Drawer context (mobile) */}
        <div className="lg:w-64 shrink-0">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />
        </div>

        {/* Right Side: Grid results */}
        <div className="flex-1 space-y-6">
          {sortedProducts.length === 0 ? (
            /* Empty state */
            <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center max-w-2xl mx-auto space-y-6">
              <div className="w-20 h-20 bg-lego-yellow/10 rounded-full flex items-center justify-center mx-auto text-lego-yellow">
                <BookOpen className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display font-black text-xl text-slate-800">
                  Решения для классов не найдены
                </h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Мы не смогли найти наборы LEGO, соответствующие вашему запросу. Попробуйте сбросить фильтры или ввести общие ключевые слова, например «робот» или «spike».
                </p>
              </div>
              <button
                onClick={handleClearFilters}
                className="px-6 py-3 bg-lego-red hover:bg-red-700 text-white font-display font-black text-xs uppercase tracking-wider rounded-full shadow-md transform active:scale-95 transition-all cursor-pointer"
              >
                Показать все 15 наборов LEGO
              </button>
            </div>
          ) : (
            /* Products Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" id="products-catalog-grid">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
