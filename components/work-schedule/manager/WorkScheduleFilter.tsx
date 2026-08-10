"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Position } from "@/types/position";
import { Shift } from "@/types/shift";
import SearchInput from "@/components/common/SearchInput";

interface Option {
  value: string;
  label: string;
}

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  position: number;
  onPositionChange: (value: number) => void;

  shift: number;
  onShiftChange: (value: number) => void;

  status: string;
  onStatusChange: (value: string) => void;

  positions: Position[];
  shifts: Shift[];
  statuses: Option[];
}

export default function WorkScheduleFilter({
  search,
  onSearchChange,
  searchInput,
  onSearchInputChange,
  position,
  onPositionChange,

  shift,
  onShiftChange,

  status,
  onStatusChange,

  positions,
  shifts,
  statuses,
}: Props) {
  const selectedPosition = positions.find((p) => p.id === position);
  const selectedShift = shifts.find((s) => s.id === shift);
  return (
    <div
      className="
rounded-3xl
border
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

xl:grid-cols-12
"
      >
        {/* Search */}
        <SearchInput
          className="xl:col-span-4"
          value={searchInput}
          onChange={onSearchInputChange}
          onSearch={onSearchChange}
          placeholder="Tìm tên hoặc mã nhân viên..."
        />
        {/* <div className="relative xl:col-span-4">
          <Search
            size={18}
            className="
absolute
left-3
top-1/2
-translate-y-1/2

text-[#8E8E93]
"
          />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tên hoặc mã nhân viên..."
            className="pl-10"
          />
        </div> */}

        {/* Position */}

        <div className="xl:col-span-3">
          <Select
            value={position}
            onValueChange={(value) => onPositionChange(value ?? 0)}
          >
            <SelectTrigger>
              <SelectValue>
                {selectedPosition?.name ?? "Tất cả chức vụ"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="0">Tất cả chức vụ</SelectItem>
              {positions.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Shift */}

        <div className="xl:col-span-3">
          <Select
            value={shift}
            onValueChange={(value) => onShiftChange(value ?? 0)}
          >
            <SelectTrigger>
              <SelectValue>
                {selectedShift?.name ?? "Tất cả ca làm"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="0">Tất cả ca làm</SelectItem>

              {shifts.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}

        {/* <div className="xl:col-span-2">
          <Select
            value={status}
            onValueChange={(value) => onStatusChange(value ?? "all")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>

              {statuses.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
      </div>
    </div>
  );
}
