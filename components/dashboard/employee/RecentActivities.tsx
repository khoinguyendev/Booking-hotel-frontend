"use client";

import { ActivityItem } from "@/types/dashboardstaff";
import {
  ArrowRightLeft,
  CalendarMinus,
  Clock3,
  Wallet,
  LogIn,
  LogOut,
  CheckCircle2,
} from "lucide-react";


interface Props {
  activities: ActivityItem[];
}

export default function RecentActivities({
  activities,
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
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-[#8E8E93]">
            Hoạt động gần đây
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Timeline
          </h2>
        </div>

        <span className="rounded-full bg-[#F2F2F7] px-3 py-1 text-xs font-semibold dark:bg-[#2C2C2E]">
          {activities.length} hoạt động
        </span>
      </div>

      {/* Timeline */}

      <div className="space-y-5">
        {activities.map((activity, index) => {
          const config = getConfig(activity.type);

          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="relative flex gap-4"
            >
              {/* Timeline line */}

              {index !== activities.length - 1 && (
                <div
                  className="
                    absolute
                    left-6
                    top-14
                    h-full
                    w-0.5
                    bg-[#E5E5EA]
                    dark:bg-[#2C2C2E]
                  "
                />
              )}

              {/* Icon */}

              <div
                className={`
                  z-10
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  ${config.bg}
                `}
              >
                <Icon
                  size={20}
                  className={config.color}
                />
              </div>

              {/* Content */}

              <div className="flex-1 rounded-2xl bg-[#F8F8FA] p-4 dark:bg-[#2C2C2E]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold">
                      {activity.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#8E8E93]">
                      {activity.description}
                    </p>
                  </div>

                  <span className="text-xs text-[#8E8E93] whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getConfig(type: ActivityItem["type"]) {
  switch (type) {
    case "attendance":
      return {
        icon: LogIn,
        bg: "bg-green-100 dark:bg-green-900/30",
        color: "text-green-600",
      };

    case "salary":
      return {
        icon: Wallet,
        bg: "bg-amber-100 dark:bg-amber-900/30",
        color: "text-amber-600",
      };

    case "request":
      return {
        icon: ArrowRightLeft,
        bg: "bg-blue-100 dark:bg-blue-900/30",
        color: "text-blue-600",
      };

    case "leave":
      return {
        icon: CalendarMinus,
        bg: "bg-red-100 dark:bg-red-900/30",
        color: "text-red-600",
      };

    case "checkout":
      return {
        icon: LogOut,
        bg: "bg-orange-100 dark:bg-orange-900/30",
        color: "text-orange-600",
      };

    default:
      return {
        icon: CheckCircle2,
        bg: "bg-gray-100 dark:bg-gray-800",
        color: "text-gray-600",
      };
  }
}