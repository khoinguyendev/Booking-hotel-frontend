// app/admin/attendance/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { AttendanceFilter, AttendanceTable } from '@/components/attendance';
import { getMockAttendanceData, AttendanceRecord } from '@/services/attendance.service';
import {staffService} from '@/services/staft.service';
import { HotelStaff } from '@/types/staff';
import { StaffTable } from '@/components/staff/StaffTable';
export default function AttendancePage() {
  // const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
const [loading, setLoading] = useState(false);
const [employees, setEmployees] = useState<HotelStaff[]>([]);

useEffect(() => {
    const fetchEmployees = async () => {
        try {
            setLoading(true);

            const response = await staffService.getEmployee();
            console.log('Fetched employees:', response); // ✅ Kiểm tra dữ liệu nhân viên
            setEmployees(response.data.data.items); // ✅ Đúng
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    fetchEmployees();
}, []);

  // // Xử lý logic lọc đa điều kiện cùng lúc (Tên/Mã + Phòng ban + Ngày nếu có trong cấu trúc dữ liệu thực tế)
  // // const filteredRecords = records.filter(rec => {
  // //   const matchQuery = rec.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
  // //                      rec.id.toLowerCase().includes(searchQuery.toLowerCase());
    
  // //   const matchDept = selectedDept === 'All' || rec.department.includes(selectedDept);
    
  // //   // Tạm thời mockup lọc theo query & dept, khi có data backend bạn chỉ việc thêm logic lọc theo ngày:
  // //   return matchQuery && matchDept;
  // });

  return (
    <div className="space-y-6 bg-[#F2F2F7] dark:bg-[#000000] min-h-full p-4 sm:p-6 text-[#1C1C1E] dark:text-white font-sans antialiased transition-colors duration-300">
      <div className="flex flex-col space-y-1">
        <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-widest">Hệ thống giám sát</span>
        <h1 className="text-3xl font-black tracking-tight text-current">Danh
            sách nhân viên</h1>
      </div>
      
      {/* Truyền đầy đủ các callback lọc */}
      <AttendanceFilter 
        onSearch={setSearchQuery} 
        onDepartmentChange={setSelectedDept}
        onDateChange={setSelectedDate}
      />
      
      <StaffTable records={employees} />
    </div>
  );
}