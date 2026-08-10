'use client';

import { Coffee, Moon, Sun, Users, Clock3 } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const filters = [
  {
    value: 'all',
    label: 'Tất cả',
    icon: Users,
  },
  {
    value: 'morning',
    label: 'Ca sáng',
    icon: Sun,
  },
  {
    value: 'afternoon',
    label: 'Ca chiều',
    icon: Clock3,
  },
  {
    value: 'night',
    label: 'Ca tối',
    icon: Moon,
  },
  {
    value: 'dayoff',
    label: 'Nghỉ',
    icon: Coffee,
  },
  {
    value: 'unassigned',
    label: 'Chưa phân ca',
    icon: Clock3,
  },
];

export default function QuickScheduleFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((item) => {
        const Icon = item.icon;

        const active = value === item.value;

        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`
              inline-flex
              items-center
              gap-2

              rounded-full

              border

              px-4
              py-2

              text-sm
              font-medium

              transition-all
              duration-200

              ${
                active
                  ? `
                    border-[#007AFF]
                    bg-[#007AFF]
                    text-white
                    shadow-md
                  `
                  : `
                    border-[#E5E5EA]
                    bg-white
                    text-[#1C1C1E]

                    hover:border-[#007AFF]
                    hover:text-[#007AFF]

                    dark:border-[#3A3A3C]
                    dark:bg-[#1C1C1E]
                    dark:text-white
                  `
              }
            `}
          >
            <Icon size={16} />

            {item.label}
          </button>
        );
      })}
    </div>
  );
}