// app/admin/attendance/shifts/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShiftCard } from '@/components/attendance';
import { 
  getMockShiftsData, 
  getMockAttendanceData, 
  ShiftAllocation, 
  AttendanceRecord 
} from '@/services/attendance.service';
import { Plus, X, User } from 'lucide-react';

function ShiftsContent() {
  const [shifts, setShifts] = useState<ShiftAllocation[]>([]);
  const [employees, setEmployees] = useState<AttendanceRecord[]>([]);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const employeeId = searchParams.get('employeeId');

  useEffect(() => {
    setShifts(getMockShiftsData());
    setEmployees(getMockAttendanceData());
  }, []);

  // 1. Tìm thông tin nhân viên đang được lọc
  const selectedEmployee = employees.find(emp => emp.id === employeeId);

  const handleClearFilter = () => {
    router.push('/quan-ly/cham-cong/phan-ca');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-widest">Lịch trực khách sạn</span>
          <h1 className="text-3xl font-black tracking-tight text-current">Sơ đồ Phân ca</h1>
        </div>
        
        <button className="flex items-center space-x-1.5 px-4 py-2.5 bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-xs text-white font-semibold rounded-full shadow-lg transition-all duration-200">
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Thêm ca trực</span>
        </button>
      </div>

      {/* Banner thông báo lọc thông minh hiển thị tên thật của Nhân viên */}
      {selectedEmployee && (
        <div className="flex items-center justify-between p-4 bg-[#007AFF]/10 border border-[#007AFF]/20 text-sm text-[#007AFF] rounded-2xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center">
              <User className="w-3.5 h-3.5" />
            </div>
            <span>
              Đang xem lịch trực của: <strong className="font-bold">{selectedEmployee.name}</strong> ({selectedEmployee.id}) - Bộ phận: <span className="underline">{selectedEmployee.department}</span>
            </span>
          </div>
          <button 
            onClick={handleClearFilter}
            className="p-1 hover:bg-[#007AFF]/20 rounded-full transition-colors active:scale-90"
            title="Xem tất cả ca"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid danh sách ca trực */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shifts.map((shift) => {
          // 2. Tự động kiểm tra: Nếu ca trực trùng bộ phận với nhân sự đang chọn -> Highlight lên!
          const isEmployeeAssigned = selectedEmployee 
            ? shift.department.toLowerCase().trim() === selectedEmployee.department.toLowerCase().trim()
            : false;

          return (
            <ShiftCard 
              key={shift.id} 
              shift={shift} 
              // Truyền trạng thái highlight trực tiếp vào card mà không làm bẩn interface data gốc
              selectedEmployeeId={isEmployeeAssigned ? employeeId : null} 
            />
          );
        })}
      </div>
    </div>
  );
}

export default function ShiftsPage() {
  return (
    <Suspense fallback={<div className="text-xs text-[#8E8E93] p-6">Đang tải sơ đồ...</div>}>
      <ShiftsContent />
    </Suspense>
  );
}