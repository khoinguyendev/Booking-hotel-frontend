"use client";

import { PendingRequest } from "@/types/dashboardstaff";
import {
  FileClock,
  ArrowRightLeft,
  CalendarMinus,
  Clock3,
  ChevronRight,
} from "lucide-react";


interface Props {
  requests: PendingRequest[];
}

export default function PendingRequestCard({
  requests,
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

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#8E8E93]">
            Đơn đang chờ duyệt
          </p>

          <h2 className="mt-2 text-3xl font-black">
            {requests.length}
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/30">
          <FileClock
            size={28}
            className="text-orange-600"
          />
        </div>
      </div>

      {/* List */}

      <div className="mt-6 space-y-3">
        {requests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#E5E5EA] p-8 text-center dark:border-[#2C2C2E]">
            <FileClock
              size={30}
              className="mx-auto text-gray-400"
            />

            <p className="mt-3 text-sm text-[#8E8E93]">
              Không có đơn chờ duyệt
            </p>
          </div>
        ) : (
          requests.map((request) => {
            const config = getConfig(request.type);

            const Icon = config.icon;

            return (
              <div
                key={request.id}
                className="flex items-center justify-between rounded-2xl bg-[#F7F7F9] p-4 transition hover:bg-[#EFEFF4] dark:bg-[#2C2C2E]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${config.bg}`}
                  >
                    <Icon
                      size={20}
                      className={config.color}
                    />
                  </div>

                  <div>
                    <p className="font-semibold">
                      {config.title}
                    </p>

                    <p className="text-xs text-[#8E8E93]">
                      {request.date}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  size={18}
                  className="text-[#8E8E93]"
                />
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}

      {requests.length > 0 && (
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
          Xem tất cả
        </button>
      )}
    </div>
  );
}

function getConfig(type: PendingRequest["type"]) {
  switch (type) {
    case "Leave":
      return {
        title: "Đơn xin nghỉ",
        icon: CalendarMinus,
        bg: "bg-red-100 dark:bg-red-900/30",
        color: "text-red-600",
      };

    case "Shift":
      return {
        title: "Đơn đổi ca",
        icon: ArrowRightLeft,
        bg: "bg-blue-100 dark:bg-blue-900/30",
        color: "text-blue-600",
      };

    case "Overtime":
      return {
        title: "Đơn tăng ca",
        icon: Clock3,
        bg: "bg-violet-100 dark:bg-violet-900/30",
        color: "text-violet-600",
      };

    default:
      return {
        title: "Khác",
        icon: FileClock,
        bg: "bg-gray-100",
        color: "text-gray-600",
      };
  }
}