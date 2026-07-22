// components/hotel-console/HotelInfoSidebar.tsx
'use client';

import React from 'react';
import { Phone, Mail, Clock, Wifi, Dumbbell, Utensils, Waves, Flower2, Sparkles } from 'lucide-react';
import { HotelConsoleData } from '@/services/hotel-console.service';

export const HotelInfoSidebar = ({ hotel }: { hotel: HotelConsoleData }) => {
  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves className="w-4 h-4 text-[#007AFF]" />;
      case 'Dumbbell': return <Dumbbell className="w-4 h-4 text-[#007AFF]" />;
      case 'Utensils': return <Utensils className="w-4 h-4 text-[#007AFF]" />;
      case 'Wifi': return <Wifi className="w-4 h-4 text-[#007AFF]" />;
      case 'Flower2': return <Flower2 className="w-4 h-4 text-[#007AFF]" />;
      default: return <Sparkles className="w-4 h-4 text-[#007AFF]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Liên hệ */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] p-6 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-[#8E8E93] uppercase tracking-wider">Thông tin liên hệ vận hành</h2>
        <div className="space-y-3 text-xs text-current">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-[#8E8E93]" />
            <span>HOTLINE: <strong className="font-semibold">{hotel.phone}</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-[#8E8E93]" />
            <span>{hotel.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#8E8E93]" />
            <span>Check-in: <strong className="font-mono">{hotel.checkinTime}</strong> | Check-out: <strong className="font-mono">{hotel.checkoutTime}</strong></span>
          </div>
        </div>
      </div>

      {/* Tiện ích */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] p-6 space-y-4 shadow-sm">
        <h2 className="text-sm font-bold text-[#8E8E93] uppercase tracking-wider">Hệ thống tiện ích ({hotel.amenities.length})</h2>
        <div className="flex flex-wrap gap-2">
          {hotel.amenities.map((amenity) => (
            <span 
              key={amenity.id}
              className="flex items-center space-x-1.5 px-3 py-2 bg-[#F2F2F7] dark:bg-[#2C2C2E] text-xs font-semibold rounded-2xl text-current border border-transparent dark:border-[#2C2C2E]"
            >
              {getAmenityIcon(amenity.icon)}
              <span>{amenity.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};