// app/admin/attendance/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

import EditShiftModal from '@/components/attendance/EditShiftModal';

import { useShift } from "@/hooks/useShift";
import {
  getMockAttendanceData,
  AttendanceRecord,
} from '@/services/attendance.service';
import {
  CalendarClock,
  Layers,
  Plus,
  CalendarDays,
} from 'lucide-react';
import { Shift } from '@/types/shift';
import { AttendanceFilter, AttendanceTable, ShiftCard } from '@/components/attendance';
import { AddShiftModal } from '@/components/attendance/AddShiftModal';

export default function CombinedAttendancePage() {
  // --- TRẠNG THÁI CHUYỂN TAB CỤC BỘ ---
  const [activeTab, setActiveTab] = useState<'records' | 'shifts'>('records');

  // --- DATA STATES (Chấm công) ---
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  // --- FILTER STATES (Chấm công) ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // --- MODAL & SHIFT STATES (Phân ca) ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  // Hook quản lý ca trực
  const {
    shifts,
    loading: loadingShifts,
    fetchShifts,
    removeShift,
  } = useShift();

  useEffect(() => {
    setRecords(getMockAttendanceData());
  }, []);

  // --- XỬ LÝ LOGIC LỌC BẢNG CHẤM CÔNG ---
  const filteredRecords = records.filter(rec => {
    const matchQuery =
      rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = selectedDept === 'All' || rec.department.includes(selectedDept);
    return matchQuery && matchDept;
  });

  return (
    <div className="space-y-6 bg-[#F2F2F7] dark:bg-[#000000] min-h-full p-4 sm:p-6 text-[#1C1C1E] dark:text-white font-sans antialiased transition-colors duration-300">

      {/* 1. HEADER DỰA TRÊN TAB ĐANG CHỌN */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-widest">
            Hệ thống quản lý nhân sự
          </span>
          <h1 className="text-3xl font-black tracking-tight text-current">
            {activeTab === 'records' ? 'Nhật ký Chấm công' : 'Sơ đồ Phân ca'}
          </h1>
        </div>

        {/* Nút Thêm ca trực (Chỉ hiển thị ở tab Phân ca) */}
        {activeTab === 'shifts' && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-xs text-white font-semibold rounded-full shadow-lg shadow-[#007AFF]/20 transition-all duration-200 animate-in fade-in"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Thêm ca trực</span>
          </button>
        )}
      </div>

      {/* 2. THANH CHUYỂN TAB ĐỒNG BỘ (Segmented Control) */}
      <div className="flex p-1 bg-[#E5E5EA] dark:bg-[#1C1C1E] rounded-2xl w-full sm:w-80">
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'records'
              ? 'bg-white dark:bg-[#2C2C2E] text-[#007AFF] shadow-sm'
              : 'text-[#8E8E93] hover:text-current'
          }`}
        >
          <CalendarClock className="w-4 h-4" />
          <span>Chấm công</span>
        </button>
        <button
          onClick={() => setActiveTab('shifts')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'shifts'
              ? 'bg-white dark:bg-[#2C2C2E] text-[#007AFF] shadow-sm'
              : 'text-[#8E8E93] hover:text-current'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Sơ đồ phân ca</span>
        </button>
      </div>

      {/* 3. HIỂN THỊ NỘI DUNG THEO TAB (IF / ELSE RENDER) */}
      {activeTab === 'records' ? (
        /* ================= TAB 1: GIAO DIỆN CHẤM CÔNG ================= */
        <div className="space-y-6 animate-in fade-in duration-300">
          <AttendanceFilter
            onSearch={setSearchQuery}
            onDepartmentChange={setSelectedDept}
            onDateChange={setSelectedDate}
          />
          <AttendanceTable records={filteredRecords} />
        </div>
      ) : (
        /* ================= TAB 2: GIAO DIỆN SƠ ĐỒ PHÂN CA ================= */
        <div className="space-y-6 animate-in fade-in duration-300">

          {/* Render danh sách thẻ ca trực hoặc Skeleton loading */}
          {loadingShifts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-44 rounded-3xl bg-white/60 dark:bg-[#1C1C1E]/60 border border-[#E5E5EA] dark:border-[#2C2C2E] p-5 animate-pulse flex flex-col justify-between"
                >
                  <div className="h-5 bg-slate-200 dark:bg-[#2C2C2E] rounded-md w-1/2" />
                  <div className="h-4 bg-slate-200 dark:bg-[#2C2C2E] rounded-md w-3/4" />
                  <div className="h-8 bg-slate-200 dark:bg-[#2C2C2E] rounded-xl w-full" />
                </div>
              ))}
            </div>
          ) : shifts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shifts.map((shift) => (
                <ShiftCard
                  key={shift.id}
                  shift={shift}
                  onEdit={(selected) => {
                    setSelectedShift(selected);
                    setOpenEditModal(true);
                  }}
                  onDelete={async (selected) => {
                    if (
                      !window.confirm(
                        `Bạn có chắc chắn muốn xóa ca trực "${selected.name}"?`
                      )
                    )
                      return;

                    await removeShift(selected.id);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] text-center space-y-2">
              <CalendarDays className="w-10 h-10 text-[#8E8E93] stroke-[1.5]" />
              <h3 className="text-sm font-bold text-current">Trống sơ đồ phân ca</h3>
              <p className="text-xs text-[#8E8E93]">Hệ thống chưa ghi nhận cấu hình ca trực nào.</p>
            </div>
          )}

          {/* Modal Thêm ca trực */}
          <AddShiftModal
            isOpen={isAddModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
              fetchShifts();
            }}
          />

          {/* Modal Chỉnh sửa ca trực */}
          <EditShiftModal
            open={openEditModal}
            shift={selectedShift}
            onClose={() => {
              setOpenEditModal(false);
              setSelectedShift(null);
            }}
            onSuccess={fetchShifts}
          />
        </div>
      )}
    </div>
  );
}