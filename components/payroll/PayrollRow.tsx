// components/payroll/PayrollRow.tsx
'use client';

import React from 'react';
import { PayrollRecord } from '@/services/payroll.service';
import { CreditCard, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';

interface PayrollRowProps {
  row: PayrollRecord;
  formatCurrency: (amount: number) => string;
}

export const PayrollRow = ({ row, formatCurrency }: PayrollRowProps) => {
  // Lấy kiểu dáng trạng thái thanh toán
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Paid':
        return {
          bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
          label: 'Đã chi trả',
          icon: <CheckCircle2 className="w-3 h-3 mr-1" />
        };
      case 'Processing':
        return {
          bg: 'bg-[#007AFF]/10 text-[#007AFF] border-[#007AFF]/20',
          label: 'Đang xử lý',
          icon: <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
        };
      default:
        return {
          bg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
          label: 'Tạm giữ',
          icon: <AlertCircle className="w-3 h-3 mr-1" />
        };
    }
  };

  const statusStyle = getStatusStyle(row.paymentStatus);

  return (
    <tr className="hover:bg-[#F2F2F7]/50 dark:hover:bg-[#2C2C2E]/40 transition-colors duration-200">
      {/* Mã NV */}
      <td className="p-4 pl-6 font-mono text-xs text-[#8E8E93]">{row.id}</td>
      
      {/* Nhân sự */}
      <td className="p-4">
        <div className="font-semibold text-current">{row.name}</div>
        <div className="text-[10px] text-[#8E8E93]">{row.department}</div>
      </td>
      
      {/* Lương Cơ Bản */}
      <td className="p-4 text-right font-mono text-xs text-[#8E8E93]">
        {formatCurrency(row.baseSalary)}
      </td>
      
      {/* Phụ cấp & Thưởng */}
      <td className="p-4 text-right font-mono text-xs text-emerald-500 dark:text-emerald-400">
        +{formatCurrency(row.allowance + row.bonus)}
      </td>
      
      {/* Khấu trừ & Thuế */}
      <td className="p-4 text-right font-mono text-xs text-rose-500 dark:text-rose-400">
        -{formatCurrency(row.deductions + row.tax)}
      </td>
      
      {/* Thực Lĩnh (Net) */}
      <td className="p-4 text-right font-mono font-bold text-sm text-current">
        {formatCurrency(row.netSalary)}
      </td>
      
      {/* Trạng thái giao dịch */}
      <td className="p-4 pr-6">
        <div className="flex justify-end">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusStyle.bg}`}>
            {statusStyle.icon}
            {statusStyle.label}
          </span>
        </div>
      </td>
    </tr>
  );
};