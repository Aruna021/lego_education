import React from "react";
import { Calendar, User, Eye, Sparkles } from "lucide-react";
import { Creation } from "../types";
import { LegoArtwork } from "./LegoArtwork";

interface GalleryCardProps {
  creation: Creation;
  onClick: () => void;
  key?: string;
}

export default function GalleryCard({ creation, onClick }: GalleryCardProps) {
  // Check if imageSrc is a pre-seeded key or base64 data
  const isPreseeded = creation.imageSrc.startsWith("creation-");

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
      id={`gallery-card-${creation.id}`}
    >
      
      {/* Visual Canvas Thumbnail */}
      <div className="relative aspect-video w-full bg-slate-50 border-b border-gray-100 overflow-hidden flex-shrink-0">
        {isPreseeded ? (
          <LegoArtwork
            type={creation.imageSrc}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <img
            src={creation.imageSrc}
            alt={creation.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Hover zoom reveal */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/90 text-slate-800 text-xs font-display font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Eye className="w-4 h-4 text-lego-blue" />
            <span>Изучить историю поделки</span>
          </span>
        </div>

        {/* Classroom project indicator tab */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-lego-yellow fill-lego-yellow" />
          <span>Школьная выставка</span>
        </div>
      </div>

      {/* Narrative Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Title */}
          <h4 className="font-display font-black text-base text-slate-800 leading-snug line-clamp-2 tracking-tight group-hover:text-lego-blue transition-colors">
            {creation.title}
          </h4>
          
          {/* Brief teaser of story */}
          {creation.caption && (
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
              {creation.caption}
            </p>
          )}
        </div>

        {/* Meta data row */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          <div className="flex items-center gap-1.5 truncate max-w-[60%]">
            <User className="w-3.5 h-3.5 text-lego-blue" />
            <span className="truncate">{creation.displayName}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 shrink-0">
            <Calendar className="w-3.5 h-3.5" />
            <span>{creation.uploadedAt}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
