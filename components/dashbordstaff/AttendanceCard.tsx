"use client";

import { AttendanceSummary } from "@/types/dashboardstaff";
import {
  LogIn,
  LogOut,
  Clock3,
  Timer,
  CheckCircle2,
  AlertCircle,
  XCircle,
  CalendarX2,
} from "lucide-react";


interface Props {
  attendance: AttendanceSummary;
}

export default function AttendanceCard({
  attendance,
}: Props) {
  const status = getStatus(attendance.status);

  const StatusIcon = status.icon;

  return (
    <div
      className="
        rounded-3xl
        border
        border-[#E5E5EA]
        bg-white
        p-6
        shadow-sm
        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#8E8E93]">
            Chấm công hôm nay
          </p>

          <h2 className="mt-2 text-2xl font-black">
            {status.label}
          </h2>
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${status.bg}
          `}
        >
          <StatusIcon
            size={28}
            className={status.color}
          />
        </div>
      </div>

      {/* Time */}

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#F7F7F9] p-4 dark:bg-[#2C2C2E]">
          <div className="flex items-center gap-2">
            <LogIn
              size={18}
              className="text-green-600"
            />

            <span className="text-xs text-[#8E8E93]">
              Check in
            </span>
          </div>

          <p className="mt-2 text-xl font-bold">
            {attendance.checkIn ?? "--:--"}
          </p>
        </div>

        <div className="rounded-2xl bg-[#F7F7F9] p-4 dark:bg-[#2C2C2E]">
          <div className="flex items-center gap-2">
            <LogOut
              size={18}
              className="text-red-500"
            />

            <span className="text-xs text-[#8E8E93]">
              Check out
            </span>
          </div>

          <p className="mt-2 text-xl font-bold">
            {attendance.checkOut ?? "--:--"}
          </p>
        </div>
      </div>

      {/* Summary */}

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock3
              size={18}
              className="text-[#007AFF]"
            />

            <span className="text-sm">
              Giờ làm việc
            </span>
          </div>

          <span className="font-bold">
            {attendance.workingHours} giờ
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer
              size={18}
              className="text-violet-600"
            />

            <span className="text-sm">
              Tăng ca
            </span>
          </div>

          <span className="font-bold text-violet-600">
            +{attendance.overtimeHours} giờ
          </span>
        </div>
      </div>
    </div>
  );
}

function getStatus(status: AttendanceSummary["status"]) {
  switch (status) {
    case "Present":
      return {
        label: "Đúng giờ",
        icon: CheckCircle2,
        bg: "bg-green-100 dark:bg-green-900/30",
        color: "text-green-600",
      };

    case "Late":
      return {
        label: "Đi trễ",
        icon: AlertCircle,
        bg: "bg-orange-100 dark:bg-orange-900/30",
        color: "text-orange-600",
      };

    case "Absent":
      return {
        label: "Vắng mặt",
        icon: XCircle,
        bg: "bg-red-100 dark:bg-red-900/30",
        color: "text-red-600",
      };

    case "Leave":
      return {
        label: "Nghỉ phép",
        icon: CalendarX2,
        bg: "bg-blue-100 dark:bg-blue-900/30",
        color: "text-blue-600",
      };

    default:
      return {
        label: "Không xác định",
        icon: Clock3,
        bg: "bg-gray-100",
        color: "text-gray-600",
      };
  }
}