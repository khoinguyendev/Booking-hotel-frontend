"use client";

import SearchInput from "@/components/common/SearchInput";
import { Position } from "@/types/position";
import { Search, Building2, Briefcase, CalendarDays, X } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  searchInput: string;
  onSearchInputChange: (value: string) => void;

  positions: Position[];
  position: number;
  onPositionChange: (value: number) => void;

  workDate: string;
  onWorkDateChange: (value: string) => void;
}

export default function StaffFilter({
  search,
  onSearchChange,
  positions,
  position,
  onPositionChange,
  searchInput,
  onSearchInputChange,
  workDate,
  onWorkDateChange,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-[#E5E5EA]
        bg-white
        p-5
        shadow-sm

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div
        className="
          grid
          gap-4

          grid-cols-1

          md:grid-cols-2

          xl:grid-cols-2
        "
      >
        {/* Search */}

        <SearchInput
          value={searchInput}
          onChange={onSearchInputChange}
          onSearch={onSearchChange}
          placeholder="Tìm tên hoặc mã nhân viên..."
        />

        {/* Position */}

        <div className="relative">
          <Briefcase
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <select
            value={position}
            onChange={(e) => onPositionChange(Number(e.target.value))}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-[#E5E5EA]
              bg-[#F8F8F8]
              pl-11
              pr-4
              outline-none

              focus:border-[#007AFF]

              dark:border-[#2C2C2E]
              dark:bg-[#2C2C2E]
            "
          >
            <option value="0">Tất cả</option>
            {positions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}

        {/* <div className="relative">

          <CalendarDays
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="date"
            value={workDate}
            onChange={(e) => onWorkDateChange(e.target.value)}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-[#E5E5EA]
              bg-[#F8F8F8]
              pl-11
              pr-4
              outline-none

              focus:border-[#007AFF]

              dark:border-[#2C2C2E]
              dark:bg-[#2C2C2E]
            "
          />

        </div> */}
      </div>
    </div>
  );
}
