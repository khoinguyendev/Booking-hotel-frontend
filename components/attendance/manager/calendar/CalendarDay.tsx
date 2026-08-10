"use client";

import { CheckCircle2, Clock3, Moon, Users } from "lucide-react";

import { format, isSameMonth } from "date-fns";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isToday } from "date-fns";
import CalendarTooltip from "./CalendarTooltip";
import { CalendarAttendanceResponse } from "@/types/attendance";
interface Props {
  date: Date;

  currentMonth: Date;

  attendance?: CalendarAttendanceResponse;

  selected?: boolean;

  onClick?: () => void;
}

export default function CalendarDay({
  date,
  currentMonth,
  attendance,
  selected = false,
  onClick,
}: Props) {
  const inMonth = isSameMonth(date, currentMonth);
  const today = isToday(date);
  const rate =
    attendance && attendance.working > 0
      ? attendance.present / attendance.working
      : 0;

  function background() {
    if (!attendance) return "bg-transparent";

    if (rate >= 0.95) return "bg-green-50 dark:bg-green-950/30";

    if (rate >= 0.8) return "bg-lime-50 dark:bg-lime-950/30";

    if (rate >= 0.6) return "bg-yellow-50 dark:bg-yellow-950/30";

    if (rate >= 0.4) return "bg-orange-50 dark:bg-orange-950/30";

    return "bg-red-50 dark:bg-red-950/30";
  }

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={onClick}
        className={`
        relative

        h-[200px]

        border-r
        border-b

        p-2

        text-left

        transition-all
        duration-200

        hover:z-10
        hover:scale-[1.02]
        hover:shadow-lg

        dark:border-[#2C2C2E]

        ${background()}

        ${selected ? "ring-2 ring-[#007AFF]" : ""}
      `}
      >
        {/* Date */}

       <div className="flex items-center justify-between">
  <span
    className={`
      flex
      h-8
      w-8
      items-center
      justify-center

      rounded-full

      text-sm
      font-semibold

      transition-colors

      ${
        today
          ? "bg-[#007AFF] text-white shadow-sm"
          : inMonth
            ? "text-[#1C1C1E] dark:text-white"
            : "text-[#AEAEB2]"
      }
    `}
  >
    {format(date, "d")}
  </span>

  {attendance && attendance.late > 0 && (
    <div
      className="
        h-2.5
        w-2.5
        rounded-full
        bg-orange-500
        ring-2
        ring-white
        dark:ring-[#1C1C1E]
      "
    />
  )}
</div>

        {/* Empty */}

        {!attendance && (
          <div className="mt-8 text-center text-xs text-[#8E8E93]">—</div>
        )}

        {/* Statistics */}

        {attendance && (
          <div className="mt-3 space-y-2">
            <Row
              color="bg-blue-500"
              icon={<Users size={12} />}
              value={attendance.working}
            />

            <Row
              color="bg-green-500"
              icon={<CheckCircle2 size={12} />}
              value={attendance.present}
            />

            {attendance.late > 0 && (
              <Row
                color="bg-orange-500"
                icon={<Clock3 size={12} />}
                value={attendance.late}
              />
            )}

            {/* {attendance.dayOff > 0 && (
              <Row
                color="bg-gray-500"
                icon={<Moon size={12} />}
                value={attendance.dayOff}
              />
            )} */}
          </div>
        )}
      </TooltipTrigger>
      {attendance && (
        <TooltipContent side="top" className="rounded-2xl">
          <CalendarTooltip date={date} attendance={attendance} />
        </TooltipContent>
      )}
    </Tooltip>
  );
}

interface RowProps {
  color: string;

  value: number;

  icon: React.ReactNode;
}

function Row({ color, value, icon }: RowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/70 px-2 py-1 dark:bg-[#1C1C1E]/70">
      <div className="flex items-center gap-1">
        <div
          className={`flex h-4 w-4 items-center justify-center rounded-full text-white ${color}`}
        >
          {icon}
        </div>
      </div>

      <span className="text-xs font-semibold">{value}</span>
    </div>
  );
}
