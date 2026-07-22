"use client";

import { CheckCircle2, Clock3 } from "lucide-react";

interface Props {
  isPaid: boolean;
}

export default function SalaryStatusBadge({ isPaid }: Props) {
  if (isPaid) {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-green-100
          px-3
          py-1.5
          text-xs
          font-semibold
          text-green-700
          dark:bg-green-900/30
          dark:text-green-300
        "
      >
        <CheckCircle2 size={14} />
        Đã thanh toán
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        bg-orange-100
        px-3
        py-1.5
        text-xs
        font-semibold
        text-orange-700
        dark:bg-orange-900/30
        dark:text-orange-300
      "
    >
      <Clock3 size={14} />
      Chưa thanh toán
    </span>
  );
}