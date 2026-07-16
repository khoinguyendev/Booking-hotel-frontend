// components/attendance/AttendanceFilter.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Search, Calendar, ChevronDown } from 'lucide-react';

interface AttendanceFilterProps {
  onSearch: (value: string) => void;
  onDepartmentChange: (dept: string) => void;
  onDateChange: (date: string) => void;
}

const DEPARTMENTS = [
  { label: 'Tất cả', value: 'All' },
  { label: 'Lễ tân', value: 'Front Office' },
  { label: 'Buồng phòng', value: 'Housekeeping' },
  { label: 'Ẩm thực', value: 'F&B' },
  { label: 'Kỹ thuật', value: 'Engineering' }
];

export const AttendanceFilter = ({ 
  onSearch, 
  onDepartmentChange, 
  onDateChange 
}: AttendanceFilterProps) => {
  const [activeDept, setActiveDept] = useState('All');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Dùng ref để kích hoạt trình chọn ngày ẩn
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDeptSelect = (value: string) => {
    setActiveDept(value);
    onDepartmentChange(value);
  };

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedDate(val);
    onDateChange(val);
  };

  const triggerDatePicker = () => {
    if (dateInputRef.current) {
      // Kích hoạt giao diện chọn ngày của hệ điều hành một cách tự nhiên
      try {
        dateInputRef.current.showPicker();
      } catch (err) {
        dateInputRef.current.click();
      }
    }
  };

  // Hàm helper định dạng ngày hiển thị chuẩn Apple mượt mà
  const formatDisplayDate = (dateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    const yesterdayObj = new Date();
    yesterdayObj.setDate(yesterdayObj.getDate() - 1);
    const yesterday = yesterdayObj.toISOString().split('T')[0];

    if (dateStr === today) return 'Hôm nay';
    if (dateStr === yesterday) return 'Hôm qua';

    // Định dạng dạng "Ngày 16 Tháng 07, 2026"
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full transition-colors duration-300">
      
      {/* Khối bên trái: Tìm kiếm & Lọc Ngày Custom */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        {/* Ô Tìm kiếm Spotlight */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#8E8E93]" />
          <input 
            type="text" 
            placeholder="Tìm kiếm nhân viên" 
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full placeholder-[#8E8E93] border border-transparent focus:outline-none transition-all duration-200
              bg-[#E5E5EA] dark:bg-[#1C1C1E] text-[#1C1C1E] dark:text-white focus:bg-[#D1D1D6] dark:focus:bg-[#2C2C2E]"
          />
        </div>

        {/* Ô Lọc Ngày Custom Apple Style */}
        <div className="relative w-full sm:w-auto">
          {/* Nút bấm hiển thị thay thế mặt kính mờ */}
          <button
            onClick={triggerDatePicker}
            className="w-full sm:w-auto flex items-center justify-between bg-[#E5E5EA] dark:bg-[#1C1C1E] hover:bg-[#D1D1D6] dark:hover:bg-[#2C2C2E] rounded-full px-4 py-2 transition-all duration-200 active:scale-95 text-xs font-semibold text-[#1C1C1E] dark:text-white select-none cursor-pointer"
          >
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-[#007AFF] mr-2 flex-shrink-0" />
              <span>{formatDisplayDate(selectedDate)}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#8E8E93] ml-2 flex-shrink-0" />
          </button>

          {/* Ô Input Date thật được ẩn đi hoàn toàn một cách thông minh */}
          <input 
            ref={dateInputRef}
            type="date" 
            value={selectedDate}
            onChange={handleDateSelect}
            className="absolute inset-0 opacity-0 w-0 h-0 pointer-events-none"
          />
        </div>
      </div>
      
      {/* Khối bên phải: Bộ chọn phòng ban (Segmented Control phong cách iOS) */}
      <div className="flex items-center space-x-1 p-0.5 bg-[#E5E5EA] dark:bg-[#1C1C1E] rounded-full w-full lg:w-auto overflow-x-auto scrollbar-none transition-colors">
        {DEPARTMENTS.map((dept) => {
          const isActive = activeDept === dept.value;
          return (
            <button
              key={dept.value}
              onClick={() => handleDeptSelect(dept.value)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm font-semibold'
                  : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              {dept.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};