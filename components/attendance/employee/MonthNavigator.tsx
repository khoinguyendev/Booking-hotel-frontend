
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}

export default function MonthNavigator({
  month,
  year,
  onChange,
}: Props) {
  const currentDate = new Date();

  const isCurrentMonth =
    month === currentDate.getMonth() &&
    year === currentDate.getFullYear();

  const handlePrevious = () => {
    if (month === 0) {
      onChange(11, year - 1);
    } else {
      onChange(month - 1, year);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      onChange(0, year + 1);
    } else {
      onChange(month + 1, year);
    }
  };

  const handleToday = () => {
    onChange(
      currentDate.getMonth(),
      currentDate.getFullYear(),
    );
  };

  const label = new Intl.DateTimeFormat("vi-VN", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month, 1));

  return (
    <div className="flex items-center justify-between rounded-3xl border border-[#E5E5EA] bg-white p-3 shadow-sm dark:border-[#2C2C2E] dark:bg-[#1C1C1E]">
      {/* Previous */}
      <button
        type="button"
        onClick={handlePrevious}
        className="
          flex h-11 w-11 items-center justify-center
          rounded-2xl
          text-[#8E8E93]
          transition
          hover:bg-[#F2F2F7]
          hover:text-[#007AFF]
          dark:hover:bg-[#2C2C2E]
        "
        aria-label="Tháng trước"
      >
        <ChevronLeft size={22} />
      </button>

      {/* Current month */}
      <div className="flex items-center gap-3">
        <div className="text-center">
          <p className="text-lg font-bold capitalize">
            {label}
          </p>

          <p className="text-xs text-[#8E8E93]">
            Lịch sử chấm công
          </p>
        </div>

        {!isCurrentMonth && (
          <button
            type="button"
            onClick={handleToday}
            className="
              rounded-xl
              bg-blue-50
              px-3
              py-1.5
              text-xs
              font-semibold
              text-[#007AFF]
              transition
              hover:bg-blue-100
              dark:bg-blue-950/30
              dark:hover:bg-blue-950/50
            "
          >
            Hôm nay
          </button>
        )}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={handleNext}
        className="
          flex h-11 w-11 items-center justify-center
          rounded-2xl
          text-[#8E8E93]
          transition
          hover:bg-[#F2F2F7]
          hover:text-[#007AFF]
          dark:hover:bg-[#2C2C2E]
        "
        aria-label="Tháng sau"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}

