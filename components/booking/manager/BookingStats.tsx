"use client";

import {
  CalendarDays,
  CircleCheckBig,
  Clock3,
  Wallet,
} from "lucide-react";

import BookingStatCard from "./BookingStatCard";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingStatsData } from "@/services/booking.service";

interface Props {
  data: BookingStatsData ;
  loading?: boolean;

  month: number;
  year: number;

  onMonthChange: (value: number) => void;
  onYearChange: (value: number) => void;

  onTotalClick?: () => void;
  onPendingClick?: () => void;
  onConfirmedClick?: () => void;
}

export default function BookingStats({
  data,
  loading = false,

  month,
  year,

  onMonthChange,
  onYearChange,

  onTotalClick,
  onPendingClick,
  onConfirmedClick,
}: Props) {
  if (loading) {
    return (
      <div className="space-y-4">
        {/* Filter skeleton */}
        <div className="flex justify-end">
          <div
            className="
              h-10
              w-36
              animate-pulse
              rounded-xl
              bg-white
              dark:bg-[#1C1C1E]
            "
          />
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="
                h-[170px]
                animate-pulse
                rounded-3xl
                bg-white
                dark:bg-[#1C1C1E]
              "
            />
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-4">

      {/* ================================================= */}
      {/* Month / Year filter                               */}
      {/* ================================================= */}

      <div className="flex items-center justify-end gap-2">

        {/* Month */}

        <Select
          value={String(month)}
          onValueChange={(value) =>
            onMonthChange(Number(value))
          }
        >
          <SelectTrigger className="w-[130px]">
            <CalendarDays
              className="
                mr-2
                h-4
                w-4
                text-[#8E8E93]
              "
            />

            <SelectValue placeholder="Tháng" />
          </SelectTrigger>

          <SelectContent>
            {Array.from({ length: 12 }).map((_, index) => {
              const value = index + 1;

              return (
                <SelectItem
                  key={value}
                  value={String(value)}
                >
                  Tháng {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* Year */}

        <Select
          value={String(year)}
          onValueChange={(value) =>
            onYearChange(Number(value))
          }
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Năm" />
          </SelectTrigger>

          <SelectContent>
            {Array.from({ length: 5 }).map((_, index) => {
              const value =
                new Date().getFullYear() -
                index;

              return (
                <SelectItem
                  key={value}
                  value={String(value)}
                >
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* ================================================= */}
      {/* Statistics                                        */}
      {/* ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        <BookingStatCard
          title="Tổng booking"
          value={data.totalBookings}
          icon={CalendarDays}
          color="blue"
          description="Tổng số đặt phòng"
          onClick={onTotalClick}
        />

        <BookingStatCard
          title="Chờ xác nhận"
          value={data.pendingBookings}
          icon={Clock3}
          color="orange"
          description="Cần xử lý"
          onClick={onPendingClick}
        />

        <BookingStatCard
          title="Đã xác nhận"
          value={data.confirmedBookings}
          icon={CircleCheckBig}
          color="green"
          description="Booking hợp lệ"
          onClick={onConfirmedClick}
        />

        <BookingStatCard
          title="Doanh thu"
          value={formatCurrency(
            data.totalRevenue,
          )}
          icon={Wallet}
          color="blue"
          description={`Đã thu ${formatCurrency(
            data.paidAmount,
          )}`}
        />
      </div>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}