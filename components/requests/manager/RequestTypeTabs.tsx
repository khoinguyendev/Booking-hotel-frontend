// components/request/RequestTypeTabs.tsx

"use client";

import {
  FileText,
  CalendarDays,
  ArrowLeftRight,
  Clock3,
} from "lucide-react";

import { RequestType } from "@/types/requests";

export type RequestTab = "all" | RequestType;

interface Props {
  value: RequestTab;
  onChange: (value: RequestTab) => void;

  counts?: {
    all?: number;
    Leave?: number;
    ShiftChange?: number;
    Overtime?: number;
  };
}

const tabs: {
  value: RequestTab;
  label: string;
  icon: React.ElementType;
  color: string;
  activeColor: string;
  countColor: string;
}[] = [
  {
    value: "all",
    label: "Tất cả",
    icon: FileText,
    color:
      "text-slate-500 dark:text-slate-400",
    activeColor:
      "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white",
    countColor:
      "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  },
  {
    value: "Leave",
    label: "Nghỉ phép",
    icon: CalendarDays,
    color:
      "text-blue-500 dark:text-blue-400",
    activeColor:
      "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    countColor:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
  },
  {
    value: "ShiftChange",
    label: "Đổi ca",
    icon: ArrowLeftRight,
    color:
      "text-violet-500 dark:text-violet-400",
    activeColor:
      "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
    countColor:
      "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300",
  },
  {
    value: "Overtime",
    label: "Tăng ca",
    icon: Clock3,
    color:
      "text-orange-500 dark:text-orange-400",
    activeColor:
      "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
    countColor:
      "bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300",
  },
];

export default function RequestTypeTabs({
  value,
  onChange,
  counts,
}: Props) {
  return (
    <div
      className="
        w-fit
        max-w-full
        overflow-x-auto
        rounded-2xl
        border
        border-[#E5E5EA]
        bg-white
        p-1.5
        shadow-sm

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div className="flex min-w-max items-center gap-1">
        {tabs.map((tab) => {
          const active = value === tab.value;

          const Icon = tab.icon;

          const count =
            tab.value === "all"
              ? counts?.all
              : counts?.[tab.value];

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange(tab.value)}
              className={`
                group
                flex
                items-center
                gap-2
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-semibold
                transition-all
                duration-200

                ${
                  active
                    ? `${tab.activeColor} shadow-sm`
                    : "text-[#8E8E93] hover:bg-[#F7F7F8] hover:text-[#1C1C1E] dark:hover:bg-[#2C2C2E] dark:hover:text-white"
                }
              `}
            >
              <Icon
                size={17}
                strokeWidth={active ? 2.3 : 2}
                className={
                  active
                    ? ""
                    : `${tab.color} transition-transform group-hover:scale-110`
                }
              />

              <span>{tab.label}</span>

              {count !== undefined && (
                <span
                  className={`
                    min-w-[24px]
                    rounded-full
                    px-1.5
                    py-0.5
                    text-center
                    text-[11px]
                    font-bold
                    leading-4
                    transition-colors

                    ${
                      active
                        ? tab.countColor
                        : "bg-[#F2F2F7] text-[#8E8E93] dark:bg-[#2C2C2E] dark:text-[#AEAEB2]"
                    }
                  `}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}