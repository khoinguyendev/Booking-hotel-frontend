'use client';

import {
  BedDouble,
  Building2,
  CalendarClock,
  FileText,
  Home,
  Pencil,
  Tag,
} from 'lucide-react';

interface Props {
  room: {
    id: number;
    roomNumber: string;
    floor: number;
    status: string;
    image: string;
  };

  roomType: {
    name: string;
    basePrice: number;
    roomSize: number;
    maxGuest: number;
    bedType: string;
    view?: string;
    smoking?: boolean;
    breakfast?: boolean;
    extraBedPrice?: number;
    description: string;
  };
}

export default function RoomInfoCard({
  room,
  roomType,
}: Props) {
  const formatPrice = (price?: number) => {
    if (!price) return 'Không hỗ trợ';

    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">

        <div>
          <h2 className="text-lg font-bold">
            Thông tin phòng
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Thông tin chi tiết của phòng
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
          <Pencil className="h-4 w-4" />
          Chỉnh sửa
        </button>

      </div>

      {/* Body */}

      <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">

        <InfoItem
          icon={<Home className="h-5 w-5" />}
          title="Số phòng"
          value={room.roomNumber}
        />

        <InfoItem
          icon={<Building2 className="h-5 w-5" />}
          title="Tầng"
          value={`Tầng ${room.floor}`}
        />

        <InfoItem
          icon={<Tag className="h-5 w-5" />}
          title="Loại phòng"
          value={roomType.name}
        />

        <InfoItem
          icon={<BedDouble className="h-5 w-5" />}
          title="Giường"
          value={roomType.bedType}
        />

        <InfoItem
          icon={<CalendarClock className="h-5 w-5" />}
          title="Giá / đêm"
          value={formatPrice(roomType.basePrice)}
        />

        <InfoItem
          icon={<FileText className="h-5 w-5" />}
          title="Trạng thái"
          value={room.status}
        />

      </div>

      {/* Description */}

      <div className="px-6 pb-6">

        <div className="rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-800/50">

          <h3 className="font-semibold">
            Mô tả
          </h3>

          <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
            {roomType.description}
          </p>

        </div>

      </div>

    </section>
  );
}

interface ItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function InfoItem({
  icon,
  title,
  value,
}: ItemProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-700">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10">
        {icon}
      </div>

      <p className="mt-5 text-xs uppercase tracking-wide text-zinc-500">
        {title}
      </p>

      <h4 className="mt-2 text-lg font-bold">
        {value}
      </h4>

    </div>
  );
}
