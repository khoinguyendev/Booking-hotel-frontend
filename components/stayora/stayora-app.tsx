"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BedDouble,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Expand,
  Heart,
  Info,
  MapPin,
  SlidersHorizontal,
  Star,
  Users,
  X,
} from "lucide-react";
import { formatVND, hotels } from "@/lib/stayora-data";

const roomTypes = [
  {
    name: "Deluxe King Room",
    size: "32 m²",
    bed: "1 giường King",
    guests: "2 khách",
    view: "Thành phố",
    price: 1450000,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85",
    description:
      "Không gian hiện đại với cửa sổ lớn hướng thành phố, phù hợp cho các cặp đôi và khách công tác.",
    amenities: [
      "WiFi miễn phí",
      "Điều hòa",
      "TV màn hình phẳng",
      "Minibar",
      "Máy sấy tóc",
    ],
    availability: "Còn 3 phòng",
    breakfast: true,
    cancellation: true,
  },
  {
    name: "Deluxe Twin Room",
    size: "35 m²",
    bed: "2 giường đơn",
    guests: "2 khách",
    view: "Thành phố",
    price: 1550000,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
    description:
      "Hai giường đơn thoải mái trong không gian thoáng sáng, lý tưởng cho bạn bè hoặc đồng nghiệp.",
    amenities: [
      "WiFi miễn phí",
      "Điều hòa",
      "Bàn làm việc",
      "Két an toàn",
      "Minibar",
    ],
    availability: "Còn 5 phòng",
    breakfast: true,
    cancellation: true,
  },
  {
    name: "Premier Ocean View",
    size: "40 m²",
    bed: "1 giường King",
    guests: "2 khách",
    view: "Hướng biển",
    price: 1950000,
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85",
    description:
      "Đón bình minh trên biển từ ban công riêng và tận hưởng những tiện nghi được chăm chút.",
    amenities: [
      "Ban công riêng",
      "WiFi miễn phí",
      "Bồn tắm",
      "Minibar",
      "Bữa sáng",
    ],
    availability: "Chỉ còn 1 phòng",
    breakfast: true,
    cancellation: true,
  },
  {
    name: "Family Room",
    size: "48 m²",
    bed: "1 King + 1 Single",
    guests: "3 khách",
    view: "Vườn",
    price: 2250000,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
    description:
      "Không gian rộng rãi cho cả gia đình với khu vực nghỉ ngơi tiện nghi và view vườn xanh mát.",
    amenities: [
      "WiFi miễn phí",
      "TV màn hình phẳng",
      "Sofa",
      "Minibar",
      "Phòng tắm riêng",
    ],
    availability: "Còn 2 phòng",
    breakfast: true,
    cancellation: false,
  },
  {
    name: "Executive Suite",
    size: "60 m²",
    bed: "1 giường King",
    guests: "2 khách",
    view: "Hướng biển",
    price: 3200000,
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85",
    description:
      "Phòng suite thanh lịch với phòng khách riêng, dành cho kỳ nghỉ thật đặc biệt.",
    amenities: [
      "Phòng khách riêng",
      "Bồn tắm",
      "Minibar",
      "Bữa sáng",
      "Lounge riêng",
    ],
    availability: "Còn 2 phòng",
    breakfast: true,
    cancellation: true,
  },
  {
    name: "Presidential Suite",
    size: "100 m²",
    bed: "1 giường King",
    guests: "4 khách",
    view: "Toàn cảnh biển",
    price: 6500000,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    description:
      "Đỉnh cao riêng tư với tầm nhìn toàn cảnh, phòng khách rộng và dịch vụ quản gia.",
    amenities: [
      "Quản gia riêng",
      "Hồ bơi riêng",
      "Bếp nhỏ",
      "Bữa sáng",
      "Đưa đón sân bay",
    ],
    availability: "Hết phòng",
    breakfast: true,
    cancellation: false,
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="shell flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-3xl font-semibold tracking-tight text-primary"
        >
          stayora<span className="text-accent">.</span>
        </Link>
        <Link
          href="/khach-san/anantara-mui-ne"
          className="text-sm font-semibold text-primary"
        >
          ← Quay lại khách sạn
        </Link>
      </div>
    </header>
  );
}

