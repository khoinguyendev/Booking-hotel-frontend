"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface FilterSidebarProps {
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;

  types: string[];
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  toggleType: (type: string) => void;

  onApplyPrice: (minPrice: number, maxPrice: number) => void;
}
const ratings = ["9+ Tuyệt vời", "8+ Rất tốt", "7+ Tốt"];

const amenities = [
  "WiFi miễn phí",
  "Hồ bơi",
  "Bữa sáng",
  "Nhà hàng",
  "Gym",
  "Spa",
];
export default function FilterSidebar({
  filtersOpen,
  setFiltersOpen,
  types,
  selectedTypes,
  setSelectedTypes,
  toggleType,
  onApplyPrice,
}: FilterSidebarProps) {
  const [minPrice, setMinPrice] = useState(100000);
  const [maxPrice, setMaxPrice] = useState(5000000);

  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleApply = () => {
    onApplyPrice(minPrice, maxPrice);
    setFiltersOpen(false);
  };
  const handleClearAll = () => {
    setMinPrice(100000);
    setMaxPrice(5000000);

    setSelectedRatings([]);
    setSelectedAmenities([]);
    setSelectedTypes([]);

    onApplyPrice(100000, 5000000);
  };
  const hasPriceFilter = minPrice > 100000 || maxPrice < 5000000;

  const hasActiveFilters =
    hasPriceFilter ||
    selectedRatings.length > 0 ||
    selectedTypes.length > 0 ||
    selectedAmenities.length > 0;
  return (
    <>
      {filtersOpen && (
        <button
          type="button"
          aria-label="Đóng bộ lọc"
          onClick={() => setFiltersOpen(false)}
          className="fixed inset-0 z-[9998] bg-primary/25 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-[9999]
          w-[min(86vw,340px)]
          overflow-y-auto
          bg-background
          p-6
          shadow-2xl
          transition-transform duration-300

          ${filtersOpen ? "translate-x-0" : "-translate-x-full"}

          md:static
          md:z-auto
          md:block
          md:w-auto
          md:translate-x-0
          md:overflow-visible
          md:bg-transparent
          md:p-0
          md:shadow-none
        `}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Bộ lọc</h3>

          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="md:hidden"
            aria-label="Đóng bộ lọc"
          >
            <X size={20} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedTypes([]);
            setMinPrice(100000);
            setMaxPrice(5000000);
          }}
          className="mt-2 text-sm font-semibold text-primary"
        >
          Xóa tất cả
        </button>

        <div className="mt-8 flex flex-col gap-6">
          {hasActiveFilters && (
            <div className="mt-6 rounded-sm border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">Đang áp dụng</h3>

                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Xóa tất cả
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {/* Giá */}
                {hasPriceFilter && (
                  <button
                    type="button"
                    onClick={() => {
                      setMinPrice(100000);
                      setMaxPrice(5000000);
                      onApplyPrice(100000, 5000000);
                    }}
                    className="
            inline-flex items-center gap-1.5
            rounded-full
            bg-primary/10
            px-3 py-1.5
            text-xs font-medium
            text-primary
            transition
            hover:bg-primary/15
          "
                  >
                    {minPrice.toLocaleString("vi-VN")}₫{" — "}
                    {maxPrice.toLocaleString("vi-VN")}₫
                    <X size={13} />
                  </button>
                )}

                {/* Rating */}
                {selectedRatings.map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() =>
                      setSelectedRatings((prev) =>
                        prev.filter((item) => item !== rating),
                      )
                    }
                    className="
            inline-flex items-center gap-1.5
            rounded-full
            bg-primary/10
            px-3 py-1.5
            text-xs font-medium
            text-primary
            transition
            hover:bg-primary/15
          "
                  >
                    {rating}
                    <X size={13} />
                  </button>
                ))}

                {/* Loại chỗ nghỉ */}
                {selectedTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setSelectedTypes(
                        selectedTypes.filter((item) => item !== type),
                      )
                    }
                    className="
            inline-flex items-center gap-1.5
            rounded-full
            bg-primary/10
            px-3 py-1.5
            text-xs font-medium
            text-primary
            transition
            hover:bg-primary/15
          "
                  >
                    {type}
                    <X size={13} />
                  </button>
                ))}

                {/* Tiện nghi */}
                {selectedAmenities.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() =>
                      setSelectedAmenities((prev) =>
                        prev.filter((item) => item !== amenity),
                      )
                    }
                    className="
            inline-flex items-center gap-1.5
            rounded-full
            bg-primary/10
            px-3 py-1.5
            text-xs font-medium
            text-primary
            transition
            hover:bg-primary/15
          "
                  >
                    {amenity}
                    <X size={13} />
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* KHOẢNG GIÁ */}
          <div className="rounded-sm border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">Khoảng giá</h3>

              <span className="text-xs text-muted-foreground">
                1 phòng · 1 đêm
              </span>
            </div>

            {/* Giá */}
            <div className="mt-4 flex items-center gap-2">
              <div className="min-w-0 flex-1  bg-background px-1 py-2">
                <p className="text-[10px] text-muted-foreground">Từ</p>

                <p className="mt-0.5 truncate text-sm font-semibold">
                  {minPrice.toLocaleString("vi-VN")}₫
                </p>
              </div>

              <span className="text-muted-foreground">—</span>

              <div className="min-w-0 flex-1  bg-background px-1 py-2">
                <p className="text-[10px] text-muted-foreground">Đến</p>

                <p className="mt-0.5 truncate text-sm font-semibold">
                  {maxPrice.toLocaleString("vi-VN")}₫
                </p>
              </div>
            </div>

            {/* Slider */}
            <div className="relative mt-6 h-6">
              <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-muted" />

              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
                style={{
                  left: `${((minPrice - 100000) / 4900000) * 100}%`,
                  right: `${100 - ((maxPrice - 100000) / 4900000) * 100}%`,
                }}
              />

              {/* Min */}
              <input
                type="range"
                min={100000}
                max={5000000}
                step={50000}
                value={minPrice}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value < maxPrice) {
                    setMinPrice(value);
                  }
                }}
                className="
                  pointer-events-none
                  absolute inset-0
                  h-6 w-full
                  appearance-none
                  bg-transparent

                  [&::-webkit-slider-thumb]:pointer-events-auto
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-primary
                  [&::-webkit-slider-thumb]:bg-white

                  [&::-moz-range-thumb]:pointer-events-auto
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:border-2
                  [&::-moz-range-thumb]:border-primary
                  [&::-moz-range-thumb]:bg-white
                "
              />

              {/* Max */}
              <input
                type="range"
                min={100000}
                max={5000000}
                step={50000}
                value={maxPrice}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value > minPrice) {
                    setMaxPrice(value);
                  }
                }}
                className="
                  pointer-events-none
                  absolute inset-0
                  h-6 w-full
                  appearance-none
                  bg-transparent

                  [&::-webkit-slider-thumb]:pointer-events-auto
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:border-2
                  [&::-webkit-slider-thumb]:border-primary
                  [&::-webkit-slider-thumb]:bg-white

                  [&::-moz-range-thumb]:pointer-events-auto
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:border-2
                  [&::-moz-range-thumb]:border-primary
                  [&::-moz-range-thumb]:bg-white
                "
              />
            </div>
          </div>

          {/* Các filter khác */}
          <div className="rounded-sm border border-border bg-card p-4">
            <h3 className="font-semibold">Điểm đánh giá</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              {ratings.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(item)}
                    onChange={() => {
                      setSelectedRatings((prev) =>
                        prev.includes(item)
                          ? prev.filter((x) => x !== item)
                          : [...prev, item],
                      );
                    }}
                    className="size-4 accent-primary"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-border bg-card p-4">
            <h3 className="font-semibold">Loại chỗ nghỉ</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              {types.map((type) => (
                <label
                  key={type}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                    className="size-4 accent-primary"
                  />

                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-sm border border-border bg-card p-4">
            <h3 className="font-semibold">Tiện nghi</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              {amenities.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(item)}
                    onChange={() => {
                      setSelectedAmenities((prev) =>
                        prev.includes(item)
                          ? prev.filter((x) => x !== item)
                          : [...prev, item],
                      );
                    }}
                    className="size-4 accent-primary"
                  />

                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* APPLY */}
        <button
          type="button"
          onClick={handleApply}
          className="
            mt-8
            w-full
            rounded-xl
            bg-primary
            px-4
            py-3
            font-semibold
            text-primary-foreground
            transition
            hover:brightness-95
            md:hidden
          "
        >
          Áp dụng bộ lọc
        </button>
      </aside>
    </>
  );
}
