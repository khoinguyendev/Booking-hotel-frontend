'use client';

import {
  BedDouble,
  CheckCircle2,
  DoorOpen,
  Wrench,
} from 'lucide-react';

interface Room {
  id: number;
  roomNumber: string;
  floor: number;
  status:
    | 'Available'
    | 'Occupied'
    | 'Maintenance'
    | 'Cleaning'
    | 'OutOfService';
  image: string;
}

interface Props {
  rooms: Room[];
}

export default function RoomTypeOverview({ rooms }: Props) {
  const total = rooms.length;

  const available = rooms.filter(
    (room) => room.status === 'Available'
  ).length;

  const occupied = rooms.filter(
    (room) => room.status === 'Occupied'
  ).length;

  const maintenance = rooms.filter(
    (room) => room.status === 'Maintenance'
  ).length;

  const cleaning = rooms.filter(
    (room) => room.status === 'Cleaning'
  ).length;

  const cards = [
    {
      title: 'Tổng phòng',
      value: total,
      color: 'blue',
      icon: BedDouble,
    },
    {
      title: 'Phòng trống',
      value: available,
      color: 'emerald',
      icon: DoorOpen,
    },
    {
      title: 'Đang sử dụng',
      value: occupied,
      color: 'violet',
      icon: CheckCircle2,
    },
    {
      title: 'Bảo trì',
      value: maintenance,
      color: 'orange',
      icon: Wrench,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border bg-white dark:bg-zinc-900 p-6 shadow-sm"
          >
            <Icon className="w-8 h-8 text-blue-600" />

            <h2 className="mt-6 text-4xl font-black">
              {card.value}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {card.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}