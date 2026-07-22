"use client";

import {
  CalendarDays,
  Clock3,
  Coffee,
  MoonStar,
  Sunrise,
  Sunset,
  Timer,
} from "lucide-react";

import { differenceInMinutes } from "date-fns";
import AttendanceStatusBadge from "./AttendanceStatusBadge";
import { WorkSchedule } from "@/types/attendance";



interface Props {
  schedule: WorkSchedule | null;
}

export default function TodayAttendanceCard({ schedule }: Props) {
  if (!schedule) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-[#1C1C1E]">
        <div className="flex h-72 flex-col items-center justify-center">
          <Coffee size={48} className="text-gray-400" />

          <h2 className="mt-4 text-xl font-bold">
            Hôm nay không có ca làm
          </h2>

          <p className="mt-2 text-sm text-[#8E8E93]">
            Hãy tận hưởng ngày nghỉ của bạn 🎉
          </p>
        </div>
      </div>
    );
  }

  const shift = schedule.shift;
  const attendance = schedule.attendance;

  const style = getShiftStyle(shift?.name ?? "");

  const workingMinutes =
    attendance?.checkInTime && attendance?.checkOutTime
      ? calculateMinutes(
          attendance.checkInTime,
          attendance.checkOutTime,
        )
      : 0;

  return (
    <div
      className={`overflow-hidden rounded-3xl border shadow-sm ${style.border} ${style.bg}`}
    >
      {/* Header */}

      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.iconBg}`}
          >
            {getShiftIcon(shift?.name ?? "")}
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Ca làm hôm nay
            </p>

            <h2 className={`text-2xl font-black ${style.text}`}>
              {shift?.name}
            </h2>
          </div>
        </div>

        {attendance && (
          <AttendanceStatusBadge
            status={attendance.status}
          />
        )}
      </div>

      {/* Shift */}

      <div className="grid gap-5 px-8 pb-8 md:grid-cols-3">
        <InfoCard
          icon={<CalendarDays size={18} />}
          title="Ngày làm"
          value={new Date(schedule.workDate).toLocaleDateString("vi-VN")}
        />

        <InfoCard
          icon={<Clock3 size={18} />}
          title="Ca làm"
          value={`${shift?.startTime.slice(0, 5)} - ${shift?.endTime.slice(0, 5)}`}
        />

        <InfoCard
          icon={<Timer size={18} />}
          title="Thời gian"
          value={
            attendance
              ? `${Math.floor(workingMinutes / 60)} giờ ${
                  workingMinutes % 60
                } phút`
              : "--"
          }
        />
      </div>

      {/* Attendance */}

      <div className="grid border-t bg-white/60 dark:bg-[#2C2C2E]/40 md:grid-cols-2">
        <div className="border-r p-6 dark:border-[#3A3A3C]">
          <p className="text-xs uppercase tracking-wider text-[#8E8E93]">
            Check In
          </p>

          <p className="mt-2 text-3xl font-black">
            {attendance?.checkInTime
              ? attendance.checkInTime.slice(0, 5)
              : "--:--"}
          </p>
        </div>

        <div className="p-6">
          <p className="text-xs uppercase tracking-wider text-[#8E8E93]">
            Check Out
          </p>

          <p className="mt-2 text-3xl font-black">
            {attendance?.checkOutTime
              ? attendance.checkOutTime.slice(0, 5)
              : "--:--"}
          </p>
        </div>
      </div>

      {attendance?.note && (
        <div className="border-t px-8 py-5 dark:border-[#3A3A3C]">
          <p className="text-sm text-gray-500">
            Ghi chú
          </p>

          <p className="mt-1 font-medium">
            {attendance.note}
          </p>
        </div>
      )}
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function InfoCard({
  icon,
  title,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-2xl bg-white/70 p-5 shadow-sm dark:bg-[#2C2C2E]">
      <div className="flex items-center gap-2 text-[#007AFF]">
        {icon}

        <span className="text-xs font-semibold uppercase">
          {title}
        </span>
      </div>

      <p className="mt-3 text-lg font-bold">
        {value}
      </p>
    </div>
  );
}

function calculateMinutes(
  start: string,
  end: string,
) {
  const today = "2026-01-01";

  const startDate = new Date(`${today}T${start}`);

  const endDate = new Date(`${today}T${end}`);

  return differenceInMinutes(endDate, startDate);
}

function getShiftIcon(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("sáng")) {
    return <Sunrise className="text-blue-500" size={30} />;
  }

  if (lower.includes("chiều")) {
    return <Sunset className="text-orange-500" size={30} />;
  }

  if (lower.includes("tối") || lower.includes("đêm")) {
    return <MoonStar className="text-violet-500" size={30} />;
  }

  return <Coffee size={30} />;
}

function getShiftStyle(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("sáng")) {
    return {
      bg: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-200",
      text: "text-blue-700 dark:text-blue-300",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
    };
  }

  if (lower.includes("chiều")) {
    return {
      bg: "bg-orange-50 dark:bg-orange-950/20",
      border: "border-orange-200",
      text: "text-orange-700 dark:text-orange-300",
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
    };
  }

  if (lower.includes("tối") || lower.includes("đêm")) {
    return {
      bg: "bg-violet-50 dark:bg-violet-950/20",
      border: "border-violet-200",
      text: "text-violet-700 dark:text-violet-300",
      iconBg: "bg-violet-100 dark:bg-violet-900/30",
    };
  }

  return {
    bg: "bg-gray-50 dark:bg-[#1C1C1E]",
    border: "border-gray-200",
    text: "text-gray-700",
    iconBg: "bg-gray-100",
  };
}