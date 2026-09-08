"use client";

import {
  LucideIcon,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface Props {
  title: string;
  value: number | string;
  icon: LucideIcon;

  color?: "blue" | "green" | "orange" | "red" | "gray";

  description?: string;

  change?: number;

  onClick?: () => void;
}

const colorMap = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    icon: "bg-blue-500 text-white",
    text: "text-blue-600 dark:text-blue-300",
  },

  green: {
    bg: "bg-green-50 dark:bg-green-950/30",
    icon: "bg-green-500 text-white",
    text: "text-green-600 dark:text-green-300",
  },

  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/30",
    icon: "bg-orange-500 text-white",
    text: "text-orange-600 dark:text-orange-300",
  },

  red: {
    bg: "bg-red-50 dark:bg-red-950/30",
    icon: "bg-red-500 text-white",
    text: "text-red-600 dark:text-red-300",
  },

  gray: {
    bg: "bg-[#F5F5F7] dark:bg-[#1C1C1E]",
    icon: "bg-[#8E8E93] text-white",
    text: "text-[#8E8E93]",
  },
};

export default function BookingStatCard({
  title,
  value,
  icon: Icon,
  color = "blue",
  description,
  change,
  onClick,
}: Props) {
  const style = colorMap[color];

  return (
    <div
      onClick={onClick}
      className={`
        ${style.bg}

        rounded-3xl
        border
        border-[#E5E5EA]
        p-6

        shadow-sm

        transition-all
        hover:-translate-y-1
        hover:shadow-md

        dark:border-[#2C2C2E]

        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#8E8E93]">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight">
            {value}
          </h2>
        </div>

        <div
          className={`
            ${style.icon}

            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
          `}
        >
          <Icon size={24} />
        </div>
      </div>

      {(description || change !== undefined) && (
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-[#8E8E93]">
            {description}
          </span>

          {change !== undefined && (
            <div
              className={`
                flex
                items-center
                gap-1
                text-xs
                font-semibold

                ${
                  change >= 0
                    ? "text-green-600"
                    : "text-red-500"
                }
              `}
            >
              {change >= 0 ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}

              {Math.abs(change)}%
            </div>
          )}
        </div>
      )}
    </div>
  );
}