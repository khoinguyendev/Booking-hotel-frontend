'use client';

import {
  CalendarDays,
  Sunrise,
  Sunset,
  MoonStar,
  Coffee,
} from 'lucide-react';
import { WorkScheduleResponse } from './WorkCalendar';

interface Props {
  schedules: WorkScheduleResponse[];
}

export default function CalendarStats({ schedules }: Props) {
  const total = schedules.length;

  const dayOff = schedules.filter((x) => x.isDayOff).length;

  const morning = schedules.filter(
    (x) =>
      !x.isDayOff &&
      x.shift?.name.toLowerCase().includes('sáng')
  ).length;

  const afternoon = schedules.filter(
    (x) =>
      !x.isDayOff &&
      x.shift?.name.toLowerCase().includes('chiều')
  ).length;

  const night = schedules.filter(
    (x) =>
      !x.isDayOff &&
      x.shift?.name.toLowerCase().includes('tối')
  ).length;

  const cards = [
    {
      title: 'Tổng ca',
      value: total,
      icon: CalendarDays,
      color: 'blue',
    },
    {
      title: 'Ca sáng',
      value: morning,
      icon: Sunrise,
      color: 'sky',
    },
    {
      title: 'Ca chiều',
      value: afternoon,
      icon: Sunset,
      color: 'orange',
    },
    {
      title: 'Ca tối',
      value: night,
      icon: MoonStar,
      color: 'violet',
    },
    {
      title: 'Ngày nghỉ',
      value: dayOff,
      icon: Coffee,
      color: 'gray',
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">

      {cards.map((item) => {

        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`
              rounded-3xl
              border
              bg-white
              dark:bg-[#1C1C1E]
              p-5
              shadow-sm
              ${getBorder(item.color)}
            `}
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-medium text-gray-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-black text-[#1C1C1E] dark:text-white">
                  {item.value}
                </h2>

              </div>

              <div
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl

                  ${getBackground(item.color)}
                `}
              >
                <Icon
                  size={22}
                  className={getIcon(item.color)}
                />
              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}

function getBorder(color: string) {
  switch (color) {
    case 'blue':
      return 'border-blue-200';

    case 'sky':
      return 'border-sky-200';

    case 'orange':
      return 'border-orange-200';

    case 'violet':
      return 'border-violet-200';

    default:
      return 'border-gray-200 dark:border-[#2C2C2E]';
  }
}

function getBackground(color: string) {
  switch (color) {
    case 'blue':
      return 'bg-blue-50 dark:bg-blue-950/20';

    case 'sky':
      return 'bg-sky-50 dark:bg-sky-950/20';

    case 'orange':
      return 'bg-orange-50 dark:bg-orange-950/20';

    case 'violet':
      return 'bg-violet-50 dark:bg-violet-950/20';

    default:
      return 'bg-gray-100 dark:bg-[#2C2C2E]';
  }
}

function getIcon(color: string) {
  switch (color) {
    case 'blue':
      return 'text-blue-600';

    case 'sky':
      return 'text-sky-600';

    case 'orange':
      return 'text-orange-600';

    case 'violet':
      return 'text-violet-600';

    default:
      return 'text-gray-600';
  }
}