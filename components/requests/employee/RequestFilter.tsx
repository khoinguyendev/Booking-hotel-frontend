"use client";

import { RequestStatus, RequestType } from "@/types/requests";
import { FilePlus2, Search } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;

  type: RequestType | "All";
  onTypeChange: (value: RequestType | "All") => void;

  status: RequestStatus | "All";
  onStatusChange: (value: RequestStatus | "All") => void;

  onCreate?: () => void;
}

const TYPE_OPTIONS = [
  { label: "Tất cả", value: "All" },
  { label: "Xin nghỉ", value: "Leave" },
  { label: "Đổi ca", value: "ShiftChange" },
  { label: "Tăng ca", value: "Overtime" },
] as const;

const STATUS_OPTIONS = [
  { label: "Tất cả", value: "All" },
  { label: "Chờ duyệt", value: "Pending" },
  { label: "Đã duyệt", value: "Approved" },
  { label: "Từ chối", value: "Rejected" },
] as const;

export default function RequestFilter({
  search,
  onSearchChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
  onCreate,
}: Props) {
  return (
    <div className="space-y-4 rounded-3xl border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#2C2C2E] dark:bg-[#1C1C1E]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* Search */}

        <div className="relative w-full xl:max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8E93]"
          />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên, mã nhân viên..."
            className="
              h-11
              w-full
              rounded-full
              border
              border-[#E5E5EA]
              bg-[#F2F2F7]
              pl-11
              pr-4
              text-sm
              outline-none
              transition

              focus:border-[#007AFF]
              focus:bg-white

              dark:border-[#2C2C2E]
              dark:bg-[#2C2C2E]
            "
          />
        </div>

        {/* Button */}

        <button
          onClick={onCreate}
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-full
            bg-[#007AFF]
            px-5
            text-sm
            font-semibold
            text-white
            transition

            hover:bg-[#0066DD]
          "
        >
          <FilePlus2 size={18} />
          Tạo đơn
        </button>
      </div>

      {/* Filter */}

      <div className="grid gap-3 md:grid-cols-2">
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value as RequestType | "All")}
          className="
            h-11
            rounded-2xl
            border
            border-[#E5E5EA]
            bg-[#F8F8FA]
            px-4
            text-sm
            outline-none

            focus:border-[#007AFF]

            dark:border-[#2C2C2E]
            dark:bg-[#2C2C2E]
          "
        >
          {TYPE_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value as RequestStatus | "All")
          }
          className="
            h-11
            rounded-2xl
            border
            border-[#E5E5EA]
            bg-[#F8F8FA]
            px-4
            text-sm
            outline-none

            focus:border-[#007AFF]

            dark:border-[#2C2C2E]
            dark:bg-[#2C2C2E]
          "
        >
          {STATUS_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
