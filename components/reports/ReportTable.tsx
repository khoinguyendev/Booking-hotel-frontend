// components/reports/ReportTable.tsx
'use client';

import React from 'react';
import { RevenueReport } from '@/services/report.service';
import { ReportRow } from './ReportRow';

interface ReportTableProps {
  reports: RevenueReport[];
  formatCurrency: (amount: number) => string;
}

export const ReportTable = ({ reports, formatCurrency }: ReportTableProps) => {
  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-[#E5E5EA] dark:border-[#2C2C2E] overflow-hidden shadow-sm dark:shadow-2xl transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E5EA] dark:border-[#2C2C2E] text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider bg-[#F2F2F7] dark:bg-[#1C1C1E] transition-colors">
              <th className="p-4 pl-6">Mã báo cáo</th>
              <th className="p-4">Tên báo cáo</th>
              <th className="p-4 text-right">Tiền phòng</th>
              <th className="p-4 text-right">Phụ thu dịch vụ</th>
              <th className="p-4 text-right">Hoàn tiền hủy</th>
              <th className="p-4 text-right text-[#007AFF]">Tổng thu nhập (NET)</th>
              <th className="p-4 text-center">Độ chuẩn khớp</th>
              <th className="p-4 pr-6 text-right">Tải về</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-[#E5E5EA]/60 dark:divide-[#2C2C2E]/50 text-[#1C1C1E] dark:text-[#F2F2F7] transition-colors">
            {reports.length > 0 ? (
              reports.map((row) => (
                <ReportRow 
                  key={row.id} 
                  row={row} 
                  formatCurrency={formatCurrency} 
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-xs text-[#8E8E93] font-medium">
                  Không tìm thấy hồ sơ báo cáo nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};