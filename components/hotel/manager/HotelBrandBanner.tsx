// components/hotel-console/HotelBrandBanner.tsx
'use client';

import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { HotelConsoleData } from '@/services/hotel-console.service';

export const HotelBrandBanner = ({ hotel }: { hotel: HotelConsoleData }) => {
  return (
    <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg border border-[#E5E5EA] dark:border-[#2C2C2E]">
      <img 
        src={hotel.brand.banner} 
        alt={hotel.brand.name} 
        className="w-full h-full object-cover brightness-[0.7] dark:brightness-[0.5]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{hotel.brand.logo}</span>
              <span className="text-xs font-bold text-[#007AFF] uppercase tracking-widest">{hotel.brand.name}</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">{hotel.name}</h1>
            <div className="flex items-center space-x-1.5 text-xs text-white/80">
              <MapPin className="w-3.5 h-3.5" />
              <span>{hotel.address}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <span className="text-xs font-bold text-white uppercase font-mono">Xếp hạng:</span>
            <div className="flex items-center text-[#FFCC00]">
              {Array.from({ length: hotel.star }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};