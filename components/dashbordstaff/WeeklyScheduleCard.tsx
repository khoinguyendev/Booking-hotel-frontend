"use client";

import { WeeklyScheduleItem } from "@/types/dashboardstaff";
import {
  CalendarDays,
  Sunrise,
  Sunset,
  MoonStar,
  Coffee,
  Clock3,
} from "lucide-react";


interface Props {
  schedules: WeeklyScheduleItem[];
}

export default function WeeklyScheduleCard({
  schedules,
}: Props) {
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

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
          <CalendarDays
            size={24}
            className="text-blue-600"
          />
        </div>

        <div>
          <p className="text-sm text-[#8E8E93]">
            Lịch làm việc
          </p>

          <h2 className="text-2xl font-black">
            7 ngày tới
          </h2>
        </div>
      </div>

      {/* List */}

      <div className="mt-6 space-y-3">
        {schedules.map((item, index) => {
          const config = getShiftConfig(item.shiftName);

          const Icon = config.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border border-[#F2F2F7] p-4 dark:border-[#2C2C2E]"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    ${config.bg}
                  `}
                >
                  <Icon
                    size={22}
                    className={config.color}
                  />
                </div>

                <div>
                  <h3 className="font-bold">
                    {item.day}
                  </h3>

                  <p className="text-xs text-[#8E8E93]">
                    {item.date}
                  </p>
                </div>
              </div>

              {item.isDayOff ? (
                <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-600 dark:bg-[#2C2C2E]">
                  Nghỉ
                </span>
              ) : (
                <div className="text-right">
                  <p className={`font-bold ${config.color}`}>
                    {item.shiftName}
                  </p>

                  <div className="mt-1 flex items-center justify-end gap-1 text-xs text-[#8E8E93]">
                    <Clock3 size={13} />

                    {item.startTime} - {item.endTime}
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
      color: "text-blue-600",
    };
  }

  if (lower.includes("chiều")) {
    return {
      icon: Sunset,
      bg: "bg-orange-100 dark:bg-orange-900/30",
      color: "text-orange-600",
    };
  }

  if (lower.includes("tối")) {
    return {
      icon: MoonStar,
      bg: "bg-violet-100 dark:bg-violet-900/30",
      color: "text-violet-600",
    };
  }

  return {
    icon: Coffee,
    bg: "bg-gray-100 dark:bg-gray-800",
    color: "text-gray-600",
  };
}