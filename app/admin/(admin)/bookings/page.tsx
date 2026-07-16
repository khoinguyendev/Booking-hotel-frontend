// app/admin/booking/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { getMockBookings, BookingRecord, BookingStatus } from '@/services/booking.service';
import { BookingFilter } from '@/components/booking/BookingFilter';
import { BookingTable } from '@/components/booking/BookingTable';
import { Plus } from 'lucide-react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | BookingStatus>('All');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setBookings(getMockBookings());
  }, []);

  // Bộ lọc đa điều kiện đồng thời
  const filteredBookings = bookings.filter((item) => {
    const matchQuery = 
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = selectedStatus === 'All' || item.status === selectedStatus;
    
    // Tích hợp logic lọc theo ngày lưu trú (ví dụ: ngày chọn phải nằm giữa Checkin và Checkout)
    const filterDate = new Date(selectedDate).setHours(0,0,0,0);
    const checkinDate = new Date(item.checkin).setHours(0,0,0,0);
    const checkoutDate = new Date(item.checkout).setHours(0,0,0,0);
    
    const matchDate = filterDate >= checkinDate && filterDate <= checkoutDate;

    return matchQuery && matchStatus && matchDate;
  });

  // Helper định dạng tiền tệ bảo lưu 2 chữ số thập phân (Không làm tròn)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Helper định dạng ngày tháng hiển thị
  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 bg-[#F2F2F7] dark:bg-[#000000] min-h-full p-4 sm:p-6 text-[#1C1C1E] dark:text-white font-sans antialiased transition-colors duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-widest">Phân hệ lễ tân</span>
          <h1 className="text-3xl font-black tracking-tight text-current">Danh Sách Đặt Phòng</h1>
        </div>
        
        <button className="flex items-center space-x-1.5 px-4 py-2.5 bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-xs text-white font-semibold rounded-full shadow-lg transition-all duration-200">
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Tạo đặt phòng</span>
        </button>
      </div>

      {/* Filter Component */}
      <BookingFilter 
        onSearch={setSearchQuery}
        onStatusChange={setSelectedStatus}
        onDateChange={setSelectedDate}
      />

      {/* Table Component */}
      <BookingTable 
        bookings={filteredBookings}
        formatCurrency={formatCurrency}
        formatDateTime={formatDateTime}
      />
    </div>
  );
}