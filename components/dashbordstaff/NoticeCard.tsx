"use client";

import { NoticeItem } from "@/types/dashboardstaff";
import {
  Bell,
  Megaphone,
  AlertTriangle,
  CalendarClock,
  ChevronRight,
} from "lucide-react";


interface Props {
  notices: NoticeItem[];
}

export default function NoticeCard({
  notices,
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
            Thông báo
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Mới nhất
          </h2>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
          <Bell
            size={24}
            className="text-blue-600"
          />
        </div>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => {
          const config = getConfig(notice.type);

          const Icon = config.icon;

          return (
            <button
              key={notice.id}
              className="
                flex
                w-full
                items-start
                gap-4
                rounded-2xl
                border
                border-[#F2F2F7]
                p-4
                text-left
                transition-all
                hover:border-[#007AFF]
                hover:bg-[#F8FBFF]
                dark:border-[#2C2C2E]
                dark:hover:bg-[#2C2C2E]
              "
            >
              <div
                className={`
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  ${config.bg}
                `}
              >
                <Icon
                  size={22}
                  className={config.color}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold">
                      {notice.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-[#8E8E93]">
                      {notice.content}
                    </p>
                  </div>

                  {notice.unread && (
                    <span className="mt-1 h-3 w-3 rounded-full bg-red-500" />
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#8E8E93]">
                    <CalendarClock size={14} />
                    {notice.time}
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-[#8E8E93]"
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        className="
          mt-6
          w-full
          rounded-2xl
          border
          border-[#007AFF]
          py-3
          font-semibold
          text-[#007AFF]
          transition
          hover:bg-[#007AFF]
          hover:text-white
        "
      >
        Xem tất cả thông báo
      </button>
    </div>
  );
}

function getConfig(type: NoticeItem["type"]) {
  switch (type) {
    case "announcement":
      return {
        icon: Megaphone,
        bg: "bg-blue-100 dark:bg-blue-900/30",
        color: "text-blue-600",
      };

    case "warning":
      return {
        icon: AlertTriangle,
        bg: "bg-red-100 dark:bg-red-900/30",
        color: "text-red-600",
      };

    case "schedule":
      return {
        icon: CalendarClock,
        bg: "bg-green-100 dark:bg-green-900/30",
        color: "text-green-600",
      };

    default:
      return {
        icon: Bell,
        bg: "bg-gray-100 dark:bg-gray-800",
        color: "text-gray-600",
      };
  }
}