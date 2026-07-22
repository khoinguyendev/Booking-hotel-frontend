'use client';

import {
  Sunrise,
  Sunset,
  MoonStar,
  Coffee,
  Circle,
} from 'lucide-react';

const items = [
  {
    title: 'Ca sáng',
    icon: Sunrise,
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    text: 'text-blue-700 dark:text-blue-300',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Ca chiều',
    icon: Sunset,
    bg: 'bg-orange-50 dark:bg-orange-950/20',
    text: 'text-orange-700 dark:text-orange-300',
    iconColor: 'text-orange-500',
  },
  {
    title: 'Ca tối',
    icon: MoonStar,
    bg: 'bg-violet-50 dark:bg-violet-950/20',
    text: 'text-violet-700 dark:text-violet-300',
    iconColor: 'text-violet-500',
  },
  {
    title: 'Ngày nghỉ',
    icon: Coffee,
    bg: 'bg-gray-100 dark:bg-[#2C2C2E]',
    text: 'text-gray-700 dark:text-gray-300',
    iconColor: 'text-gray-500',
  },
  {
    title: 'Chưa phân ca',
    icon: Circle,
    bg: 'bg-white dark:bg-[#1C1C1E]',
    text: 'text-gray-600 dark:text-gray-400',
    iconColor: 'text-gray-400',
  },
];

export default function CalendarLegend() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-[#E5E5EA]
        dark:border-[#2C2C2E]
        bg-white
        dark:bg-[#1C1C1E]
        p-5
        shadow-sm
      "
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
          Chú thích
        </h3>

        <span className="text-xs text-gray-500">
          Màu sắc của lịch
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`
                flex items-center gap-2
                rounded-full
                px-4
                py-2
                ${item.bg}
              `}
            >
              <Icon
                size={16}
                className={item.iconColor}
              />

              <span
                className={`
                  text-xs
                  font-semibold
                  ${item.text}
                `}
              >
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}