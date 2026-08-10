// components/request/RequestStats.tsx

"use client";

import {
  Clock3,
  FileCheck2,
  FileText,
  XCircle,
} from "lucide-react";

interface Props {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

export default function RequestStats({
  pending,
  approved,
  rejected,
  total,
}: Props) {
  const stats = [
    {
      label: "Chờ duyệt",
      value: pending,
      description: "Cần xử lý",
      icon: Clock3,
      iconClass:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
    },
    {
      label: "Đã duyệt",
      value: approved,
      description: "Trong tháng",
      icon: FileCheck2,
      iconClass:
        "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300",
    },
    {
      label: "Từ chối",
      value: rejected,
      description: "Trong tháng",
      icon: XCircle,
      iconClass:
        "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",
    },
    {
      label: "Tổng đơn",
      value: total,
      description: "Trong tháng",
      icon: FileText,
      iconClass:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="
              rounded-3xl
              border
              border-[#E5E5EA]
              bg-white
              p-5
              shadow-sm
              transition
              hover:shadow-md

              dark:border-[#2C2C2E]
              dark:bg-[#1C1C1E]
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-[#8E8E93]">
                  {item.label}
                </p>

                <p className="mt-2 text-3xl font-bold tracking-tight">
                  {item.value}
                </p>

                <p className="mt-1 text-xs text-[#8E8E93]">
                  {item.description}
                </p>
              </div>

              <div
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  ${item.iconClass}
                `}
              >
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}