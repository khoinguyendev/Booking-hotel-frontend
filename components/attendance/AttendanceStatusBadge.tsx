"use client";

import {
  CheckCircle2,
  Clock3,
  XCircle,
  Coffee,
} from "lucide-react";

interface Props {
  status?: "Present" | "Absent" | "Late" | "Leave" | null;
}

export default function AttendanceStatusBadge({ status }: Props) {
  switch (status) {
    case "Present":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
          <CheckCircle2 size={14} />
          Có mặt
        </span>
      );

    case "Late":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
          <Clock3 size={14} />
          Đi muộn
        </span>
      );

    case "Leave":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          <Coffee size={14} />
          Nghỉ phép
        </span>
      );

    case "Absent":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">
          <XCircle size={14} />
          Vắng mặt
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-[#2C2C2E] dark:text-gray-300">
          —
          Chưa chấm công
        </span>
      );
  }
}