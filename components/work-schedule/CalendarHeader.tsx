'use client';

import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface Props {
  month: Date;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
}

const MONTHS = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

export default function CalendarHeader({
  month,
  onPrevious,
  onNext,
  onToday,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

      {/* Title */}

      <div>

        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#007AFF]">
          Lịch làm việc
        </p>

        <h1 className="mt-1 text-3xl font-black tracking-tight text-[#1C1C1E] dark:text-white">
          {MONTHS[month.getMonth()]} {month.getFullYear()}
        </h1>

      </div>

      {/* Actions */}

      <div className="flex items-center gap-3">

        <button
          onClick={onToday}
          className="
            flex items-center gap-2
            rounded-full
            bg-[#007AFF]
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            hover:bg-[#0066CC]
          "
        >
          <CalendarDays size={16} />
          Hôm nay
        </button>

        <div
          className="
            flex items-center
            rounded-full
            border
            border-[#E5E5EA]
            bg-white
            dark:border-[#2C2C2E]
            dark:bg-[#1C1C1E]
            shadow-sm
          "
        >
          <button
            onClick={onPrevious}
            className="
              p-2.5
              rounded-l-full
              hover:bg-gray-100
              dark:hover:bg-[#2C2C2E]
            "
          >
            <ChevronLeft size={18} />
          </button>

          <div className="h-6 w-px bg-[#E5E5EA] dark:bg-[#2C2C2E]" />

          <button
            onClick={onNext}
            className="
              p-2.5
              rounded-r-full
              hover:bg-gray-100
              dark:hover:bg-[#2C2C2E]
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>

    </div>
  );
}