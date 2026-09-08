"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { hotels } from "@/data/stayora-data";
import SearchBox from "@/components/customer/SearchBox";
import { useSearchParams } from "next/navigation";
import HotelResultCard from "@/components/customer/HotelResultCard";
import Header from "@/components/stayora/Header";
import FilterSidebar from "@/components/customer/FilterSidebar";
import { useHotelSearch } from "@/hooks/customer/useHotelSearch";
import HotelResultCardSkeleton from "@/components/customer/HotelResultCardSkeleton";

export default function HotelSearchPage() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = Number(searchParams.get("guests") ?? 2);
  const rooms = Number(searchParams.get("rooms") ?? 1);
  const { results, loading, error, search } = useHotelSearch();
  useEffect(() => {
    if (!checkIn || !checkOut) {
      return;
    }

    search({
      destination: destination || undefined,
      checkIn,
      checkOut,
      guests,
      rooms,
    });
  }, [destination, checkIn, checkOut, guests, rooms]);
  const [sort, setSort] = useState("Đề xuất");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const types = ["Khách sạn", "Resort", "Villa", "Căn hộ"];

  const toggleType = (type: string) =>
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
  return (
    <>
      <Header />
      <main className="shell py-8 pb-16">
        <SearchBox />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Trang chủ / Khách sạn / {destination}</p>
            <h2 className="mt-3">Khách sạn tại {destination || "Việt Nam"}</h2>
            <p className="mt-2 text-muted-foreground">
              Tìm thấy {results.length || 0} chỗ nghỉ phù hợp với lựa chọn của
              bạn.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFiltersOpen(true)}
              className="rounded-xl border border-border px-4 py-3 text-sm font-semibold md:hidden"
            >
              <SlidersHorizontal className="mr-2 inline" size={16} />
              Bộ lọc
            </button>
            <label className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold">
              <span className="hidden sm:inline">Sắp xếp:</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="bg-transparent outline-none"
              >
                <option>Đề xuất</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
                <option>Đánh giá cao nhất</option>
              </select>
            </label>
          </div>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          <FilterSidebar
            filtersOpen={filtersOpen}
            setFiltersOpen={setFiltersOpen}
            types={types}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            toggleType={toggleType}
          />
          <section className="flex flex-col gap-5">
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <HotelResultCardSkeleton key={index} />
              ))
            ) : results.length ? (
              results.map((hotel) => (
                <HotelResultCard key={hotel.slug} hotel={hotel} />
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-border p-12 text-center">
                <h2>Không tìm thấy khách sạn phù hợp</h2>

                <p className="mt-2 text-muted-foreground">
                  Hãy thử thay đổi địa điểm hoặc bộ lọc của bạn.
                </p>

                <button
                  className="mt-6 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
                >
                  Xóa tìm kiếm
                </button>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 pt-5 text-sm">
              <button className="rounded-lg border border-border px-3 py-2">
                ← Trước
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`size-10 rounded-lg ${page === 1 ? "bg-primary text-primary-foreground" : "border border-border"}`}
                >
                  {page}
                </button>
              ))}
              <button className="rounded-lg border border-border px-3 py-2">
                Sau →
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
