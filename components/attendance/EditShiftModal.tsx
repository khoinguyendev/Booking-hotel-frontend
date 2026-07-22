// components/attendance/EditShiftModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Save, X, Clock, FileText } from "lucide-react";
import toast from "react-hot-toast";

import { Shift } from "@/types/shift";
import { updateShift } from "@/services/shift.service";

interface EditShiftModalProps {
    open: boolean;
    shift: Shift | null;
    onClose: () => void;
    onSuccess: () => void;
}

export default function EditShiftModal({
    open,
    shift,
    onClose,
    onSuccess,
}: EditShiftModalProps) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        if (!shift) return;

        setName(shift.name);
        setStartTime(shift.startTime.slice(0, 5));
        setEndTime(shift.endTime.slice(0, 5));
    }, [shift]);

    if (!open || !shift) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateShift(shift.id, {
                hotelId: 1,
                name,
                startTime: `${startTime}:00`,
                endTime: `${endTime}:00`,
            });
            toast.success("Cập nhật ca làm thành công");
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
                "Không thể cập nhật ca làm"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Lớp nền mờ Glassmorphism */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Khung Modal chính */}
            <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#1C1C1E] shadow-2xl border border-[#E5E5EA] dark:border-[#2C2C2E] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 text-[#1C1C1E] dark:text-white">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5EA] dark:border-[#2C2C2E] bg-slate-50 dark:bg-[#1C1C1E]">
                    <div>
                        <h2 className="text-base font-black tracking-tight">
                            Chỉnh sửa ca làm
                        </h2>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                            Cập nhật thông tin và khung giờ trực hệ thống
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-current hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] rounded-full transition-all active:scale-90"
                    >
                        <X className="w-4 h-4 stroke-[2.5]" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
                    {/* Tên Ca Trực */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                            <FileText className="w-3 h-3" /> Tên ca làm việc
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full text-xs font-semibold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-[#1C1C1E] dark:text-white px-4 py-3 outline-none focus:bg-[#E5E5EA] dark:focus:bg-[#3A3A3C] transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                        />
                    </div>

                    {/* Khung Giờ (Grid 2 cột) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-emerald-500" /> Giờ bắt đầu
                            </label>
                            <input
                                type="time"
                                required
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full text-xs font-mono font-bold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-rose-500" /> Giờ kết thúc
                            </label>
                            <input
                                type="time"
                                required
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full text-xs font-mono font-bold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>
                    </div>

                    {/* Footer tác vụ */}
                    <div className="flex gap-3 pt-4 border-t border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl py-2.5 text-xs font-bold bg-[#F2F2F7] hover:bg-[#E5E5EA] dark:bg-[#2C2C2E] dark:hover:bg-[#3A3A3C] transition-colors"
                        >
                            Hủy bỏ
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-xl py-2.5 text-xs font-bold bg-[#007AFF] hover:bg-[#0066CC] text-white transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-60"
                        >
                            <Save className="w-3.5 h-3.5" />
                            <span>{loading ? "Đang lưu..." : "Lưu thay đổi"}</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}