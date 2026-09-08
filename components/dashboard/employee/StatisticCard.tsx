"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface Statistic {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

interface Props {
  statistic: Statistic;
}
export default function StatisticCard({ statistic }: Props) {
    const {
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor = "text-[#007AFF]",
    iconBg = "bg-[#EAF4FF]",
    trend,
  } = statistic;
  return (
    <div
      className="
        rounded-3xl
        border
        border-[#E5E5EA]
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:shadow-md

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#8E8E93]">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-black">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-[#8E8E93]">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${iconBg}
          `}
        >
          <Icon
            size={26}
            className={iconColor}
          />
        </div>
      </div>

      {trend && (
        <div className="mt-5 flex items-center gap-2">
          {trend.positive ? (
            <TrendingUp
              size={16}
              className="text-green-500"
            />
          ) : (
            <TrendingDown
              size={16}
              className="text-red-500"
            />
          )}

          <span
            className={`text-xs font-semibold ${
              trend.positive
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {trend.value}
          </span>

          <span className="text-xs text-[#8E8E93]">
            so với tháng trước
          </span>
        </div>
      )}
    </div>
  );
}