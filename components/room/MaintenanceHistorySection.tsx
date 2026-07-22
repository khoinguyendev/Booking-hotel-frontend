'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Search,
  Wrench,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export interface MaintenanceHistory {
  id: number;
  title: string;
  description: string;
  maintenanceDate: string;
  cost: number;
  technician: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
}

interface Props {
  histories: MaintenanceHistory[];
}

const statusConfig = {
  Pending: {
    label: 'Chờ xử lý',
    className:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
  },
  Processing: {
    label: 'Đang sửa',
    className:
      'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  },
  Completed: {
    label: 'Hoàn thành',
    className:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  Cancelled: {
    label: 'Đã hủy',
    className:
      'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  },
};

export default function MaintenanceHistorySection({
  histories,
}: Props) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const filtered = useMemo(() => {
    return histories.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.technician.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        status === 'All' || item.status === status;

      return matchSearch && matchStatus;
    });
  }, [histories, search, status]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex flex-col gap-4 border-b border-zinc-200 px-6 py-5 dark:border-zinc-800 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-lg font-bold">
            Lịch sử bảo trì
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {filtered.length} lần bảo trì
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">

          <div className="relative">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm nội dung..."
              className="h-11 w-56 rounded-xl border border-zinc-300 bg-white pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
            />

          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 rounded-xl border border-zinc-300 bg-white px-4 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="All">Tất cả</option>
            <option value="Pending">Chờ xử lý</option>
            <option value="Processing">Đang sửa</option>
            <option value="Completed">Hoàn thành</option>
            <option value="Cancelled">Đã hủy</option>
          </select>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-zinc-50 dark:bg-zinc-800/50">

            <tr>

              <th className="px-6 py-4 text-left text-xs uppercase text-zinc-500">
                Nội dung
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-zinc-500">
                Ngày
              </th>

              <th className="px-6 py-4 text-left text-xs uppercase text-zinc-500">
                Kỹ thuật viên
              </th>

              <th className="px-6 py-4 text-right text-xs uppercase text-zinc-500">
                Chi phí
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

            {filtered.map((item) => (

              <tr
                key={item.id}
                className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-500/10">
                      <Wrench className="h-5 w-5" />
                    </div>

                    <div>

                      <p className="font-semibold">
                        {item.title}
                      </p>

                      <p className="text-sm text-zinc-500">
                        {item.description}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-600" />
                    {item.maintenanceDate}
                  </div>
                </td>

                <td className="px-6 py-5">
                  {item.technician}
                </td>

                <td className="px-6 py-5 text-right font-semibold">
                  {formatPrice(item.cost)}
                </td>

                <td className="px-6 py-5 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[item.status].className}`}
                  >
                    {statusConfig[item.status].label}
                  </span>

                </td>

                <td className="px-6 py-5 text-right">

                  <Link
                    href={`/admin/maintenance/${item.id}`}
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
