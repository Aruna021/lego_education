import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, ShoppingBag, Eye, Tag } from "lucide-react";
import { Product } from "../types";
import { useApp } from "../context/AppContext";
import { LegoArtwork } from "./LegoArtwork";
import { formatUsdToKZT } from "../utils/price";

interface ProductCardProps {
  product: Product;
  key?: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useApp();
  const navigate = useNavigate();

  const handleAddToBag = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents clicking the button from navigating to product details page
    addToCart(product);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative inline-block overflow-hidden">
            <Star className="w-3.5 h-3.5 text-gray-300" />
            <div className="absolute top-0 left-0 w-[50%] overflow-hidden h-full">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-3.5 h-3.5 text-gray-200" />
        );
      }
    }
    return stars;
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer relative"
      id={`product-card-${product.id}`}
    >
      
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="bg-emerald-500 text-white font-display font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            НОВИНКА
          </span>
        )}
        {product.isExclusive && (
          <span className="bg-lego-blue text-white font-display font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            ЭКСКЛЮЗИВ
          </span>
        )}
      </div>

      {/* Piece Count Overlay */}
      <div className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-xs text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-md">
        {product.pieceCount} дет.
      </div>

      {/* Artwork Canvas Container */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-gray-100 flex-shrink-0">
        <LegoArtwork
          type={product.image}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover overlay peek detail */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/90 text-slate-800 text-xs font-display font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Eye className="w-4 h-4 text-lego-blue" />
            <span>Изучить детали STEM</span>
          </span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          {/* Tag Category and Subject */}
          <div className="flex flex-wrap gap-1 items-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span className="text-lego-blue">{product.category}</span>
            <span className="text-gray-300">•</span>
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              {product.subject}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-black text-base text-slate-800 leading-tight line-clamp-2 tracking-tight group-hover:text-lego-red transition-colors">
            {product.title}
          </h3>

          {/* Age range & reviews */}
          <div className="flex items-center gap-3">
            <div className="bg-lego-yellow/15 border border-lego-yellow/40 rounded-md px-2 py-0.5 text-xs font-extrabold text-amber-800">
              Возраст: {product.ageRange}
            </div>
            
            <div className="flex items-center gap-1">
              <div className="flex items-center">{renderStars(product.rating)}</div>
              <span className="text-[10px] text-gray-500 font-bold">({product.rating})</span>
            </div>
          </div>
        </div>

        {/* Price and CTA Button */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] font-semibold tracking-wider uppercase leading-none mb-1">ЦЕНА ДЛЯ ШКОЛ</span>
            <span className="text-xl font-display font-black text-slate-900 tracking-tight">
              {formatUsdToKZT(product.price)}
            </span>
          </div>

          {/* Lego brick styling action CTA */}
          <button
            onClick={handleAddToBag}
            className="bg-lego-red hover:bg-red-700 text-white p-3 rounded-xl transition-all duration-200 hover:shadow-md active:scale-90 flex-shrink-0 group/btn"
            title="Добавить в корзину"
            aria-label="Add Solution to Bag"
          >
            <ShoppingBag className="w-5 h-5 group-hover/btn:animate-pulse" />
          </button>
        </div>

      </div>

    </div>
  );
}
