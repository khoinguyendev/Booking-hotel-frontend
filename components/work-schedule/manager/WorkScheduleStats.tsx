'use client';

import {
  CalendarClock,
  Clock3,
  Coffee,
  Users,
} from 'lucide-react';

interface Props {
  stats: {
    working: number;
    dayOff: number;
    noShift: number;
    totalShift: number;
  };
}

export default function WorkScheduleStats({
  stats,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Có ca hôm nay"
        value={stats.working}
        icon={<Users size={22} />}
        color="bg-blue-500"
      />

      <StatCard
        title="Nghỉ"
        value={stats.dayOff}
        icon={<Coffee size={22} />}
        color="bg-gray-500"
      />

      <StatCard
        title="Chưa phân ca"
        value={stats.noShift}
        icon={<Clock3 size={22} />}
        color="bg-orange-500"
      />

      <StatCard
        title="Tổng nhân viên"
        value={stats.totalShift}
        icon={<CalendarClock size={22} />}
        color="bg-green-500"
      />

    </div>
  );
}

interface CardProps {
  title: string;

  value: number;

  icon: React.ReactNode;

  color: string;
}

function StatCard({
  title,
  value,
  icon,
  color,
}: CardProps) {
  return (
    <div
      className="
        group

        rounded-3xl
        border
        border-[#E5E5EA]

        bg-white

        p-5

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-lg

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-[#8E8E93]">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-2xl

            text-white

            ${color}
          `}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}