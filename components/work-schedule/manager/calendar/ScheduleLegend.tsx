'use client';

import {
  Clock3,
  Moon,
  Sunrise,
  Sunset,
} from 'lucide-react';

const legends = [
  {
    label: 'Ca sáng',
    color: 'bg-blue-500',
    icon: Sunrise,
  },
  {
    label: 'Ca chiều',
    color: 'bg-orange-500',
    icon: Sunset,
  },
  {
    label: 'Ca tối',
    color: 'bg-violet-500',
    icon: Moon,
  },
  {
    label: 'Nghỉ',
    color: 'bg-slate-500',
    icon: Moon,
  },
  {
    label: 'Chưa phân ca',
    color: 'bg-gray-400',
    icon: Clock3,
  },
];

export default function ScheduleLegend() {
  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-4

        rounded-2xl
        border
        border-[#E5E5EA]

        bg-white

        px-5
        py-3

        shadow-sm

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <span className="text-sm font-semibold text-muted-foreground">
        Chú thích
      </span>

      {legends.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="flex items-center gap-2"
          >
            <div
              className={`
                flex
                h-8
                w-8
                items-center
                justify-center

                rounded-lg

                text-white

                ${item.color}
              `}
            >
              <Icon size={16} />
            </div>

            <span className="text-sm font-medium">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}