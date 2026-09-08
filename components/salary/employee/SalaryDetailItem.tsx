"use client";

import { SalaryDetail } from "@/types/salary";
import {
  BadgeMinus,
  BadgePlus,
  Banknote,
  ChevronRight,
  Clock3,
  Gift,
} from "lucide-react";


interface Props {
  detail: SalaryDetail;
  onClick?: () => void;
}

export default function SalaryDetailItem({
  detail,
  onClick,
}: Props) {
  const config = getConfig(detail.type);

  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        justify-between
        rounded-2xl
        border
        border-[#E5E5EA]
        bg-white
        p-4
        text-left
        shadow-sm
        transition-all
        duration-200
        hover:border-[#007AFF]
        hover:shadow-md
        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div className="flex items-center gap-4">
        <div
          className={`
            ${config.bg}
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
          `}
        >
          <Icon
            size={22}
            className={config.iconColor}
          />
        </div>

        <div>
          <p className="font-semibold text-[#1C1C1E] dark:text-white">
            {detail.title}
          </p>

          {detail.description && (
            <p className="mt-1 text-xs text-[#8E8E93]">
              {detail.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`
            text-base
            font-bold
            ${config.textColor}
          `}
        >
          {config.prefix}
          {detail.amount.toLocaleString("vi-VN")}đ
        </span>

        <ChevronRight
          size={18}
          className="text-[#C7C7CC]"
        />
      </div>
    </button>
  );
}

    function getConfig(type: SalaryDetail["type"]) {
    switch (type) {
        case "Basic":
        return {
            icon: Banknote,
            prefix: "+",
            bg: "bg-blue-100 dark:bg-blue-900/30",
            iconColor: "text-blue-600",
            textColor: "text-blue-600",
        };

        case "Allowance":
        return {
            icon: BadgePlus,
            prefix: "+",
            bg: "bg-green-100 dark:bg-green-900/30",
            iconColor: "text-green-600",
            textColor: "text-green-600",
        };

        case "Bonus":
        return {
            icon: Gift,
            prefix: "+",
            bg: "bg-amber-100 dark:bg-amber-900/30",
            iconColor: "text-amber-600",
            textColor: "text-amber-600",
        };

        case "Overtime":
        return {
            icon: Clock3,
            prefix: "+",
            bg: "bg-violet-100 dark:bg-violet-900/30",
            iconColor: "text-violet-600",
            textColor: "text-violet-600",
        };

        case "Deduction":
        return {
            icon: BadgeMinus,
            prefix: "-",
            bg: "bg-red-100 dark:bg-red-900/30",
            iconColor: "text-red-600",
            textColor: "text-red-600",
        };

        default:
        return {
            icon: Banknote,
            prefix: "",
            bg: "bg-gray-100",
            iconColor: "text-gray-600",
            textColor: "text-gray-700",
        };
    }
    }