function RoomCard({
  room,
  selected,
  onSelect,
  onDetail,
  compare,
  onCompare,
}: {
  room: (typeof roomTypes)[number];
  selected: boolean;
  onSelect: () => void;
  onDetail: () => void;
  compare: boolean;
  onCompare: () => void;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <article
      className={`overflow-hidden rounded-3xl border bg-card shadow-sm transition hover:shadow-lg ${selected ? "border-primary bg-primary/5 ring-2 ring-primary/15" : "border-border"}`}
    >
      <div className="grid lg:grid-cols-[40%_1fr_auto]">
        <div className="relative min-h-64 lg:min-h-80">
          <Image
            src={room.image}
            alt={room.name}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover transition duration-500 hover:scale-[1.02]"
          />
          <div className="absolute inset-x-0 top-0 flex justify-between p-4">
            <button
              onClick={() => setLiked(!liked)}
              aria-label="Lưu phòng"
              className="flex size-11 items-center justify-center rounded-full bg-background/90 text-primary"
            >
              <Heart size={19} fill={liked ? "currentColor" : "none"} />
            </button>
            <button
              onClick={onDetail}
              className="rounded-full bg-background/90 px-3 py-2 text-xs font-semibold text-primary"
            >
              <Expand className="mr-1 inline" size={14} /> Xem tất cả ảnh
            </button>
          </div>
          <span className="absolute bottom-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">
            Phòng nổi bật
          </span>
        </div>
        <div className="flex flex-col gap-5 p-5 sm:p-7">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-primary">
                  {room.name}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {room.size} · {room.bed} · {room.guests}
                </p>
              </div>
              <span className="flex items-center gap-1 rounded-lg bg-accent/15 px-2 py-1 text-sm font-semibold text-primary">
                <Star size={14} fill="currentColor" className="text-accent" />
                4.8
              </span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
              {room.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3">
            {room.amenities.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Check size={15} className="text-secondary" />
                {item}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-2xl bg-muted/60 p-4 text-sm sm:grid-cols-4">
            <span>
              <BedDouble size={16} className="mb-1 text-primary" />
              <b className="block">Giường</b>
              {room.bed}
            </span>
            <span>
              <Users size={16} className="mb-1 text-primary" />
              <b className="block">Sức chứa</b>
              {room.guests}
            </span>
            <span>
              <Info size={16} className="mb-1 text-primary" />
              <b className="block">Diện tích</b>
              {room.size}
            </span>
            <span>
              <MapPin size={16} className="mb-1 text-primary" />
              <b className="block">View</b>
              {room.view}
            </span>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span className="flex items-center gap-2 font-medium text-secondary">
              <Check size={16} />
              {room.breakfast ? "Bao gồm bữa sáng" : "Bữa sáng tùy chọn"}
            </span>
            <span
              className={`flex items-center gap-2 font-medium ${room.cancellation ? "text-secondary" : "text-muted-foreground"}`}
            >
              <Check size={16} />
              {room.cancellation
                ? "Miễn phí hủy trước 24 giờ"
                : "Không hoàn hủy"}
            </span>
          </div>
        </div>
        <div className="flex min-w-56 flex-col justify-between gap-5 border-t border-border p-5 sm:p-7 lg:border-l lg:border-t-0">
          <div>
            <span className="text-sm text-muted-foreground">Giá cho 1 đêm</span>
            <div className="mt-1 font-serif text-2xl font-semibold text-primary">
              {formatVND(room.price)}
            </div>
            <span className="text-xs text-muted-foreground">
              Đã bao gồm thuế và phí
            </span>
            <div className="mt-3 flex items-center gap-2">
              <s className="text-xs text-muted-foreground">
                {formatVND(Math.round(room.price * 1.2))}
              </s>
              <span className="rounded-full bg-coral/15 px-2 py-1 text-xs font-semibold text-coral">
                -20%
              </span>
            </div>
          </div>
          <div>
            <span
              className={`mb-3 block text-sm font-semibold ${room.availability === "Hết phòng" ? "text-destructive" : room.availability.includes("1") ? "text-coral" : "text-secondary"}`}
            >
              {room.availability}
            </span>
            <button
              disabled={room.availability === "Hết phòng"}
              onClick={onSelect}
              className={`min-h-11 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${selected ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90"} disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground`}
            >
              {selected ? (
                <>
                  <Check className="mr-1 inline" size={16} /> Đã chọn phòng
                </>
              ) : (
                "Chọn phòng"
              )}
            </button>
            <button
              onClick={onDetail}
              className="mt-3 min-h-11 w-full rounded-xl border border-border px-4 py-3 text-sm font-semibold text-primary"
            >
              Xem chi tiết
            </button>
            <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={compare} onChange={onCompare} />{" "}
              So sánh phòng
            </label>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function RoomTypesPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("Tất cả");
  const [sort, setSort] = useState("Đề xuất");
  const [detail, setDetail] = useState<number | null>(null);
  const [compare, setCompare] = useState<number[]>([]);
  const filters = [
    "Tất cả",
    "1 giường",
    "2 giường",
    "Phòng gia đình",
    "Suite",
    "Có bữa sáng",
    "Miễn phí hủy",
  ];
  const filtered = useMemo(() => {
    let list = roomTypes.filter(
      (r) =>
        filter === "Tất cả" ||
        (filter === "1 giường"
          ? r.bed.includes("1")
          : filter === "2 giường"
            ? r.bed.includes("2")
            : filter === "Phòng gia đình"
              ? r.name.includes("Family")
              : filter === "Suite"
                ? r.name.includes("Suite")
                : filter === "Có bữa sáng"
                  ? r.breakfast
                  : r.cancellation),
    );
    return [...list].sort((a, b) =>
      sort === "Giá thấp nhất"
        ? a.price - b.price
        : sort === "Giá cao nhất"
          ? b.price - a.price
          : sort === "Diện tích lớn nhất"
            ? parseInt(b.size) - parseInt(a.size)
            : 0,
    );
  }, [filter, sort]);
  const selectedRoom = selected === null ? null : roomTypes[selected];
  const total = selectedRoom
    ? selectedRoom.price * 2 + Math.round(selectedRoom.price * 0.1)
    : 0;
  return (
    <>
      <Header />
      <main className="shell py-8 pb-32">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/khach-san" className="hover:text-primary">
            Khách sạn
          </Link>
          <span>/</span>
          <span>Aurora Riverside Hotel</span>
          <span>/</span>
          <span className="text-primary">Các loại phòng</span>
        </div>
        <section className="mt-8 flex flex-col gap-5 rounded-3xl bg-muted/70 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl">
            <Image
              src={hotels[0].image}
              alt="Aurora Riverside Hotel"
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="font-serif text-4xl font-semibold text-primary">
              Chọn phòng phù hợp với bạn
            </h1>
            <p className="mt-2 text-muted-foreground">
              So sánh các loại phòng và chọn lựa phù hợp nhất.
            </p>
            <p className="mt-3 text-sm font-semibold text-secondary">
              6 loại phòng
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <strong>Aurora Riverside Hotel</strong>
              <span className="text-accent">★★★★★</span>
              <span>9.2 Tuyệt vời · 1.248 đánh giá</span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> Đà Nẵng
              </span>
            </div>
          </div>
          <Link
            href="/khach-san/anantara-mui-ne"
            className="rounded-xl border border-border bg-background px-4 py-3 text-center text-sm font-semibold text-primary"
          >
            Xem khách sạn
          </Link>
        </section>
        <section className="mt-6 rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_.7fr_.7fr_auto]">
            <div className="rounded-xl bg-muted p-3">
              <span className="block text-xs text-muted-foreground">
                Nhận phòng
              </span>
              <strong>25/08/2026</strong>
            </div>
            <div className="rounded-xl bg-muted p-3">
              <span className="block text-xs text-muted-foreground">
                Trả phòng
              </span>
              <strong>27/08/2026</strong>
            </div>
            <div className="rounded-xl bg-muted p-3">
              <span className="block text-xs text-muted-foreground">Khách</span>
              <strong>2 người</strong>
            </div>
            <div className="rounded-xl bg-muted p-3">
              <span className="block text-xs text-muted-foreground">Phòng</span>
              <strong>1 phòng</strong>
            </div>
            <button className="min-h-11 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Kiểm tra phòng
            </button>
          </div>
        </section>
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition ${filter === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"}`}
              >
                <SlidersHorizontal className="mr-1 inline" size={14} />
                {item}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-primary">
            Sắp xếp
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-border bg-card px-3 py-2"
            >
              <option>Đề xuất</option>
              <option>Giá thấp nhất</option>
              <option>Giá cao nhất</option>
              <option>Diện tích lớn nhất</option>
            </select>
          </label>
        </div>
        <div className="mt-8 flex items-end justify-between">
          <div>
            <p className="eyebrow">Aurora Riverside Hotel</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-primary">
              {filtered.length} loại phòng phù hợp
            </h2>
          </div>
          <button className="hidden min-h-11 rounded-xl border border-border px-4 py-2 text-sm font-semibold text-primary sm:block">
            Bộ lọc <ChevronDown className="ml-1 inline" size={15} />
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          {filtered.map((room) => {
            const index = roomTypes.indexOf(room);
            return (
              <RoomCard
                key={room.name}
                room={room}
                selected={selected === index}
                onSelect={() => setSelected(index)}
                onDetail={() => setDetail(index)}
                compare={compare.includes(index)}
                onCompare={() =>
                  setCompare((c) =>
                    c.includes(index)
                      ? c.filter((x) => x !== index)
                      : c.length < 3
                        ? [...c, index]
                        : c,
                  )
                }
              />
            );
          })}
        </div>
        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-muted/70 p-6">
            <h2 className="font-serif text-2xl font-semibold text-primary">
              Tiện nghi của khách sạn
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <span>Hồ bơi</span>
              <span>Nhà hàng</span>
              <span>Gym</span>
              <span>Spa</span>
              <span>WiFi</span>
              <span>Parking</span>
            </div>
          </div>
          <div className="rounded-3xl bg-muted/70 p-6">
            <h2 className="font-serif text-2xl font-semibold text-primary">
              Câu hỏi thường gặp
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <details>
                <summary className="cursor-pointer font-semibold">
                  Tôi có thể hủy phòng miễn phí không?
                </summary>
                <p className="mt-2 text-muted-foreground">
                  Các phòng có chính sách miễn phí hủy trước 24 giờ.
                </p>
              </details>
              <details>
                <summary className="cursor-pointer font-semibold">
                  Giá phòng đã bao gồm thuế chưa?
                </summary>
                <p className="mt-2 text-muted-foreground">
                  Giá hiển thị đã bao gồm thuế và phí.
                </p>
              </details>
              <details>
                <summary className="cursor-pointer font-semibold">
                  Giờ nhận và trả phòng là mấy giờ?
                </summary>
                <p className="mt-2 text-muted-foreground">
                  Nhận phòng từ 14:00 và trả phòng trước 12:00.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
      {selectedRoom && (
        <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/15 bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="shell flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Đặt phòng của bạn
              </p>
              <strong>{selectedRoom.name}</strong>
              <span className="ml-2 text-sm text-muted-foreground">
                25/08 → 27/08 · 2 đêm
              </span>
            </div>
            <div className="flex flex-1 items-center justify-between gap-3 sm:flex-none">
              <div>
                <span className="block text-xs text-muted-foreground">
                  Tổng cộng
                </span>
                <strong className="font-serif text-xl text-primary">
                  {formatVND(total)}
                </strong>
              </div>
              <Link
                href="/dat-phong"
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Tiếp tục đặt phòng
              </Link>
            </div>
          </div>
        </aside>
      )}
      {detail !== null && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-primary/40 p-0 sm:items-center sm:p-6">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-background p-5 sm:rounded-3xl sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl font-semibold text-primary">
                {roomTypes[detail].name}
              </h2>
              <button
                onClick={() => setDetail(null)}
                aria-label="Đóng"
                className="flex size-11 items-center justify-center rounded-full bg-muted"
              >
                <X />
              </button>
            </div>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div className="relative aspect-[1.2] overflow-hidden rounded-2xl">
                <Image
                  src={roomTypes[detail].image}
                  alt={roomTypes[detail].name}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="leading-7 text-muted-foreground">
                  {roomTypes[detail].description}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <span>
                    <b className="block">Diện tích</b>
                    {roomTypes[detail].size}
                  </span>
                  <span>
                    <b className="block">Giường</b>
                    {roomTypes[detail].bed}
                  </span>
                  <span>
                    <b className="block">Sức chứa</b>
                    {roomTypes[detail].guests}
                  </span>
                  <span>
                    <b className="block">View</b>
                    {roomTypes[detail].view}
                  </span>
                </div>
                <h3 className="mt-6 font-semibold">Tiện nghi đầy đủ</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {roomTypes[detail].amenities.map((a) => (
                    <span
                      key={a}
                      className="rounded-full bg-muted px-3 py-2 text-sm"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setSelected(detail);
                    setDetail(null);
                  }}
                  className="mt-7 min-h-11 w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
                >
                  Chọn phòng này · {formatVND(roomTypes[detail].price)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
