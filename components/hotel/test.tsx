"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Building,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Filter,
  Calendar,
  Sparkles,
  RefreshCw,
} from "lucide-react";

import { useHotel } from "@/hooks/useHotel";
import { useHotelBrand } from "@/hooks/useHotelBrand";
import AddHotelModal from "@/components/hotel/AddHotelModal";

export default function HotelPage() {
  const router = useRouter();
  const { hotels, loading, fetchHotels } = useHotel();
  const { brands } = useHotelBrand();

  const [openAdd, setOpenAdd] = useState(false);

  // States Bộ Lọc (Search & Filter)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("ALL");
  const [selectedCity, setSelectedCity] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // 1. Tự động tính toán số liệu Thống kê (Dashboard Statistics)
  const stats = useMemo(() => {
    const total = hotels.length;
    const active = hotels.filter((h) => h.status).length;
    const fiveStar = hotels.filter((h) => Number(h.star) === 5).length;
    const uniqueCities = new Set(
      hotels.map((h) => h.city?.trim()).filter(Boolean)
    ).size;

    return { total, active, fiveStar, uniqueCities };
  }, [hotels]);

  // Danh sách các Thành phố độc bản cho Dropdown Filter
  const availableCities = useMemo(() => {
    const cities = hotels.map((h) => h.city?.trim()).filter(Boolean);
    return Array.from(new Set(cities));
  }, [hotels]);

  // 2. Logic Lọc Danh Sách Khách Sạn Thời Gian Thực
  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      // Keyword search
      const matchesSearch =
        hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.phone?.includes(searchTerm);

      // Brand filter
      const matchesBrand =
        selectedBrand === "ALL" ||
        String(hotel.brandId) === selectedBrand ||
        hotel.brandName === selectedBrand;

      // City filter
      const matchesCity =
        selectedCity === "ALL" || hotel.city === selectedCity;

      // Status filter
      const matchesStatus =
        selectedStatus === "ALL" ||
        (selectedStatus === "ACTIVE" && hotel.status) ||
        (selectedStatus === "INACTIVE" && !hotel.status);

      return matchesSearch && matchesBrand && matchesCity && matchesStatus;
    });
  }, [hotels, searchTerm, selectedBrand, selectedCity, selectedStatus]);

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 bg-[#F2F2F7] dark:bg-black min-h-screen text-[#1C1C1E] dark:text-white font-sans antialiased transition-colors duration-300">
      
      {/* =========================================================
          1. HEADER SECTION (Apple & Airbnb Styling)
         ========================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[4px] text-[#007AFF] font-extrabold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> HOTEL MANAGEMENT SYSTEM
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-current mt-1">
            Danh sách khách sạn
          </h1>
          <p className="text-xs sm:text-sm text-[#8E8E93] mt-1 font-medium">
            Quản lý toàn bộ hệ thống lưu trú, cơ sở vật chất và chi nhánh vận hành
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#007AFF]/25 transition-all duration-200"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Thêm khách sạn mới</span>
        </button>
      </div>

      {/* =========================================================
          2. DASHBOARD STATISTICS CARDS (Bộ 4 Thẻ Chỉ Số)
         ========================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Tổng Khách Sạn */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#1C1C1E] p-5 sm:p-6 border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              Tổng số KS
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight">
              {stats.total}
            </span>
            <span className="text-[10px] font-semibold text-[#8E8E93]">Cơ sở</span>
          </div>
        </div>

        {/* Card 2: Đang Hoạt Động */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#1C1C1E] p-5 sm:p-6 border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              Đang hoạt động
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-emerald-600 dark:text-emerald-400">
              {stats.active}
            </span>
            <span className="text-[10px] font-semibold text-emerald-600/80">Sẵn sàng</span>
          </div>
        </div>

        {/* Card 3: Tiêu chuẩn 5 Sao */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#1C1C1E] p-5 sm:p-6 border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              Chuẩn 5 Sao
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-amber-500">
              {stats.fiveStar}
            </span>
            <span className="text-[10px] font-semibold text-amber-500/80">Cao cấp</span>
          </div>
        </div>

        {/* Card 4: Thành phố */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#1C1C1E] p-5 sm:p-6 border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8E8E93] uppercase tracking-wider">
              Khu vực / Tỉnh
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-purple-600 dark:text-purple-400">
              {stats.uniqueCities}
            </span>
            <span className="text-[10px] font-semibold text-purple-500/80">Thành phố</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          3. SEARCH & FILTER TOOLBAR (Bảng điều khiển lọc)
         ========================================================= */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-4 sm:p-5 border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
        {/* Ô Tìm Kiếm */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
          <input
            type="text"
            placeholder="Tìm theo tên khách sạn, địa chỉ, số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-xs font-semibold outline-none focus:ring-2 focus:ring-[#007AFF]/30 transition-all placeholder:text-[#8E8E93]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8E8E93] hover:text-current px-2 py-1"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2.5">
          {/* Lọc Brand */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-xs font-semibold outline-none cursor-pointer focus:ring-2 focus:ring-[#007AFF]/30 transition-all"
          >
            <option value="ALL">Tất cả Thương hiệu</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Lọc Thành phố */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-xs font-semibold outline-none cursor-pointer focus:ring-2 focus:ring-[#007AFF]/30 transition-all"
          >
            <option value="ALL">Tất cả Thành phố</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Lọc Trạng thái */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="col-span-2 sm:col-span-1 w-full sm:w-auto px-4 py-3 rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-xs font-semibold outline-none cursor-pointer focus:ring-2 focus:ring-[#007AFF]/30 transition-all"
          >
            <option value="ALL">Toàn bộ Trạng thái</option>
            <option value="ACTIVE">Đang hoạt động</option>
            <option value="INACTIVE">Ngừng hoạt động</option>
          </select>
        </div>
      </div>

      {/* =========================================================
          4. HOTEL LISTING (THIẾT KẾ CARD NGANG BOOKING / AIRBNB)
         ========================================================= */}
      {loading ? (
        // Skeleton Loading State
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-3xl bg-white/60 dark:bg-[#1C1C1E]/60 border border-[#E5E5EA] dark:border-[#2C2C2E] animate-pulse p-4 flex gap-6"
            />
          ))}
        </div>
      ) : filteredHotels.length === 0 ? (
        // Empty State
        <div className="rounded-3xl bg-white dark:bg-[#1C1C1E] p-16 text-center border border-[#E5E5EA] dark:border-[#2C2C2E] shadow-sm flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
            Không tìm thấy khách sạn phù hợp
          </h3>
          <p className="text-xs text-[#8E8E93] max-w-xs">
            Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh bộ lọc thương hiệu/thành phố.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedBrand("ALL");
              setSelectedCity("ALL");
              setSelectedStatus("ALL");
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#F2F2F7] dark:bg-[#2C2C2E] text-xs font-bold rounded-full hover:bg-[#E5E5EA] transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        // Danh sách Thẻ Card Ngang Lớn
        <div className="space-y-5">
          {filteredHotels.map((hotel) => {
            // Tách lấy ảnh chính từ chuỗi ảnh phân cách bởi dấu ;
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
                {/* --------------------------------------------------
                    CỘT 1: KHỐI HÌNH ẢNH (Image Gallery Box)
                   -------------------------------------------------- */}
                <div className="relative lg:w-80 h-60 lg:h-auto overflow-hidden bg-slate-100 dark:bg-black/20 flex-shrink-0">
                  <img
                    src={mainImage}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Light Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />

                  {/* Badge Thương hiệu */}
                  {hotel.brandName && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                      {hotel.brandName}
                    </span>
                  )}

                  {/* Badge Star Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 px-2.5 py-1 text-white text-[10px] font-bold shadow-sm">
                    <Star className="w-3 h-3 fill-[#FFCC00] text-[#FFCC00]" />
                    <span>{hotel.star} Star</span>
                  </div>

                  {/* Vị trí Thành phố nổi trên ảnh Mobile */}
                  <div className="absolute bottom-3 left-4 lg:hidden flex items-center gap-1 text-xs text-white/90 font-semibold drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#007AFF]" />
                    <span>{hotel.city}</span>
                  </div>
                </div>

                {/* --------------------------------------------------
                    CỘT 2: NỘI DUNG THÔNG TIN CHÍNH (Content Body)
                   -------------------------------------------------- */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Hàng Tiêu Đề & Badge Trạng Thái */}
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

                      {/* Trạng thái badge */}
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

                    {/* Mô tả ngắn */}
                    <p className="text-xs sm:text-sm text-[#8E8E93] line-clamp-2 leading-relaxed mt-3">
                      {hotel.description || "Chưa cập nhật nội dung mô tả tổng quan cho chi nhánh này."}
                    </p>

                    {/* Khối Grid Chi Tiết Liên Hệ E-Commerce */}
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

                  {/* --------------------------------------------------
                      CỘT 3: FOOTER THẺ & ĐIỀU HƯỚNG TÁC VỤ
                     -------------------------------------------------- */}
                  <div className="pt-4 border-t border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-[#8E8E93] font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>Chi nhánh hệ thống #{hotel.id}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-extrabold text-[#007AFF] group-hover:translate-x-1 transition-transform">
                      <span>Xem chi tiết console</span>
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Thêm Khách Sạn */}
      <AddHotelModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={() => {
          fetchHotels();
        }}
      />
    </div>
  );
}