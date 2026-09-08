// components/hotel-console/SurchargeTable.tsx
'use client';

import React from 'react';
import { DollarSign } from 'lucide-react';
import { AmountType, SurchargeStatus, HotelSurcharge } from '@/services/hotel-console.service';

export const SurchargeTable = ({ surcharges }: { surcharges: HotelSurcharge[] }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] p-6 space-y-6 shadow-sm">
      <h2 className="text-lg font-bold flex items-center gap-2 border-b border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60 pb-4">
        <DollarSign className="w-5 h-5 text-[#34C759]" />
        Thiết lập phụ thu khách sạn
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="text-[#8E8E93] font-semibold border-b border-[#E5E5EA] dark:border-[#2C2C2E] pb-2">
              <th className="pb-3">Tên phụ thu / Loại</th>
              <th className="pb-3 text-center">Khung giờ áp dụng</th>
              <th className="pb-3 text-center">Khách duyệt trước</th>
              <th className="pb-3 text-right">Giá trị phụ thu</th>
              <th className="pb-3 pr-2 text-right">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5EA]/60 dark:divide-[#2C2C2E]/60">
            {surcharges.map((sur) => (
              <tr key={sur.id} className="hover:bg-[#F2F2F7]/30 dark:hover:bg-[#2C2C2E]/30 transition-colors">
                <td className="py-3">
                  <div className="font-bold text-current">{sur.name}</div>
                  <div className="text-[10px] text-[#8E8E93] mt-0.5">{sur.surchargeTypeName} ({sur.surchargeTypeCode})</div>
                </td>
                <td className="py-3 text-center font-mono text-[#8E8E93]">
                  {sur.startTime && sur.endTime ? `${sur.startTime} - ${sur.endTime}` : 'Không giới hạn'}
                </td>
                <td className="py-3 text-center">
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${
                    sur.isRequest ? 'bg-amber-500/10 text-amber-500' : 'bg-[#8E8E93]/10 text-[#8E8E93]'
                  }`}>
                    {sur.isRequest ? 'Bắt buộc' : 'Tự động'}
                  </span>
                </td>
                <td className="py-3 text-right font-mono font-bold text-sm">
                  {sur.amountType === AmountType.Percent ? (
                    <span className="text-[#007AFF]">{sur.amount.toFixed(2)}%</span>
                  ) : (
                    <span className="text-current">{formatCurrency(sur.amount)}</span>
                  )}
                </td>
                <td className="py-3 pr-2 text-right">
                  <span className={`inline-flex items-center w-2 h-2 rounded-full ${
                    sur.status === SurchargeStatus.Active ? 'bg-[#34C759]' : 'bg-[#FF3B30]'
                  }`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};