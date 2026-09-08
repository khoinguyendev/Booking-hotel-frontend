"use client";

import { SalaryDetail } from "@/types/salary";
import SalaryDetailItem from "./SalaryDetailItem";

interface Props {
  details: SalaryDetail[];
  onSelect?: (detail: SalaryDetail) => void;
}

export default function SalaryDetailList({
  details,
  onSelect,
}: Props) {
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Chi tiết bảng lương
          </h2>

          <p className="mt-1 text-sm text-[#8E8E93]">
            Các khoản thu nhập và khấu trừ trong tháng
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-[#F2F2F7]
            px-3
            py-1
            text-xs
            font-semibold
            text-[#8E8E93]
            dark:bg-[#2C2C2E]
          "
        >
          {details.length} khoản
        </span>
      </div>

      <div className="space-y-3">
        {details.map((detail) => (
          <SalaryDetailItem
            key={detail.id}
            detail={detail}
            onClick={() => onSelect?.(detail)}
          />
        ))}
      </div>
    </div>
  );
}