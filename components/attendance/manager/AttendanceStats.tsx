'use client';

import {
  UserCheck,
  Clock3,
  CircleAlert,
  BedDouble,
  UserRoundX,
} from 'lucide-react';

interface Props {
  working: number;
  present: number;
  late: number;
  dayOff: number;
  notCheckIn: number;
}

export default function AttendanceStats({
  working,
  present,
  late,
  dayOff,
  notCheckIn,
}: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        title="Có ca hôm nay"
        value={working}
        color="blue"
        icon={<Clock3 size={22} />}
      />

      <StatCard
        title="Đúng giờ"
        value={present}
        color="green"
        icon={<UserCheck size={22} />}
      />

      <StatCard
        title="Đi trễ"
        value={late}
        color="orange"
        icon={<CircleAlert size={22} />}
      />

      <StatCard
        title="Nghỉ"
        value={dayOff}
        color="gray"
        icon={<BedDouble size={22} />}
      />

      <StatCard
        title="Chưa check-in"
        value={notCheckIn}
        color="red"
        icon={<UserRoundX size={22} />}
      />
    </div>
  );
}

interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange' | 'gray' | 'red';
}

function StatCard({
  title,
  value,
  icon,
  color,
}: CardProps) {
  const colors = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      icon: 'bg-blue-500 text-white',
      text: 'text-blue-600',
    },

    green: {
      bg: 'bg-green-50 dark:bg-green-950/30',
      icon: 'bg-green-500 text-white',
      text: 'text-green-600',
    },

    orange: {
      bg: 'bg-orange-50 dark:bg-orange-950/30',
      icon: 'bg-orange-500 text-white',
      text: 'text-orange-600',
    },

    gray: {
      bg: 'bg-gray-100 dark:bg-[#2C2C2E]',
      icon: 'bg-gray-500 text-white',
      text: 'text-gray-600 dark:text-gray-300',
    },

    red: {
      bg: 'bg-red-50 dark:bg-red-950/30',
      icon: 'bg-red-500 text-white',
      text: 'text-red-600',
    },
  };

  const c = colors[color];

  return (
    <div
      className={`
        rounded-3xl
        border
        border-[#E5E5EA]
        ${c.bg}
        p-5
        shadow-sm
        transition-all
        hover:shadow-lg
        dark:border-[#2C2C2E]
      `}
    >
      <div className="flex items-center justify-between">
        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            ${c.icon}
          `}
        >
          {icon}
        </div>

        <span className="text-4xl font-black tracking-tight">
          {value}
        </span>
      </div>

      <p
        className={`
          mt-5
          text-sm
          font-semibold
          ${c.text}
        `}
      >
        {title}
      </p>
    </div>
  );
}