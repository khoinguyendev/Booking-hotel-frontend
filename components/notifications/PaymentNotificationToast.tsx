"use client";

import { PaymentNotification } from "@/types/RequestNotification";
import { CheckCircle2, CreditCard, UserRound, X } from "lucide-react";

interface PaymentNotificationToastProps {
  notification: PaymentNotification;
  onClose: () => void;
  onView?: (bookingId: number) => void;
}

export default function PaymentNotificationToast({
  notification,
  onClose,
  onView,
}: PaymentNotificationToastProps) {
  const formatVND = (value: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  return (
    <div className="w-[360px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
          <CheckCircle2 size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Đặt phòng thành công</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Thanh toán đã được xác nhận
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          <X size={16} />
        </button>
      </div>

      <div className="space-y-3 px-4 pb-4">
        {/* Booking */}
        <div className="rounded-xl border border-border p-3">
          <p className="text-[11px] text-muted-foreground">Mã đặt phòng</p>
          <p className="mt-1 font-mono text-sm font-bold">
            {notification.bookingCode}
          </p>
        </div>

        {/* Guest */}
        <div className="flex items-center gap-3 rounded-xl border border-border p-3">
          <UserRound size={17} className="shrink-0 text-blue-500" />

          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground">Khách hàng</p>
            <p className="truncate text-xs font-semibold">
              {notification.guestName}
            </p>
          </div>
        </div>

        {/* Payment */}
        <div className="flex items-center gap-3 rounded-xl border border-border p-3">
          <CreditCard size={17} className="shrink-0 text-orange-500" />

          <div>
            <p className="text-[11px] text-muted-foreground">Đã thanh toán</p>
            <p className="mt-1 text-sm font-bold text-emerald-500">
              {formatVND(notification.amount)}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <button
          type="button"
          onClick={() => onView?.(notification.bookingId)}
          className="w-full rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Xem đặt phòng
        </button>
      </div>
    </div>
  );
}
