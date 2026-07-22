'use client';

import React, { useState } from 'react';
import { X, Save, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { createShift } from '@/services/shift.service';

interface AddShiftModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const AddShiftModal = ({
    isOpen,
    onClose,
    onSuccess,
}: AddShiftModalProps) => {
    const [hotelId] = useState(1);

    const [name, setName] = useState('');

    const [startTime, setStartTime] =
        useState('06:00:00');

    const [endTime, setEndTime] =
        useState('14:00:00');

    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const convertTime = (time: string) => {
        if (time.length === 5) return `${time}:00`;
        return time;
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            await createShift({
                hotelId,
                name,
                startTime: convertTime(startTime),
                endTime: convertTime(endTime),
            });

            toast.success("Tạo ca làm thành công");

            setName("");
            setStartTime("06:00");
            setEndTime("14:00");

            onSuccess?.();

            onClose();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ??
                    "Tạo ca làm thất bại"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] bg-white dark:bg-[#1C1C1E] shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#E5E5EA] dark:border-[#2C2C2E] px-6 py-4">

                    <div>
                        <h2 className="text-lg font-bold">
                            Thêm ca làm việc
                        </h2>

                        <p className="text-xs text-[#8E8E93] mt-1">
                            Khởi tạo ca làm mới cho khách sạn
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-[#2C2C2E]"
                    >
                        <X className="w-5 h-5" />
                    </button>

                </div>

                {/* Body */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    {/* Tên ca */}

                    <div>

                        <label className="mb-2 block text-xs font-bold uppercase text-gray-500">
                            Tên ca làm
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Ví dụ: Ca Sáng"
                            required
                            className="w-full rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E] px-4 py-3 outline-none"
                        />

                    </div>

                    {/* Giờ bắt đầu */}

                    <div>

                        <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-gray-500">

                            <Clock className="w-3 h-3" />

                            Giờ bắt đầu

                        </label>

                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) =>
                                setStartTime(e.target.value)
                            }
                            required
                            className="w-full rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E] px-4 py-3 outline-none"
                        />

                    </div>

                    {/* Giờ kết thúc */}

                    <div>

                        <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-gray-500">

                            <Clock className="w-3 h-3" />

                            Giờ kết thúc

                        </label>

                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) =>
                                setEndTime(e.target.value)
                            }
                            required
                            className="w-full rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E] px-4 py-3 outline-none"
                        />

                    </div>

                    {/* Footer */}

                    <div className="flex gap-3 border-t border-[#E5E5EA] dark:border-[#2C2C2E] pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl bg-gray-100 py-3 font-semibold dark:bg-[#2C2C2E]"
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#007AFF] py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            <Save className="w-4 h-4" />

                            {loading
                                ? "Đang lưu..."
                                : "Tạo ca"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};