import { formatVND } from "@/data/stayora-data";
import { HotelSearchResponse } from "@/types/hotel";
import { Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {  useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function HotelResultCard({
  hotel
}: {
  hotel: HotelSearchResponse;
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = Number(searchParams.get("guests") ?? 2);
  const rooms = Number(searchParams.get("rooms") ?? 1);
  const [liked, setLiked] = useState(false);

  const handleDetail = () => {
    const params = new URLSearchParams({
      destination,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: String(guests),
      hotelId:String(hotel.id),
      rooms: String(rooms),
    });

    router.push(`/khach-san/${hotel.slug}?${params.toString()}`);
  };
  return (
    <article className="group overflow-hidden rounded-sm border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="grid md:grid-cols-[280px_1fr_190px]">
        <button
          onClick={handleDetail}
          className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-60"
        >
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">
            {hotel.tags[0]}
          </span>
        </button>
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link
                href={`/khach-san/${hotel.slug}`}
                className="font-serif text-2xl font-semibold text-primary hover:underline"
              >
                {hotel.name}
              </Link>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={14} /> {hotel.city}, {hotel.region}
              </p>
            </div>
            <button
              onClick={() => setLiked(!liked)}
              aria-label={liked ? "Bỏ lưu khách sạn" : "Lưu khách sạn"}
              className={`flex size-11 shrink-0 items-center justify-center rounded-full border ${liked ? "border-coral bg-coral/10 text-coral" : "border-border text-primary"}`}
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="flex items-center gap-1 rounded-lg bg-accent/15 px-2 py-1 font-semibold text-primary">
              <Star size={14} fill="currentColor" className="text-accent" />{" "}
              {hotel.rating}
            </span>
            <span className="font-semibold">Tuyệt vời</span>
            <span className="text-muted-foreground">· 1.248 đánh giá</span>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Khách sạn hiện đại với không gian nghỉ dưỡng tinh tế và dịch vụ được
            chăm chút.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>✓ WiFi miễn phí</span>
            <span>✓ Hồ bơi</span>
            <span>✓ Bữa sáng</span>
            <span>✓ Điều hòa</span>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-medium text-secondary">
            <span>✓ Miễn phí hủy</span>
            <span>✓ Không cần trả trước</span>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-border p-5 md:border-l md:border-t-0">
          <div>
            <span className="text-sm text-muted-foreground">Từ</span>
            <p className="font-serif text-2xl font-semibold text-primary">
              {formatVND(hotel.price)}
            </p>
            <span className="text-xs text-muted-foreground">
              / đêm · đã gồm thuế phí
            </span>
          </div>
          <button
            onClick={handleDetail}
            className="rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Xem khách sạn
          </button>
        </div>
      </div>
    </article>
  );
}
