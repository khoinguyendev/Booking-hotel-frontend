"use client";

import { TodayShift } from "@/types/dashboardstaff";
import {
  CalendarClock,
  Clock3,
  MapPin,
  Sunrise,
  Sunset,
  MoonStar,
  Coffee,
} from "lucide-react";


interface Props {
  shift: TodayShift;
}

export default function TodayShiftCard({ shift }: Props) {
  const config = getShiftConfig(shift.shiftName);

  const Icon = config.icon;

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
          <p className="text-sm font-medium text-[#8E8E93]">
            Ca làm hôm nay
          </p>

          <h2 className="mt-2 text-2xl font-black">
            {shift.shiftName}
          </h2>
        </div>

        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            ${config.bg}
          `}
        >
          <Icon
            size={30}
            className={config.iconColor}
          />
        </div>
      </div>

      {/* Time */}

      <div className="mt-6 rounded-2xl bg-[#F8F8FA] p-4 dark:bg-[#2C2C2E]">
        <div className="flex items-center gap-3">
          <Clock3
            size={18}
            className="text-[#007AFF]"
          />

          <span className="font-semibold">
            {shift.startTime} - {shift.endTime}
          </span>
        </div>
      </div>

      {/* Location */}

      <div className="mt-4 flex items-center gap-3">
        <MapPin
          size={18}
          className="text-red-500"
        />

        <span className="text-sm text-[#8E8E93]">
          {shift.location}
        </span>
      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between rounded-2xl bg-green-50 p-4 dark:bg-green-900/20">
        <div className="flex items-center gap-3">
          <CalendarClock
            size={20}
            className="text-green-600"
          />

          <div>
            <p className="text-sm font-semibold text-green-700 dark:text-green-300">
              Hôm nay có lịch làm
            </p>

            <p className="text-xs text-green-600">
              Đừng quên check-in đúng giờ.
            </p>
          </div>
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-800 dark:text-green-200">
          Active
        </span>
      </div>
    </div>
  );
}

function getShiftConfig(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("sáng")) {
    return {
      icon: Sunrise,
      bg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600",
    };
  }

  if (lower.includes("chiều")) {
    return {
      icon: Sunset,
      bg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600",
    };
  }

  if (lower.includes("tối")) {
    return {
      icon: MoonStar,
      bg: "bg-violet-100 dark:bg-violet-900/30",
      iconColor: "text-violet-600",
    };
  }

  return {
    icon: Coffee,
    bg: "bg-gray-100 dark:bg-gray-800",
    iconColor: "text-gray-600",
  };
}