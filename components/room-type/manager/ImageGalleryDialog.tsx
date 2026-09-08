"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ImageGalleryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onDelete?: (index: number) => void;
}

export default function ImageGalleryModal({
  open,
  onOpenChange,
  images,
  currentIndex,
  onIndexChange,
  onDelete,
}: ImageGalleryModalProps) {
  if (!images.length) return null;

  const currentImage = images[currentIndex];

  const goPrevious = () => {
    onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goNext = () => {
    onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const handleDelete = () => {
    onDelete?.(currentIndex);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
    !max-w-none
    w-[96vw]
    h-[94vh]
    p-0
    overflow-hidden
    border-0
    bg-black
  "
      >
        <DialogTitle className="sr-only">Xem hình ảnh</DialogTitle>

        <div className="relative flex h-full w-full items-center justify-center">
          {/* Image */}

          <Image
            src={currentImage}
            alt={`Ảnh ${currentIndex + 1}`}
            fill
            priority
            className="object-contain p-10"
          />

          {/* Previous */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={goPrevious}
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-black/50
                text-white
                backdrop-blur
                transition
                hover:bg-black/80
              "
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
          )}

          {/* Next */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={goNext}
              className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-black/50
                text-white
                backdrop-blur
                transition
                hover:bg-black/80
              "
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          )}

          {/* Bottom information */}

          <div
            className="
              absolute
              bottom-5
              left-1/2
              -translate-x-1/2
              flex
              items-center
              gap-4
              rounded-full
              bg-black/60
              px-5
              py-3
              text-white
              backdrop-blur
            "
          >
            <span className="text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </span>

            <button
              type="button"
              onClick={handleDelete}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-white
                transition
                hover:bg-red-500
              "
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
