import React, { useEffect } from "react";
import { X, Calendar, User, Sparkles, AlertCircle, Quote } from "lucide-react";
import { Creation } from "../types";
import { LegoArtwork } from "./LegoArtwork";

interface LightboxProps {
  creation: Creation | null;
  onClose: () => void;
}

export default function Lightbox({ creation, onClose }: LightboxProps) {
  useEffect(() => {
    // Keyboard support: Close on ESC keypress
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Prevent background scrolling while modal is open
    if (creation) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [creation, onClose]);

  if (!creation) return null;

  const isPreseeded = creation.imageSrc.startsWith("creation-");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      id="lightbox-backdrop-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      {/* Semi-translucent dark background backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Container Card */}
      <div className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row relative z-10 shadow-2xl animate-scale-up">
        
        {/* Absolute Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-5 md:right-5 bg-slate-900/80 hover:bg-lego-red text-white p-2 rounded-full transition-all duration-200 shadow-md hover:scale-105 active:scale-95 z-30"
          title="Close dialog"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Artwork/Photo Frame */}
        <div className="md:w-1/2 aspect-video md:aspect-auto bg-slate-50 relative flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-gray-100 min-h-[250px]">
          {isPreseeded ? (
            <LegoArtwork type={creation.imageSrc} className="w-full h-full object-cover" />
          ) : (
            <img
              src={creation.imageSrc}
              alt={creation.title}
              className="w-full h-full object-contain max-h-[50vh] md:max-h-full"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Little decorative watermarks */}
          <div className="absolute bottom-4 left-4 bg-lego-yellow text-slate-900 font-display font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
            ШКОЛЬНЫЙ АРХИВ
          </div>
        </div>

        {/* Right Side: Narrative Stories */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full space-y-6">
          
          <div className="space-y-4">
            
            {/* Header badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-lego-blue/10 text-lego-blue font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 fill-lego-yellow text-lego-yellow animate-spin" style={{ animationDuration: "6s" }} />
                <span>Избранный проект STEM</span>
              </span>
              <span className="bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-wider px-2 py-1 rounded">
                Практический кейс
              </span>
            </div>

            {/* Title */}
            <h3
              id="lightbox-title"
              className="font-display font-black text-xl sm:text-2xl text-slate-800 tracking-tight leading-tight"
            >
              {creation.title}
            </h3>

            {/* Story/Caption */}
            <div className="relative pt-4 pl-6 border-l-4 border-lego-yellow/70 bg-amber-50/25 p-4 rounded-r-xl">
              <Quote className="absolute top-2 left-2 w-8 h-8 text-lego-yellow/20 -translate-x-1/2 -translate-y-1/2 shrink-0 transform -scale-x-100" />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap relative z-10 italic">
                {creation.caption || "К этой творческой поделке не оставлено описания."}
              </p>
            </div>

          </div>

          {/* Creator Footer Info */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-lego-blue/10 flex items-center justify-center text-lego-blue shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">Автор проекта</p>
                <p className="font-display font-black text-sm text-slate-800 truncate mt-1">
                  {creation.displayName || "Анонимный создатель"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>{creation.uploadedAt}</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
