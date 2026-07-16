// components/reports/ReportRow.tsx
'use client';

import React from 'react';
import { RevenueReport } from '@/services/report.service';
import { FileText, TrendingUp, ShieldCheck, Download, Calendar } from 'lucide-react';

interface ReportRowProps {
  row: RevenueReport;
  formatCurrency: (amount: number) => string;
}

export const ReportRow = ({ row, formatCurrency }: ReportRowProps) => {
  // Lấy kiểu dáng tương ứng với từng loại báo cáo
  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'Financial':
        return { bg: 'bg-[#34C759]/10 text-[#34C759]', label: 'Tài chính' };
      case 'Occupancy':
        return { bg: 'bg-[#007AFF]/10 text-[#007AFF]', label: 'Mật độ phòng' };
      default:
        return { bg: 'bg-[#5856D6]/10 text-[#5856D6]', label: 'Vận hành' };
    }
  };

  const typeConfig = getTypeConfig(row.type);

  // Định dạng hiển thị ngày tạo báo cáo
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <tr className="hover:bg-[#F2F2F7]/50 dark:hover:bg-[#2C2C2E]/40 transition-colors duration-200">
      {/* Mã số báo cáo */}
      <td className="p-4 pl-6">
        <span className="font-mono text-xs font-semibold text-[#8E8E93]">
          {row.id}
        </span>
      </td>
      
      {/* Tiêu đề & Loại báo cáo */}
      <td className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E] flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-[#8E8E93]" />
          </div>
          <div>
            <div className="font-semibold text-current leading-snug line-clamp-1">{row.title}</div>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${typeConfig.bg}`}>
                {typeConfig.label}
              </span>
              <span className="text-[10px] text-[#8E8E93] flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(row.createdDate)}
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Doanh thu gốc */}
      <td className="p-4 text-right font-mono text-xs text-[#8E8E93]">
        {formatCurrency(row.totalRevenue)}
      </td>

      {/* Phụ thu phát sinh */}
      <td className="p-4 text-right font-mono text-xs text-[#34C759]">
        +{formatCurrency(row.surcharge)}
      </td>

      {/* Hoàn trả phòng */}
      <td className="p-4 text-right font-mono text-xs text-[#FF3B30]">
        -{formatCurrency(row.refunds)}
      </td>

      {/* Thực thu thực tế (NET) */}
      <td className="p-4 text-right font-mono font-bold text-sm text-[#007AFF]">
        {formatCurrency(row.netIncome)}
      </td>

      {/* Điểm trùng khớp số liệu */}
      <td className="p-4">
        <div className="flex items-center justify-center space-x-1 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#34C759]" />
          <span className="font-mono">{row.accuracyScore.toFixed(2)}%</span>
        </div>
      </td>

      {/* Nút tác vụ tải về báo cáo */}
      <td className="p-4 pr-6 text-right">
        <button className="p-2 hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E] rounded-full transition-colors group">
          <Download className="w-4 h-4 text-[#8E8E93] group-hover:text-current transition-colors" />
        </button>
      </td>
    </tr>
  );
};