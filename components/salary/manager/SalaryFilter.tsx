'use client';

import {
  Calendar,
  RotateCcw,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Position } from '@/types/position';
import { PositionResponse } from '@/services/position.service';


interface Props {
  search: string;
  onSearchChange: (value: string) => void;

  month: number;
  onMonthChange: (value: number) => void;

  year: number;
  onYearChange: (value: number) => void;

  position: number;
  onPositionChange: (value: number) => void;

  status: number;
  onStatusChange: (value: number) => void;

  positions: PositionResponse[];

  onRefresh?: () => void;
}

export default function SalaryFilter({
  search,
  onSearchChange,

  month,
  onMonthChange,

  year,
  onYearChange,

  position,
  onPositionChange,

  status,
  onStatusChange,

  positions,

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
      <div className="grid gap-4 xl:grid-cols-6">

        {/* Search */}

        <div className="relative xl:col-span-2">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]"
          />

          <Input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Tên hoặc mã nhân viên..."
            className="pl-10"
          />

        </div>

        {/* Month */}

        <Select
          value={month}
          onValueChange={(value)=>onMonthChange(Number(value))}
        >
          <SelectTrigger>

            <Calendar className="mr-2 h-4 w-4 text-[#8E8E93]" />

            <SelectValue placeholder="Tháng" />

          </SelectTrigger>

          <SelectContent>

            {Array.from({ length: 12 }).map((_, i) => (
              <SelectItem
                key={i + 1}
                value={String(i + 1)}
              >
                Tháng {i + 1}
              </SelectItem>
            ))}

          </SelectContent>

        </Select>

        {/* Year */}

        <Select
          value={year}
          onValueChange={(value)=>onYearChange(Number(value))}
        >
          <SelectTrigger>

            <SelectValue placeholder="Năm" />

          </SelectTrigger>

          <SelectContent>

            {Array.from({ length: 5 }).map((_, i) => {
              const value = String(2024 + i);

              return (
                <SelectItem
                  key={value}
                  value={value}
                >
                  {value}
                </SelectItem>
              );
            })}

          </SelectContent>

        </Select>

        {/* Position */}

        <Select
          value={position}
          onValueChange={()=>onPositionChange}
        >
          <SelectTrigger>

            <SelectValue placeholder="Chức vụ" />

          </SelectTrigger>

          <SelectContent>

            <SelectItem value="all">
              Tất cả chức vụ
            </SelectItem>

            {positions.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id}
              >
                {item.name}
              </SelectItem>
            ))}

          </SelectContent>

        </Select>

        {/* Status */}

        <div className="flex gap-2">

          <Select
            value={status}
            onValueChange={()=>onStatusChange}
          >
            <SelectTrigger>

              <SelectValue placeholder="Trạng thái" />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                Tất cả
              </SelectItem>

              <SelectItem value="calculated">
                Đã tính lương
              </SelectItem>

              <SelectItem value="pending">
                Chưa tính
              </SelectItem>

              <SelectItem value="paid">
                Đã thanh toán
              </SelectItem>

              <SelectItem value="unpaid">
                Chưa thanh toán
              </SelectItem>

            </SelectContent>

          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
          >
            <RotateCcw size={18} />
          </Button>

        </div>

      </div>
    </div>
  );
}