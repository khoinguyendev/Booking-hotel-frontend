"use client";

import { PaymentStatus } from "@/types/booking";

interface Props {
  status: PaymentStatus;
}

const config: Record<
  PaymentStatus,
  {
    label: string;
    className: string;
  }
> = {
  [PaymentStatus.Pending]: {
    label: "Chờ thanh toán",
    className:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-300",
  },

  [PaymentStatus.Paid]: {
    label: "Đã thanh toán",
    className:
      "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300",
  },

  [PaymentStatus.Failed]: {
    label: "Thanh toán thất bại",
    className:
      "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300",
  },

  [PaymentStatus.Expired]: {
    label: "Thanh toán hết hạn",
    className:
      "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
  },

  [PaymentStatus.Refunded]: {
    label: "Đã hoàn tiền",
    className:
      "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300",
  },
};

export default function PaymentStatusBadge({ status }: Props) {
  const item = config[status];

  if (!item) {
    return null;
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
        ${item.className}
      `}
    >
      {item.label}
    </span>
  );
}