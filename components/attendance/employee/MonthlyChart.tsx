"use client";

import { useMemo } from "react";
import {
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  XCircle,
  CalendarOff,
} from "lucide-react";

import { AttendanceHistoryResponse, AttendanceType } from "@/types/attendance";

interface Props {
  records: AttendanceHistoryResponse[];
}

interface CalendarDay {
  day: number;
  status: AttendanceType | null;
}

export default function MonthlyChart({ records }: Props) {
  const data = useMemo<CalendarDay[]>(() => {
    const daysInMonth = 31;

    const result: CalendarDay[] = Array.from(
      { length: daysInMonth },
      (_, index) => ({
        day: index + 1,
        status: null,
      }),
    );

    records.forEach((item) => {
      const day = new Date(item.workDate).getDate();

      if (day < 1 || day > daysInMonth) return;

      result[day - 1].status = item.status;
    });

    return result;
  }, [records]);

  // 1 = Có mặt
  const presentDays = data.filter((item) => item.status === 1).length;

  // 2 = Đi trễ
  const lateDays = data.filter((item) => item.status === 2).length;

  // 0 = Vắng
  const absentDays = data.filter((item) => item.status === 0).length;

  // 3 = Nghỉ phép / Ngày nghỉ
  const dayOffDays = data.filter((item) => item.status === 3).length;

  // Những ngày thực sự có lịch làm và không phải ngày nghỉ
  const scheduledDays = presentDays + lateDays + absentDays;

  // Đi trễ vẫn được tính là đã đi làm
  const attendanceRate =
    scheduledDays > 0
      ? Math.round(((presentDays + lateDays) / scheduledDays) * 100)
      : 0;

  const getStatusConfig = (status: AttendanceType | null) => {
    switch (status) {
      case 1:
        return {
          className: "bg-green-500 text-white shadow-sm shadow-green-500/20",
          label: "Có mặt",
        };

      case 2:
        return {
          className: "bg-amber-400 text-white shadow-sm shadow-amber-400/20",
          label: "Đi trễ",
        };

      case 0:
        return {
          className: "bg-red-500 text-white shadow-sm shadow-red-500/20",
          label: "Vắng",
        };

      case 3:
        return {
          className:
            "bg-gray-200 text-gray-500 dark:bg-[#3A3A3C] dark:text-gray-400",
          label: "Ngày nghỉ",
        };

      default:
        return {
          className:
            "bg-[#F2F2F7] text-[#AEAEB2] dark:bg-[#2C2C2E] dark:text-[#636366]",
          label: "Không có lịch",
        };
    }
  };

  return (
    // Container
    <div className="rounded-3xl border border-[#E5E5EA] bg-white p-4 shadow-sm sm:p-6 dark:border-[#2C2C2E] dark:bg-[#1C1C1E]">
      {" "}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Thống kê tháng</h2>

          <p className="mt-1 text-sm text-[#8E8E93]">
            Tình hình chấm công trong tháng
          </p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-3 dark:bg-blue-950/30">
          <BarChart3 size={24} className="text-[#007AFF]" />
        </div>
      </div>
      {/* Progress */}
      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Tỷ lệ đi làm</span>

          <span className="text-lg font-bold text-[#007AFF]">
            {attendanceRate}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#2C2C2E]">
          <div
            className="h-full rounded-full bg-[#007AFF] transition-all duration-500"
            style={{
              width: `${attendanceRate}%`,
            }}
          />
        </div>

        <p className="mt-2 text-xs text-[#8E8E93]">
          Tính trên {scheduledDays} ngày có lịch làm
        </p>
      </div>
      {/* Calendar */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <CalendarCheck size={18} className="shrink-0 text-[#007AFF]" />

          <span className="font-semibold">Lịch sử trong tháng</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
          {data.map((item) => {
            const config = getStatusConfig(item.status);

            return (
              <div
                key={item.day}
                title={`Ngày ${item.day}: ${config.label}`}
                className={`
            flex
            aspect-square
            min-w-0
            items-center
            justify-center
            rounded-lg
            text-[10px]
            font-bold
            transition
            sm:rounded-xl
            sm:text-xs
            ${config.className}
          `}
              >
                {item.day}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-3 w-3 shrink-0 rounded-full bg-green-500" />

            <span className="truncate text-xs text-[#8E8E93]">Có mặt</span>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <span className="h-3 w-3 shrink-0 rounded-full bg-amber-400" />

            <span className="truncate text-xs text-[#8E8E93]">Đi trễ</span>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <span className="h-3 w-3 shrink-0 rounded-full bg-red-500" />

            <span className="truncate text-xs text-[#8E8E93]">Vắng</span>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <span className="h-3 w-3 shrink-0 rounded-full bg-gray-300 dark:bg-[#3A3A3C]" />

            <span className="truncate text-xs text-[#8E8E93]">Ngày nghỉ</span>
          </div>
        </div>
      </div>
      {/* Statistics */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
        {/* Present */}
        <div className="min-w-0 rounded-2xl bg-green-50 p-3 sm:p-4 dark:bg-green-950/30">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-green-600" />

            <p className="truncate text-xs text-[#8E8E93]">Có mặt</p>
          </div>

          <p className="mt-1 text-2xl font-black text-green-600 sm:text-3xl">
            {presentDays}
          </p>
        </div>

        {/* Late */}
        <div className="min-w-0 rounded-2xl bg-amber-50 p-3 sm:p-4 dark:bg-amber-950/30">
          <div className="flex items-center gap-2">
            <Clock3 size={16} className="shrink-0 text-amber-600" />

            <p className="truncate text-xs text-[#8E8E93]">Đi trễ</p>
          </div>

          <p className="mt-1 text-2xl font-black text-amber-500 sm:text-3xl">
            {lateDays}
          </p>
        </div>

        {/* Absent */}
        <div className="min-w-0 rounded-2xl bg-red-50 p-3 sm:p-4 dark:bg-red-950/30">
          <div className="flex items-center gap-2">
            <XCircle size={16} className="shrink-0 text-red-600" />

            <p className="truncate text-xs text-[#8E8E93]">Vắng</p>
          </div>

          <p className="mt-1 text-2xl font-black text-red-500 sm:text-3xl">
            {absentDays}
          </p>
        </div>

        {/* Day off */}
        <div className="min-w-0 rounded-2xl bg-gray-50 p-3 sm:p-4 dark:bg-gray-900/30">
          <div className="flex items-center gap-2">
            <CalendarOff size={16} className="shrink-0 text-gray-500" />

            <p className="truncate text-xs text-[#8E8E93]">Ngày nghỉ</p>
          </div>

          <p className="mt-1 text-2xl font-black text-gray-500 sm:text-3xl">
            {dayOffDays}
          </p>
        </div>
      </div>
    </div>
  );
}
