'use client';

import {
  Table,
  TableBody,
} from '@/components/ui/table';

import BookingTableHeader from './BookingTableHeader';
import BookingTableRow from './BookingTableRow';
import BookingEmpty from './BookingEmpty';

import { Booking } from '@/types/booking';
import BookingSkeleton from './BookingSkeleton';

interface Props {
  bookings: Booking[];

  loading?: boolean;

  onView?: (booking: Booking) => void;

  onEdit?: (booking: Booking) => void;

  onConfirm?: (booking: Booking) => void;

  onCheckIn?: (booking: Booking) => void;

  onCheckOut?: (booking: Booking) => void;

  onCancel?: (booking: Booking) => void;
}

export default function BookingTable({
  bookings,
  loading = false,
  onView,
  onEdit,
  onConfirm,
  onCheckIn,
  onCheckOut,
  onCancel,
}: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl

        border
        border-[#E5E5EA]

        bg-white

        shadow-sm

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div className="overflow-x-auto">
        <Table className="w-full">

          <BookingTableHeader />

          <TableBody>

            {loading ? (
              <BookingSkeleton />
            ) : bookings.length === 0 ? (
              <BookingEmpty />
            ) : (
              bookings.map((booking) => (
                <BookingTableRow
                  key={booking.id}
                  booking={booking}
                  onView={onView}
                  onEdit={onEdit}
                  onConfirm={onConfirm}
                  onCheckIn={onCheckIn}
                  onCheckOut={onCheckOut}
                  onCancel={onCancel}
                />
              ))
            )}

          </TableBody>

        </Table>
      </div>
    </div>
  );
}