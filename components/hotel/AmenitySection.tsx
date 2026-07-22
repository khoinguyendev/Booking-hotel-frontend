'use client';

import {
  Pencil,
  Plus,
  Sparkles,
  Wifi,
  Dumbbell,
  Waves,
  Utensils,
  Car,
  ShieldCheck,
  Coffee,
} from 'lucide-react';

interface Props {
  amenities: string[];
}

const getAmenityIcon = (name: string) => {
  const value = name.toLowerCase();

  if (value.includes('wifi'))
    return <Wifi className="w-5 h-5 text-blue-600" />;

  if (value.includes('gym'))
    return <Dumbbell className="w-5 h-5 text-emerald-600" />;

  if (value.includes('spa'))
    return <Sparkles className="w-5 h-5 text-pink-600" />;

  if (value.includes('hồ') || value.includes('pool'))
    return <Waves className="w-5 h-5 text-cyan-600" />;

  if (value.includes('nhà hàng') || value.includes('restaurant'))
    return <Utensils className="w-5 h-5 text-orange-600" />;

  if (value.includes('cafe') || value.includes('coffee'))
    return <Coffee className="w-5 h-5 text-amber-600" />;

  if (value.includes('xe') || value.includes('parking'))
    return <Car className="w-5 h-5 text-indigo-600" />;

  return <ShieldCheck className="w-5 h-5 text-violet-600" />;
};

export default function AmenitySection({
  amenities,
}: Props) {
  return (
    <section className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">

        <div>

          <h2 className="text-lg font-bold">
            Tiện ích khách sạn
          </h2>

          <p className="text-sm text-zinc-500 mt-1">
            Các dịch vụ đang cung cấp
          </p>

        </div>

        <div className="flex gap-2">

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-zinc-300
              dark:border-zinc-700
              px-4
              py-2
              text-sm
              font-semibold
              hover:bg-zinc-100
              dark:hover:bg-zinc-800
              transition
            "
          >
            <Plus className="w-4 h-4" />
            Thêm
          </button>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              hover:bg-blue-700
              transition
            "
          >
            <Pencil className="w-4 h-4" />
            Chỉnh sửa
          </button>

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        <div className="grid grid-cols-2 gap-3">

          {amenities.map((amenity) => (

            <div
              key={amenity}
              className="
                group
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-zinc-200
                dark:border-zinc-700
                p-4
                hover:border-blue-400
                hover:shadow-md
                transition
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-zinc-100
                  dark:bg-zinc-800
                  flex
                  items-center
                  justify-center
                  group-hover:scale-105
                  transition
                "
              >
                {getAmenityIcon(amenity)}
              </div>

              <div className="flex-1">

                <p className="font-semibold text-sm">
                  {amenity}
                </p>

                <p className="text-xs text-zinc-500 mt-1">
                  Đang hoạt động
                </p>

              </div>

            </div>

          ))}

        </div>

        {amenities.length === 0 && (

          <div className="py-10 text-center">

            <Sparkles className="w-10 h-10 mx-auto text-zinc-400" />

            <p className="mt-4 text-sm text-zinc-500">
              Chưa có tiện ích nào
            </p>

          </div>

        )}

      </div>

    </section>
  );
}
