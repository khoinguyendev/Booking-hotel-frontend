// components/kpi/KpiCard.tsx
'use client';

import React from 'react';
import { KpiRecord } from '@/services/kpi.service';
import { Target, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface KpiCardProps {
  kpi: KpiRecord;
}

export const KpiCard = ({ kpi }: KpiCardProps) => {
  // Lấy màu sắc trạng thái tiến độ chỉ tiêu
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Exceeded':
        return {
          bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
          barColor: 'bg-[#34C759]',
          label: 'Vượt chỉ tiêu',
          icon: <TrendingUp className="w-3.5 h-3.5" />
        };
      case 'OnTrack':
        return {
          bg: 'bg-[#007AFF]/10 text-[#007AFF] border-[#007AFF]/20',
          barColor: 'bg-[#007AFF]',
          label: 'Đúng tiến độ',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />
        };
      default:
        return {
          bg: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
          barColor: 'bg-[#FF3B30]',
          label: 'Chậm tiến độ',
          icon: <AlertCircle className="w-3.5 h-3.5" />
        };
    }
  };

  const statusConfig = getStatusConfig(kpi.status);

  // Định dạng hiển thị con số (Xử lý đơn vị VNĐ nếu có)
  const formatValue = (val: number, unit: string) => {
    if (unit === 'VNĐ') {
      return new Intl.NumberFormat('vi-VN').format(val) + ' đ';
    }
    return `${val} ${unit}`;
  };

  return (
    <div className="p-6 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl shadow-sm dark:shadow-xl transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between space-y-5">
      
      {/* Header Card */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#8E8E93]">{kpi.id}</span>
          <h3 className="font-bold text-base text-[#1C1C1E] dark:text-white tracking-tight mt-0.5">{kpi.name}</h3>
          <p className="text-[11px] text-[#8E8E93]">{kpi.department}</p>
        </div>
        
        <span className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusConfig.bg}`}>
          {statusConfig.icon}
          <span>{statusConfig.label}</span>
        </span>
      </div>

      {/* Nội dung chỉ tiêu KPI */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider block">Chỉ tiêu chính</span>
        <h4 className="text-sm font-semibold text-[#1C1C1E] dark:text-slate-200 leading-snug line-clamp-1">{kpi.kpiName}</h4>
      </div>

      {/* Tiến độ hoàn thành Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-xs text-[#8E8E93] flex items-center">
            <Target className="w-3.5 h-3.5 mr-1 text-[#007AFF] stroke-[2.5]" />
            Thực tế: <strong className="text-[#1C1C1E] dark:text-white ml-1 font-semibold">{formatValue(kpi.actual, kpi.unit)}</strong>
          </span>
          {/* Tỉ lệ phần trăm giữ nguyên 2 chữ số thập phân */}
          <span className="text-sm font-black font-mono text-[#1C1C1E] dark:text-white">
            {kpi.progress.toFixed(2)}%
          </span>
        </div>

        {/* Khung thanh tiến độ (Apple Glassmorphism Style) */}
        <div className="w-full h-2 bg-[#E5E5EA] dark:bg-[#2C2C2E] rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${statusConfig.barColor}`} 
            style={{ width: `${Math.min(kpi.progress, 100)}%` }} // Giới hạn đồ họa thanh tiến độ tối đa 100%
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-[#8E8E93] font-mono pt-0.5">
          <span>0%</span>
          <span>Chỉ tiêu: {formatValue(kpi.target, kpi.unit)}</span>
        </div>
      </div>
    </div>
  );
};