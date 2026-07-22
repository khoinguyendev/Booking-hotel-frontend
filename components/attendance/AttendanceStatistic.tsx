"use client";

import { AttendanceRecord } from "@/types/attendance";
import {
  CalendarCheck,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Props {
  records: AttendanceRecord[];
}

export default function AttendanceStatistic({ records }: Props) {
  const totalWorkDays = records.length;

  const presentDays = records.filter(
    (item) => item.workSchedule.attendance?.status === "Present",
  ).length;

  const absentDays = records.filter(
    (item) =>
      item.workSchedule.attendance &&
      item.workSchedule.attendance.status !== "Present",
  ).length;

  const totalHours = records.reduce((sum, item) => {
    const attendance = item.workSchedule.attendance;

    if (!attendance?.checkInTime || !attendance?.checkOutTime) return sum;

    const [inH, inM] = attendance.checkInTime.split(":").map(Number);
    const [outH, outM] = attendance.checkOutTime.split(":").map(Number);

    const minutes = outH * 60 + outM - (inH * 60 + inM);

    return sum + Math.max(0, minutes / 60);
  }, 0);

  const stats = [
    {
      title: "Ngày làm",
      value: totalWorkDays,
      color:
        "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-300",
      icon: CalendarCheck,
    },
    {
      title: "Đi làm",
      value: presentDays,
      color:
        "bg-green-50 text-green-700 border-green-100 dark:bg-green-950/30 dark:text-green-300",
      icon: CheckCircle2,
    },
    {
      title: "Vắng",
      value: absentDays,
      color:
        "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/30 dark:text-red-300",
      icon: XCircle,
    },
    {
      title: "Giờ làm",
      value: `${totalHours.toFixed(1)}h`,
      color:
        "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950/30 dark:text-orange-300",
      icon: Clock3,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${item.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold opacity-80">
                {item.title}
              </span>

              <div className="rounded-2xl bg-white/70 p-3 dark:bg-black/20">
                <Icon size={22} />
              </div>
            </div>

            <p className="mt-5 text-4xl font-black">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}