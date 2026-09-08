"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (images: string) => void;
}

interface ImageItem {
  id: number;
  url: string;
  error: boolean;
}

export default function UploadImagesDialog({
  open,
  loading = false,
  onClose,
  onSubmit,
}: Props) {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: 1,
      url: "",
      error: false,
    },
  ]);

  useEffect(() => {
    if (open) {
      setImages([
        {
          id: 1,
          url: "",
          error: false,
        },
      ]);
    }
  }, [open]);

  const updateImage = (id: number, url: string) => {
    setImages((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              url,
              error: false,
            }
          : item,
      ),
    );
  };

  const addImage = () => {
    setImages((prev) => [
      ...prev,
      {
        id: Date.now(),
        url: "",
        error: false,
      },
    ]);
  };

  const removeImage = (id: number) => {
    setImages((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  const handleImageError = (id: number) => {
    setImages((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              error: true,
            }
          : item,
      ),
    );
  };

  const handleImageLoad = (id: number) => {
    setImages((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              error: false,
            }
          : item,
      ),
    );
  };

  const handleSubmit = () => {
    const validImages = images
      .map((item) => item.url.trim())
      .filter(Boolean);

    if (validImages.length === 0) {
      return;
    }

    const hasError = images.some(
      (item) => item.url.trim() && item.error,
    );

    if (hasError) {
      return;
    }

    onSubmit(validImages.join(","));
  };

  const handleClose = () => {
    if (loading) return;

    setImages([
      {
        id: 1,
        url: "",
        error: false,
      },
    ]);

    onClose();
  };

  const hasImages = images.some((item) => item.url.trim());

  const hasError = images.some(
    (item) => item.url.trim() && item.error,
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
        }
      }}
    >
<DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
          <DialogTitle className="text-xl">
            Upload ảnh
          </DialogTitle>

          <DialogDescription>
            Nhập URL hình ảnh. Bạn có thể thêm nhiều hình ảnh.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {images.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="flex items-start gap-3">
                {/* Input */}
                <div className="flex-1 space-y-2">
                  <Label>
                    Hình ảnh {index + 1}
                  </Label>

                  <Input
                    value={item.url}
                    onChange={(e) =>
                      updateImage(item.id, e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                    disabled={loading}
                  />

                  {item.error && item.url.trim() && (
                    <p className="text-xs text-red-500">
                      Không thể tải hình ảnh từ URL này.
                    </p>
                  )}
                </div>

                {/* Preview */}
                <div className="w-32 shrink-0">
                  <Label className="mb-2 block">
                    Xem trước
                  </Label>

                  <div className="flex h-[74px] w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
                    {item.url.trim() && !item.error ? (
                      <img
                        src={item.url}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                        onLoad={() => handleImageLoad(item.id)}
                        onError={() => handleImageError(item.id)}
                      />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-zinc-400" />
                    )}
                  </div>
                </div>

                {/* Remove */}
                {images.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-7 text-zinc-400 hover:text-red-500"
                    onClick={() => removeImage(item.id)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* Add */}
          <button
            type="button"
            onClick={addImage}
            disabled={loading}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-dashed
              border-zinc-300
              py-3
              text-sm
              font-medium
              text-zinc-600
              transition
              hover:border-blue-400
              hover:bg-blue-50
              hover:text-blue-600
              dark:border-zinc-700
              dark:text-zinc-400
              dark:hover:bg-blue-950/20
            "
          >
            <Plus className="h-4 w-4" />
            Thêm hình ảnh
          </button>

          <p className="text-xs text-muted-foreground">
            Các URL sẽ được lưu cách nhau bằng dấu phẩy.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          >
            Hủy
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!hasImages || hasError || loading}
          >
            {loading ? "Đang thêm..." : "Thêm ảnh"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}