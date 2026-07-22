'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  CheckCircle2,
  Wrench,
} from 'lucide-react';

interface Props {
  roomSummary: {
    total: number;
    active: number;
    maintenance: number;
  };
}

export default function RoomSummaryCard({
  roomSummary,
}: Props) {
  const cards = [
    {
      title: 'Tổng phòng',
      value: roomSummary.total,
      icon: BedDouble,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
      title: 'Đang hoạt động',
      value: roomSummary.active,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      title: 'Bảo trì',
      value: roomSummary.maintenance,
      icon: Wrench,
      color: 'text-orange-600',
      bg: 'bg-orange-50 dark:bg-orange-500/10',
    },
  ];

  return (
    <section className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">

        <div>
          <h2 className="text-lg font-bold">
            Phòng khách sạn
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            Tổng quan trạng thái phòng
          </p>
        </div>

        <Link
          href="/admin/rooms"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            hover:bg-blue-700
            transition
          "
        >
          Quản lý phòng
          <ArrowRight className="w-4 h-4" />
        </Link>

      </div>

      {/* Body */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
                rounded-2xl
                border
                border-zinc-200
                dark:border-zinc-700
                p-5
                hover:shadow-lg
                transition
              "
            >
              <div className="flex justify-between items-center">

                <div
                  className={`
                    w-12
                    h-12
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    ${card.bg}
                  `}
                >
                  <Icon
                    className={`w-6 h-6 ${card.color}`}
                  />
                </div>

              </div>

              <div className="mt-5">

                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-4xl font-black">
                  {card.value}
                </h3>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}
