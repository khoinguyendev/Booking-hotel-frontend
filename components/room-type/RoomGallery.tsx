'use client';

import Image from 'next/image';
import { ImagePlus, Star, Trash2 } from 'lucide-react';

interface Props {
  images: string;
}

export default function RoomGallery({ images }: Props) {
  const imageList = images
    ? images
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">

        <div>
          <h2 className="text-lg font-bold">
            Thư viện ảnh
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {imageList.length} hình ảnh
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
          Upload ảnh
        </button>

      </div>

      {/* Body */}

      <div className="p-6">

        {imageList.length === 0 ? (

          <div className="flex h-60 items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700">

            <div className="text-center">

              <ImagePlus className="mx-auto h-10 w-10 text-zinc-400" />

              <p className="mt-3 text-sm text-zinc-500">
                Chưa có hình ảnh
              </p>

            </div>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {imageList.map((image, index) => (

              <div
                key={index}
                className="
                  group
                  relative
                  aspect-[4/3]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-zinc-200
                  dark:border-zinc-700
                "
              >

                <Image
                  src={image}
                  alt={`Room ${index + 1}`}
                  fill
                  className="
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-110
                  "
                />

                {/* Overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/70
                    to-transparent
                    opacity-0
                    transition
                    group-hover:opacity-100
                  "
                />

                {/* Actions */}

                <div
                  className="
                    absolute
                    bottom-3
                    left-3
                    right-3
                    flex
                    items-center
                    justify-between
                    opacity-0
                    transition
                    group-hover:opacity-100
                  "
                >

                  <button
                    className="
                      rounded-xl
                      bg-white/20
                      p-2
                      text-white
                      backdrop-blur
                      transition
                      hover:bg-yellow-500
                    "
                  >
                    <Star className="h-4 w-4" />
                  </button>

                  <button
                    className="
                      rounded-xl
                      bg-white/20
                      p-2
                      text-white
                      backdrop-blur
                      transition
                      hover:bg-red-500
                    "
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>

                {index === 0 && (

                  <div
                    className="
                      absolute
                      left-3
                      top-3
                      rounded-full
                      bg-yellow-400
                      px-3
                      py-1
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    Ảnh đại diện
                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}
