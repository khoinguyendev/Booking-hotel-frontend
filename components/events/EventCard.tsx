// components/events/EventCard.tsx
'use client';

import React from 'react';
import { HotelEvent } from '@/services/event.service';
import { Calendar, MapPin, Users, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface EventCardProps {
  event: HotelEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  // Lấy màu sắc chủ đạo theo loại sự kiện
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'Conference':
        return { color: '#007AFF', bg: 'bg-[#007AFF]/10 text-[#007AFF]' }; // Apple Blue
      case 'Maintenance':
        return { color: '#FF9500', bg: 'bg-[#FF9500]/10 text-[#FF9500]' }; // Apple Orange
      case 'Internal':
        return { color: '#5856D6', bg: 'bg-[#5856D6]/10 text-[#5856D6]' }; // Apple Purple
      default:
        return { color: '#FF3B30', bg: 'bg-[#FF3B30]/10 text-[#FF3B30]' }; // Apple Red
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Live':
        return { bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', label: 'Đang diễn ra', icon: <Clock className="w-3 h-3 mr-1 animate-pulse" /> };
      case 'Completed':
        return { bg: 'bg-[#8E8E93]/10 text-[#8E8E93] border-[#8E8E93]/20', label: 'Đã kết thúc', icon: <CheckCircle2 className="w-3 h-3 mr-1" /> };
      default:
        return { bg: 'bg-[#007AFF]/10 text-[#007AFF] border-[#007AFF]/20', label: 'Sắp diễn ra', icon: <Calendar className="w-3 h-3 mr-1" /> };
    }
  };

  const typeStyles = getTypeStyles(event.type);
  const statusStyles = getStatusStyles(event.status);

  // Định dạng ngày giờ hiển thị
  const formatEventTime = (startStr: string, endStr: string) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleTimeString('vi-VN', timeOptions)} - ${end.toLocaleTimeString('vi-VN', timeOptions)} | ${start.toLocaleDateString('vi-VN', dateOptions)}`;
    }
    return `${start.toLocaleDateString('vi-VN', dateOptions)} - ${end.toLocaleDateString('vi-VN', dateOptions)}`;
  };

  return (
    <div className="p-6 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl shadow-sm dark:shadow-xl transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between space-y-4 relative overflow-hidden group">
      
      {/* Cạnh biên hiển thị loại sự kiện */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: typeStyles.color }} />

      <div className="space-y-3 pl-1.5">
        <div className="flex justify-between items-start">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${typeStyles.bg}`}>
            {event.type}
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusStyles.bg}`}>
            {statusStyles.icon}
            {statusStyles.label}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white tracking-tight leading-snug line-clamp-1 group-hover:text-[#007AFF] transition-colors">
            {event.title}
          </h3>
          <p className="text-xs text-[#8E8E93] mt-1.5 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Thông tin metadata địa điểm & người tham dự */}
      <div className="pt-3 border-t border-[#E5E5EA]/50 dark:border-[#2C2C2E]/40 text-xs text-[#8E8E93] space-y-2 pl-1.5">
        <div className="flex items-center">
          <Clock className="w-3.5 h-3.5 mr-2 text-[#8E8E93]" />
          <span className="font-mono">{formatEventTime(event.startDate, event.endDate)}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-3.5 h-3.5 mr-2 text-[#8E8E93]" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="w-3.5 h-3.5 mr-2 text-[#8E8E93]" />
            <span>Quy mô dự kiến:</span>
          </div>
          <span className="font-bold text-[#1C1C1E] dark:text-white bg-[#F2F2F7] dark:bg-[#2C2C2E] px-2 py-0.5 rounded-md text-[11px]">
            {event.attendeesCount} người
          </span>
        </div>
      </div>
    </div>
  );
};