"use client";

import { AttendanceHistoryResponse } from "@/types/attendance";
import {
  Clock3,
  TimerOff,
  LogOut,
  CircleDollarSign,
} from "lucide-react";

interface Props {
  records: AttendanceHistoryResponse[];
}

export default function AttendanceStatistic({
  records,
}: Props) {
  // Tổng giờ làm thực tế
  const totalHours = records.reduce((sum, item) => {
    if (!item.checkInTime || !item.checkOutTime) {
      return sum;
    }

    const [inH, inM] = item.checkInTime
      .split(":")
      .map(Number);

    const [outH, outM] = item.checkOutTime
      .split(":")
      .map(Number);

    let minutes =
      outH * 60 +
      outM -
      (inH * 60 + inM);

    // Ca đêm: ví dụ 22:00 -> 06:00
    if (minutes < 0) {
      minutes += 24 * 60;
    }

    return sum + minutes / 60;
  }, 0);

  // Tổng phút đi trễ
  const totalLateMinutes = records.reduce(
    (sum, item) => sum + (item.lateMinutes || 0),
    0,
  );

  // Tổng phút về sớm
  const totalEarlyLeaveMinutes = records.reduce(
    (sum, item) =>
      sum + (item.earlyLeaveMinutes || 0),
    0,
  );

  // Tổng tiền phạt
  const totalPenalty = records.reduce(
    (sum, item) =>
      sum + (item.penaltyAmount || 0),
    0,
  );

  const stats = [
    {
      title: "Tổng giờ làm",
      value: `${totalHours.toFixed(1)}h`,
      color:
        "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-300",
      icon: Clock3,
    },
    {
      title: "Tổng đi trễ",
      value: `${totalLateMinutes} phút`,
      color:
        "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-300",
      icon: TimerOff,
    },
    {
      title: "Tổng về sớm",
      value: `${totalEarlyLeaveMinutes} phút`,
      color:
        "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950/30 dark:text-orange-300",
      icon: LogOut,
    },
    {
      title: "Tổng tiền phạt",
      value: `${totalPenalty.toLocaleString("vi-VN")}đ`,
      color:
        "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/30 dark:text-red-300",
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`
              rounded-3xl
              border
              p-6
              shadow-sm
              transition
              hover:-translate-y-1
              hover:shadow-lg
              ${item.color}
            `}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold opacity-80">
                {item.title}
              </span>

              <div className="rounded-2xl bg-white/70 p-3 dark:bg-black/20">
                <Icon size={22} />
              </div>
            </div>

            <p className="mt-5 text-3xl font-black">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
