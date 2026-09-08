'use client';

import {
  Clock3,
  CheckCircle2,
  LogIn,
  LogOut,
  XCircle,
  UsersRound,
} from 'lucide-react';

import { BookingStatus } from '@/types/booking';

interface Props {
  value: BookingStatus | 0;

  onChange: (
    value: BookingStatus | 0,
  ) => void;
}

const filters = [
  {
    value: 0,
    label: 'Tất cả',
    icon: UsersRound,

    active:
      'bg-[#007AFF] text-white border-[#007AFF]',

    inactive:
      'bg-white text-[#007AFF] border-[#007AFF]/20 hover:bg-blue-50',
  },

  {
    value: BookingStatus.Pending,
    label: 'Chờ xác nhận',
    icon: Clock3,

    active:
      'bg-orange-500 text-white border-orange-500',

    inactive:
      'bg-white text-orange-600 border-orange-200 hover:bg-orange-50',
  },

  {
    value: BookingStatus.Confirmed,
    label: 'Đã xác nhận',
    icon: CheckCircle2,

    active:
      'bg-blue-500 text-white border-blue-500',

    inactive:
      'bg-white text-blue-600 border-blue-200 hover:bg-blue-50',
  },

  {
    value: BookingStatus.CheckedIn,
    label: 'Đã nhận phòng',
    icon: LogIn,

    active:
      'bg-green-500 text-white border-green-500',

    inactive:
      'bg-white text-green-600 border-green-200 hover:bg-green-50',
  },

  {
    value: BookingStatus.CheckedOut,
    label: 'Đã trả phòng',
    icon: LogOut,

    active:
      'bg-gray-500 text-white border-gray-500',

    inactive:
      'bg-white text-gray-600 border-gray-200 hover:bg-gray-50',
  },

  {
    value: BookingStatus.Cancelled,
    label: 'Đã hủy',
    icon: XCircle,

    active:
      'bg-red-500 text-white border-red-500',

    inactive:
      'bg-white text-red-600 border-red-200 hover:bg-red-50',
  },
];

export default function QuickBookingStatusFilter({
  value,
  onChange,
}: Props) {
  return (
    <div
      className="
        flex
        items-center
        gap-2

        overflow-x-auto

        pb-1

        scrollbar-none
      "
    >
      {filters.map((filter) => {
        const Icon = filter.icon;

        const active =
          value === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() =>
              onChange(
                filter.value as
                  | BookingStatus
                  | 0,
              )
            }
            className={`
              inline-flex
              shrink-0
              items-center
              gap-2

              rounded-full

              border

              px-4
              py-2

              text-xs
              font-semibold

              transition-all

              ${
                active
                  ? filter.active
                  : filter.inactive
              }

              ${
                active
                  ? 'shadow-sm'
                  : ''
              }
            `}
          >
            <Icon size={15} />

            {filter.label}
          </button>
        );
      })}
    </div>
  );
}