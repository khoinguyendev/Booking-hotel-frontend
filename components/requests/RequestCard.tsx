"use client";

import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Coffee,
  RefreshCcw,
} from "lucide-react";

import RequestStatusBadge from "./RequestStatusBadge";
import {
  LeaveData,
  OvertimeData,
  ShiftChangeData,
  StaffRequest,
} from "@/types/requests";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
interface Props {
  request: StaffRequest;
  onClick?: () => void;
}

export default function RequestCard({ request, onClick }: Props) {
  const style = getTypeStyle(request.type);

  return (
    <button
      onClick={onClick}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-3xl
        border
        border-[#E5E5EA]
        bg-white
        p-5
        text-left
        shadow-sm
        transition-all

        hover:-translate-y-0.5
        hover:border-[#007AFF]
        hover:shadow-lg

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      {/* Thanh màu */}

      <div className={`absolute left-0 top-0 h-full w-1 ${style.line}`} />

      {/* Header */}

      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div
            className={`
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl

              ${style.bg}
            `}
          >
            {style.icon}
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white">
              {style.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">{request.staffName}</p>

            <p className="text-xs text-gray-400">{request.employeeCode}</p>
          </div>
        </div>

        <RequestStatusBadge status={request.status} />
      </div>

      {/* Nội dung */}

      <div className="mt-6 rounded-2xl bg-[#F8F8FA] p-4 dark:bg-[#2C2C2E]">
        {renderContent(request)}
      </div>

      {/* Footer */}

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Tạo lúc{" "}
          {format(parseISO(request.createdAt), "HH:mm, dd/MM/yyyy", {
            locale: vi,
          })}
        </span>

        <div
          className="
            flex
            items-center
            gap-1
            text-sm
            font-semibold
            text-[#007AFF]
          "
        >
          Chi tiết
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </button>
  );
}

function renderContent(request: StaffRequest) {
  switch (request.type) {
    case "Leave":
      const detail = request.detail as LeaveData;

      return (
        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-[#007AFF]" />

          <div>
            <p className="text-sm font-semibold">
              {detail.fromDate}
              {"  "}→{"  "}
              {detail.toDate}
            </p>

            <p className="mt-1 text-xs text-gray-500">{request.reason}</p>
          </div>
        </div>
      );

    case "ShiftChange":
      const detail1 = request.detail as ShiftChangeData;
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <RefreshCcw size={18} className="text-orange-500" />

            <span className="text-sm font-semibold">
  {format(parseISO(detail1.currentDate!), "dd/MM")} • {detail1.currentShiftName}
        </span>

        <ArrowRight size={14} className="text-gray-400" />

        <span className="text-sm font-semibold">
          {detail1.newWorkDate
            ? `${format(parseISO(detail1.newWorkDate), "dd/MM")} • `
            : `${format(parseISO(detail1.currentDate!), "dd/MM")} • `}
          {detail1.newShiftName}
        </span>
          </div>
          <p className="text-xs text-gray-500">{request.reason}</p>
        </div>
      );

    case "Overtime":
      const detail2 = request.detail as OvertimeData;

      return (
        <div className="flex items-center gap-3">
          <Clock3 size={18} className="text-green-600" />

          <div>
            <p className="text-sm font-semibold">
              {detail2.fromTime}

              {" - "}

              {detail2.toTime}
            </p>

            <p className="text-xs text-gray-500">{detail2.hours} giờ tăng ca</p>
          </div>
        </div>
      );
  }
}

function getTypeStyle(type: StaffRequest["type"]) {
  switch (type) {
    case "Leave":
      return {
        title: "Đơn xin nghỉ",
        bg: "bg-blue-100 dark:bg-blue-900/30",
        line: "bg-blue-500",
        icon: <Coffee size={26} className="text-blue-600" />,
      };

    case "ShiftChange":
      return {
        title: "Đơn đổi ca",
        bg: "bg-orange-100 dark:bg-orange-900/30",
        line: "bg-orange-500",
        icon: <RefreshCcw size={26} className="text-orange-500" />,
      };

    case "Overtime":
      return {
        title: "Đơn tăng ca",
        bg: "bg-green-100 dark:bg-green-900/30",
        line: "bg-green-500",
        icon: <Clock3 size={26} className="text-green-600" />,
      };
  }
}
