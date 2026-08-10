// components/request/RequestFilter.tsx

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
import SearchInput from "@/components/common/SearchInput";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  searchInput: string;
  onSearchInputChange: (value: string) => void;

  status: number;
  onStatusChange: (value: number) => void;

  fromDate: string;
  onFromDateChange: (value: string) => void;

  toDate: string;
  onToDateChange: (value: string) => void;

  onRefresh?: () => void;
}
const sts=[{
  id:1,
  lable:"Chờ duyệt",
},{
  id:2,
  lable:"Đã duyệt",
},{
  id:3,
  lable:"Từ chối",
}]
export default function RequestFilter({
  search,
  onSearchChange,
  onSearchInputChange,
  searchInput,
  status,
  onStatusChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
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

        {/* Status */}

        <Select value={status} onValueChange={(value) => {
            if (value) {
              onStatusChange(Number(value));
            }
          }}>
          <SelectTrigger>
             <span>
              {status === 0
                ? "Tất cả"
                : (sts.find((item) => item.id === status)?.lable ??
                  "Tất cả")}
            </span>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="0">Tất cả trạng thái</SelectItem>

           {sts.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.lable}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* From date */}

        <div className="relative">
          <CalendarIcon
            size={17}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[#8E8E93]
            "
          />

          <Input
            type="date"
            value={fromDate}
            onChange={(e) => onFromDateChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* To date */}

        <div className="flex gap-2">
          <div className="relative min-w-0 flex-1">
            <CalendarIcon
              size={17}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-[#8E8E93]
              "
            />

            <Input
              type="date"
              value={toDate}
              onChange={(e) => onToDateChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onRefresh}
          >
            <RotateCcw size={17} />
          </Button>
        </div>
      </div>
    </div>
  );
}
