"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  UserRound,
  Minus,
  Plus,
} from "lucide-react";
import { addMonths, format, startOfMonth, subMonths } from "date-fns";
import { CalendarMonth } from "./CalendarMonth";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBoxProps {
  showDestination?: boolean;
  showErrors?: boolean;
  searchPath?: string;
  hotelId?: number;
}
export default function SearchBox({
  showDestination = true,
  searchPath = "/khach-san",
  hotelId,
}: SearchBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openDestination, setOpenDestination] = useState(false);
  const [destination, setDestination] = useState(
    searchParams.get("destination") ?? "",
  );
  const [checkIn, setCheckIn] = useState<Date | null>(() => {
    const value = searchParams.get("checkIn");
    return value ? new Date(`${value}T00:00:00`) : null;
  });
  const [checkOut, setCheckOut] = useState<Date | null>(() => {
    const value = searchParams.get("checkOut");
    return value ? new Date(`${value}T00:00:00`) : null;
  });

  const [guests, setGuests] = useState(Number(searchParams.get("guests") ?? 2));

  const [rooms, setRooms] = useState(Number(searchParams.get("rooms") ?? 1));
  const [errorField, setErrorField] = useState<"destination" | "date" | null>(
    null,
  );
  const cities = [
    "Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Nha Trang",
    "Đà Lạt",
    "Phú Quốc",
    "Vũng Tàu",
    "Mũi Né",
  ];
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openGuests, setOpenGuests] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const value = searchParams.get("checkIn");

    return value
      ? startOfMonth(new Date(`${value}T00:00:00`))
      : startOfMonth(new Date());
  });

  const handleSelectDate = (date: Date) => {
    setErrorField(null);

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }

    if (date > checkIn) {
      setCheckOut(date);
      setOpenCalendar(false);
    } else {
      setCheckIn(date);
      setCheckOut(null);
    }
  };
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const handleSearch = () => {
    if (showDestination && !destination) {
      setErrorField("destination");
      return;
    }

    if (!checkIn || !checkOut) {
      setErrorField("date");
      return;
    }

    setErrorField(null);

    const params = new URLSearchParams();

    if (showDestination && destination) {
      params.set("destination", destination);
    }

    params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    params.set("checkOut", format(checkOut, "yyyy-MM-dd"));
    params.set("guests", String(guests));
    params.set("rooms", String(rooms));
    if (hotelId) {
      params.set("hotelId", String(hotelId));
    }
    const url = `${searchPath}?${params.toString()}`;

   router.replace(url, { scroll: false });
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setOpenDestination(false);
        setOpenCalendar(false);
        setOpenGuests(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={searchBoxRef} className="relative">
      <div
        className={`search-card rounded-sm ${
          showDestination ? "has-destination" : "no-destination"
        }`}
      >
        {/* Điểm đến */}
        {showDestination && (
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setOpenDestination((prev) => !prev);
                setOpenCalendar(false);
                setOpenGuests(false);
              }}
              className="
      search-field
      w-full
      cursor-pointer
      text-left
      transition
      hover:bg-black/5
    "
            >
              <MapPin size={19} />

              <div className="min-w-0">
                <span>Điểm đến</span>

                <strong className="block truncate">
                  {destination || "Bạn muốn đi đâu?"}
                </strong>
              </div>
            </button>
            {errorField === "destination" && (
              <div
                className="
        absolute
        left-3
        top-[calc(100%+8px)]
        z-[200]
        whitespace-nowrap
        rounded-lg
          bg-[#a30000]
        px-3
        py-2
        text-xs
        font-medium
        text-white
        shadow-lg
      "
              >
                Vui lòng chọn điểm đến
                <span
                  className="
          absolute
          -top-1
          left-5
          h-2
          w-2
          rotate-45
          bg-[#a30000]
        "
                />
              </div>
            )}
            {openDestination && (
              <div
                className="absolute
        left-0
        top-[calc(100%+12px)]
        z-[100]
        w-[300px]
        rounded-lg
        border
        border-zinc-200
        bg-white
        p-3
        shadow-xl
      "
              >
                <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Điểm đến phổ biến
                </p>

                <div className="space-y-1">
                  {cities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setDestination(city);
                        setErrorField(null);
                        setOpenDestination(false);
                      }}
                      className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-left
              text-sm
              text-zinc-700
              transition
              hover:bg-zinc-100
              hover:text-primary
            "
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />

                      <span>{city}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Ngày */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setOpenCalendar((prev) => !prev);
              setOpenDestination(false);
              setOpenGuests(false);
            }}
            className="
            search-field
            cursor-pointer
            text-left
            transition
            hover:bg-black/5
          "
          >
            <CalendarDays size={19} />

            <div>
              <span>Nhận phòng - Trả phòng</span>

              <strong>
                {checkIn
                  ? `${format(checkIn, "dd/MM/yyyy")}${
                      checkOut
                        ? ` - ${format(checkOut, "dd/MM/yyyy")}`
                        : " - Chọn ngày trả"
                    }`
                  : "Chọn ngày"}
              </strong>
            </div>
          </button>
          {errorField === "date" && (
            <div
              className="
        absolute
        left-3
        top-[calc(100%+8px)]
        z-[200]
        whitespace-nowrap
        rounded-lg
       bg-[#a30000]
        px-3
        py-2
        text-xs
        font-medium
        text-white
        shadow-lg
      "
            >
              {!checkIn
                ? "Vui lòng chọn ngày nhận phòng"
                : "Vui lòng chọn ngày trả phòng"}

              <span
                className="
          absolute
          -top-1
          left-5
          h-2
          w-2
          rotate-45
          bg-[#a30000]
        "
              />
            </div>
          )}
        </div>

        {/* Khách & phòng */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setOpenGuests((prev) => !prev);
              setOpenDestination(false);
              setOpenCalendar(false);
            }}
            className="
              search-field
              w-full
              cursor-pointer
              text-left
              transition
              hover:bg-black/5
            "
          >
            <UserRound size={19} />

            <div>
              <span>Khách & phòng</span>

              <strong>
                {guests} khách, {rooms} phòng
              </strong>
            </div>
          </button>

          {/* Guest dropdown */}
          {openGuests && (
            <div
              className="
                absolute
                left-0
                top-[calc(100%+12px)]
                z-[100]
                w-[300px]
                rounded-2xl
                border
                border-zinc-200
                bg-white
                p-5
                shadow-xl
              "
            >
              <div className="space-y-5">
                {/* Người */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">Khách</p>

                    <p className="mt-1 text-xs text-zinc-500">
                      Số người lưu trú
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={guests <= 1}
                      onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        border border-zinc-200
                        text-zinc-600
                        transition
                        hover:bg-zinc-100
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <Minus size={15} />
                    </button>

                    <span className="w-6 text-center text-sm font-semibold">
                      {guests}
                    </span>

                    <button
                      type="button"
                      onClick={() => setGuests((prev) => prev + 1)}
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        border border-zinc-200
                        text-zinc-600
                        transition
                        hover:bg-zinc-100
                      "
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                {/* Phòng */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">Phòng</p>

                    <p className="mt-1 text-xs text-zinc-500">
                      Số phòng muốn đặt
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => setRooms((prev) => Math.max(1, prev - 1))}
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        border border-zinc-200
                        text-zinc-600
                        transition
                        hover:bg-zinc-100
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <Minus size={15} />
                    </button>

                    <span className="w-6 text-center text-sm font-semibold">
                      {rooms}
                    </span>

                    <button
                      type="button"
                      onClick={() => setRooms((prev) => prev + 1)}
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full
                        border border-zinc-200
                        text-zinc-600
                        transition
                        hover:bg-zinc-100
                      "
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Done */}
              <button
                type="button"
                onClick={() => setOpenGuests(false)}
                className="
                  mt-6
                  w-full
                  rounded-xl
                  bg-accent
                  py-2.5
                  text-sm
                  font-semibold
                  text-accent-foreground
                  transition
                  hover:brightness-95
                "
              >
                Xong
              </button>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <button
            type="button"
            onClick={handleSearch}
            className="
      flex h-14
      items-center
      justify-center
      gap-2
      rounded-sm
      bg-accent
      px-6
      font-semibold
      text-accent-foreground
      transition
      hover:brightness-95
    "
          >
            <Search size={18} />
            Tìm kiếm
          </button>
        </div>
      </div>

      {/* Calendar */}
      {openCalendar && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[calc(100%+12px)]
            z-[100]
            rounded-2xl
            border
            border-zinc-200
            bg-white
            p-5
            shadow-xl
          "
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Chọn ngày lưu trú
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                {!checkIn
                  ? "Chọn ngày nhận phòng"
                  : !checkOut
                    ? "Chọn ngày trả phòng"
                    : `${format(checkIn, "dd/MM/yyyy")} - ${format(
                        checkOut,
                        "dd/MM/yyyy",
                      )}`}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  transition
                  hover:bg-zinc-100
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-lg
                  transition
                  hover:bg-zinc-100
                "
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <CalendarMonth
              month={currentMonth}
              checkIn={checkIn}
              checkOut={checkOut}
              onSelect={handleSelectDate}
            />

            <CalendarMonth
              month={addMonths(currentMonth, 1)}
              checkIn={checkIn}
              checkOut={checkOut}
              onSelect={handleSelectDate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
