"use client";

import Image from "next/image";
import { ImagePlus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import UploadImagesDialog from "./manager/UploadImagesDialog";
import { useUpdateRoomType } from "@/hooks/manager/useUpdateRoomType";
import toast from "react-hot-toast";
import ImageGalleryDialog from "./manager/ImageGalleryDialog";
import ImageGalleryModal from "./manager/ImageGalleryDialog";

interface Props {
  images: string | null;
  id: number;
}

export default function RoomGallery({ images, id }: Props) {
  const { updateRoomType, loading } = useUpdateRoomType(id);
  const [uploadImageOpen, setUploadImageOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageList = images
    ? images
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };
  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-bold">Thư viện ảnh</h2>

          <p className="mt-1 text-sm text-zinc-500">
            {imageList.length} hình ảnh
          </p>
        </div>

        <button
          onClick={() => setUploadImageOpen(true)}
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

              <p className="mt-3 text-sm text-zinc-500">Chưa có hình ảnh</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {imageList.slice(0, 3).map((image, index) => {
              const remaining = imageList.length - 3;

              return (
                <div
                  key={index}
                  className="
              group
              relative
              aspect-[4/3]
              cursor-pointer
              overflow-hidden
              rounded-2xl
              border
              border-zinc-200
              dark:border-zinc-700
            "
                  onClick={() => openGallery(index)}
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
                bg-black/40
                opacity-0
                transition
                group-hover:opacity-100
              "
                  />

                  {/* + N ảnh */}
                  {index === 2 && remaining > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="rounded-xl bg-black/50 px-5 py-3 text-lg font-bold text-white backdrop-blur">
                        +{remaining} ảnh
                      </span>
                    </div>
                  )}

                  {/* Delete */}
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
                    <span className="text-xs font-medium text-white">
                      {index + 1} / {imageList.length}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        // xử lý xóa riêng
                      }}
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

                  {/* Ảnh đại diện */}
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
              );
            })}
          </div>
        )}
      </div>
      <UploadImagesDialog
        open={uploadImageOpen}
        onClose={() => setUploadImageOpen(false)}
        loading={loading}
        onSubmit={async (i) => {
          await updateRoomType({ images: i+","+images });
        }}
      />
      <ImageGalleryModal
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        images={imageList}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
        onDelete={(index) => {
          console.log("Xóa ảnh:", imageList[index]);
        }}
      />
     
    </section>
  );
}
