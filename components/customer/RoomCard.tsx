"use client";

import { formatVND } from "@/data/stayora-data";
import { AvailableRoomTypeResponse } from "@/types/roomtype";
import {
  BedDouble,
  Check,
  Expand,
  Info,
  MapPin,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookingDraft } from "@/types/booking";

interface RoomCardProps {
  room: AvailableRoomTypeResponse;
}

export default function RoomCard({
  room,
}: RoomCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [quantity, setQuantity] = useState(0);

  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";
  const guests = Number(searchParams.get("guests") ?? 1);
  const rooms = Number(searchParams.get("rooms") ?? 1);
  const hotelId = Number(searchParams.get("hotelId") ?? 0);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) =>
      Math.min(room.availableRooms, prev + 1),
    );
  };

 const handleBooking = () => {
  const bookingDraft: BookingDraft = {
    hotelId: Number(hotelId),
    roomTypeId: room.id,

    checkIn,
    checkOut,

    guests,
    rooms: quantity,

    room,
  };

  const token = crypto.randomUUID();

  sessionStorage.setItem(
    `booking:${token}`,
    JSON.stringify(bookingDraft),
  );

  router.push(`/booking/${token}`);
};

  return (
    <article className="overflow-hidden rounded-sm border border-primary bg-card shadow-sm transition hover:shadow-lg">
      <div className="grid lg:grid-cols-[280px_1fr_220px]">
        {/* ================= IMAGE ================= */}
        <div className="p-4">
          <div className="relative aspect-[1.35] overflow-hidden rounded-sm">
            <Image
              src={room.image}
              alt={room.name}
              fill
              sizes="280px"
              className="object-cover transition duration-500 hover:scale-[1.02]"
            />

            <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">
              Phòng nổi bật
            </span>

            <button
              type="button"
              className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-2 text-xs font-semibold text-primary"
            >
              <Expand
                className="mr-1 inline"
                size={14}
              />
              Ảnh
            </button>
          </div>

          {/* Amenities */}
          <div className="mt-4">
            <p className="text-xs font-semibold text-primary">
              Tiện ích phòng
            </p>

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
              {room.amenities
                .slice(0, 4)
                .map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <Check
                      size={13}
                      className="text-secondary"
                    />
                    {item}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* ================= ROOM INFO ================= */}
        <div className="flex flex-col gap-5 p-5 sm:p-6">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-primary">
              {room.name}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {room.roomSize} m² · {room.bed} ·{" "}
              {room.guests} khách
            </p>

            {room.description && (
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
                {room.description}
              </p>
            )}
          </div>

          {/* Room information */}
          <div className="grid grid-cols-2 gap-3 rounded-sm bg-muted/60 p-4 text-sm sm:grid-cols-4">
            <span>
              <BedDouble
                size={16}
                className="mb-1 text-primary"
              />

              <b className="block">Giường</b>

              {room.bed}
            </span>

            <span>
              <Users
                size={16}
                className="mb-1 text-primary"
              />

              <b className="block">Sức chứa</b>

              {room.guests} khách
            </span>

            <span>
              <Info
                size={16}
                className="mb-1 text-primary"
              />

              <b className="block">Diện tích</b>

              {room.roomSize} m²
            </span>

            <span>
              <MapPin
                size={16}
                className="mb-1 text-primary"
              />

              <b className="block">View</b>

              {room.view}
            </span>
          </div>

          {/* Policies */}
          <div className="flex flex-col gap-2 text-sm">
            <span className="flex items-center gap-2 font-medium text-secondary">
              <Check size={16} />
              Bao gồm bữa sáng
            </span>

            <span className="flex items-center gap-2 text-muted-foreground">
              <Check size={16} />
              Miễn phí hủy trước 24 giờ
            </span>
          </div>
        </div>

        {/* ================= PRICE ================= */}
        <div className="flex flex-col justify-between gap-5 border-t border-border p-5 sm:p-6 lg:border-l lg:border-t-0">
          <div>
            <span className="text-sm text-muted-foreground">
              Giá cho 1 đêm
            </span>

            <div className="mt-1 font-serif text-2xl font-semibold text-primary">
              {formatVND(room.price)}
            </div>

            <span className="text-xs text-muted-foreground">
              Đã bao gồm thuế và phí
            </span>

            <div className="mt-3 flex items-center gap-2">
              <s className="text-xs text-muted-foreground">
                {formatVND(
                  Math.round(room.price * 1.2),
                )}
              </s>

              <span className="rounded-full bg-coral/15 px-2 py-1 text-xs font-semibold text-coral">
                -20%
              </span>
            </div>
          </div>

          <div>
            {/* Availability */}
            <span
              className={`mb-3 block text-sm font-semibold ${
                room.availableRooms === 0
                  ? "text-destructive"
                  : "text-coral"
              }`}
            >
              {room.availableRooms === 0
                ? "Hết phòng"
                : `Còn ${room.availableRooms} phòng`}
            </span>

            {room.availableRooms > 0 && (
              <>
                {/* Quantity */}
                <div className="mb-3 flex items-center justify-between rounded-sm border border-border bg-background px-3 py-2">
                  

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={quantity <= 0}
                      className="
                        flex
                        size-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-border
                        text-primary
                        transition
                        hover:bg-muted
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <Minus size={15} />
                    </button>

                    <span className="w-5 text-center text-sm font-semibold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={handleIncrease}
                      disabled={
                        quantity >= room.availableRooms
                      }
                      className="
                        flex
                        size-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-border
                        text-primary
                        transition
                        hover:bg-muted
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                {/* Booking button */}
                <button
                  type="button"
                  onClick={handleBooking}
                  disabled={quantity <= 0}
                  className="
                    min-h-11
                    w-full
                    rounded-sm
                    bg-secondary
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-secondary-foreground
                    transition
                    hover:bg-secondary/90
                    disabled:cursor-not-allowed
                    disabled:bg-muted
                    disabled:text-muted-foreground
                  "
                >
                  <Check
                    className="mr-1 inline"
                    size={16}
                  />

                  {quantity > 0
                    ? `Đặt ${quantity} phòng`
                    : "Chọn phòng"}
                </button>
              </>
            )}

            {room.availableRooms === 0 && (
              <button
                type="button"
                disabled
                className="
                  min-h-11
                  w-full
                  rounded-sm
                  bg-muted
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-muted-foreground
                "
              >
                Hết phòng
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
