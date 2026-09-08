'use client';

import { RoomType } from '@/types/roomtype';
import {
  BedDouble,
  CheckCircle2,
  DoorOpen,
  Wrench,
} from 'lucide-react';



interface Props {
  roomType: RoomType;
}

export default function RoomTypeOverview({ roomType }: Props) {
  

  const cards = [
    {
      title: 'Tổng phòng',
      value: roomType.roomCount,
      color: 'blue',
      icon: BedDouble,
    },
    {
      title: 'Phòng trống',
      value: roomType.availableCount,
      color: 'emerald',
      icon: DoorOpen,
    },
    {
      title: 'Đang sử dụng',
      value: roomType.occupiedCount,
      color: 'violet',
      icon: CheckCircle2,
    },
    {
      title: 'Bảo trì',
      value: roomType.maintenanceCount,
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