import { formatVND } from "@/data/stayora-data";
import { AvailableRoomTypeResponse } from "@/types/roomtype";
import { CalendarDays, Check, Users } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

interface BookingRoomSummaryProps {
  room: AvailableRoomTypeResponse;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  rooms: number;
}

export default function BookingRoomSummary({
  room,
  checkIn,
  checkOut,
  guests,
  rooms,
}: BookingRoomSummaryProps) {
  const nights = Math.max(
    1,
    Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)),
  );

  return (
    <section className="rounded-sm border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          Thông tin lưu trú
        </p>

        <h2 className="mt-1 font-serif text-2xl font-semibold text-primary">
          Phòng đã chọn
        </h2>
      </div>

      <div className="p-5">
        <div className="flex flex-col gap-5 sm:flex-row">
          {/* Image */}
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-sm sm:w-52">
            <Image
              src={room.image}
              alt={room.name}
              fill
              sizes="208px"
              className="object-cover"
            />
          </div>

          {/* Room info */}
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-xl font-semibold text-primary">
              {room.name}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {room.roomSize} m² · {room.bed} · {room.guests} khách
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {room.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  <Check size={12} className="text-secondary" />
                  {amenity}
                </span>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-primary" />

                <div>
                  <p className="text-xs text-muted-foreground">Nhận phòng</p>
                  <p className="font-medium">{format(checkIn, "dd/MM/yyyy")}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-primary" />

                <div>
                  <p className="text-xs text-muted-foreground">Trả phòng</p>
                  <p className="font-medium">
                    {format(checkOut, "dd/MM/yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} className="text-primary" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Số khách / phòng
                  </p>
                  <p className="font-medium">
                    {guests} khách · {rooms} phòng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {formatVND(room.price)} × {nights} đêm × {rooms} phòng
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Đã bao gồm thuế và phí
            </p>
          </div>

          <p className="font-serif text-xl font-semibold text-primary">
            {formatVND(room.price * nights * rooms)}
          </p>
        </div>
      </div>
    </section>
  );
}
