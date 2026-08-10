"use client";

import { ScheduleItem } from "@/types/workSchedule";
import { isToday } from "date-fns";
import {
  CalendarX2,
  CheckCircle2,
  Clock3,
  Moon,
  Sunrise,
  Sunset,
} from "lucide-react";

export type ShiftType =
  | "morning"
  | "afternoon"
  | "night"
  | "dayoff"
  | "unassigned";

interface Props {
  schedule?: ScheduleItem;

  onClick?: () => void;
}

export default function ScheduleCell({ schedule, onClick }: Props) {
  function getShiftType(schedule: ScheduleItem): ShiftType {
    if (schedule.isDayOff) return "dayoff";

    if (!schedule.shiftId) return "unassigned";

    const name = schedule.shiftName?.toLowerCase() ?? "";

    if (name.includes("sáng")) return "morning";
    if (name.includes("chiều")) return "afternoon";
    if (name.includes("tối") || name.includes("đêm")) return "night";

    return "morning";
  }
  if (!schedule) {
    return (
      <button
        onClick={onClick}
        className="
          flex
          h-[92px]
          w-full
          items-center
          justify-center

          rounded-xl

          border
          border-dashed

          border-[#E5E5EA]

          transition

          hover:bg-muted

          dark:border-[#3A3A3C]
        "
      >
        <CalendarX2 size={20} className="text-[#AEAEB2]" />
      </button>
    );
  }

 const shiftType = getShiftType(schedule);
const config = getShiftConfig(shiftType);

  return (
    <button
      onClick={onClick}
      className={`
        relative

        flex
        h-[92px]
        w-full
        flex-col
        justify-between

        rounded-xl

        border

        p-3

        text-left

        transition-all
        duration-200

        hover:-translate-y-0.5
        hover:shadow-md

        ${config.background}
        ${config.border}
      `}
    >
      {isToday(new Date(schedule.workDate)) && (
        <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
      )}

      <div className="flex items-center gap-2">
        <div
          className={`
            flex
            h-7
            w-7
            items-center
            justify-center

            rounded-lg

            text-white

            ${config.iconBackground}
          `}
        >
          {config.icon}
        </div>

        <span className="text-sm font-semibold">
          {schedule.shiftName ?? config.title}
        </span>
      </div>

      {shiftType !== "dayoff" &&
        shiftType !== "unassigned" && (
          <p className="text-xs text-muted-foreground">
            {schedule.startTime} - {schedule.endTime}
          </p>
        )}

      <div className="flex items-center justify-between">
        {schedule.attendance?.checkInTime ? (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle2 size={14} />

            <span className="text-xs font-medium">Đã chấm công</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">
            {shiftType === "dayoff"
              ? "Nghỉ"
              : shiftType === "unassigned"
                ? "Chưa phân"
                : "Chưa chấm công"}
          </span>
        )}
      </div>
    </button>
  );
}

function getShiftConfig(type: ShiftType) {
  switch (type) {
    case "morning":
      return {
        title: "Ca sáng",

        background: "bg-blue-50 dark:bg-blue-950/30",

        border: "border-blue-200 dark:border-blue-800",

        iconBackground: "bg-blue-500",

        icon: <Sunrise size={16} />,
      };

    case "afternoon":
      return {
        title: "Ca chiều",

        background: "bg-orange-50 dark:bg-orange-950/30",

        border: "border-orange-200 dark:border-orange-800",

        iconBackground: "bg-orange-500",

        icon: <Sunset size={16} />,
      };

    case "night":
      return {
        title: "Ca tối",

        background: "bg-violet-50 dark:bg-violet-950/30",

        border: "border-violet-200 dark:border-violet-800",

        iconBackground: "bg-violet-500",

        icon: <Moon size={16} />,
      };

    case "dayoff":
      return {
        title: "Nghỉ",

        background: "bg-slate-100 dark:bg-slate-900",

        border: "border-slate-200 dark:border-slate-700",

        iconBackground: "bg-slate-500",

        icon: <Moon size={16} />,
      };

    default:
      return {
        title: "Chưa phân",

        background: "bg-white dark:bg-[#1C1C1E]",

        border: "border-dashed border-[#D1D1D6] dark:border-[#3A3A3C]",

        iconBackground: "bg-gray-400",

        icon: <Clock3 size={16} />,
      };
  }
}
