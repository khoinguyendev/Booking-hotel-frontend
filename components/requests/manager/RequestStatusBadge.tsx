// components/request/RequestStatusBadge.tsx

"use client";

import { RequestStatus } from "@/types/requests";
import {
  CheckCircle2,
  Clock3,
  XCircle,
  Ban,
} from "lucide-react";


interface Props {
  status: RequestStatus;
}

export default function RequestStatusBadge({
  status,
}: Props) {
  switch (status) {
    case 1:
      return (
        <Badge
          icon={<Clock3 size={14} />}
          className="
            bg-orange-100
            text-orange-700
            dark:bg-orange-900/30
            dark:text-orange-300
          "
        >
          Chờ duyệt
        </Badge>
      );

    case 2:
      return (
        <Badge
          icon={<CheckCircle2 size={14} />}
          className="
            bg-green-100
            text-green-700
            dark:bg-green-900/30
            dark:text-green-300
          "
        >
          Đã duyệt
        </Badge>
      );

    case 3:
      return (
        <Badge
          icon={<XCircle size={14} />}
          className="
            bg-red-100
            text-red-700
            dark:bg-red-900/30
            dark:text-red-300
          "
        >
          Từ chối
        </Badge>
      );

    case 4:
      return (
        <Badge
          icon={<Ban size={14} />}
          className="
            bg-gray-100
            text-gray-700
            dark:bg-[#2C2C2E]
            dark:text-gray-300
          "
        >
          Đã hủy
        </Badge>
      );
  }
}

function Badge({
  children,
  icon,
  className,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${className}
      `}
    >
      {icon}
      {children}
    </div>
  );
}