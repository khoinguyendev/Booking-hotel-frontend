'use client';

import { formatVND } from "@/data/stayora-data";
import { Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function HotelCard({ hotel }: { hotel: any }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className="group min-w-[280px] flex-1">
      <div className="relative aspect-[1.16] overflow-hidden rounded-2xl">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          sizes="(max-width: 768px) 85vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <button
          onClick={() => setLiked(!liked)}
          aria-label="Lưu khách sạn"
          className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-background/90 text-primary"
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>
        <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">
          {hotel.tags[0]}
        </span>
      </div>
      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <h3 className="font-serif text-xl font-semibold">{hotel.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin size={14} />
            {hotel.city}, {hotel.region}
          </p>
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold">
          <Star size={15} fill="currentColor" className="text-accent" />
          {hotel.rating}
        </span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Từ <strong className="text-primary">{formatVND(hotel.price)}</strong> /
        đêm
      </p>
    </article>
  );
}