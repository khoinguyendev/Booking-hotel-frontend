'use client';

import Image from 'next/image';
import {
  BedDouble,
  Building2,
  Pencil,
  Ruler,
  Users,
  Wallet,
} from 'lucide-react';

export interface Room {
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

export interface RoomType {
  id: number;
  name: string;
  basePrice: number;
  maxGuest: number;
  bedType: string;
  roomSize: number;
}

interface Props {
  room: Room;
  roomType: RoomType;
}

const statusConfig = {
  Available: {
    label: 'Trống',
    className: 'bg-emerald-500',
  },
  Occupied: {
    label: 'Đang sử dụng',
    className: 'bg-blue-500',
  },
  Maintenance: {
    label: 'Bảo trì',
    className: 'bg-orange-500',
  },
  Cleaning: {
    label: 'Đang dọn',
    className: 'bg-violet-500',
  },
  OutOfService: {
    label: 'Ngừng sử dụng',
    className: 'bg-red-500',
  },
};

export default function RoomDetailHeader({
  room,
  roomType,
}: Props) {
  const price = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(roomType.basePrice);

  const status = statusConfig[room.status];

  return (
    <section className="relative overflow-hidden rounded-3xl shadow-sm">

      {/* Banner */}

      <div className="relative h-[360px]">

        <Image
          src={room.image}
          alt={room.roomNumber}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Edit */}

        <button
          className="
            absolute
            right-6
            top-6
            inline-flex
            items-center
            gap-2
            rounded-2xl
            border
            border-white/20
            bg-white/20
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            backdrop-blur-xl
            transition
            hover:bg-white/30
          "
        >
          <Pencil className="h-4 w-4" />
          Chỉnh sửa
        </button>

        {/* Bottom */}

        <div className="absolute bottom-0 left-0 right-0 p-8">

          <span
            className={`
              inline-flex
              rounded-full
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              ${status.className}
            `}
          >
            {status.label}
          </span>

          <h1 className="mt-5 text-5xl font-black text-white">
            Phòng {room.roomNumber}
          </h1>

          <p className="mt-2 text-xl text-zinc-200">
            {roomType.name}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <Badge
              icon={<Building2 className="h-4 w-4" />}
              text={`Tầng ${room.floor}`}
            />

            <Badge
              icon={<Wallet className="h-4 w-4" />}
              text={`${price} / đêm`}
            />

            <Badge
              icon={<Users className="h-4 w-4" />}
              text={`${roomType.maxGuest} khách`}
            />

            <Badge
              icon={<BedDouble className="h-4 w-4" />}
              text={roomType.bedType}
            />

            <Badge
              icon={<Ruler className="h-4 w-4" />}
              text={`${roomType.roomSize} m²`}
            />

          </div>

        </div>

      </div>

    </section>
  );
}

interface BadgeProps {
  icon: React.ReactNode;
  text: string;
}

function Badge({
  icon,
  text,
}: BadgeProps) {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-white/20
        bg-white/20
        px-4
        py-2
        text-sm
        font-medium
        text-white
        backdrop-blur-xl
      "
    >
      {icon}
      {text}
    </div>
  );
}
