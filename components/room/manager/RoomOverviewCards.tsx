'use client';

import {
  CalendarDays,
  Star,
  BedDouble,
  Sparkles,
} from 'lucide-react';

interface Props {
  totalBookings: number;
  currentBooking?: {
    guestName: string;
    checkIn: string;
    checkOut: string;
  } | null;
  averageRating: number;
  lastCleaning: string;
}

export default function RoomOverviewCards({
  totalBookings,
  currentBooking,
  averageRating,
  lastCleaning,
}: Props) {
  const cards = [
    {
      title: 'Tổng lượt đặt',
      value: totalBookings,
      subtitle: 'Từ khi đưa vào hoạt động',
      icon: CalendarDays,
      color: 'blue',
    },
    {
      title: 'Trạng thái đặt',
      value: currentBooking ? 'Đang có khách' : 'Đang trống',
      subtitle: currentBooking
        ? `${currentBooking.checkIn} → ${currentBooking.checkOut}`
        : 'Sẵn sàng nhận khách',
      icon: BedDouble,
      color: currentBooking ? 'emerald' : 'orange',
    },
    {
      title: 'Đánh giá',
      value: `${averageRating.toFixed(1)} / 5`,
      subtitle: 'Điểm trung bình',
      icon: Star,
      color: 'yellow',
    },
    {
      title: 'Dọn phòng',
      value: lastCleaning,
      subtitle: 'Lần gần nhất',
      icon: Sparkles,
      color: 'cyan',
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-3xl
              border
              border-zinc-200
              dark:border-zinc-800
              bg-white
              dark:bg-zinc-900
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="flex items-center justify-between">
              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  ${colors[card.color].bg}
                `}
              >
                <Icon
                  className={`h-7 w-7 ${colors[card.color].text}`}
                />
              </div>

              <span className="text-xs font-medium text-zinc-400">
                ROOM
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm text-zinc-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-2xl font-black text-zinc-900 dark:text-white break-words">
                {card.value}
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

const colors = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    text: 'text-blue-600',
  },

  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    text: 'text-emerald-600',
  },

  orange: {
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    text: 'text-orange-600',
  },

  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-500/10',
    text: 'text-yellow-600',
  },

  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-500/10',
    text: 'text-cyan-600',
  },
} as const;
