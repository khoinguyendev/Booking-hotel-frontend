"use client";

import { useBookingManagement } from "@/hooks/customer/useBookingManagement";
import {
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Hotel,
  Mail,
  MapPin,
  Phone,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

/**
 * Tạm thời dùng type frontend.
 *
 * Sau này API /booking/manage/{token}
 * sẽ trả object tương tự.
 */


export default function BookingManagePage() {
  const params = useParams();

  const token = params.token as string;

  const { booking, loading, error } = useBookingManagement(token);
  /**
   * TODO:
   * Sau này gọi:
   *
   * GET /booking-management/{token}
   *
   * Không gửi bookingId từ frontend.
   *
   * Backend sẽ:
   * 1. Hash token
   * 2. Tìm BookingManagementToken
   * 3. Kiểm tra expiresAt / revokedAt
   * 4. Lấy Booking
   * 5. Trả về thông tin booking
   */

  // Demo data để dựng giao diện
    if(!booking) return;
  const formatVND = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const getStatus = () => {
    switch (booking.status) {
      case 1:
        return {
          label: "Đã xác nhận",
          className: "bg-secondary/10 text-secondary",
          icon: CheckCircle2,
        };

      case 2:
        return {
          label: "Chờ xác nhận",
          className: "bg-accent/10 text-accent",
          icon: Clock3,
        };

      case 3:
        return {
          label: "Đã hủy",
          className: "bg-destructive/10 text-destructive",
          icon: XCircle,
        };

      case 4:
        return {
          label: "Đã hoàn tất",
          className: "bg-secondary/10 text-secondary",
          icon: CheckCircle2,
        };

      default:
        return {
          label: booking.status,
          className: "bg-muted text-muted-foreground",
          icon: AlertCircle,
        };
    }
  };

  const status = getStatus();

  const StatusIcon = status.icon;

  return (
    <main className="customer-app min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="shell py-8">
          <Link
            href="/khach-san"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Quay lại tìm khách sạn
          </Link>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-accent">Quản lý đặt phòng</p>

              <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                Đặt phòng của bạn
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Kiểm tra thông tin và quản lý đặt phòng của bạn.
              </p>
            </div>

            <div
              className={`inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.className}`}
            >
              <StatusIcon size={17} />
              {status.label}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="shell py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT */}
          <div className="min-w-0 space-y-6">
            {/* Booking code */}
            <section className="rounded-sm border border-border bg-card">
              <div className="border-b border-border px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  Mã đặt phòng
                </p>
              </div>

              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-2xl font-bold tracking-wide text-primary">
                    {booking.bookingCode}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Vui lòng lưu lại mã này để quản lý đặt phòng.
                  </p>
                </div>

                <div className="rounded-sm bg-secondary/10 px-4 py-3 text-sm font-medium text-secondary">
                  Đặt phòng an toàn
                </div>
              </div>
            </section>

            {/* Hotel */}
            <section className="rounded-sm border border-border bg-card">
              <div className="border-b border-border px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  Thông tin lưu trú
                </p>

                <h3 className="mt-1 font-serif text-2xl font-semibold text-primary">
                  {booking.hotelName}
                </h3>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Hotel size={19} />
                  </div>

                  <div>
                    <p className="font-semibold text-primary">
                      {booking.roomTypeName}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin size={14} />
                      {booking.city}, {booking.region}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-sm bg-muted/50 p-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      Nhận phòng
                    </p>

                    <p className="mt-1 flex items-center gap-2 font-semibold text-primary">
                      <CalendarDays size={17} />
                      {booking.checkin}
                    </p>
                  </div>

                  <div className="rounded-sm bg-muted/50 p-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      Trả phòng
                    </p>

                    <p className="mt-1 flex items-center gap-2 font-semibold text-primary">
                      <CalendarDays size={17} />
                      {booking.checkout}
                    </p>
                  </div>
                </div>

                {/* Room / guests */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-sm border border-border p-4">
                    <p className="text-xs text-muted-foreground">Số phòng</p>

                    <p className="mt-1 font-semibold text-primary">
                      {booking.roomQuantity} phòng
                    </p>
                  </div>

                  <div className="rounded-sm border border-border p-4">
                    <p className="text-xs text-muted-foreground">Số khách</p>

                    <p className="mt-1 flex items-center gap-2 font-semibold text-primary">
                      <Users size={16} />
                      {booking.guests} khách
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Guest */}
            <section className="rounded-sm border border-border bg-card">
              <div className="border-b border-border px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  Thông tin khách
                </p>

                <h3 className="mt-1 font-serif text-2xl font-semibold text-primary">
                  Người đặt phòng
                </h3>
              </div>

              <div className="divide-y divide-border">
                <div className="flex items-center gap-4 p-5">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <Users size={18} className="text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Họ và tên</p>

                    <p className="mt-1 font-medium">{booking.guestName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <Mail size={18} className="text-primary" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>

                    <p className="mt-1 truncate font-medium">
                      {booking.guestEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <Phone size={18} className="text-primary" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Số điện thoại
                    </p>

                    <p className="mt-1 font-medium">{booking.guestPhone}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cancellation */}
            {booking.cancelledAt && (
              <section className="rounded-sm border border-destructive/30 bg-destructive/5 p-5">
                <div className="flex gap-3">
                  <XCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-destructive"
                  />

                  <div>
                    <h3 className="font-semibold text-destructive">
                      Đặt phòng đã bị hủy
                    </h3>

                    {booking.cancellationReason && (
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {booking.cancellationReason}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT */}
          <aside className="min-w-0">
            <div className="sticky top-6 rounded-sm border border-border bg-card">
              <div className="border-b border-border px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  Thanh toán
                </p>

                <h3 className="mt-1 font-serif text-2xl font-semibold text-primary">
                  Chi phí đặt phòng
                </h3>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tổng tiền</span>

                  <span className="font-medium">
                    {formatVND(booking.total)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Đã thanh toán</span>

                  <span className="font-semibold text-secondary">
                    {formatVND(booking.paidAmount)}
                  </span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-sm text-muted-foreground">
                      Còn phải thanh toán
                    </span>

                    <span className="font-serif text-2xl font-semibold text-primary">
                      {formatVND(booking.remainingAmount)}
                    </span>
                  </div>
                </div>

                {/* Payment status */}
                <div className="rounded-sm bg-muted/60 p-4">
                  <div className="flex items-center gap-2">
                    <CreditCard size={17} className="text-primary" />

                    <span className="text-sm font-semibold">
                      Trạng thái thanh toán
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {booking.paymentStatus === 2
                      ? "Đã thanh toán đầy đủ"
                      : booking.paidAmount > 1
                        ? "Đã thanh toán một phần"
                        : "Chưa thanh toán"}
                  </p>
                </div>

                {/* Action */}
                {booking.remainingAmount > 0 &&
                  booking.status !== 4 && (
                    <button
                      type="button"
                      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground transition hover:bg-secondary/90"
                    >
                      <CreditCard size={17} />
                      Thanh toán ngay
                    </button>
                  )}

                {booking.status !== 4 &&
                  booking.status !== 1 && (
                    <button
                      type="button"
                      className="min-h-11 w-full rounded-sm border border-destructive/30 px-4 py-3 text-sm font-semibold text-destructive transition hover:bg-destructive/5"
                    >
                      Hủy đặt phòng
                    </button>
                  )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
