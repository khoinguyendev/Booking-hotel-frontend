"use client";

import { formatVND } from "@/data/stayora-data";
import { AvailableRoomTypeResponse } from "@/types/roomtype";
import { CalendarDays, Check, ShieldCheck, Users } from "lucide-react";
import { format } from "date-fns";

interface BookingPriceSummaryProps {
  room: AvailableRoomTypeResponse;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  rooms: number;
  onBooking?: () => void;
  loading?: boolean;
}

export default function BookingPriceSummary({
  room,
  checkIn,
  checkOut,
  guests,
  rooms,
  onBooking,
  loading = false,
}: BookingPriceSummaryProps) {
  const nights = Math.max(
    1,
    Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) /
        (1000 * 60 * 60 * 24),
    ),
  );

  const roomPrice = room.price * nights * rooms;

  // Có thể thay bằng giá trị backend trả về sau này
  const tax = Math.round(roomPrice * 0.1);

  const total = roomPrice + tax;

  return (
    <aside className="sticky top-24 overflow-hidden rounded-sm border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          Tóm tắt đặt phòng
        </p>

        <h2 className="mt-1 font-serif text-2xl font-semibold text-primary">
          Chi phí của bạn
        </h2>
      </div>

      <div className="p-5">
        {/* Room */}
        <div>
          <h3 className="font-semibold text-primary">
            {room.name}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {room.roomSize} m² · {room.bed}
          </p>
        </div>

        {/* Stay information */}
        <div className="mt-5 space-y-3 rounded-sm bg-muted/60 p-4">
          <div className="flex items-start gap-3">
            <CalendarDays
              size={17}
              className="mt-0.5 shrink-0 text-primary"
            />

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Thời gian lưu trú
              </p>

              <p className="mt-1 text-sm font-medium">
                {format(checkIn, "dd/MM/yyyy")} →{" "}
                {format(checkOut, "dd/MM/yyyy")}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {nights} đêm
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users
              size={17}
              className="shrink-0 text-primary"
            />

            <div>
              <p className="text-xs text-muted-foreground">
                Khách & phòng
              </p>

              <p className="mt-1 text-sm font-medium">
                {guests} khách · {rooms} phòng
              </p>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">
              {formatVND(room.price)} × {nights} đêm
            </span>

            <span className="font-medium">
              {formatVND(room.price * nights)}
            </span>
          </div>

          {rooms > 1 && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">
                {rooms} phòng
              </span>

              <span className="font-medium">
                {formatVND(roomPrice)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">
              Thuế & phí
            </span>

            <span className="font-medium">
              {formatVND(tax)}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="mt-5 border-t border-border pt-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">
                Tổng cộng
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Đã bao gồm thuế và phí
              </p>
            </div>

            <p className="font-serif text-2xl font-semibold text-primary">
              {formatVND(total)}
            </p>
          </div>
        </div>

        {/* Booking button */}
        <button
          type="button"
          disabled={loading}
          onClick={onBooking}
          className="
            mt-6
            flex
            min-h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-sm
            bg-primary
            px-4
            py-3
            text-sm
            font-semibold
            text-primary-foreground
            transition
            hover:bg-primary/90
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Đang xử lý...
            </>
          ) : (
            <>
              <Check size={17} />
              Xác nhận đặt phòng
            </>
          )}
        </button>

        {/* Security */}
        <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
          <ShieldCheck
            size={16}
            className="mt-0.5 shrink-0 text-secondary"
          />

          <p>
            Thông tin đặt phòng của bạn được bảo mật và chỉ được
            sử dụng cho việc xử lý đặt phòng.
          </p>
        </div>
      </div>
    </aside>
  );
}

