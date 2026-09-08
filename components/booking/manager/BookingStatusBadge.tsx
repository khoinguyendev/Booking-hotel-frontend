"use client";

import { BookingStatus } from "@/types/booking";
import { bookingStatusConfig } from "./config/bookingStatus";

interface Props {
  status: BookingStatus;
}

export default function BookingStatusBadge({ status }: Props) {
  const config = bookingStatusConfig[status];

  if (!config) {
    return (
      <span
        className="
          rounded-full
          bg-gray-100
          px-3
          py-1
          text-xs
          font-semibold
          text-gray-500
        "
      >
        Không xác định
      </span>
    );
  }

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
}