// components/attendance/ShiftCard.tsx
import React from "react";
import { Shift } from "@/types/shift";
import {
  Clock,
  CheckCircle2,
  Layers,
  Pencil,
  Trash2,
} from "lucide-react";

interface ShiftCardProps {
  shift: Shift;
  selectedEmployeeId?: string | null;
  onEdit?: (shift: Shift) => void;
  onDelete?: (shift: Shift) => void;
}

const GET_SHIFT_THEME = (id: number) => {
  const themes = [
    { color: '#7C3AED', bg: 'bg-violet-500/5' }, 
    { color: '#10B981', bg: 'bg-emerald-500/5' }, 
    { color: '#3B82F6', bg: 'bg-blue-500/5' }, 
    { color: '#F59E0B', bg: 'bg-amber-500/5' }, 
  ];
  return themes[id % themes.length];
};

export const ShiftCard = ({
  shift,
  selectedEmployeeId,
  onEdit,
  onDelete,
}: ShiftCardProps) => {
  const isEmployeeAssigned = !!selectedEmployeeId;
  const theme = GET_SHIFT_THEME(shift.id);

  return (
    <div
      className={`p-6 rounded-3xl shadow-sm dark:shadow-xl border transition-all duration-300 flex flex-col justify-between h-44 relative group overflow-hidden
        bg-white dark:bg-[#1C1C1E]
        ${isEmployeeAssigned
          ? "border-[#007AFF] ring-1 ring-[#007AFF]/30 scale-[1.02]"
          : "border-[#E5E5EA] dark:border-[#2C2C2E] hover:scale-[1.01] hover:shadow-md"
        }`}
    >
      {/* Thanh Bar chỉ thị màu sắc ở đỉnh thẻ */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ backgroundColor: theme.color }}
      />

      {/* Phần Nội Dung Trên */}
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-0.5 min-w-0 flex-1">
            <span
              className="text-[9px] font-black tracking-widest uppercase opacity-60 dark:opacity-50 block"
              style={{ color: theme.color }}
            >
              Hệ thống khách sạn
            </span>
            <h3 className="text-base font-extrabold tracking-tight text-[#1C1C1E] dark:text-white group-hover:text-[#007AFF] transition-colors line-clamp-1">
              {shift.name}
            </h3>
          </div>

          {/* Cụm Badge & Nút Hành Động Trượt Mượt Mà */}
          <div className="relative h-7 flex items-center justify-end min-w-[90px]">
            
            {/* Khối Badge (Ẩn dần và thu nhỏ khi hover) */}
            <div className="transition-all duration-300 transform group-hover:opacity-0 group-hover:scale-75 origin-right">
              {isEmployeeAssigned ? (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-[#007AFF]/10 text-[#007AFF] px-2.5 py-1 rounded-full whitespace-nowrap">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Được phân ca</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono font-bold text-[#8E8E93] bg-[#F2F2F7] dark:bg-[#2C2C2E] px-2 py-1 rounded-full whitespace-nowrap">
                  ID: {shift.id}
                </span>
              )}
            </div>

            {/* Khối Actions (Trượt từ phải sang và mờ dần vào vị trí) */}
            <div className="absolute top-0 right-0 flex gap-1.5 opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
              <button
                onClick={() => onEdit?.(shift)}
                className="w-7 h-7 rounded-full bg-[#F2F2F7] hover:bg-[#E5E5EA] dark:bg-[#2C2C2E] dark:hover:bg-[#3A3A3C] text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors active:scale-90"
                title="Chỉnh sửa"
              >
                <Pencil className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <button
                onClick={() => onDelete?.(shift)}
                className="w-7 h-7 rounded-full bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center transition-all active:scale-90"
                title="Xóa ca trực"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Phần Chân Thẻ */}
      <div className="flex justify-between items-center pt-3 border-t border-[#E5E5EA] dark:border-[#2C2C2E]/60">
        <div className="flex items-center text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
          <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500 group-hover:rotate-12 transition-transform duration-300" />
          <span>{shift.startTime.slice(0, 5)} - {shift.endTime.slice(0, 5)}</span>
        </div>

        <div className={`p-1.5 rounded-xl ${theme.bg} transition-colors`}>
          <Layers className="w-3.5 h-3.5" style={{ color: theme.color }} />
        </div>
      </div>
    </div>
  );
};