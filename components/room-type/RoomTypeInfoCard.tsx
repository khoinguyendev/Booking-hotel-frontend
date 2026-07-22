
'use client';

import {
  Wallet,
  Users,
  BedDouble,
  Ruler,
  Building2,
  CigaretteOff,
  UtensilsCrossed,
  Bed,
  Pencil,
  FileText,
} from 'lucide-react';
const formatPrice = (price?: number) => {
  if (!price) return 'Không hỗ trợ';

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(price);
};
interface RoomType {
  id: number;
  hotelId: number;
  name: string;
  maxGuest: number;
  basePrice: number;
  bedType: string;
  roomSize: number;
  description: string;
  images: string;
  view?:string;
  breakfast?:string;
  smoking?:string;
  extraBedPrice?:number
}

interface Props {
  roomType: RoomType;
}

export default function RoomTypeInfoCard({
  roomType,
}: Props) {
  const price = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(roomType.basePrice);

  return (
    <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">

        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            Thông tin loại phòng
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Thông tin chi tiết của loại phòng
          </p>
        </div>

        <button
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <Pencil className="h-4 w-4" />
          Chỉnh sửa
        </button>

      </div>

      {/* Body */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">

        <InfoItem
          icon={<Wallet className="w-5 h-5" />}
          label="Giá cơ bản"
          value={price}
          color="blue"
        />

        <InfoItem
          icon={<Users className="w-5 h-5" />}
          label="Sức chứa"
          value={`${roomType.maxGuest} khách`}
          color="emerald"
        />

        <InfoItem
          icon={<BedDouble className="w-5 h-5" />}
          label="Loại giường"
          value={roomType.bedType}
          color="violet"
        />

        <InfoItem
          icon={<Ruler className="w-5 h-5" />}
          label="Diện tích"
          value={`${roomType.roomSize} m²`}
          color="orange"
        />
<InfoItem
  icon={<Building2 className="w-5 h-5" />}
  label="Hướng nhìn"
  value={roomType.view ?? 'Chưa cập nhật'}
  color="cyan"
/>

<InfoItem
  icon={<CigaretteOff className="w-5 h-5" />}
  label="Hút thuốc"
  value={roomType.smoking ? 'Cho phép' : 'Không'}
  color="red"
/>

<InfoItem
  icon={<UtensilsCrossed className="w-5 h-5" />}
  label="Bữa sáng"
  value={roomType.breakfast ? 'Bao gồm' : 'Không bao gồm'}
  color="emerald"
/>

<InfoItem
  icon={<Bed className="w-5 h-5" />}
  label="Giường phụ"
  value={
    roomType.extraBedPrice
      ? formatPrice(roomType.extraBedPrice)
      : 'Không hỗ trợ'
  }
  color="amber"
/>
      </div>

      {/* Description */}

      <div className="px-6 pb-6">

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-5">

          <div className="flex items-center gap-2 mb-4">

            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">

              <FileText className="w-5 h-5 text-blue-600" />

            </div>

            <div>

              <h3 className="font-semibold">
                Mô tả
              </h3>

              <p className="text-xs text-zinc-500">
                Thông tin bổ sung về loại phòng
              </p>

            </div>

          </div>

          <p className="leading-7 text-zinc-600 dark:text-zinc-300">
            {roomType.description}
          </p>

        </div>

      </div>

    </section>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'blue' | 'emerald' | 'violet' | 'orange'|'cyan'|'red'|'amber';
}

function InfoItem({
  icon,
  label,
  value,
  color,
}: InfoItemProps) {
  const colors = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    text: 'text-blue-600',
  },

  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    text: 'text-emerald-600',
  },

  violet: {
    bg: 'bg-violet-50 dark:bg-violet-500/10',
    text: 'text-violet-600',
  },

  orange: {
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    text: 'text-orange-600',
  },

  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-500/10',
    text: 'text-cyan-600',
  },

  red: {
    bg: 'bg-red-50 dark:bg-red-500/10',
    text: 'text-red-600',
  },

  amber: {
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    text: 'text-amber-600',
  },

  pink: {
    bg: 'bg-pink-50 dark:bg-pink-500/10',
    text: 'text-pink-600',
  },
};

  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-200
        dark:border-zinc-700
        p-5
        transition
        hover:shadow-md
      "
    >
      <div
        className={`
          w-12
          h-12
          rounded-2xl
          flex
          items-center
          justify-center
          ${colors[color].bg}
        `}
      >
        <div className={colors[color].text}>
          {icon}
        </div>
      </div>

      <p className="mt-5 text-xs uppercase tracking-wide text-zinc-500">
        {label}
      </p>

      <h4 className="mt-2 text-lg font-bold break-words text-zinc-900 dark:text-white">
        {value}
      </h4>
    </div>
  );
}

