"use client";

import {
  addWeeks,
  subWeeks,
  format,
  startOfWeek,
  addDays,
  isToday,
} from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { setMonth, setYear } from "date-fns";
import { vi } from "date-fns/locale";

import { useMemo, useState } from "react";

import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

import ScheduleLegend from "./ScheduleLegend";
import ScheduleRow, { EmployeeSchedule } from "./ScheduleRow";

import { ScheduleItem } from "./ScheduleCell";

interface Props {
  employees: EmployeeSchedule[];

  onCellClick?: (employee: EmployeeSchedule, schedule: ScheduleItem) => void;
}
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
export default function WorkScheduleCalendar({
  employees,
  onCellClick,
}: Props) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const handleMonthChange = (value: string) => {
    setCurrentWeek(setMonth(currentWeek, Number(value)));
  };

  const handleYearChange = (value: string) => {
    setCurrentWeek(setYear(currentWeek, Number(value)));
  };
  const weekStart = useMemo(
    () =>
      startOfWeek(currentWeek, {
        weekStartsOn: 1,
      }),
    [currentWeek],
  );

  const weekDays = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Lịch làm việc</h2>

          <p className="text-sm text-muted-foreground">
            Tuần từ {format(weekDays[0], "dd/MM")} -{" "}
            {format(weekDays[6], "dd/MM/yyyy")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={String(currentWeek.getMonth())}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="w-[150px]">
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

          <Select
            value={String(currentWeek.getFullYear())}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-[110px]">
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

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentWeek((v) => subWeeks(v, 1))}
          >
            <ChevronLeft size={18} />
          </Button>

          <Button onClick={() => setCurrentWeek(new Date())}>
            <CalendarDays size={16} className="mr-2" />
            Hôm nay
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentWeek((v) => addWeeks(v, 1))}
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      <ScheduleLegend />

      {/* Calendar */}

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

        <div
          className="
            sticky
            top-0
            z-30

            grid
            min-w-max

            grid-cols-[280px_repeat(7,minmax(140px,1fr))]

            border-b

            bg-white

            dark:border-[#2C2C2E]
            dark:bg-[#1C1C1E]
          "
        >
          {/* Employee */}

          <div
            className="
             sticky
left-0

shadow-[6px_0_10px_rgba(0,0,0,0.04)]

dark:shadow-[6px_0_10px_rgba(0,0,0,0.35)]
              z-40

              border-r

              bg-white

              p-4

              font-semibold

              dark:border-[#2C2C2E]
              dark:bg-[#1C1C1E]
            "
          >
            Nhân viên
          </div>

          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className={`
                flex
                flex-col
                items-center
                justify-center

                border-r

                py-4

                text-center

                last:border-r-0

                dark:border-[#2C2C2E]

                ${isToday(day) ? "bg-blue-50 dark:bg-blue-950/30" : ""}
              `}
            >
              <span className="text-xs text-muted-foreground">
                {format(day, "EEEE", {
                  locale: vi,
                })}
              </span>

              <span className="mt-1 text-lg font-bold">
                {format(day, "dd")}
              </span>

              <span className="text-xs text-muted-foreground">
                {format(day, "MM/yyyy")}
              </span>
            </div>
          ))}
        </div>

        {/* Body */}

        <div>
          {employees.length === 0 ? (
            <div className="flex h-[350px] items-center justify-center">
              <div className="text-center">
                <CalendarDays
                  size={48}
                  className="mx-auto mb-4 text-[#AEAEB2]"
                />

                <h3 className="text-lg font-semibold">
                  Không có lịch làm việc
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Không tìm thấy nhân viên phù hợp.
                </p>
              </div>
            </div>
          ) : (
            employees.map((employee) => (
              <ScheduleRow
                key={employee.id}
                employee={employee}
                onCellClick={onCellClick}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
