'use client';

import { useEffect, useMemo, useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarStats from './CalendarStats';
import CalendarLegend from './CalendarLegend';
import CalendarDay from './CalendarDay';
import { Shift } from '@/types/shift';
import { shiftService } from '@/services/shift.service';

export interface ShiftResponse {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}

export interface WorkScheduleResponse {
  id: number;
  workDate: string;
  isDayOff: boolean;
  shift: ShiftResponse | null;
  attendance: any;
}

interface Props {
  schedules: WorkScheduleResponse[];
}

interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
}

const WEEKDAYS = [
  'T2',
  'T3',
  'T4',
  'T5',
  'T6',
  'T7',
  'CN',
];

export default function WorkCalendar({
  schedules,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
    const [shifts, setShifts] = useState<Shift[]>([]);

  const scheduleMap = useMemo(() => {
    return new Map(
      schedules.map((x) => [x.workDate, x])
    );
  }, [schedules]);

  const calendar = useMemo(() => {
    return buildCalendar(currentMonth);
  }, [currentMonth]);

  useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await shiftService.getShifts();

            setShifts(response.data.data);
          } catch (error) {
            console.error(error);
          }
        };
  
        fetchData();
      }, []);
  return (
    <div className="space-y-6">

      <CalendarHeader
        month={currentMonth}
        onPrevious={() =>
          setCurrentMonth(
            new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth() - 1,
              1
            )
          )
        }
        onNext={() =>
          setCurrentMonth(
            new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth() + 1,
              1
            )
          )
        }
        onToday={() =>
          setCurrentMonth(new Date())
        }
      />

      <CalendarStats schedules={schedules} />

      <CalendarLegend />

      {/* Calendar */}

      <div
        className="
          rounded-3xl
          bg-white
          dark:bg-[#1C1C1E]
          p-6
          border
          border-[#E5E5EA]
          dark:border-[#2C2C2E]
          shadow-sm
        "
      >
        {/* Week */}

        <div className="grid grid-cols-7 gap-4 mb-4">

          {WEEKDAYS.map((day) => (

            <div
              key={day}
              className="
                text-center
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-gray-500
              "
            >
              {day}
            </div>

          ))}

        </div>

        {/* Calendar */}

        <div className="grid grid-cols-7 gap-4">

          {calendar.map((item) => {

            const key = formatDate(item.date);

            return (
              <CalendarDay
                key={key}
                date={item.date}
                shifts={shifts}
                isCurrentMonth={
                  item.isCurrentMonth
                }
                schedule={scheduleMap.get(key)}
              />
            );
          })}

        </div>
      </div>

    </div>
  );
}

function buildCalendar(
  month: Date
): CalendarCell[] {

  const year = month.getFullYear();

  const monthIndex = month.getMonth();

  const firstDay = new Date(
    year,
    monthIndex,
    1
  );

  const start = new Date(firstDay);

  const offset =
    firstDay.getDay() === 0
      ? 6
      : firstDay.getDay() - 1;

  start.setDate(start.getDate() - offset);

  const result: CalendarCell[] = [];

  for (let i = 0; i < 42; i++) {

    const date = new Date(start);

    date.setDate(start.getDate() + i);

    result.push({
      date,
      isCurrentMonth:
        date.getMonth() === monthIndex,
    });
  }

  return result;
}

function formatDate(date: Date) {

  const y = date.getFullYear();

  const m = String(
    date.getMonth() + 1
  ).padStart(2, '0');

  const d = String(
    date.getDate()
  ).padStart(2, '0');

  return `${y}-${m}-${d}`;
}