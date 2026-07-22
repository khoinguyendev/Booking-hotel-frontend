'use client';

import Link from 'next/link';
import { ArrowRight, CalendarDays, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export interface BookingHistory {
  id: number;
  bookingCode: string;
  customerName: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  status:
    | 'Pending'
    | 'Confirmed'
    | 'CheckedIn'
    | 'CheckedOut'
    | 'Cancelled';
}

interface Props {
  bookings: BookingHistory[];
}

const statusConfig = {
  Pending: {
    label: 'Chờ xác nhận',
    className:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
  },
  Confirmed: {
    label: 'Đã xác nhận',
    className:
      'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  },
  CheckedIn: {
    label: 'Đang ở',
    className:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  CheckedOut: {
    label: 'Hoàn thành',
    className:
      'bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200',
  },
  Cancelled: {
    label: 'Đã hủy',
    className:
      'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  },
};

export default function BookingHistorySection({
  bookings,
}: Props) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchSearch =
        booking.bookingCode
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        booking.customerName
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        status === 'All' || booking.status === status;

      return matchSearch && matchStatus;
    });
  }, [bookings, search, status]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      {/* Header */}

      <div className="flex flex-col gap-4 border-b border-zinc-200 px-6 py-5 dark:border-zinc-800 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-lg font-bold">
            Lịch sử đặt phòng
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {filteredBookings.length} lượt đặt
          </p>

        </div>

        <div className="flex flex-wrap items-center gap-3">

          <div className="relative">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Mã đơn / Khách..."
              className="h-11 w-56 rounded-xl border border-zinc-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
            />

          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 rounded-xl border border-zinc-300 bg-white px-4 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="All">Tất cả</option>
            <option value="Pending">Chờ xác nhận</option>
            <option value="Confirmed">Đã xác nhận</option>
            <option value="CheckedIn">Đang ở</option>
            <option value="CheckedOut">Hoàn thành</option>
            <option value="Cancelled">Đã hủy</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-zinc-50 dark:bg-zinc-800/50">

            <tr>

              <th className="px-6 py-4 text-left text-xs uppercase text-zinc-500">
                Mã đơn
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-zinc-500">
                Khách hàng
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-zinc-500">
                Thời gian
              </th>

              <th className="px-6 py-4 text-right text-xs uppercase text-zinc-500">
                Tổng tiền
              </th>

              <th className="px-6 py-4 text-center text-xs uppercase text-zinc-500">
                Trạng thái
              </th>

              <th className="px-6 py-4 text-right text-xs uppercase text-zinc-500">
                Chi tiết
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredBookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
              >

                <td className="px-6 py-5 font-semibold">
                  {booking.bookingCode}
                </td>

                <td className="px-6 py-5">
                  {booking.customerName}
                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-2 text-sm">

                    <CalendarDays className="h-4 w-4 text-blue-600" />

                    <span>
                      {booking.checkIn} → {booking.checkOut}
                    </span>

                  </div>

                </td>

                <td className="px-6 py-5 text-right font-semibold">
                  {formatPrice(booking.totalAmount)}
                </td>

                <td className="px-6 py-5 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[booking.status].className}`}
                  >
                    {statusConfig[booking.status].label}
                  </span>

                </td>

                <td className="px-6 py-5 text-right">

                  <Link
                    href={`/admin/bookings/${booking.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    Xem
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}
