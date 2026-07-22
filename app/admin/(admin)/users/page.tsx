// app/admin/user/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
    Search, UserPlus, Mail, Phone, Calendar,
    Clock, ShieldAlert, CheckCircle2, XCircle, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { hotelStaffService } from "@/services/hotel-staff.service";
import { HotelStaff } from "@/types/hotel-staff";
import AddStaffModal from '@/components/users/AddStaffModal';

export default function AdminStaffManagementPage() {
    // --- GIỮ NGUYÊN HOÀN TOÀN LOGIC CŨ ---
    const [loading, setLoading] = useState(true);
    const [staffList, setStaffList] = useState<HotelStaff[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [openAddModal, setOpenAddModal] = useState(false);
    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            setLoading(true);

            const res = await hotelStaffService.getAll();

            setStaffList(res.data.data.items);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải danh sách nhân viên");
        } finally {
            setLoading(false);
        }
    };

    const filteredStaff = staffList.filter((staff) => {
        return (
            staff.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            staff.position.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // --- NÂNG CẤP GIAO DIỆN BADGE (GIỮ NGUYÊN LOGIC CONDITIONAL) ---
    const renderAttendanceBadge = (status?: string) => {
        switch (status) {
            case "Ontime":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" /> Đúng giờ
                    </span>
                );
            case "Late":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                        <ShieldAlert className="w-3 h-3" /> Đi muộn
                    </span>
                );
            case "Absent":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                        <XCircle className="w-3 h-3" /> Vắng
                    </span>
                );
            default:
                return (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        Chưa chấm công
                    </span>
                );
        }
    };

    if (loading) {
        return (
            <div className="h-[400px] flex flex-col justify-center items-center text-xs font-semibold text-[#8E8E93] space-y-2">
                <div className="w-6 h-6 rounded-full border-2 border-[#007AFF] border-t-transparent animate-spin" />
                <span>Đang tải dữ liệu nhân sự...</span>
            </div>
        );
    }

    // --- CẢI TIẾN FORM VÀ SỬA LỖI VỠ HTML Ở TABLE BODY ---
    return (
        <div className="space-y-6 bg-[#F2F2F7] dark:bg-[#000000] min-h-full p-4 sm:p-6 text-[#1C1C1E] dark:text-white font-sans antialiased transition-colors duration-300">

            <title>Quản lý Nhân sự | Hệ thống Admin</title>

            {/* 1. Header tiêu đề */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col space-y-1">
                    <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-widest">Phân hệ nhân sự</span>
                    <h1 className="text-3xl font-black tracking-tight text-current">Danh sách Nhân sự</h1>
                </div>

                <button
                    onClick={() => setOpenAddModal(true)}
                    className="flex items-center space-x-1.5 px-4 py-2.5 bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-xs text-white font-semibold rounded-full shadow-lg transition-all"
                >
                    <UserPlus className="w-4 h-4" />
                    <span>Thêm nhân viên</span>
                </button>
            </div>

            {/* 2. Thanh Tìm kiếm */}
            <div className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-2xl p-4 shadow-sm">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-[#8E8E93]" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm theo tên, mã nhân viên, vị trí làm việc..."
                        className="w-full pl-10 pr-4 py-2 text-xs font-semibold rounded-xl bg-[#F2F2F7] dark:bg-[#000000]/40 text-[#1C1C1E] dark:text-white focus:outline-none placeholder-[#8E8E93] transition-all"
                    />
                </div>
            </div>

            {/* 3. Bảng hiển thị chuẩn UI E-commerce */}
            <div className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="text-[#8E8E93] font-bold border-b border-[#E5E5EA] dark:border-[#2C2C2E] bg-slate-50 dark:bg-[#17171C]">
                                <th className="p-4">Nhân sự / Mã Số</th>
                                <th className="p-4">Thông tin liên hệ</th>
                                <th className="p-4">Chức vụ / Ngày vào</th>
                                <th className="p-4">Ca trực hôm nay</th>
                                <th className="p-4 text-center">Trạng thái</th>
                                <th className="p-4 text-right">Tác vụ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E5EA]/60 dark:divide-[#2C2C2E]/60 font-medium">
                            {filteredStaff.map((staff) => {
                                const shift = staff.workSchedule?.shift;
                                const attendance = staff.workSchedule?.attendance;

                                return (
                                    <tr key={staff.id} className="hover:bg-[#F2F2F7]/40 dark:hover:bg-[#2C2C2E]/30 transition-colors">

                                        {/* Cột 1: Khối thông tin định danh */}
                                        <td className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#007AFF] to-[#30B0C7] flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0">
                                                    {staff.fullName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm text-current">{staff.fullName}</div>
                                                    <div className="font-mono text-[10px] text-[#8E8E93] mt-0.5">{staff.employeeCode}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Cột 2: Email & Điện thoại */}
                                        <td className="p-4 space-y-1 text-[#8E8E93]">
                                            <div className="flex items-center space-x-1.5">
                                                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                                                <span className="truncate max-w-[160px] text-current">{staff.email}</span>
                                            </div>
                                            {staff.phone && (
                                                <div className="flex items-center space-x-1.5">
                                                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                                                    <span className="font-mono text-current">{staff.phone}</span>
                                                </div>
                                            )}
                                        </td>

                                        {/* Cột 3: Vị trí & Tiến trình làm việc */}
                                        <td className="p-4">
                                            <div className="font-semibold text-current">{staff.position}</div>
                                            <div className="flex items-center text-[10px] text-[#8E8E93] mt-1">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                <span>In: {staff.joinedAt}</span>
                                            </div>
                                        </td>

                                        {/* Cột 4: Khung giờ ca trực */}
                                        <td className="p-4">
                                            {shift ? (
                                                <div className="space-y-1">
                                                    <div className="font-bold text-[#007AFF] flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {shift.name}
                                                    </div>
                                                    <div className="text-[10px] text-[#8E8E93] font-mono">
                                                        Khung: {shift.startTime.slice(0, 5)} - {shift.endTime.slice(0, 5)}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-[#8E8E93] italic">Nghỉ lịch (Off)</span>
                                            )}
                                        </td>

                                        {/* Cột 5: Huy hiệu chấm công */}
                                        <td className="p-4 text-center">
                                            {renderAttendanceBadge(attendance?.status)}
                                        </td>

                                        {/* ĐÃ SỬA: Cột 6 sửa lỗi đóng mở tag sai cấu trúc HTML, tích hợp nút điều phối */}
                                        <td className="p-4 text-right">
                                            <Link
                                                href={`/quan-ly/cham-cong?employeeId=${staff.id}`}
                                                className="inline-flex items-center space-x-1 text-xs font-bold text-[#007AFF] hover:underline"
                                            >
                                                <span>Xem lịch ca</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Trạng thái danh sách trống */}
                {filteredStaff.length === 0 && (
                    <div className="p-12 text-center text-[#8E8E93] font-semibold">
                        Không tìm thấy nhân sự nào trùng khớp với từ khóa tìm kiếm.
                    </div>
                )}
            </div>
            <AddStaffModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                onSuccess={fetchStaff}
            />
        </div>
    );
}