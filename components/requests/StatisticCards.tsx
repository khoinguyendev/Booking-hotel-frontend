"use client";

import { StaffRequest } from "@/types/requests";
import { FileText, Clock3, CheckCircle2, XCircle } from "lucide-react";

interface Props {
  requests: StaffRequest[];
}

export default function StatisticCards({ requests }: Props) {
  const total = requests.length;

  const pending = requests.filter((x) => x.status === "Pending").length;

  const approved = requests.filter((x) => x.status === "Approved").length;

  const rejected = requests.filter((x) => x.status === "Rejected").length;

  const cards = [
    {
      title: "Tổng đơn",
      value: total,
      icon: FileText,
      bg: "bg-blue-50 dark:bg-blue-950/30",
      iconBg: "bg-[#007AFF]",
      text: "text-[#007AFF]",
    },
    {
      title: "Chờ duyệt",
      value: pending,
      icon: Clock3,
      bg: "bg-amber-50 dark:bg-amber-950/30",
      iconBg: "bg-amber-500",
      text: "text-amber-600",
    },
    {
      title: "Đã duyệt",
      value: approved,
      icon: CheckCircle2,
      bg: "bg-green-50 dark:bg-green-950/30",
      iconBg: "bg-green-500",
      text: "text-green-600",
    },
    {
      title: "Từ chối",
      value: rejected,
      icon: XCircle,
      bg: "bg-red-50 dark:bg-red-950/30",
      iconBg: "bg-red-500",
      text: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              rounded-3xl
              border
              border-[#E5E5EA]
              ${card.bg}
              p-6
              shadow-sm
              transition-all
              hover:-translate-y-0.5
              hover:shadow-md
              dark:border-[#2C2C2E]
            `}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h2 className={`mt-2 text-4xl font-black ${card.text}`}>
                  {card.value}
                </h2>
              </div>

              <div
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  text-white
                  ${card.iconBg}
                `}
              >
                <Icon size={24} />
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/70 dark:bg-[#2C2C2E]">
              <div
                className={`h-full rounded-full ${card.iconBg}`}
                style={{
                  width: total === 0 ? "0%" : `${(card.value / total) * 100}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-gray-500">
              {total === 0
                ? "Chưa có dữ liệu"
                : `${Math.round((card.value / total) * 100)}% tổng số đơn`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
