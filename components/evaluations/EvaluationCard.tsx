// components/evaluations/EvaluationCard.tsx
'use client';

import React from 'react';
import { EvaluationRecord } from '@/services/evaluation.service';
import { Star, Award, Clock, Target } from 'lucide-react';

interface EvaluationCardProps {
  data: EvaluationRecord;
}

export const EvaluationCard = ({ data }: EvaluationCardProps) => {
  // Trả về màu chủ đạo theo phân loại xếp hạng
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Excellent':
        return { text: 'text-[#34C759]', bg: 'bg-[#34C759]/10', border: 'border-[#34C759]/20', label: 'Xuất sắc' };
      case 'Good':
        return { text: 'text-[#007AFF]', bg: 'bg-[#007AFF]/10', border: 'border-[#007AFF]/20', label: 'Tốt' };
      case 'Average':
        return { text: 'text-[#FF9500]', bg: 'bg-[#FF9500]/10', border: 'border-[#FF9500]/20', label: 'Trung bình' };
      default:
        return { text: 'text-[#FF3B30]', bg: 'bg-[#FF3B30]/10', border: 'border-[#FF3B30]/20', label: 'Cần cải thiện' };
    }
  };

  const statusStyle = getStatusStyle(data.status);

  return (
    <div className="p-6 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl shadow-sm dark:shadow-xl transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between space-y-6">
      
      {/* Khối Header Card */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#E5E5EA] dark:bg-[#2C2C2E] flex items-center justify-center font-bold text-sm text-[#1C1C1E] dark:text-[#F2F2F7]">
            {data.avatar}
          </div>
          <div>
            <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white tracking-tight">{data.name}</h3>
            <p className="text-[11px] text-[#8E8E93]">{data.department}</p>
          </div>
        </div>
        
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
          {statusStyle.label}
        </span>
      </div>

      {/* Điểm Đánh Giá & Số Sao */}
      <div className="flex items-center space-x-3 bg-[#F2F2F7] dark:bg-[#000000]/40 p-3 rounded-2xl">
        <div className="flex items-center text-[#FFCC00]">
          <Star className="w-5 h-5 fill-current" />
          <span className="ml-1.5 text-lg font-black text-[#1C1C1E] dark:text-white font-mono">{data.rating.toFixed(1)}</span>
          <span className="text-xs text-[#8E8E93] ml-0.5">/5</span>
        </div>
        
        <div className="h-6 w-[1px] bg-[#E5E5EA] dark:bg-[#2C2C2E]" />
        
        {/* Điểm thành phần */}
        <div className="flex-1 grid grid-cols-2 gap-2 text-center">
          <div className="flex items-center justify-center space-x-1">
            <Clock className="w-3 h-3 text-[#34C759]" />
            <span className="text-[11px] font-mono font-bold text-[#8E8E93]">Chuyên cần:</span>
            <span className="text-[11px] font-mono font-bold text-[#1C1C1E] dark:text-white">{data.attendanceScore}</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <Target className="w-3 h-3 text-[#007AFF]" />
            <span className="text-[11px] font-mono font-bold text-[#8E8E93]">KPI:</span>
            <span className="text-[11px] font-mono font-bold text-[#1C1C1E] dark:text-white">{data.kpiScore}</span>
          </div>
        </div>
      </div>

      {/* Lời Nhận Xét Phản Hồi */}
      <div className="text-xs text-[#8E8E93] italic leading-relaxed border-t border-[#E5E5EA]/50 dark:border-[#2C2C2E]/40 pt-4 flex-1">
        "{data.feedback}"
      </div>
    </div>
  );
};