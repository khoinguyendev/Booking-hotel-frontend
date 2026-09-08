"use client";

import { useState } from "react";
import { Pencil, Plus, Sparkles, Check } from "lucide-react";

import { useAmenities } from "@/hooks/admin/useAmenities";
import { Amenitie } from "@/types/amenitie";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  amenities: Amenitie[];
}

export default function AmenitySection({ amenities }: Props) {
  const {
    amenities: allAmenities,
    adding,
    addAmenitiesToHotel,
  } = useAmenities();

  const [addAmenityOpen, setAddAmenityOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  /**
   * Những amenity khách sạn hiện đang có
   */
  const existingAmenityIds = new Set(
    amenities.map((amenity) => amenity.id),
  );

  /**
   * Mở modal
   */
  const handleOpenAdd = () => {
    setSelectedIds([]);
    setAddAmenityOpen(true);
  };

  /**
   * Chọn / bỏ chọn amenity
   */
  const handleToggleAmenity = (id: number) => {
    // Đã có trong khách sạn thì không cho chọn lại
    if (existingAmenityIds.has(id)) {
      return;
    }

    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id],
    );
  };

  /**
   * Thêm amenity vào hotel
   */
  const handleAddAmenities = async () => {
    if (selectedIds.length === 0) return;

    try {
      await addAmenitiesToHotel({
        AmenityIds: selectedIds,
      });

      setSelectedIds([]);
      setAddAmenityOpen(false);
    } catch (error) {
      console.error("Lỗi thêm tiện ích:", error);
    }
  };

  return (
    <>
      <section className="rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-bold">
              Tiện ích khách sạn
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Các dịch vụ đang cung cấp
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleOpenAdd}
              className="
                flex items-center gap-2 rounded-xl
                border border-zinc-300 px-4 py-2
                text-sm font-semibold
                transition hover:bg-zinc-100
                dark:border-zinc-700 dark:hover:bg-zinc-800
              "
            >
              <Plus className="h-4 w-4" />
              Thêm
            </button>

            
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3">
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="
                  group flex items-center gap-3
                  rounded-2xl border
                  border-zinc-200 p-4
                  transition hover:border-blue-400
                  hover:shadow-md
                  dark:border-zinc-700
                "
              >
              

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {amenity.name}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Đang hoạt động
                  </p>
                </div>
              </div>
            ))}
          </div>

          {amenities.length === 0 && (
            <div className="py-10 text-center">
              <Sparkles className="mx-auto h-10 w-10 text-zinc-400" />

              <p className="mt-4 text-sm text-zinc-500">
                Chưa có tiện ích nào
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Add Amenity Dialog */}
      <Dialog
        open={addAmenityOpen}
        onOpenChange={(open) => {
          if (!adding) {
            setAddAmenityOpen(open);
          }
        }}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              Thêm tiện ích khách sạn
            </DialogTitle>

            <DialogDescription>
              Chọn các tiện ích mà khách sạn đang cung cấp.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[420px] overflow-y-auto py-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {allAmenities.map((amenity) => {
                const isExisting = existingAmenityIds.has(
                  amenity.id,
                );

                const isSelected = selectedIds.includes(
                  amenity.id,
                );

                return (
                  <button
                    key={amenity.id}
                    type="button"
                    disabled={isExisting || adding}
                    onClick={() =>
                      handleToggleAmenity(amenity.id)
                    }
                    className={`
                      flex items-center gap-3 rounded-xl
                      border p-3 text-left
                      transition

                      ${
                        isExisting
                          ? "cursor-not-allowed border-zinc-200 bg-zinc-100 opacity-60 dark:border-zinc-700 dark:bg-zinc-800"
                          : isSelected
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                            : "border-zinc-200 hover:border-blue-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                      }
                    `}
                  >
                    {/* Checkbox */}
                    <div
                      className={`
                        flex h-5 w-5 shrink-0 items-center
                        justify-center rounded-md border
                        ${
                          isExisting || isSelected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-zinc-300 dark:border-zinc-600"
                        }
                      `}
                    >
                      {(isExisting || isSelected) && (
                        <Check className="h-3.5 w-3.5" />
                      )}
                    </div>

                   

                    {/* Name */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {amenity.name}
                      </p>

                      {isExisting && (
                        <p className="text-xs text-zinc-500">
                          Đã được thêm
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {allAmenities.length === 0 && (
              <div className="py-10 text-center">
                <Sparkles className="mx-auto h-8 w-8 text-zinc-400" />

                <p className="mt-3 text-sm text-muted-foreground">
                  Chưa có tiện ích nào trong hệ thống.
                </p>
              </div>
            )}
          </div>

          {/* Selected count */}
          {selectedIds.length > 0 && (
            <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
              Đã chọn{" "}
              <span className="font-semibold">
                {selectedIds.length}
              </span>{" "}
              tiện ích
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={adding}
              onClick={() => setAddAmenityOpen(false)}
            >
              Hủy
            </Button>

            <Button
              type="button"
              disabled={
                adding || selectedIds.length === 0
              }
              onClick={handleAddAmenities}
            >
              {adding
                ? "Đang thêm..."
                : `Thêm ${selectedIds.length > 0 ? `(${selectedIds.length})` : ""}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}