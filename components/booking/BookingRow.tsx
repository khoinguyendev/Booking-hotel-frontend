// components/booking/BookingRow.tsx
'use client';

import React from 'react';
import { BookingRecord, BookingStatus, PaymentStatus } from '@/services/booking.service';
import { User, BedDouble, CreditCard } from 'lucide-react';

interface BookingRowProps {
  row: BookingRecord;
  formatCurrency: (amount: number) => string;
  formatDateTime: (dateTimeStr: string) => string;
}

export const BookingRow = ({ row, formatCurrency, formatDateTime }: BookingRowProps) => {
  return (
    <tr className="hover:bg-[#F2F2F7]/50 dark:hover:bg-[#2C2C2E]/40 transition-colors duration-200">
      {/* Mã Booking */}
      <td className="p-4 pl-6">
        <span className="font-mono text-xs font-semibold text-[#007AFF] bg-[#007AFF]/10 px-2 py-1 rounded-md">
          {row.bookingCode}
        </span>
      </td>
      
      {/* Khách hàng */}
      <td className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-[#2C2C2E] flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-[#8E8E93]" />
          </div>
          <div>
            <p className="font-semibold text-current">{row.customerName}</p>
            <p className="text-[10px] text-[#8E8E93]">{row.customerEmail}</p>
          </div>
        </div>
      </td>

      {/* Phòng */}
      <td className="p-4">
        <div className="flex items-center space-x-1.5">
          <BedDouble className="w-4 h-4 text-[#5856D6]" />
          <div>
            <span className="font-bold text-current">{row.roomNumber}</span>
            <span className="text-xs text-[#8E8E93] ml-1.5">({row.roomType})</span>
          </div>
        </div>
      </td>

      {/* Checkin / Checkout */}
      <td className="p-4 text-xs">
        <div className="space-y-0.5">
          <p className="text-emerald-500 dark:text-emerald-400 font-mono">In: {formatDateTime(row.checkin)}</p>
          <p className="text-rose-500 dark:text-rose-400 font-mono">Out: {formatDateTime(row.checkout)}</p>
        </div>
      </td>

      {/* Tổng tiền */}
      <td className="p-4 text-right font-mono font-bold text-current">
        {formatCurrency(row.total)}
      </td>

      {/* Trạng thái Thanh Toán */}
      <td className="p-4">
        <div className="flex justify-center">
          <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
            row.paymentStatus === PaymentStatus.Paid 
              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
              : row.paymentStatus === PaymentStatus.PartiallyPaid 
              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
              : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
          }`}>
            <CreditCard className="w-3 h-3 mr-0.5" />
            {row.paymentStatus === PaymentStatus.Paid ? 'Đã thanh toán' : row.paymentStatus === PaymentStatus.PartiallyPaid ? 'Một phần' : 'Chưa thanh toán'}
          </span>
        </div>
      </td>

      {/* Trạng thái Đặt Phòng */}
      <td className="p-4 pr-6 text-right">
        <span className="inline-flex items-center space-x-1.5 text-xs font-semibold">
          <span className={`w-2 h-2 rounded-full ${
            row.status === BookingStatus.Pending ? 'bg-[#FF9500]' :
            row.status === BookingStatus.Confirmed ? 'bg-[#007AFF]' :
            row.status === BookingStatus.CheckedIn ? 'bg-[#34C759]' :
            row.status === BookingStatus.CheckedOut ? 'bg-[#8E8E93]' : 'bg-[#FF3B30]'
          }`} />
          <span>
            {row.status === BookingStatus.Pending ? 'Chờ duyệt' :
             row.status === BookingStatus.Confirmed ? 'Đã xác nhận' :
             row.status === BookingStatus.CheckedIn ? 'Đã check-in' :
             row.status === BookingStatus.CheckedOut ? 'Đã check-out' : 'Đã huỷ'}
          </span>
        </span>
      </td>
    </tr>
  );
};