// components/hotel-console/HotelImageGallery.tsx
'use client';

import React from 'react';
import { HotelImage } from '@/services/hotel-console.service';

export const HotelImageGallery = ({ images }: { images: HotelImage[] }) => {
  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] p-6 space-y-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-bold text-[#8E8E93] uppercase tracking-wider">Thư viện ảnh ({images.length})</h2>
        <span className="text-[10px] bg-[#E5E5EA] dark:bg-[#2C2C2E] px-2 py-0.5 rounded-full font-semibold">Tối đa 500px</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {images.map((img) => (
          <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden border border-[#E5E5EA] dark:border-[#2C2C2E] group">
            <img 
              src={img.imageUrl} 
              alt="Phòng khách sạn" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute bottom-1 right-1 bg-black/60 text-[9px] font-mono text-white px-1.5 py-0.5 rounded-md">
              #{img.sortOrder}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};