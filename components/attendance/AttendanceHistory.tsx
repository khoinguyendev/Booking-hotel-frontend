"use client";

import { AttendanceRecord } from "@/types/attendance";
import { format } from "date-fns";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";


interface Props {
  records: AttendanceRecord[];
}

export default function AttendanceHistory({ records }: Props) {
  return (
    <div className="rounded-3xl border border-[#E5E5EA] bg-white shadow-sm dark:border-[#2C2C2E] dark:bg-[#1C1C1E]">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-[#E5E5EA] p-6 dark:border-[#2C2C2E]">
        <div>
          <h2 className="text-xl font-bold">Lịch sử chấm công</h2>

          <p className="mt-1 text-sm text-[#8E8E93]">
            Danh sách các ca làm gần đây
          </p>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E5EA] text-left text-sm dark:border-[#2C2C2E]">
              <th className="px-6 py-4">Ngày</th>

              <th className="px-6 py-4">Ca làm</th>

              <th className="px-6 py-4">Check in</th>

              <th className="px-6 py-4">Check out</th>

              <th className="px-6 py-4">Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {records.map((item) => {
              const attendance = item.workSchedule.attendance;
              const shift = item.workSchedule.shift;

              return (
                <tr
                  key={item.id}
                  className="border-b border-[#F2F2F7] transition hover:bg-[#F8F9FA] dark:border-[#2C2C2E] dark:hover:bg-[#2C2C2E]/50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <CalendarDays
                        size={18}
                        className="text-[#007AFF]"
                      />

                      <span className="font-medium">
                        {format(
                          new Date(item.workSchedule.workDate),
                          "dd/MM/yyyy",
                        )}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold">
                        {shift?.name ?? "--"}
                      </p>

                      <p className="text-xs text-[#8E8E93]">
                        {shift?.startTime.slice(0, 5)}
                        {" - "}
                        {shift?.endTime.slice(0, 5)}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Clock3
                        size={16}
                        className="text-green-600"
                      />

                      <span>
                        {attendance?.checkInTime?.slice(0, 5) ?? "--"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Clock3
                        size={16}
                        className="text-red-500"
                      />

                      <span>
                        {attendance?.checkOutTime?.slice(0, 5) ?? "--"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    {attendance?.status === "Present" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                        <CheckCircle2 size={14} />
                        Có mặt
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                        <XCircle size={14} />
                        Vắng
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}

            {records.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-16 text-center text-[#8E8E93]"
                >
                  Chưa có dữ liệu chấm công.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}