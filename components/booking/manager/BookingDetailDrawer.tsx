"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  DoorOpen,
  FileText,
  Mail,
  Phone,
  ReceiptText,
  User,
  Wallet,
  X,
  XCircle,
} from "lucide-react";

import { Booking, BookingStatus, PaymentStatus } from "@/types/booking";
import PaymentStatusBadge from "./PaymentStatusBadge";
import BookingStatusBadge from "./BookingStatusBadge";

interface Props {
  open: boolean;

  booking: Booking | null;

  onClose: () => void;

  onEdit?: () => void;

  onConfirm?: () => void;

  onCheckIn?: () => void;

  onCheckOut?: () => void;

  onCancel?: () => void;
}

export default function BookingDetailDrawer({
  open,
  booking,
  onClose,
  onEdit,
  onConfirm,
  onCheckIn,
  onCheckOut,
  onCancel,
}: Props) {
  if (!open || !booking) {
    return null;
  }

  const nights = calculateNights(booking.checkin, booking.checkout);

  const paymentStatus = getPaymentStatus(booking);

  return (
    <>
      {/* Backdrop */}
      <div
        className="
          fixed
          inset-0
          z-40

          bg-black/30
          backdrop-blur-[2px]
        "
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className="
          fixed
          right-0
          top-0
          z-50

          flex
          h-screen
          w-full
          max-w-[620px]
          flex-col

          bg-[#F2F2F7]

          shadow-2xl

          dark:bg-black
        "
      >
        {/* ================================================= */}
        {/* Header */}
        {/* ================================================= */}

        <div
          className="
            shrink-0

            border-b
            border-[#E5E5EA]

            bg-white

            px-6
            py-5

            dark:border-[#2C2C2E]
            dark:bg-[#1C1C1E]
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#007AFF]
                "
              >
                Chi tiết booking
              </p>

              <div className="mt-2 flex items-center gap-3">
                <h2
                  className="
                    truncate
                    text-2xl
                    font-black
                    tracking-tight
                  "
                >
                  {booking.bookingCode}
                </h2>

                <BookingStatusBadge status={booking.status} />
              </div>

              <p className="mt-1 text-sm text-[#8E8E93]">
                Tạo lúc {formatDateTime(booking.createdAt)}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center

                rounded-full

                bg-[#F2F2F7]
                text-[#6C6C70]

                transition

                hover:bg-[#E5E5EA]

                dark:bg-[#2C2C2E]
                dark:text-[#AEAEB2]
                dark:hover:bg-[#3A3A3C]
              "
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* ================================================= */}
        {/* Content */}
        {/* ================================================= */}

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 p-5">
            {/* ============================================= */}
            {/* Guest */}
            {/* ============================================= */}

            <Section title="Thông tin khách hàng" icon={User}>
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center

                    rounded-2xl

                    bg-blue-50

                    text-lg
                    font-bold
                    text-[#007AFF]

                    dark:bg-blue-950/30
                  "
                >
                  {getInitials(booking.guestName)}
                </div>

                <div className="min-w-0">
                  <p className="text-lg font-bold">{booking.guestName}</p>

                  <p className="mt-1 text-xs text-[#8E8E93]">
                    {booking.customerId
                      ? `Khách hàng #${booking.customerId}`
                      : "Khách vãng lai"}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoItem
                  icon={Phone}
                  label="Số điện thoại"
                  value={booking.guestPhone}
                />

                <InfoItem
                  icon={Mail}
                  label="Email"
                  value={booking.guestEmail}
                />
              </div>
            </Section>

            {/* ============================================= */}
            {/* Room */}
            {/* ============================================= */}

            <Section title="Thông tin phòng" icon={DoorOpen}>
              <div
                className="
                  rounded-2xl
                  bg-[#F5F5F7]
                  p-4

                  dark:bg-[#2C2C2E]
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-bold">
                      {getRoomTypeName(booking)}
                    </p>

                    <p className="mt-1 text-sm text-[#8E8E93]">
                      Room Type ID: {booking.roomTypeId}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-xl
                      bg-white
                      px-3
                      py-2

                      text-right

                      shadow-sm

                      dark:bg-[#1C1C1E]
                    "
                  >
                    <p className="text-lg font-black">{booking.roomQuantity}</p>

                    <p className="text-[11px] text-[#8E8E93]">phòng</p>
                  </div>
                </div>
              </div>
            </Section>

            {/* ============================================= */}
            {/* Stay */}
            {/* ============================================= */}

            <Section title="Thời gian lưu trú" icon={CalendarDays}>
              <div className="grid gap-3 sm:grid-cols-2">
                <DateCard
                  label="Check-in"
                  value={booking.checkin}
                  icon={Clock3}
                />

                <DateCard
                  label="Check-out"
                  value={booking.checkout}
                  icon={Clock3}
                />
              </div>

              <div
                className="
                  mt-3

                  flex
                  items-center
                  justify-between

                  rounded-2xl

                  border
                  border-[#E5E5EA]

                  bg-white

                  px-4
                  py-3

                  dark:border-[#3A3A3C]
                  dark:bg-[#2C2C2E]
                "
              >
                <span className="text-sm text-[#8E8E93]">
                  Thời gian lưu trú
                </span>

                <span className="text-sm font-bold">{nights} đêm</span>
              </div>

              {(booking.actualCheckinAt || booking.actualCheckoutAt) && (
                <div
                  className="
                    mt-3
                    space-y-2

                    rounded-2xl

                    bg-green-50

                    p-4

                    dark:bg-green-950/20
                  "
                >
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                      text-green-700

                      dark:text-green-300
                    "
                  >
                    Thời gian thực tế
                  </p>

                  {booking.actualCheckinAt && (
                    <InfoRow
                      label="Nhận phòng thực tế"
                      value={formatDateTime(booking.actualCheckinAt)}
                    />
                  )}

                  {booking.actualCheckoutAt && (
                    <InfoRow
                      label="Trả phòng thực tế"
                      value={formatDateTime(booking.actualCheckoutAt)}
                    />
                  )}
                </div>
              )}
            </Section>

            {/* ============================================= */}
            {/* Payment */}
            {/* ============================================= */}

            <Section title="Thanh toán" icon={CreditCard}>
              <div className="grid grid-cols-2 gap-3">
                <MoneyCard
                  label="Tổng tiền"
                  value={booking.total}
                  icon={ReceiptText}
                />

                <MoneyCard
                  label="Tiền cọc"
                  value={booking.depositAmount}
                  icon={Wallet}
                />

                <MoneyCard
                  label="Đã thanh toán"
                  value={booking.paidAmount}
                  icon={CheckCircle2}
                  positive
                />

                <MoneyCard
                  label="Còn lại"
                  value={booking.remainingAmount}
                  icon={CreditCard}
                  warning={booking.remainingAmount > 0}
                />
              </div>

              <div
                className="
                  mt-4

                  flex
                  items-center
                  justify-between

                  rounded-2xl

                  border
                  border-[#E5E5EA]

                  bg-white

                  px-4
                  py-3

                  dark:border-[#3A3A3C]
                  dark:bg-[#2C2C2E]
                "
              >
                <span className="text-sm font-medium text-[#8E8E93]">
                  Trạng thái thanh toán
                </span>

                <PaymentStatusBadge status={paymentStatus} />
              </div>

              {/* Payment history */}
              {booking.payments && booking.payments.length > 0 && (
                <div className="mt-4">
                  <p
                    className="
                        mb-3
                        text-xs
                        font-bold
                        uppercase
                        tracking-wide
                        text-[#8E8E93]
                      "
                  >
                    Lịch sử thanh toán
                  </p>

                  <div className="space-y-2">
                    {booking.payments.map((payment) => (
                      <PaymentItem key={payment.id} payment={payment} />
                    ))}
                  </div>
                </div>
              )}
            </Section>

            {/* ============================================= */}
            {/* Cancellation */}
            {/* ============================================= */}

            {booking.status === BookingStatus.Cancelled && (
              <Section title="Thông tin hủy booking" icon={XCircle}>
                <div
                  className="
                    rounded-2xl

                    bg-red-50

                    p-4

                    dark:bg-red-950/20
                  "
                >
                  <p className="text-xs font-semibold text-red-600 dark:text-red-300">
                    Lý do hủy
                  </p>

                  <p className="mt-2 text-sm leading-6 text-red-900 dark:text-red-100">
                    {booking.cancellationReason || "Không có lý do"}
                  </p>

                  {booking.cancelledAt && (
                    <p className="mt-3 text-xs text-red-600/70 dark:text-red-300/70">
                      Hủy lúc {formatDateTime(booking.cancelledAt)}
                    </p>
                  )}
                </div>
              </Section>
            )}

            {/* ============================================= */}
            {/* Expiration */}
            {/* ============================================= */}

            {booking.expiresAt && (
              <Section title="Thời hạn booking" icon={Clock3}>
                <InfoRow
                  label="Hết hạn lúc"
                  value={formatDateTime(booking.expiresAt)}
                />
              </Section>
            )}

            {/* ============================================= */}
            {/* Note */}
            {/* ============================================= */}

            <Section title="Thông tin hệ thống" icon={FileText}>
              <div className="space-y-2">
                <InfoRow label="Booking ID" value={`#${booking.id}`} />

                <InfoRow label="Room Type ID" value={`${booking.roomTypeId}`} />

                <InfoRow
                  label="Customer ID"
                  value={
                    booking.customerId
                      ? `#${booking.customerId}`
                      : "Khách vãng lai"
                  }
                />

                <InfoRow
                  label="Tạo lúc"
                  value={formatDateTime(booking.createdAt)}
                />

                {booking.updatedAt && (
                  <InfoRow
                    label="Cập nhật lần cuối"
                    value={formatDateTime(booking.updatedAt)}
                  />
                )}
              </div>
            </Section>
          </div>
        </div>

        {/* ================================================= */}
        {/* Footer actions */}
        {/* ================================================= */}

        <div
          className="
            shrink-0

            border-t
            border-[#E5E5EA]

            bg-white

            p-4

            dark:border-[#2C2C2E]
            dark:bg-[#1C1C1E]
          "
        >
          <div className="flex flex-wrap gap-2">
            {booking.status === BookingStatus.Pending && onConfirm && (
              <FooterButton
                label="Xác nhận booking"
                icon={CheckCircle2}
                onClick={onConfirm}
                variant="primary"
              />
            )}

            {booking.status === BookingStatus.Confirmed && onCheckIn && (
              <FooterButton
                label="Check-in"
                icon={DoorOpen}
                onClick={onCheckIn}
                variant="primary"
              />
            )}

            {booking.status === BookingStatus.CheckedIn && onCheckOut && (
              <FooterButton
                label="Check-out"
                icon={DoorOpen}
                onClick={onCheckOut}
                variant="primary"
              />
            )}

            {(booking.status === BookingStatus.Pending ||
              booking.status === BookingStatus.Confirmed) &&
              onCancel && (
                <FooterButton
                  label="Hủy booking"
                  icon={XCircle}
                  onClick={onCancel}
                  variant="danger"
                />
              )}

            {onEdit &&
              booking.status !== BookingStatus.Cancelled &&
              booking.status !== BookingStatus.CheckedOut && (
                <FooterButton
                  label="Chỉnh sửa"
                  icon={FileText}
                  onClick={onEdit}
                  variant="secondary"
                />
              )}
          </div>
        </div>
      </aside>
    </>
  );
}

/* ========================================================= */
/* Section                                                    */
/* ========================================================= */

interface SectionProps {
  title: string;

  icon: typeof User;

  children: React.ReactNode;
}

function Section({ title, icon: Icon, children }: SectionProps) {
  return (
    <section
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
      <div className="mb-4 flex items-center gap-2">
        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center

            rounded-xl

            bg-[#F2F2F7]

            text-[#007AFF]

            dark:bg-[#2C2C2E]
          "
        >
          <Icon size={16} />
        </div>

        <h3 className="text-sm font-bold">{title}</h3>
      </div>

      {children}
    </section>
  );
}

/* ========================================================= */
/* Info Item                                                   */
/* ========================================================= */

interface InfoItemProps {
  icon: typeof Phone;

  label: string;

  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div
      className="
        rounded-2xl

        bg-[#F5F5F7]

        p-3

        dark:bg-[#2C2C2E]
      "
    >
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-[#8E8E93]" />

        <span className="text-xs text-[#8E8E93]">{label}</span>
      </div>

      <p className="mt-1 truncate text-sm font-semibold">{value || "-"}</p>
    </div>
  );
}

/* ========================================================= */
/* Info Row                                                     */
/* ========================================================= */

function InfoRow({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-[#8E8E93]">{label}</span>

      <span className="text-right text-sm font-semibold">{value}</span>
    </div>
  );
}

/* ========================================================= */
/* Date Card                                                    */
/* ========================================================= */

interface DateCardProps {
  label: string;

  value: string;

  icon: typeof Clock3;
}

function DateCard({ label, value, icon: Icon }: DateCardProps) {
  return (
    <div
      className="
        rounded-2xl

        bg-[#F5F5F7]

        p-4

        dark:bg-[#2C2C2E]
      "
    >
      <div className="flex items-center gap-2">
        <Icon size={15} className="text-[#007AFF]" />

        <span className="text-xs font-medium text-[#8E8E93]">{label}</span>
      </div>

      <p className="mt-2 text-sm font-bold">{formatDate(value)}</p>

      <p className="mt-1 text-xs text-[#8E8E93]">{formatTime(value)}</p>
    </div>
  );
}

/* ========================================================= */
/* Money Card                                                    */
/* ========================================================= */

interface MoneyCardProps {
  label: string;

  value: number;

  icon: typeof Wallet;

  positive?: boolean;

  warning?: boolean;
}

function MoneyCard({
  label,
  value,
  icon: Icon,
  positive = false,
  warning = false,
}: MoneyCardProps) {
  return (
    <div
      className="
        rounded-2xl

        bg-[#F5F5F7]

        p-4

        dark:bg-[#2C2C2E]
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#8E8E93]">{label}</span>

        <Icon
          size={15}
          className={
            positive
              ? "text-green-500"
              : warning
                ? "text-orange-500"
                : "text-[#8E8E93]"
          }
        />
      </div>

      <p
        className={`
          mt-2
          text-base
          font-black

          ${positive ? "text-green-600" : warning ? "text-orange-600" : ""}
        `}
      >
        {formatCurrency(value)}
      </p>
    </div>
  );
}

/* ========================================================= */
/* Payment Item                                                  */
/* ========================================================= */

function PaymentItem({ payment }: { payment: any }) {
  return (
    <div
      className="
        rounded-2xl

        border
        border-[#E5E5EA]

        p-4

        dark:border-[#3A3A3C]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold">{formatCurrency(payment.amount)}</p>

          <p className="mt-1 text-xs text-[#8E8E93]">
            {getPaymentMethodLabel(payment.method)}
          </p>
        </div>

        <PaymentStatusBadge status={payment.status} />
      </div>

      {payment.transactionCode && (
        <p className="mt-3 text-xs text-[#8E8E93]">
          Mã giao dịch:{" "}
          <span className="font-semibold">{payment.transactionCode}</span>
        </p>
      )}

      {payment.paidAt && (
        <p className="mt-1 text-xs text-[#8E8E93]">
          Thanh toán lúc: {formatDateTime(payment.paidAt)}
        </p>
      )}

      {payment.failureReason && (
        <p className="mt-2 text-xs text-red-500">{payment.failureReason}</p>
      )}
    </div>
  );
}

/* ========================================================= */
/* Footer Button                                                 */
/* ========================================================= */

interface FooterButtonProps {
  label: string;

  icon: typeof CheckCircle2;

  onClick: () => void;

  variant: "primary" | "secondary" | "danger";
}

function FooterButton({
  label,
  icon: Icon,
  onClick,
  variant,
}: FooterButtonProps) {
  const variantClass = {
    primary: `
      bg-[#007AFF]
      text-white
      hover:bg-[#006FE6]
    `,

    secondary: `
      border
      border-[#E5E5EA]
      bg-white
      text-[#3C3C43]
      hover:bg-[#F5F5F7]

      dark:border-[#3A3A3C]
      dark:bg-[#2C2C2E]
      dark:text-white
    `,

    danger: `
      border
      border-red-200
      bg-red-50
      text-red-600
      hover:bg-red-100

      dark:border-red-900
      dark:bg-red-950/30
      dark:text-red-300
    `,
  }[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        h-11
        flex-1
        items-center
        justify-center
        gap-2

        rounded-2xl

        px-4

        text-sm
        font-bold

        transition

        ${variantClass}
      `}
    >
      <Icon size={17} />

      {label}
    </button>
  );
}

/* ========================================================= */
/* Booking Status Badge                                         */
/* ========================================================= */


/* ========================================================= */
/* Helpers                                                       */
/* ========================================================= */

function calculateNights(checkin: string, checkout: string) {
  const start = new Date(checkin);
  const end = new Date(checkout);

  const diff = end.getTime() - start.getTime();

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function formatDate(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatTime(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

function getInitials(name: string) {
  if (!name) return "?";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function getRoomTypeName(booking: Booking) {
  const item = booking as any;

  return (
    item.roomTypeName ||
    item.roomType?.name ||
    `Loại phòng #${booking.roomTypeId}`
  );
}

function getPaymentStatus(booking: Booking): PaymentStatus {
  if (booking.remainingAmount <= 0) {
    return PaymentStatus.Paid;
  }

  const payments = (booking as any).payments;

  if (payments && payments.length > 0) {
    const latest = payments[payments.length - 1];

    return latest.status;
  }

  return PaymentStatus.Pending;
}

function getPaymentMethodLabel(method: number) {
  const map: Record<number, string> = {
    1: "Tiền mặt",
    2: "Chuyển khoản",
    3: "Thẻ",
    4: "VNPay",
    5: "MoMo",
  };

  return map[method] ?? `Phương thức #${method}`;
}
