"use client";

import { Salary } from "@/types/salary";
import {
  BriefcaseBusiness,
  Clock3,
  CalendarX2,
  BadgeDollarSign,
} from "lucide-react";


interface Props {
  salary: Salary;
}

export default function SalaryStatistics({ salary }: Props) {
  const items = [
    {
      title: "Ngày công",
      value: `${salary.workingDays}`,
      subtitle: "Ngày làm việc",
      icon: BriefcaseBusiness,
      bg: "bg-blue-50 dark:bg-blue-950/20",
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      iconColor: "text-blue-600",
    },
    {
      title: "Làm thêm",
      value: `${salary.overtimeHours} giờ`,
      subtitle: "Overtime",
      icon: Clock3,
      bg: "bg-orange-50 dark:bg-orange-950/20",
      iconBg: "bg-orange-100 dark:bg-orange-900/40",
      iconColor: "text-orange-500",
    },
    {
      title: "Nghỉ",
      value: `${salary.absentDays}`,
      subtitle: "Ngày nghỉ",
      icon: CalendarX2,
      bg: "bg-red-50 dark:bg-red-950/20",
      iconBg: "bg-red-100 dark:bg-red-900/40",
      iconColor: "text-red-500",
    },
    {
      title: "Khấu trừ",
      value: `${salary.totalDeduction.toLocaleString("vi-VN")}đ`,
      subtitle: "Tổng khấu trừ",
      icon: BadgeDollarSign,
      bg: "bg-violet-50 dark:bg-violet-950/20",
      iconBg: "bg-violet-100 dark:bg-violet-900/40",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`
              ${item.bg}
              rounded-3xl
              border
              border-[#E5E5EA]
              p-5
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-lg
              dark:border-[#2C2C2E]
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8E8E93]">
                  {item.title}
                </p>

                <h3 className="mt-2 text-2xl font-black text-[#1C1C1E] dark:text-white">
                  {item.value}
                </h3>

                <p className="mt-1 text-xs text-[#8E8E93]">
                  {item.subtitle}
                </p>
              </div>

              <div
                className={`
                  ${item.iconBg}
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                `}
              >
                <Icon
                  size={28}
                  className={item.iconColor}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}