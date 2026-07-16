// components/payroll/PayrollTable.tsx
'use client';

import React from 'react';
import { PayrollRecord } from '@/services/payroll.service';
import { PayrollRow } from './PayrollRow';

interface PayrollTableProps {
  payrolls: PayrollRecord[];
  formatCurrency: (amount: number) => string;
}

export const PayrollTable = ({ payrolls, formatCurrency }: PayrollTableProps) => {
  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-[#E5E5EA] dark:border-[#2C2C2E] overflow-hidden shadow-sm dark:shadow-2xl transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E5EA] dark:border-[#2C2C2E] text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider bg-[#F2F2F7] dark:bg-[#1C1C1E] transition-colors">
              <th className="p-4 pl-6">Mã NV</th>
              <th className="p-4">Nhân sự</th>
              <th className="p-4 text-right">Lương cơ bản</th>
              <th className="p-4 text-right">Cộng (Phụ cấp + Thưởng)</th>
              <th className="p-4 text-right">Trừ (Bảo hiểm + Thuế)</th>
              <th className="p-4 text-right">Thực lĩnh (NET)</th>
              <th className="p-4 pr-6 text-right">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-[#E5E5EA]/60 dark:divide-[#2C2C2E]/50 text-[#1C1C1E] dark:text-[#F2F2F7] transition-colors">
            {payrolls.length > 0 ? (
              payrolls.map((row) => (
                <PayrollRow 
                  key={row.id} 
                  row={row} 
                  formatCurrency={formatCurrency} 
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-xs text-[#8E8E93] font-medium">
                  Không tìm thấy dữ liệu bảng lương phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};