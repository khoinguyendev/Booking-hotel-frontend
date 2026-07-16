// components/attendance/ShiftCard.tsx
import React from 'react';
import { ShiftAllocation } from '@/services/attendance.service';
import { Clock, Users, CheckCircle2 } from 'lucide-react';

interface ShiftCardProps {
  shift: ShiftAllocation;
  // selectedEmployeeId bây giờ đóng vai trò là cờ đánh dấu (flag) 
  // xem ca trực này có thuộc về nhân viên đang được chọn hay không
  selectedEmployeeId?: string | null;
}

export const ShiftCard = ({ shift, selectedEmployeeId }: ShiftCardProps) => {
  // Thay đổi logic: Nếu selectedEmployeeId có giá trị (không null/undefined), 
  // tức là trang cha đã xác định nhân viên này thuộc bộ phận của ca trực.
  const isEmployeeAssigned = !!selectedEmployeeId;

  return (
    <div 
      className={`p-6 rounded-3xl shadow-sm dark:shadow-xl border transition-all duration-300 flex flex-col justify-between h-48 relative group overflow-hidden
        bg-white dark:bg-[#1C1C1E] 
        ${isEmployeeAssigned 
          ? 'border-[#007AFF] ring-1 ring-[#007AFF]/30 scale-[1.02]' 
          : 'border-[#E5E5EA] dark:border-[#2C2C2E] hover:scale-[1.01]'
        }`}
    >
      {/* Indicator màu ca trực ở đỉnh */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: shift.color }} />

      <div>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-60 dark:opacity-40" style={{ color: shift.color }}>
              {shift.department.split(' ')[0]}
            </span>
            <h3 className="text-lg font-bold tracking-tight mt-0.5 text-[#1C1C1E] dark:text-white">{shift.shiftName}</h3>
          </div>
          
          {/* Badge trạng thái ca trực */}
          {isEmployeeAssigned ? (
            <span className="flex items-center space-x-1 text-[10px] font-bold bg-[#007AFF]/10 text-[#007AFF] px-2.5 py-1 rounded-full animate-in fade-in duration-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Được phân ca</span>
            </span>
          ) : (
            <span className="text-[10px] font-mono font-medium text-[#8E8E93] bg-[#F2F2F7] dark:bg-[#2C2C2E] px-2 py-0.5 rounded-full transition-colors">
              {shift.id}
            </span>
          )}
        </div>
        
        {/* Khung hiển thị thời gian ca trực */}
        <p className="text-xs font-mono text-[#8E8E93] mt-4 flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1.5 stroke-[2] opacity-75" style={{ color: shift.color }} />
          <span className="w-1.5 h-1.5 rounded-full mr-2 animate-pulse" style={{ backgroundColor: shift.color }} />
          {shift.time}
        </p>
      </div>

      {/* Footer hiển thị số lượng nhân sự trực ca */}
      <div className="flex justify-between items-center pt-3 border-t border-[#E5E5EA] dark:border-[#2C2C2E]/60 text-xs transition-colors">
        <span className="text-[#8E8E93] flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-[#8E8E93] group-hover:text-current transition-colors" />
          Nhân sự trực ca này
        </span>
        <span className={`font-semibold px-3 py-1 rounded-full text-[11px] transition-colors ${
          isEmployeeAssigned 
            ? 'bg-[#007AFF] text-white' 
            : 'text-[#1C1C1E] dark:text-white bg-[#F2F2F7] dark:bg-[#2C2C2E]'
        }`}>
          {shift.staffCount} Thành viên
        </span>
      </div>
    </div>
  );
};