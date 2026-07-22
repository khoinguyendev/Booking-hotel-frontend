
'use client';

import { Camera, ImagePlus, Star, Trash2 } from 'lucide-react';

interface Props {
  images: string[];
}

export default function GallerySection({ images }: Props) {
  return (
    <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 py-5">

        <div>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            Thư viện ảnh
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
          Upload
        </button>

      </div>

      {/* Body */}

      <div className="p-5">

        {images.length === 0 ? (

          <div className="flex h-56 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700">

            <Camera className="h-12 w-12 text-zinc-400" />

            <p className="mt-4 text-sm text-zinc-500">
              Chưa có hình ảnh
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 gap-4">

            {images.map((image, index) => (

              <div
                key={index}
                className="
                  group
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-2xl
                  border
                  border-zinc-200
                  dark:border-zinc-700
                "
              >

                <img
                  src={image}
                  alt={`Hotel ${index}`}
                  className="
                    h-full
                    w-full
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
                    flex
                    items-end
                    justify-between
                    bg-gradient-to-t
                    from-black/70
                    via-black/20
                    to-transparent
                    p-3
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
                      text-[11px]
                      font-bold
                      text-white
                    "
                  >
                    Ảnh bìa
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

