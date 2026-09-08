"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Search, Sparkles } from "lucide-react";

import { Amenitie } from "@/types/amenitie";

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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  open: boolean;
  loading?: boolean;

  amenities: Amenitie[];

  existingAmenityIds: number[];

  onClose: () => void;

  onSubmit: (amenityIds: number[]) => void;
}

export default function AddHotelAmenityDialog({
  open,
  loading,
  amenities,
  existingAmenityIds,
  onClose,
  onSubmit,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (open) {
      setSelectedIds([]);
      setSearch("");
    }
  }, [open]);

  const availableAmenities = useMemo(() => {
    const existing = new Set(existingAmenityIds);

    return amenities.filter(
      (amenity) =>
        !existing.has(amenity.id) &&
        amenity.name
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  }, [amenities, existingAmenityIds, search]);

  const toggleAmenity = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0) return;

    onSubmit(selectedIds);
  };

  const handleClose = () => {
    if (loading) return;

    setSelectedIds([]);
    setSearch("");

    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Thêm tiện ích
          </DialogTitle>

          <DialogDescription>
            Chọn các tiện ích muốn áp dụng cho khách sạn.
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm tiện ích..."
            className="pl-9"
          />
        </div>

        {/* Selected count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Đã chọn{" "}
            <span className="font-semibold text-foreground">
              {selectedIds.length}
            </span>{" "}
            tiện ích
          </p>
        </div>

        {/* List */}
        <ScrollArea className="h-[350px] pr-3">
          {availableAmenities.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {availableAmenities.map((amenity) => {
                const selected = selectedIds.includes(
                  amenity.id,
                );

                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() =>
                      toggleAmenity(amenity.id)
                    }
                    className={`
                      flex items-center gap-3 rounded-xl
                      border p-3 text-left
                      transition
                      ${
                        selected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted"
                      }
                    `}
                  >
                    <Checkbox
                      checked={selected}
                      onCheckedChange={() =>
                        toggleAmenity(amenity.id)
                      }
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    />

                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Sparkles className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {amenity.name}
                      </p>

                      {amenity.icon && (
                        <p className="text-xs text-muted-foreground">
                          {amenity.icon}
                        </p>
                      )}
                    </div>

                    {selected && (
                      <Check className="size-4 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex h-60 flex-col items-center justify-center text-center">
              <Sparkles className="size-10 text-muted-foreground" />

              <p className="mt-3 text-sm font-medium">
                Không còn tiện ích để thêm
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Các tiện ích hiện tại đã được thêm vào khách sạn.
              </p>
            </div>
          )}
        </ScrollArea>

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
            disabled={
              loading || selectedIds.length === 0
            }
          >
            {loading
              ? "Đang thêm..."
              : `Thêm ${selectedIds.length || ""} tiện ích`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}