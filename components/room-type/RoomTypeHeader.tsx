
'use client';

import { BedDouble, Pencil, Users, Ruler, Wallet } from 'lucide-react';

interface Props {
  roomType: {
    name: string;
    basePrice: number;
    maxGuest: number;
    bedType: string;
    roomSize: number;
    images: string;
  };
}

export default function RoomTypeHeader({ roomType }: Props) {
  const cover =
    roomType.images.split(',')[0] ||
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a';

  const price = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(roomType.basePrice);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">

      {/* Banner */}

      <div className="relative h-[340px]">

        <img
          src={cover}
          alt={roomType.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

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
            bg-white/20
            backdrop-blur-xl
            border
            border-white/20
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-white/30
          "
        >
          <Pencil className="h-4 w-4" />
          Chỉnh sửa
        </button>

        {/* Content */}

        <div className="absolute bottom-0 left-0 right-0 p-8">

          <h1 className="text-4xl font-black text-white">
            {roomType.name}
          </h1>

          <div className="mt-3 flex flex-wrap gap-3">

            <div className="rounded-full bg-white/20 backdrop-blur px-4 py-2 text-white text-sm font-medium">
              <Wallet className="mr-2 inline h-4 w-4" />
              {price} / đêm
            </div>

            <div className="rounded-full bg-white/20 backdrop-blur px-4 py-2 text-white text-sm font-medium">
              <BedDouble className="mr-2 inline h-4 w-4" />
              {roomType.bedType}
            </div>

            <div className="rounded-full bg-white/20 backdrop-blur px-4 py-2 text-white text-sm font-medium">
              <Users className="mr-2 inline h-4 w-4" />
              {roomType.maxGuest} khách
            </div>

            <div className="rounded-full bg-white/20 backdrop-blur px-4 py-2 text-white text-sm font-medium">
              <Ruler className="mr-2 inline h-4 w-4" />
              {roomType.roomSize} m²
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

