"use client";

import { CalendarIcon, RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Position } from "@/types/position";
import { Shift, ShiftResponse } from "@/types/shift";
import SearchInput from "@/components/common/SearchInput";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;

  position: number;
  onPositionChange: (value: number) => void;

  shift: number;
  onShiftChange: (value: number) => void;

  positions: Position[];
  shifts: Shift[];

  onRefresh?: () => void;
}

export default function AttendanceFilter({
  search,
  onSearchChange,
  searchInput,
  onSearchInputChange,
  date,
  onDateChange,

  position,
  onPositionChange,

  shift,
  onShiftChange,

  positions,
  shifts,

  onRefresh,
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
      <div className="flex items-center grid gap-4 xl:grid-cols-5">
        {/* Search */}

        <div className="xl:col-span-2">
          <SearchInput
            value={searchInput}
            onChange={onSearchInputChange}
            onSearch={onSearchChange}
            placeholder="Tìm tên hoặc mã nhân viên..."
          />
        </div>

        {/* Date */}

        <div className="relative">
          {/* <CalendarIcon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]"
          /> */}

          <Input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Position */}

        <Select
          value={position.toString() ?? "0"}
          onValueChange={(value) => {
            if (value) {
              onPositionChange(Number(value));
            }
          }}
        >
          <SelectTrigger>
            <span>
              {position === 0
                ? "Tất cả chức vụ"
                : (positions.find((item) => item.id === position)?.name ??
                  "Tất cả chức vụ")}
            </span>
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

        {/* Shift */}

        <div className="flex gap-2">
          <Select
            value={shift.toString()}
            onValueChange={(value) => {
              if (value) {
                onShiftChange(Number(value));
              }
            }}
          >
            <SelectTrigger>
              <span>
                {shift === 0
                  ? "Tất cả ca"
                  : (shifts.find((item) => item.id === shift)?.name ??
                    "Ca làm")}
              </span>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="0">Tất cả ca</SelectItem>

              {shifts.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={onRefresh}>
            <RotateCcw size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
