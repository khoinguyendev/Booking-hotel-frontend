"use client";

import { useMemo } from "react";

import {
  BarChart3,
  CalendarCheck,
} from "lucide-react";
import { AttendanceRecord } from "@/types/attendance";


interface Props {
  records: AttendanceRecord[];
}

export default function MonthlyChart({ records }: Props) {
  const data = useMemo(() => {
    const daysInMonth = 31;

    const result = Array.from({ length: daysInMonth }, (_, index) => ({
      day: index + 1,
      worked: false,
    }));

    records.forEach((item) => {
      const attendance = item.workSchedule.attendance;

      if (attendance?.status !== "Present") return;

      const day = new Date(item.workSchedule.workDate).getDate();

      if (day >= 1 && day <= daysInMonth) {
        result[day - 1].worked = true;
      }
    });

    return result;
  }, [records]);

  const workedDays = data.filter((x) => x.worked).length;
  const percent = Math.round((workedDays / data.length) * 100);

  return (
    <div className="rounded-3xl border border-[#E5E5EA] bg-white p-6 shadow-sm dark:border-[#2C2C2E] dark:bg-[#1C1C1E]">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Thống kê tháng
          </h2>

          <p className="mt-1 text-sm text-[#8E8E93]">
            Tỷ lệ đi làm trong tháng
          </p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-3 dark:bg-blue-950/30">
          <BarChart3
            size={24}
            className="text-[#007AFF]"
          />
        </div>
      </div>

      {/* Progress */}

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">
            Tỷ lệ có mặt
          </span>

          <span className="text-lg font-bold text-[#007AFF]">
            {percent}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-[#E5E5EA] dark:bg-[#2C2C2E]">
          <div
            className="h-full rounded-full bg-[#007AFF] transition-all duration-500"
            style={{
              width: `${percent}%`,
            }}
          />
        </div>
      </div>

      {/* Calendar Grid */}

      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <CalendarCheck
            size={18}
            className="text-[#007AFF]"
          />

          <span className="font-semibold">
            Lịch sử trong tháng
          </span>
        </div>

        <div className="grid grid-cols-7 gap-3">
          {data.map((item) => (
            <div
              key={item.day}
              title={`Ngày ${item.day}`}
              className={`
                flex
                aspect-square
                items-center
                justify-center
                rounded-xl
                text-xs
                font-bold
                transition

                ${
                  item.worked
                    ? "bg-[#007AFF] text-white shadow"
                    : "bg-[#F2F2F7] text-[#8E8E93] dark:bg-[#2C2C2E]"
                }
              `}
            >
              {item.day}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-green-50 p-4 dark:bg-green-950/30">
          <p className="text-xs text-[#8E8E93]">
            Ngày đi làm
          </p>

          <p className="mt-1 text-3xl font-black text-green-600">
            {workedDays}
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-4 dark:bg-orange-950/30">
          <p className="text-xs text-[#8E8E93]">
            Ngày chưa đi
          </p>

          <p className="mt-1 text-3xl font-black text-orange-500">
            {data.length - workedDays}
          </p>
        </div>
      </div>
    </div>
  );
}