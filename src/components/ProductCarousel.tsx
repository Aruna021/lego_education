import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Product } from "../types";
import ProductCard from "./ProductCard";

interface ProductCarouselProps {
  products: Product[];
  title: string;
  subtitle?: string;
}

export default function ProductCarousel({ products, title, subtitle }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollLimits = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      // Allow slight floating point variation
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollLimits();
    window.addEventListener("resize", checkScrollLimits);
    return () => window.removeEventListener("resize", checkScrollLimits);
  }, [products]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75; // Scroll 75% of viewable area
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="space-y-6 relative group" id="featured-carousel-section">
      
      {/* Title Header with Badges */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-lego-blue text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 fill-lego-yellow text-lego-yellow" />
            <span>Популярно в школах</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight text-slate-800">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-500 text-sm max-w-2xl">{subtitle}</p>
          )}
        </div>

        {/* Manual Arrow Controls (Desktop only) */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={`p-2.5 rounded-full border transition-all ${
              canScrollLeft
                ? "bg-white border-gray-200 text-slate-800 hover:bg-slate-50 hover:shadow-sm cursor-pointer"
                : "bg-slate-50 border-gray-100 text-gray-300 cursor-not-allowed"
            }`}
            title="Scroll left"
            aria-label="Scroll Carousel Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={`p-2.5 rounded-full border transition-all ${
              canScrollRight
                ? "bg-white border-gray-200 text-slate-800 hover:bg-slate-50 hover:shadow-sm cursor-pointer"
                : "bg-slate-50 border-gray-100 text-gray-300 cursor-not-allowed"
            }`}
            title="Scroll right"
            aria-label="Scroll Carousel Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontally scrolling list container */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={checkScrollLimits}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start snap-always"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Dynamic shadow indicators when scrollable */}
        {canScrollLeft && (
          <div className="hidden md:block absolute top-0 bottom-4 left-0 w-12 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="hidden md:block absolute top-0 bottom-4 right-0 w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        )}
      </div>

    </div>
  );
}
