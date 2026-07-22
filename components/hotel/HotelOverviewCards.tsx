'use client';

import {
  BedDouble,
  Building2,
  ImageIcon,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface Props {
  overview: {
    roomTypes: number;
    rooms: number;
    amenities: number;
    surcharges: number;
  };
  
}

const cards = [
  {
    key: 'roomTypes',
    title: 'Loại phòng',
    icon: Building2,
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    href: '/admin/room-types',
  },
  {
    key: 'rooms',
    title: 'Phòng',
    icon: BedDouble,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    href: '/admin/rooms',
  },
  {
    key: 'amenities',
    title: 'Tiện ích',
    icon: Sparkles,
    color: 'text-violet-600',
    bg: 'bg-violet-50 dark:bg-violet-500/10',
    href: '/admin/amenities',
  },
  {
    key: 'surcharges',
    title: 'Phụ thu',
    icon: Building2,
    color: 'text-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    href: '/admin/surcharges',
  },
  
] as const;

export default function HotelOverviewCards({ overview }: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        const value = overview[card.key];

        return (
          <div
            key={card.key}
            className="
              group
              rounded-3xl
              bg-white
              dark:bg-zinc-900
              border
              border-zinc-200
              dark:border-zinc-800
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div className="flex items-center justify-between">
              <div
                className={`
                  h-12
                  w-12
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${card.bg}
                `}
              >
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>

              <ArrowRight
                className="
                  h-5
                  w-5
                  text-zinc-400
                  opacity-0
                  transition-all
                  group-hover:opacity-100
                  group-hover:translate-x-1
                "
              />
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-4xl font-black text-zinc-900 dark:text-white">
                {value}
              </h2>

              <p className="mt-4 text-sm text-blue-600 font-medium group-hover:underline cursor-pointer">
                Quản lý
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}