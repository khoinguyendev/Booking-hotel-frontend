'use client';

import {
  CheckCircle2,
  CircleAlert,
  Clock3,
  BedDouble,
  UserRoundX,
} from 'lucide-react';

export type AttendanceQuickFilter =
  | 'all'
  | 'present'
  | 'late'
  | 'dayoff'
  | 'notcheckin';

interface Props {
  value: AttendanceQuickFilter;
  onChange: (value: AttendanceQuickFilter) => void;
}

export default function QuickAttendanceFilter({
  value,
  onChange,
}: Props) {
  const items: {
    value: AttendanceQuickFilter;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: 'all',
      label: 'Tất cả',
      icon: <Clock3 size={16} />,
    },
    {
      value: 'present',
      label: 'Có mặt',
      icon: <CheckCircle2 size={16} />,
    },
    {
      value: 'late',
      label: 'Đi trễ',
      icon: <CircleAlert size={16} />,
    },
    {
      value: 'dayoff',
      label: 'Nghỉ',
      icon: <BedDouble size={16} />,
    },
    {
      value: 'notcheckin',
      label: 'Chưa check-in',
      icon: <UserRoundX size={16} />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
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
              font-semibold

              transition-all

              ${
                active
                  ? 'border-[#007AFF] bg-[#007AFF] text-white shadow-md'
                  : 'border-[#E5E5EA] bg-white text-[#3A3A3C] hover:border-[#007AFF] hover:text-[#007AFF] dark:border-[#2C2C2E] dark:bg-[#1C1C1E] dark:text-white'
              }
            `}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}