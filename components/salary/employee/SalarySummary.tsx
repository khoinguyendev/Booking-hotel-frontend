"use client";

import { Salary } from "@/types/salary";
import {
  Banknote,
  Gift,
  BadgePlus,
  Clock3,
  BadgeMinus,
  Wallet,
} from "lucide-react";


interface Props {
  salary: Salary;
}

export default function SalarySummary({ salary }: Props) {
  const rows = [
    {
      title: "Lương cơ bản",
      value: salary.basicSalary,
      icon: Banknote,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      positive: true,
    },
    {
      title: "Phụ cấp",
      value: salary.totalAllowance,
      icon: BadgePlus,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
      positive: true,
    },
    {
      title: "Thưởng",
      value: salary.totalBonus,
      icon: Gift,
      color: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-900/30",
      positive: true,
    },
    {
      title: "Lương OT",
      value: salary.overtimeSalary,
      icon: Clock3,
      color: "text-violet-600",
      bg: "bg-violet-100 dark:bg-violet-900/30",
      positive: true,
    },
    {
      title: "Khấu trừ",
      value: salary.totalDeduction,
      icon: BadgeMinus,
      color: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/30",
      positive: false,
    },
  ];

  return (
    <div
      className="
        rounded-3xl
        border
        border-[#E5E5EA]
        bg-white
        p-6
        shadow-sm
        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div className="mb-6 flex items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-[#007AFF]/10
          "
        >
          <Wallet className="text-[#007AFF]" />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Tổng quan lương
          </h2>

          <p className="text-sm text-[#8E8E93]">
            Chi tiết các khoản thu nhập và khấu trừ
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((row) => {
          const Icon = row.icon;

          return (
            <div
              key={row.title}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-[#F2F2F7]
                p-4
                transition-all
                hover:bg-[#FAFAFA]
                dark:border-[#2C2C2E]
                dark:hover:bg-[#2C2C2E]
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    ${row.bg}
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                  `}
                >
                  <Icon
                    size={20}
                    className={row.color}
                  />
                </div>

                <div>
                  <p className="font-semibold">
                    {row.title}
                  </p>

                  <p className="text-xs text-[#8E8E93]">
                    {row.positive
                      ? "Khoản cộng"
                      : "Khoản trừ"}
                  </p>
                </div>
              </div>

              <span
                className={`
                  text-lg
                  font-bold
                  ${
                    row.positive
                      ? "text-green-600"
                      : "text-red-500"
                  }
                `}
              >
                {row.positive ? "+" : "-"}
                {row.value.toLocaleString("vi-VN")}đ
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="
          mt-8
          rounded-3xl
          bg-gradient-to-r
          from-[#007AFF]
          to-[#5AC8FA]
          p-6
          text-white
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80">
              Lương thực nhận
            </p>

            <h2 className="mt-2 text-4xl font-black">
              {salary.netSalary.toLocaleString("vi-VN")}đ
            </h2>
          </div>

          <Wallet size={44} />
        </div>
      </div>
    </div>
  );
}