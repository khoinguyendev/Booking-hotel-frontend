"use client";

import { Calendar, RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BookingStatus, PaymentStatus } from "@/types/booking";
import SearchInput from "@/components/common/SearchInput";

interface Props {
  /* ========================= */
  /* Search                    */
  /* ========================= */

  searchInput: string;

  onSearchChange: (value: string) => void;
  onSearchInputChange: (value: string) => void;
  /* ========================= */
  /* Check-in from             */
  /* ========================= */

  checkinFrom: string;

  onCheckinFromChange: (value: string) => void;

  /* ========================= */
  /* Check-in to               */
  /* ========================= */

  checkinTo: string;

  onCheckinToChange: (value: string) => void;

  /* ========================= */
  /* Booking status            */
  /* ========================= */

  status: BookingStatus | 0;

  onStatusChange: (value: BookingStatus | 0) => void;

  /* ========================= */
  /* Payment status            */
  /* ========================= */

  paymentStatus: PaymentStatus | 0;

  onPaymentStatusChange: (value: PaymentStatus | 0) => void;

  /* ========================= */
  /* Refresh                   */
  /* ========================= */

  onRefresh?: () => void;
}

export default function BookingFilter({
  searchInput,
  onSearchChange,
  onSearchInputChange,
  checkinFrom,
  onCheckinFromChange,

  checkinTo,
  onCheckinToChange,

  status,
  onStatusChange,

  paymentStatus,
  onPaymentStatusChange,

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
      <div
        className="
          grid
          gap-4

          xl:grid-cols-6
        "
      >
        {/* ================================================= */}
        {/* Search                                            */}
        {/* ================================================= */}

        <div
          className="
            relative

            xl:col-span-2
          "
        >
          <SearchInput
            value={searchInput}
            onChange={onSearchInputChange}
            onSearch={onSearchChange}
            placeholder="
              Mã booking, tên hoặc SĐT...
            "
          />
        </div>

        {/* ================================================= */}
        {/* Check-in from                                    */}
        {/* ================================================= */}

        <div className="relative">
          <Calendar
            size={17}
            className="
              absolute
              left-3
              top-1/2
              z-10
              -translate-y-1/2

              text-[#8E8E93]
            "
          />

          <Input
            type="date"
            value={checkinFrom}
            onChange={(e) => onCheckinFromChange(e.target.value)}
            className="
              pl-10
            "
          />
        </div>

        {/* ================================================= */}
        {/* Check-in to                                      */}
        {/* ================================================= */}

        <div className="relative">
          <Calendar
            size={17}
            className="
              absolute
              left-3
              top-1/2
              z-10
              -translate-y-1/2

              text-[#8E8E93]
            "
          />

          <Input
            type="date"
            value={checkinTo}
            onChange={(e) => onCheckinToChange(e.target.value)}
            className="
              pl-10
            "
          />
        </div>

        {/* ================================================= */}
        {/* Booking status                                   */}
        {/* ================================================= */}

        <Select
          value={String(status)}
          onValueChange={(value) =>
            onStatusChange(Number(value) as BookingStatus | 0)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Trạng thái booking" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="0">Tất cả trạng thái</SelectItem>

            <SelectItem value={String(BookingStatus.Pending)}>
              Chờ xác nhận
            </SelectItem>

            <SelectItem value={String(BookingStatus.Confirmed)}>
              Đã xác nhận
            </SelectItem>

            <SelectItem value={String(BookingStatus.CheckedIn)}>
              Đã nhận phòng
            </SelectItem>

            <SelectItem value={String(BookingStatus.CheckedOut)}>
              Đã trả phòng
            </SelectItem>

            <SelectItem value={String(BookingStatus.Cancelled)}>
              Đã hủy
            </SelectItem>

            <SelectItem value={String(BookingStatus.NoShow)}>
              Không đến
            </SelectItem>

            <SelectItem value={String(BookingStatus.Expired)}>
              Hết hạn
            </SelectItem>
          </SelectContent>
        </Select>

        {/* ================================================= */}
        {/* Payment status + Refresh                         */}
        {/* ================================================= */}

        <div className="flex gap-2">
          <Select
            value={String(paymentStatus)}
            onValueChange={(value) =>
              onPaymentStatusChange(Number(value) as PaymentStatus | 0)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Thanh toán" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="0">Tất cả thanh toán</SelectItem>

              <SelectItem value={String(PaymentStatus.Pending)}>
                Chờ thanh toán
              </SelectItem>

              <SelectItem value={String(PaymentStatus.Paid)}>
                Đã thanh toán
              </SelectItem>

              <SelectItem value={String(PaymentStatus.Failed)}>
                Thanh toán thất bại
              </SelectItem>

              <SelectItem value={String(PaymentStatus.Expired)}>
                Thanh toán hết hạn
              </SelectItem>

              <SelectItem value={String(PaymentStatus.Refunded)}>
                Đã hoàn tiền
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={onRefresh}
            title="Làm mới"
          >
            <RotateCcw size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
