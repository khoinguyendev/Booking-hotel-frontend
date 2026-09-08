"use client";

import {
  CalendarPlus,
  CheckCircle2,
  Download,
  FileUp,
  LogIn,
  LogOut,
  Plus,
  Upload,
  XCircle,
} from "lucide-react";

import { Booking, BookingStatus } from "@/types/booking";

interface Props {
  selectedBookings?: Booking[];

  onCreate?: () => void;

  onConfirm?: (bookings: Booking[]) => void;

  onCheckIn?: (bookings: Booking[]) => void;

  onCheckOut?: (bookings: Booking[]) => void;

  onCancel?: (bookings: Booking[]) => void;

  onExport?: (bookings?: Booking[]) => void;

  onImport?: () => void;

  loading?: boolean;
}

export default function BookingToolbar({
  selectedBookings = [],

  onCreate,

  onConfirm,

  onCheckIn,

  onCheckOut,

  onCancel,

  onExport,

  onImport,

  loading = false,
}: Props) {
  const selectedCount = selectedBookings.length;

  const canConfirm =
    selectedCount > 0 &&
    selectedBookings.every(
      (booking) =>
        booking.status === BookingStatus.Pending,
    );

  const canCheckIn =
    selectedCount > 0 &&
    selectedBookings.every(
      (booking) =>
        booking.status === BookingStatus.Confirmed,
    );

  const canCheckOut =
    selectedCount > 0 &&
    selectedBookings.every(
      (booking) =>
        booking.status === BookingStatus.CheckedIn,
    );

  const canCancel =
    selectedCount > 0 &&
    selectedBookings.every(
      (booking) =>
        booking.status === BookingStatus.Pending ||
        booking.status === BookingStatus.Confirmed,
    );

  return (
    <div
      className="
        flex
        flex-col
        gap-4

        rounded-3xl

        border
        border-[#E5E5EA]

        bg-white

        p-4

        shadow-sm

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* Left */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Create */}
        <ToolbarButton
          icon={Plus}
          label="Tạo booking"
          onClick={onCreate}
          primary
          disabled={loading}
        />

        {/* Import */}
        {onImport && (
          <ToolbarButton
            icon={Upload}
            label="Import"
            onClick={onImport}
            disabled={loading}
          />
        )}

        {/* Export */}
        {onExport && (
          <ToolbarButton
            icon={Download}
            label={
              selectedCount > 0
                ? `Export (${selectedCount})`
                : "Export"
            }
            onClick={() =>
              onExport(
                selectedCount > 0
                  ? selectedBookings
                  : undefined,
              )
            }
            disabled={loading}
          />
        )}
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Selected count */}
        {selectedCount > 0 && (
          <div
            className="
              mr-1

              flex
              items-center
              gap-2

              rounded-full

              bg-blue-50

              px-3
              py-2

              text-xs
              font-semibold
              text-[#007AFF]

              dark:bg-blue-950/30
              dark:text-blue-300
            "
          >
            <span
              className="
                flex
                h-5
                min-w-5
                items-center
                justify-center

                rounded-full

                bg-[#007AFF]

                px-1

                text-[10px]
                font-bold
                text-white
              "
            >
              {selectedCount}
            </span>

            booking được chọn
          </div>
        )}

        {/* Confirm */}
        {canConfirm && (
          <ToolbarButton
            icon={CheckCircle2}
            label="Xác nhận"
            onClick={() =>
              onConfirm?.(selectedBookings)
            }
            disabled={loading}
            success
          />
        )}

        {/* Check-in */}
        {canCheckIn && (
          <ToolbarButton
            icon={LogIn}
            label="Check-in"
            onClick={() =>
              onCheckIn?.(selectedBookings)
            }
            disabled={loading}
            blue
          />
        )}

        {/* Check-out */}
        {canCheckOut && (
          <ToolbarButton
            icon={LogOut}
            label="Check-out"
            onClick={() =>
              onCheckOut?.(selectedBookings)
            }
            disabled={loading}
            orange
          />
        )}

        {/* Cancel */}
        {canCancel && (
          <ToolbarButton
            icon={XCircle}
            label="Hủy booking"
            onClick={() =>
              onCancel?.(selectedBookings)
            }
            disabled={loading}
            danger
          />
        )}
      </div>
    </div>
  );
}

/* ========================================================= */
/* Button                                                     */
/* ========================================================= */

interface ToolbarButtonProps {
  icon: typeof Plus;

  label: string;

  onClick?: () => void;

  disabled?: boolean;

  primary?: boolean;

  success?: boolean;

  blue?: boolean;

  orange?: boolean;

  danger?: boolean;
}

function ToolbarButton({
  icon: Icon,

  label,

  onClick,

  disabled = false,

  primary = false,

  success = false,

  blue = false,

  orange = false,

  danger = false,
}: ToolbarButtonProps) {
  let className = `
    flex
    h-10
    items-center
    justify-center
    gap-2

    rounded-2xl

    border

    px-4

    text-sm
    font-semibold

    transition-all

    disabled:cursor-not-allowed
    disabled:opacity-50
  `;

  if (primary) {
    className += `
      border-[#007AFF]
      bg-[#007AFF]
      text-white

      hover:bg-[#006FE6]
    `;
  } else if (success) {
    className += `
      border-green-200
      bg-green-50
      text-green-700

      hover:bg-green-100

      dark:border-green-900
      dark:bg-green-950/30
      dark:text-green-300
    `;
  } else if (blue) {
    className += `
      border-blue-200
      bg-blue-50
      text-blue-700

      hover:bg-blue-100

      dark:border-blue-900
      dark:bg-blue-950/30
      dark:text-blue-300
    `;
  } else if (orange) {
    className += `
      border-orange-200
      bg-orange-50
      text-orange-700

      hover:bg-orange-100

      dark:border-orange-900
      dark:bg-orange-950/30
      dark:text-orange-300
    `;
  } else if (danger) {
    className += `
      border-red-200
      bg-red-50
      text-red-600

      hover:bg-red-100

      dark:border-red-900
      dark:bg-red-950/30
      dark:text-red-300
    `;
  } else {
    className += `
      border-[#E5E5EA]
      bg-white
      text-[#3C3C43]

      hover:bg-[#F5F5F7]

      dark:border-[#2C2C2E]
      dark:bg-[#2C2C2E]
      dark:text-white

      dark:hover:bg-[#3A3A3C]
    `;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      <Icon size={17} />

      <span>{label}</span>
    </button>
  );
}