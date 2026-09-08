import SearchBox from "@/components/customer/SearchBox";
import Footer from "@/components/stayora/Footer";
import Header from "@/components/stayora/Header";
import HotelCard from "@/components/stayora/HotelCard";
import { destinations, featuredHotels, offers } from "@/data/stayora-data";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
  <div className="shell relative z-10 flex min-h-[630px] flex-col justify-center pb-28 pt-20">
    <p className="eyebrow text-accent">Một nơi để trở về</p>

    <h1 className="mt-5 max-w-3xl font-serif text-5xl font-medium leading-[1.04] tracking-tight text-primary-foreground sm:text-7xl">
      Đi xa để
      <br />
      <em className="text-accent">gần nhau hơn.</em>
    </h1>

    <p className="mt-6 max-w-lg text-base leading-7 text-primary-foreground/80">
      Khám phá những nơi chốn đáng nhớ và lưu lại khoảnh khắc theo cách
      của riêng bạn.
    </p>
  </div>

  {/* Search */}
  <div className="relative z-[100]">
    <div className="shell -mt-10">
      <SearchBox />
    </div>
  </div>
</section>
        <section id="diem-den" className="section shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Lấy cảm hứng</p>
              <h2>
                Những điểm đến <em>đáng nhớ</em>
              </h2>
            </div>
            <Link
              href="/khach-san"
              className="text-sm font-semibold text-primary"
            >
              Xem tất cả <ArrowRight className="ml-2 inline" size={16} />
            </Link>
          </div>
          <div className="relative z-0">
            <div className="destination-grid">
              {destinations.map((d) => (
                <Link
                  href="/khach-san"
                  className="destination-card"
                  key={d.name}
                >
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(max-width: 768px) 45vw, 25vw"
                  />

                  <div className="relative z-10 mt-auto">
                    <h3 className="font-serif text-2xl text-primary-foreground">
                      {d.name}
                    </h3>

                    <p className="text-sm text-primary-foreground/75">
                      {d.count}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="section bg-secondary/45">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Được yêu thích</p>
                <h2>
                  Chốn nghỉ <em>có câu chuyện</em>
                </h2>
              </div>
              <Link href="/khach-san" className="text-sm font-semibold">
                Xem tất cả <ArrowRight className="ml-2 inline" size={16} />
              </Link>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
              {featuredHotels.map((h) => (
                <HotelCard key={h.slug} hotel={h} />
              ))}
            </div>
          </div>
        </section>
        <section id="uu-dai" className="section shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Đặc quyền dành riêng</p>
              <h2>
                Ưu đãi cho <em>hành trình của bạn</em>
              </h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {offers.map((o) => (
              <div key={o.code} className="offer-card">
                <Image
                  src={o.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="relative z-10 max-w-sm text-primary-foreground">
                  <p className="eyebrow text-accent">Mã ưu đãi {o.code}</p>
                  <h3 className="mt-3 font-serif text-3xl">{o.title}</h3>
                  <p className="mt-2 text-primary-foreground/80">
                    {o.subtitle}
                  </p>
                  <Link
                    href="/khach-san"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    Khám phá ưu đãi <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="ve-stayora" className="section trust-section">
          <div className="shell grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="eyebrow">Tại sao là Stayora?</p>
              <h2 className="mt-4 max-w-xl">
                Mỗi chuyến đi, <em>một câu chuyện riêng.</em>
              </h2>
              <p className="mt-6 max-w-lg leading-7 text-muted-foreground">
                Chúng tôi tin rằng một nơi lưu trú tốt không chỉ là chiếc giường
                êm. Đó là cảm giác được chào đón, được thấu hiểu, và có thêm một
                lý do để nhớ về.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <ShieldCheck className="text-accent" />
                  <strong className="mt-3 block">Đã xác minh</strong>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Mọi chỗ nghỉ đều được chọn lọc.
                  </p>
                </div>
                <div>
                  <Heart className="text-accent" />
                  <strong className="mt-3 block">Luôn tận tâm</strong>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Hỗ trợ bạn trong từng hành trình.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=85"
                alt="Không gian nghỉ dưỡng"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
