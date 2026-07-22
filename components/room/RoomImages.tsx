'use client';

import Image from 'next/image';
import {
  Camera,
  ImagePlus,
  Pencil,
  Star,
  Trash2,
} from 'lucide-react';

export interface RoomImage {
  id: number;
  url: string;
  isThumbnail?: boolean;
}

interface Props {
  images: RoomImage[];
}

export default function RoomImages({
  images,
}: Props) {
  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">

        <div>

          <h2 className="text-lg font-bold">
            Hình ảnh phòng
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {images.length} hình ảnh
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
          <ImagePlus className="h-4 w-4" />
          Thêm ảnh
        </button>

      </div>

      {/* Gallery */}

      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 xl:grid-cols-3">

        {images.map((image) => (

          <div
            key={image.id}
            className="
              group
              overflow-hidden
              rounded-3xl
              border
              border-zinc-200
              dark:border-zinc-700
              bg-white
              dark:bg-zinc-900
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >

            <div className="relative aspect-[4/3] overflow-hidden">

              <Image
                src={image.url}
                alt=""
                fill
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-black/0
                  transition
                  group-hover:bg-black/20
                "
              />

              {image.isThumbnail && (

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-amber-400
                    px-3
                    py-1.5
                    text-xs
                    font-bold
                    text-white
                  "
                >
                  <Star className="h-3.5 w-3.5 fill-white" />
                  Ảnh đại diện
                </div>

              )}

            </div>

            {/* Footer */}

            <div className="flex items-center justify-between p-4">

              <div className="flex items-center gap-2 text-sm text-zinc-500">

                <Camera className="h-4 w-4" />

                Hình #{image.id}

              </div>

              <div className="flex items-center gap-2">

                {!image.isThumbnail && (

                  <button
                    className="
                      rounded-xl
                      p-2
                      transition
                      hover:bg-amber-100
                      dark:hover:bg-amber-500/10
                    "
                    title="Đặt làm ảnh đại diện"
                  >
                    <Star className="h-4 w-4 text-amber-500" />
                  </button>

                )}

                <button
                  className="
                    rounded-xl
                    p-2
                    transition
                    hover:bg-blue-100
                    dark:hover:bg-blue-500/10
                  "
                  title="Chỉnh sửa"
                >
                  <Pencil className="h-4 w-4 text-blue-600" />
                </button>

                <button
                  className="
                    rounded-xl
                    p-2
                    transition
                    hover:bg-red-100
                    dark:hover:bg-red-500/10
                  "
                  title="Xóa"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}
