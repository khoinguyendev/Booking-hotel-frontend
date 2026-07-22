"use client";

import { SalarySummary } from "@/types/dashboardstaff";
import {
  Wallet,
  TrendingUp,
  CircleDollarSign,
  PiggyBank,
} from "lucide-react";


interface Props {
  salary: SalarySummary;
}

export default function SalaryCard({ salary }: Props) {
  const progress =
    salary.expectedSalary === 0
      ? 0
      : Math.min(
          100,
          (salary.currentSalary / salary.expectedSalary) * 100,
        );

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
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#8E8E93]">
            Lương tháng này
          </p>

          <h2 className="mt-2 text-3xl font-black text-green-600">
            {salary.currentSalary.toLocaleString("vi-VN")}₫
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900/30">
          <Wallet
            size={28}
            className="text-green-600"
          />
        </div>
      </div>

      {/* Progress */}

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-[#8E8E93]">
            Tiến độ lương
          </span>

          <span className="text-sm font-semibold">
            {progress.toFixed(0)}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-[#2C2C2E]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Info */}

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircleDollarSign
              size={18}
              className="text-[#007AFF]"
            />

            <span className="text-sm">
              Dự kiến
            </span>
          </div>

          <span className="font-bold">
            {salary.expectedSalary.toLocaleString("vi-VN")}₫
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBank
              size={18}
              className="text-amber-500"
            />

            <span className="text-sm">
              Còn lại
            </span>
          </div>

          <span className="font-bold text-amber-600">
            {(salary.expectedSalary - salary.currentSalary).toLocaleString(
              "vi-VN",
            )}
            ₫
          </span>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-6 rounded-2xl bg-green-50 p-4 dark:bg-green-900/20">
        <div className="flex items-center gap-2">
          <TrendingUp
            size={18}
            className="text-green-600"
          />

          <div>
            <p className="text-sm font-semibold text-green-700 dark:text-green-300">
              Thu nhập đang tăng
            </p>

            <p className="text-xs text-green-600">
              +6.5% so với tháng trước
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}