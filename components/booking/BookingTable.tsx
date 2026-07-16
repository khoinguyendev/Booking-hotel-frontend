// components/booking/BookingTable.tsx
'use client';

import React from 'react';
import { BookingRecord } from '@/services/booking.service';
import { BookingRow } from './BookingRow';

interface BookingTableProps {
  bookings: BookingRecord[];
  formatCurrency: (amount: number) => string;
  formatDateTime: (dateTimeStr: string) => string;
}

export const BookingTable = ({ bookings, formatCurrency, formatDateTime }: BookingTableProps) => {
  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-[#E5E5EA] dark:border-[#2C2C2E] overflow-hidden shadow-sm dark:shadow-2xl transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E5EA] dark:border-[#2C2C2E] text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider bg-[#F2F2F7] dark:bg-[#1C1C1E] transition-colors">
              <th className="p-4 pl-6">Mã đặt phòng</th>
              <th className="p-4">Khách hàng</th>
              <th className="p-4">Thông tin phòng</th>
              <th className="p-4">Thời gian lưu trú</th>
              <th className="p-4 text-right">Tổng tiền (VNĐ)</th>
              <th className="p-4 text-center">Thanh toán</th>
              <th className="p-4 pr-6 text-right">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-[#E5E5EA]/60 dark:divide-[#2C2C2E]/50 text-[#1C1C1E] dark:text-[#F2F2F7] transition-colors">
            {bookings.length > 0 ? (
              bookings.map((row) => (
                <BookingRow 
                  key={row.id} 
                  row={row} 
                  formatCurrency={formatCurrency}
                  formatDateTime={formatDateTime}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-xs text-[#8E8E93] font-medium">
                  Không tìm thấy thông tin đặt phòng nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};