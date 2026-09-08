"use client";

import { useRouter } from "next/navigation";
import { Hotel } from "@/types/hotel";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  Building,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Calendar,
} from "lucide-react";

interface Props {
  hotels: Hotel[];
  loading: boolean;
}

export default function HotelList({ hotels, loading }: Props) {
  const router = useRouter();

  // 1. Loading State: Skeleton Glassmorphism dạng Card Ngang
  if (loading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-64 rounded-3xl bg-white/60 dark:bg-[#1C1C1E]/60 border border-[#E5E5EA] dark:border-[#2C2C2E] p-4 flex flex-col lg:flex-row gap-6 animate-pulse"
          >
            <div className="lg:w-80 h-52 lg:h-full rounded-2xl bg-slate-200 dark:bg-[#2C2C2E] flex-shrink-0" />
            <div className="flex-1 space-y-4 py-2">
              <div className="h-6 bg-slate-200 dark:bg-[#2C2C2E] rounded-md w-1/3" />
              <div className="h-4 bg-slate-200 dark:bg-[#2C2C2E] rounded-md w-1/4" />
              <div className="h-12 bg-slate-200 dark:bg-[#2C2C2E] rounded-xl w-full mt-4" />
              <div className="h-8 bg-slate-200 dark:bg-[#2C2C2E] rounded-full w-1/5 pt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Empty State: Trạng thái chưa có dữ liệu
  if (hotels.length === 0) {
    return (
      <div className="rounded-3xl bg-white dark:bg-[#1C1C1E] p-16 text-center border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-sm flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center">
          <Building className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
          Chưa tìm thấy khách sạn nào
        </h3>
        <p className="text-xs text-[#8E8E93] max-w-xs">
          Không tìm thấy dữ liệu phù hợp. Hãy kiểm tra lại bộ lọc hoặc tạo chi nhánh khách sạn mới.
        </p>
      </div>
    );
  }

  // 3. Render Danh Sách Card Ngang Lớn (Booking.com x Airbnb style)
  return (
    <div className="space-y-5">
      {hotels.map((hotel) => {
        // Tách lấy ảnh chính từ chuỗi ảnh phân cách bằng dấu ;
        const mainImage = hotel.image?.split(";")[0] || hotel.image;

        return (
          <div
            key={hotel.id}
            onClick={() => router.push(`/admin/hotels/${hotel.id}`)}
            className="
              group
              cursor-pointer
              overflow-hidden
              rounded-3xl
              bg-white
              dark:bg-[#1C1C1E]
              border
              border-[#E5E5EA]
              dark:border-[#2C2C2E]
              shadow-sm
              hover:shadow-2xl
              transition-all
              duration-300
              hover:-translate-y-1
              flex
              flex-col
              lg:flex-row
            "
          >
            {/* =========================================================
                KHỐI A: HÌNH ẢNH BANNER LỚN & BADGE CHUẨN E-COMMERCE
               ========================================================= */}
            <div className="relative lg:w-80 h-60 lg:h-auto overflow-hidden bg-slate-100 dark:bg-black/20 flex-shrink-0">
              <img
                src={mainImage}
                alt={hotel.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Mask mượt mà */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />

              {/* Badge Thương Hiệu */}
              {hotel.brandName && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                  {hotel.brandName}
                </span>
              )}

              {/* Badge Hạng Sao */}
              <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 px-2.5 py-1 text-white text-[10px] font-bold shadow-sm">
                <Star className="w-3 h-3 fill-[#FFCC00] text-[#FFCC00]" />
                <span>{hotel.star} Sao</span>
              </div>

              {/* Định vị Thành phố trên mobile */}
              <div className="absolute bottom-3 left-4 lg:hidden flex items-center gap-1 text-xs text-white/90 font-semibold drop-shadow">
                <MapPin className="w-3.5 h-3.5 text-[#007AFF]" />
                <span>{hotel.city}</span>
              </div>
            </div>

            {/* =========================================================
                KHỐI B: NỘI DUNG THÔNG TIN CHÍNH (Content & Contact Grid)
               ========================================================= */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Hàng Tiêu Đề Khách Sạn & Badge Trạng Thái */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#1C1C1E] dark:text-white group-hover:text-[#007AFF] transition-colors line-clamp-1">
                      {hotel.name}
                    </h2>
                    
                    <div className="flex items-center gap-1.5 text-xs text-[#8E8E93] font-medium mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#007AFF] flex-shrink-0" />
                      <span className="line-clamp-1">{hotel.address}</span>
                      <span className="hidden sm:inline font-bold text-slate-300 dark:text-slate-700">•</span>
                      <span className="hidden sm:inline font-bold text-[#007AFF]">{hotel.city}</span>
                    </div>
                  </div>

                  {/* Badge Trạng Thái Hoạt Động */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold flex-shrink-0 ${
                      hotel.status
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
                    }`}
                  >
                    {hotel.status ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> HOẠT ĐỘNG
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> NGỪNG
                      </>
                    )}
                  </span>
                </div>

                {/* Đoạn Mô Tả Ngắn */}
                <p className="text-xs sm:text-sm text-[#8E8E93] line-clamp-2 leading-relaxed mt-3">
                  {hotel.description || "Chưa có thông tin mô tả chi tiết cho cơ sở lưu trú này."}
                </p>

                {/* Grid Chi Tiết Thông Tin Liên Hệ & Khung Giờ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60 text-xs text-[#8E8E93]">
                  <div className="flex items-center gap-2 truncate">
                    <Phone className="w-3.5 h-3.5 text-[#007AFF] flex-shrink-0" />
                    <span className="font-mono font-bold text-current truncate">
                      {hotel.phone || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#007AFF] flex-shrink-0" />
                    <span className="truncate text-current">{hotel.email || "N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2 truncate">
                    <Clock className="w-3.5 h-3.5 text-[#007AFF] flex-shrink-0" />
                    <span className="font-mono text-current">
                      In: {hotel.checkinTime} → Out: {hotel.checkoutTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* =========================================================
                  KHỐI C: CHÂN THẺ CARD & NÚT ĐIỀU HƯỚNG SANG CONSOLE
                 ========================================================= */}
              <div className="pt-4 border-t border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-[#8E8E93] font-mono">
                  <Calendar className="w-3 h-3" />
                  <span>ID Chi nhánh #{hotel.id}</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-extrabold text-[#007AFF] group-hover:translate-x-1 transition-transform duration-200">
                  <span>Xem chi tiết khách sạn</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}