"use client";

import RoomCard from "@/components/customer/RoomCard";
import RoomCardSkeleton from "@/components/customer/RoomCardSkeleton";
import RoomEmptyState from "@/components/customer/RoomEmptyState";
import SearchBox from "@/components/customer/SearchBox";
import Footer from "@/components/stayora/Footer";
import Header from "@/components/stayora/Header";
import { hotels } from "@/data/stayora-data";
import { useAvailableRoomTypes } from "@/hooks/customer/useAvailableRoomTypes";
import { MapPin, Star, Wifi, Waves, Utensils } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

export default function HotelDetail() {
  const searchParams = useSearchParams();
  const params = useParams();

  const slug = params.slug as string;
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = Number(searchParams.get("guests") ?? 2);
  const rooms = Number(searchParams.get("rooms") ?? 1);
  const hotelId = Number(searchParams.get("hotelId"));
  const {
    rooms: availableRooms,
    loading,
    error,
  } = useAvailableRoomTypes({
    hotelId,
    checkIn: checkIn,
    checkOut: checkOut,
    guests,
    rooms,
  });
  return (
    <>
      <Header />

      <main className="shell py-10">
        <section className="mt-6">
          <h2 className="mt-2">Anantara Mui Ne Resort</h2>
        </section>

        {/* Gallery */}
        <div className="mt-6 grid gap-3 md:grid-cols-4 md:grid-rows-2">
          <div className="relative aspect-[1.4] overflow-hidden rounded-sm md:col-span-2 md:row-span-2 md:aspect-auto">
            <Image
              src={hotels[0].image}
              alt={hotels[0].name}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative hidden min-h-44 overflow-hidden rounded-sm md:block"
            >
              <Image
                src={hotels[i].image}
                alt=""
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Hotel highlights */}
        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {/* Rating */}
          <div className="rounded-sm border border-border bg-card p-6">
            {/* Rating header */}
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-sm bg-accent/10">
                <Star size={21} fill="currentColor" className="text-accent" />
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <strong className="font-serif text-3xl text-primary">
                    4.9
                  </strong>

                  <span className="text-sm text-muted-foreground">/ 5</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  328 lượt đánh giá
                </p>
              </div>
            </div>

            {/* Guest reviews */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground">
                Khách nói gì về kỳ nghỉ của họ
              </h3>

              <div className="mt-3 space-y-3">
                {/* Review 1 */}
                <div className="rounded-sm border border-border/60 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-foreground">
                      Nguyễn Minh Anh
                    </span>

                    <div className="flex items-center gap-1">
                      <Star
                        size={13}
                        fill="currentColor"
                        className="text-accent"
                      />
                      <span className="text-xs font-medium text-foreground">
                        5.0
                      </span>
                    </div>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    “Phòng đẹp, view biển rất tuyệt.”
                  </p>
                </div>

                {/* Review 2 */}
                <div className="rounded-sm border border-border/60 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-foreground">
                      Trần Hoàng Nam
                    </span>

                    <div className="flex items-center gap-1">
                      <Star
                        size={13}
                        fill="currentColor"
                        className="text-accent"
                      />
                      <span className="text-xs font-medium text-foreground">
                        4.8
                      </span>
                    </div>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    “Nhân viên thân thiện, dịch vụ rất tốt.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-sm border border-border bg-card p-6">
            <div className="flex size-11 items-center justify-center rounded-sm bg-secondary/10">
              <MapPin size={21} className="text-secondary" />
            </div>

            <p className="mt-5 text-sm text-muted-foreground">Vị trí</p>

            <h2 className="mt-1 font-serif text-xl font-semibold text-primary">
              Mũi Né, Bình Thuận
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Nằm ngay bên bờ biển, thuận tiện di chuyển đến các điểm tham quan.
            </p>

            <button className="mt-4 text-sm font-semibold text-primary hover:underline">
              Xem trên bản đồ →
            </button>
          </div>

          {/* Amenities */}
          <div className="rounded-sm border border-border bg-card p-6">
            <div className="flex size-11 items-center justify-center rounded-sm bg-primary/10">
              <Waves size={21} className="text-primary" />
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Tiện ích nổi bật
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm">
                <Wifi size={14} />
                WiFi miễn phí
              </span>

              <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm">
                <Waves size={14} />
                Hồ bơi
              </span>

              <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm">
                <Utensils size={14} />
                Nhà hàng
              </span>
            </div>

            <button className="mt-4 text-sm font-semibold text-primary hover:underline">
              Xem tất cả tiện ích →
            </button>
          </div>
        </section>
        {/* Hotel information */}
        {/* Hotel information */}
        <section className="mt-4 rounded-sm border border-border bg-card p-6">
          <p className="leading-8 text-muted-foreground">
            Khu nghỉ dưỡng nhiệt đới bên bờ biển Mũi Né, nơi những ngày thong
            thả bắt đầu bằng tiếng sóng và kết thúc bằng hoàng hôn trên mặt
            nước.
          </p>
        </section>

        <section className="mt-6">
          <SearchBox
            showDestination={false}
            searchPath={`/khach-san/${slug}`}
            hotelId={hotelId}
          />
        </section>

        <div className="mt-5 flex flex-col gap-5">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <RoomCardSkeleton key={index} />
            ))
          ) : availableRooms && availableRooms.length > 0 ? (
            availableRooms.map((room) => <RoomCard key={room.id} room={room} />)
          ) : (
            <RoomEmptyState />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
