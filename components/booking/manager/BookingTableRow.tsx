'use client';

import {
  Eye,
  MoreHorizontal,
  Pencil,
  Check,
  LogIn,
  LogOut,
  X,
} from 'lucide-react';

import {
  TableCell,
  TableRow,
} from '@/components/ui/table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Booking } from '@/types/booking';
import BookingStatusBadge from './BookingStatusBadge';
import PaymentStatusBadge from './PaymentStatusBadge';



interface Props {
  booking: Booking;

  onView?: (booking: Booking) => void;

  onEdit?: (booking: Booking) => void;

  onConfirm?: (booking: Booking) => void;

  onCheckIn?: (booking: Booking) => void;

  onCheckOut?: (booking: Booking) => void;

  onCancel?: (booking: Booking) => void;
}

function formatDate(date?: string | null) {
  if (!date) return '--';

  return new Date(date).toLocaleDateString(
    'vi-VN',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    },
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat(
    'vi-VN',
  ).format(value);
}

function getPaymentStatus(
  booking: Booking,
) {
  if (
    booking.paidAmount >=
    booking.total
  ) {
    return 2;
  }

  if (
    booking.paidAmount > 0
  ) {
    return 1;
  }

  return 1;
}

export default function BookingTableRow({
  booking,
  onView,
  onEdit,
  onConfirm,
  onCheckIn,
  onCheckOut,
  onCancel,
}: Props) {
  const paymentStatus =
    getPaymentStatus(booking);

  return (
    <TableRow
      className="
        border-b
        border-[#E5E5EA]

        transition-colors

        hover:bg-[#F5F5F7]

        dark:border-[#2C2C2E]
        dark:hover:bg-[#2C2C2E]
      "
    >

      {/* ================================================= */}
      {/* Booking code                                       */}
      {/* ================================================= */}

      <TableCell className="px-3 py-3">
        <div className="flex flex-col">
          <span
            className="
              text-sm
              font-bold
              text-[#007AFF]
            "
          >
            {booking.bookingCode}
          </span>

          <span
            className="
              mt-0.5
              text-[11px]
              text-[#8E8E93]
            "
          >
            #{booking.id}
          </span>
        </div>
      </TableCell>

      {/* ================================================= */}
      {/* Guest                                              */}
      {/* ================================================= */}

      <TableCell className="px-3 py-3">
        <div className="flex flex-col">
          <span
            className="
              max-w-[180px]
              truncate

              text-sm
              font-semibold
            "
          >
            {booking.guestName}
          </span>

          <span
            className="
              max-w-[180px]
              truncate

              text-xs
              text-[#8E8E93]
            "
          >
            {booking.guestPhone}
          </span>
        </div>
      </TableCell>

      {/* ================================================= */}
      {/* Room                                               */}
      {/* ================================================= */}

      <TableCell className="px-3 py-3">
        <div className="flex flex-col">
          <span
            className="
              max-w-[130px]
              truncate

              text-sm
              font-medium
            "
          >
            {booking.roomTypeName ??
              booking.roomTypeName ??
              `Phòng #${booking.roomTypeId}`}
          </span>

          <span
            className="
              text-[11px]
              text-[#8E8E93]
            "
          >
            {booking.roomQuantity} phòng
          </span>
        </div>
      </TableCell>

      {/* ================================================= */}
      {/* Checkin / Checkout                                 */}
      {/* ================================================= */}

      <TableCell className="px-3 py-3">
        <div className="flex flex-col gap-0.5">
          <div className="flex gap-1">
            <span
              className="
                text-[11px]
                font-medium
                text-[#8E8E93]
              "
            >
              In:
            </span>

            <span className="text-xs font-medium">
              {formatDate(
                booking.checkin,
              )}
            </span>
          </div>

          <div className="flex gap-1">
            <span
              className="
                text-[11px]
                font-medium
                text-[#8E8E93]
              "
            >
              Out:
            </span>

            <span className="text-xs font-medium">
              {formatDate(
                booking.checkout,
              )}
            </span>
          </div>
        </div>
      </TableCell>

      {/* ================================================= */}
      {/* Quantity                                           */}
      {/* ================================================= */}

      <TableCell
        className="
          px-2
          py-3
          text-center
        "
      >
        <span
          className="
            inline-flex
            min-w-7
            items-center
            justify-center

            rounded-lg
            bg-[#F2F2F7]

            px-2
            py-1

            text-xs
            font-bold

            dark:bg-[#2C2C2E]
          "
        >
          {booking.roomQuantity}
        </span>
      </TableCell>

      {/* ================================================= */}
      {/* Total                                              */}
      {/* ================================================= */}

      <TableCell
        className="
          px-3
          py-3
          text-right
        "
      >
        <div className="flex flex-col items-end">
          <span
            className="
              whitespace-nowrap
              text-sm
              font-bold
            "
          >
            {formatMoney(
              booking.total,
            )}
          </span>

          {booking.remainingAmount >
            0 && (
            <span
              className="
                whitespace-nowrap
                text-[10px]
                text-orange-500
              "
            >
              Còn{" "}
              {formatMoney(
                booking.remainingAmount,
              )}
            </span>
          )}
        </div>
      </TableCell>

      {/* ================================================= */}
      {/* Booking status                                     */}
      {/* ================================================= */}

      <TableCell className="px-3 py-3">
        <BookingStatusBadge
          status={booking.status}
        />
      </TableCell>

      {/* ================================================= */}
      {/* Payment status                                     */}
      {/* ================================================= */}

      <TableCell className="px-3 py-3">
        <PaymentStatusBadge
          status={paymentStatus}
        />
      </TableCell>

      {/* ================================================= */}
      {/* Action                                             */}
      {/* ================================================= */}

      <TableCell className="px-2 py-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="
              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-lg

              text-[#8E8E93]

              hover:bg-[#F2F2F7]
              hover:text-black

              dark:hover:bg-[#2C2C2E]
              dark:hover:text-white
            "
          >
            <MoreHorizontal size={18} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-44"
          >

            <DropdownMenuItem
              onClick={() =>
                onView?.(booking)
              }
            >
              <Eye size={16} />

              Xem chi tiết
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                onEdit?.(booking)
              }
            >
              <Pencil size={16} />

              Chỉnh sửa
            </DropdownMenuItem>

            {booking.status ===
              1 && (
              <DropdownMenuItem
                onClick={() =>
                  onConfirm?.(
                    booking,
                  )
                }
              >
                <Check size={16} />

                Xác nhận
              </DropdownMenuItem>
            )}

            {booking.status ===
              1 && (
              <DropdownMenuItem
                onClick={() =>
                  onCheckIn?.(
                    booking,
                  )
                }
              >
                <LogIn size={16} />

                Check-in
              </DropdownMenuItem>
            )}

            {booking.status ===
              2 && (
              <DropdownMenuItem
                onClick={() =>
                  onCheckOut?.(
                    booking,
                  )
                }
              >
                <LogOut size={16} />

                Check-out
              </DropdownMenuItem>
            )}

            {(
              booking.status ===
                1 ||
              booking.status ===
                2
            ) && (
              <DropdownMenuItem
                className="text-red-500"
                onClick={() =>
                  onCancel?.(
                    booking,
                  )
                }
              >
                <X size={16} />

                Hủy booking
              </DropdownMenuItem>
            )}

          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}