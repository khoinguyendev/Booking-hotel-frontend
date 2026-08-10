"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { isSameMonth } from "date-fns";
import CalendarLegend from "./CalendarLegend";
import CalendarDay from "./CalendarDay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { setMonth, setYear } from "date-fns";
import { CalendarAttendanceResponse } from "@/types/attendance";

interface AttendanceCalendarProps {
  data: CalendarAttendanceResponse[];

  selectedDate?: Date;

  onSelect?: (date: Date) => void;
}

const WEEK_DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
const MONTHS = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];
const YEARS = Array.from(
  { length: 11 },
  (_, i) => new Date().getFullYear() - 5 + i,
);
export default function AttendanceCalendar({
  data,
  selectedDate,
  onSelect,
}: AttendanceCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), {
      weekStartsOn: 1,
    });

    const end = endOfWeek(endOfMonth(currentMonth), {
      weekStartsOn: 1,
    });

    return eachDayOfInterval({
      start,
      end,
    });
  }, [currentMonth]);
  const attendanceMap = useMemo(() => {
    return new Map(data.map((x) => [x.date, x]));
  }, [data]);
  const today = new Date();
  const isCurrentMonth = isSameMonth(currentMonth, today);
  const handleMonthChange = (month: string | null) => {
    if (!month) return;

    setCurrentMonth(setMonth(currentMonth, Number(month)));
  };

  const handleYearChange = (year: string | null) => {
    if (!year) return;

    setCurrentMonth(setYear(currentMonth, Number(year)));
  };
  const handleToday = () => {
    setCurrentMonth(today);

    onSelect?.(today);
  };
  console.log(data)
  return (
    <div
      className="
        rounded-3xl
        border
        bg-white
        shadow-sm

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b p-6 dark:border-[#2C2C2E]">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {/* Month */}

            <Select
              value={String(currentMonth.getMonth())}
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {MONTHS.map((month, index) => (
                  <SelectItem key={month} value={String(index)}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year */}

            <Select
              value={String(currentMonth.getFullYear())}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {YEARS.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">
            Theo dõi tình hình chấm công theo tháng
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={isCurrentMonth}
            onClick={handleToday}
            className={`
    inline-flex
    items-center
    gap-2

    rounded-xl
    px-4
    py-2

    text-sm
    font-semibold

    transition

    ${
      isCurrentMonth
        ? "cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-[#2C2C2E]"
        : "bg-[#007AFF] text-white hover:bg-[#0064D6]"
    }
  `}
          >
            <CalendarDays size={16} />
            Hôm nay
          </button>

          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
            className="
      flex
      h-10
      w-10
      items-center
      justify-center

      rounded-xl
      border

      transition

      hover:bg-muted
    "
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="
      flex
      h-10
      w-10
      items-center
      justify-center

      rounded-xl
      border

      transition

      hover:bg-muted
    "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Week Header */}

      <div className="grid grid-cols-7 border-b dark:border-[#2C2C2E]">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="
              py-3
              text-center
              text-sm
              font-semibold
              text-muted-foreground
            "
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar */}

      <div className="grid grid-cols-7">
        {days.map((day) => {
          const info = attendanceMap.get(format(day, "yyyy-MM-dd"));

          return (
            <CalendarDay
              key={day.toISOString()}
              date={day}
              currentMonth={currentMonth}
              selected={selectedDate ? isSameDay(selectedDate, day) : false}
              attendance={info}
              onClick={() => onSelect?.(day)}
            />
          );
        })}
      </div>

      <CalendarLegend />
    </div>
  );
}
