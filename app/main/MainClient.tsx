// app/main/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import {
  Search, MapPin, Calendar, Users, Star, Flame,
  ArrowRight, Heart, Sparkles, Navigation, Globe, Building2
} from 'lucide-react';
import Link from 'next/link';
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Trang chủ",
// };
export default function BrandBranchesMainPage() {
  const { user } = useAuthStore();
  const [likedBranches, setLikedBranches] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const [bannerBrightness, setBannerBrightness] = useState('brightness-[0.55]');
  const [timeGreeting, setTimeGreeting] = useState('Khám phá kỳ nghỉ');
  const [bannerFilter, setBannerFilter] = useState('brightness(0.55)');
  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80');
  useEffect(() => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 11) {
      // Bình minh / Buổi sáng: Ảnh tươi sáng, bộ lọc trong trẻo
      setBannerFilter('brightness(0.85) contrast(1.05) saturate(1.05)');
      setBannerUrl('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'); // Ảnh resort đón nắng sáng
      setTimeGreeting('Chào buổi sáng');
    } else if (hours >= 11 && hours < 15) {
      // Buổi trưa: Rực rỡ mặt trời
      setBannerFilter('brightness(0.75) contrast(1.1) saturate(1.15)');
      setBannerUrl('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80');
      setTimeGreeting('Chào buổi trưa');
    } else if (hours >= 15 && hours < 18) {
      // Buổi chiều: Tông màu ấm áp của hoàng hôn (Thêm sepia nhẹ)
      setBannerFilter('brightness(0.65) sepia(0.2) contrast(1.05)');
      setBannerUrl('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'); // Ảnh hoàng hôn biển
      setTimeGreeting('Chào buổi chiều');
    } else {
      // Buổi tối / Đêm: Tối mượt phong cách OLED
      setBannerFilter('brightness(0.4) contrast(0.95) saturate(0.85)');
      setBannerUrl('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'); // Ảnh resort lên đèn ban đêm
      setTimeGreeting('Chào buổi tối');
    }
  }, []);
  // Fix lỗi Hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Bộ lọc nhanh theo các vùng miền chiến lược của chuỗi khách sạn
  const regionalHubs = [
    { label: 'Chi nhánh Miền Bắc', info: 'Hà Nội & Sapa', count: '3 Cơ sở' },
    { label: 'Chi nhánh Miền Trung', info: 'Đà Nẵng & Hội An', count: '4 Cơ sở' },
    { label: 'Chi nhánh Miền Nam', info: 'TP.HCM & Vũng Tàu', count: '5 Cơ sở' },
    { label: 'Khu nghỉ dưỡng Phú Quốc', info: 'Đảo Ngọc Resort', count: '2 Cơ sở' },
  ];

  // Danh sách các chi nhánh thuộc cùng một thương hiệu (Grand Apple Hotel chain)
  const brandBranches = [
    {
      id: 1,
      name: 'Grand Apple Premium Hotel - Vũng Tàu Branch',
      location: 'Bãi Sau, TP. Vũng Tàu',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      star: 5.0,
      score: '9.6',
      reviewsCount: 1420,
      basePrice: 2450000,
      badge: 'View biển trực diện',
      tagline: 'Đặc quyền thành viên: Miễn phí vào Lounge cao cấp'
    },
    {
      id: 2,
      name: 'Grand Apple Heritage Boutique - Đà Lạt Branch',
      location: 'Phường 3, TP. Đà Lạt',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
      star: 4.9,
      score: '9.4',
      reviewsCount: 986,
      basePrice: 1850000,
      badge: 'Phong cách Đông Dương',
      tagline: 'Bao gồm trà chiều quý tộc Anh mỗi ngày'
    }
  ];

  const toggleLike = (id: number) => {
    if (likedBranches.includes(id)) {
      setLikedBranches(likedBranches.filter(item => item !== id));
    } else {
      setLikedBranches([...likedBranches, id]);
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const userFullName = mounted && user ? user.fullName || 'Quý khách' : 'Quý khách';

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-10 animate-in fade-in duration-500 text-[#1C1C1E] dark:text-white">

      {/* 1. HERO BRAND BANNER & TÌM KIẾM CHI NHÁNH TRỰC THUỘC */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[300px] sm:min-h-[380px] flex flex-col justify-between p-6 sm:p-10 shadow-xl">

        {/* ĐÃ SỬA: Dùng style={{ filter: ... }} để ép trình duyệt đổi màu ảnh lập tức */}
        <img
          src={bannerUrl}
          alt="Brand Luxury Resort Banner"
          style={{ filter: bannerFilter }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-1000 ease-in-out"
        />

        {/* Lớp phủ Gradient bảo vệ chữ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Nội dung lời chào */}
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#FFD60A] text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Hệ thống Thành viên Đồng bộ Toàn Chuỗi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {timeGreeting}, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#30B0C7] to-[#007AFF]">
              {userFullName}
            </span>
          </h1>
          <p className="text-xs text-slate-300 max-w-md font-medium">
            Một tiêu chuẩn phục vụ thượng lưu đồng nhất trên toàn bộ hệ thống chi nhánh từ Bắc vào Nam.
          </p>
        </div>

        {/* E-commerce Booking Engine - Tìm kiếm chi nhánh thích hợp */}
        <div className="relative z-10 bg-white dark:bg-[#1C1C1E] text-[#1C1C1E] dark:text-white p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E5E5EA] dark:border-[#2C2C2E] grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">

          <div className="space-y-1 border-b md:border-b-0 md:border-r border-[#E5E5EA] dark:border-[#2C2C2E] pb-3 md:pb-0 md:pr-4 flex items-center space-x-3">
            <Building2 className="w-5 h-5 text-[#007AFF] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-[9px] font-black text-[#8E8E93] uppercase tracking-wider block">Chi nhánh gần bạn</label>
              <input
                type="text"
                placeholder="Chọn khu vực / Chi nhánh..."
                className="w-full bg-transparent text-xs font-bold focus:outline-none placeholder-[#8E8E93] p-0 mt-0.5"
              />
            </div>
          </div>

          <div className="space-y-1 border-b md:border-b-0 md:border-r border-[#E5E5EA] dark:border-[#2C2C2E] pb-3 md:pb-0 md:px-4 flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-[#34C759] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-[9px] font-black text-[#8E8E93] uppercase tracking-wider block">Ngày nhận / trả phòng</label>
              <input
                type="text"
                placeholder="Chọn lịch trình nghỉ dưỡng"
                className="w-full bg-transparent text-xs font-bold focus:outline-none placeholder-[#8E8E93] p-0 mt-0.5"
              />
            </div>
          </div>

          <div className="space-y-1 pb-3 md:pb-0 md:px-4 flex items-center space-x-3">
            <Users className="w-5 h-5 text-[#FF9500] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-[9px] font-black text-[#8E8E93] uppercase tracking-wider block">Cấu hình phòng</label>
              <input
                type="text"
                placeholder="Số khách & Số phòng"
                className="w-full bg-transparent text-xs font-bold focus:outline-none placeholder-[#8E8E93] p-0 mt-0.5"
              />
            </div>
          </div>

          <button className="w-full bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-white text-xs font-bold py-3 px-6 rounded-xl sm:rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2">
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Check phòng trống</span>
          </button>
        </div>
      </section>

      {/* 2. REGIONAL SELECTION (Lọc Chi nhánh Theo Vùng Miền Của Thương Hiệu) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {regionalHubs.map((hub, idx) => (
          <button
            key={idx}
            className="p-4 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-2xl flex items-center space-x-4 hover:border-[#007AFF] hover:bg-slate-50 dark:hover:bg-[#2C2C2E]/30 transition-all text-left group"
          >
            <div className="p-3 bg-[#F2F2F7] dark:bg-[#2C2C2E] group-hover:bg-[#007AFF]/10 rounded-xl transition-colors">
              <Globe className="w-5 h-5 text-[#8E8E93] group-hover:text-[#007AFF] transition-colors" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-xs text-current truncate">{hub.label}</h4>
              <p className="text-[9px] text-[#8E8E93] font-medium mt-0.5">{hub.info}</p>
            </div>
          </button>
        ))}
      </section>

      {/* 3. TIN TỨC ĐẶC QUYỀN THƯƠNG HIỆU */}
      <section className="bg-gradient-to-r from-[#007AFF] to-[#30B0C7] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden shadow-lg">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white text-[#007AFF] text-[9px] font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-current" />
            Hot Deal Toàn Hệ Thống
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">Kỷ niệm ngày thành lập chuỗi Grand Apple Group</h2>
          <p className="text-xs text-white/95 max-w-xl">
            Tự động tích lũy <strong>x2 điểm thưởng hội viên</strong> và giảm trực tiếp 15% tiền phòng khi lưu trú tại bất kỳ chi nhánh nào thuộc hệ thống trong tháng này.
          </p>
        </div>
        <Link
          href="/main/hotels"
          className="bg-white text-[#007AFF] font-bold text-xs px-5 py-3 rounded-xl shadow-md flex items-center space-x-1 flex-shrink-0 transition-transform active:scale-95"
        >
          <span>Xem chi tiết chuỗi</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* 4. KHÔNG GIAN BÁN PHÒNG THEO CHI NHÁNH (Brand E-commerce Product Grid) */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
              <Navigation className="w-5.5 h-5.5 text-[#007AFF]" />
              Hệ thống chi nhánh nổi bật đang mở cửa
            </h2>
            <p className="text-xs text-[#8E8E93]">Trải nghiệm không gian nghỉ dưỡng đồng nhất về chất lượng dịch vụ cao cấp.</p>
          </div>
        </div>

        {/* E-commerce Product Card Grid cho chuỗi chi nhánh */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {brandBranches.map((branch) => {
            const isLiked = likedBranches.includes(branch.id);

            return (
              <div
                key={branch.id}
                className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col md:flex-row h-full"
              >
                {/* Ảnh chi nhánh */}
                <div className="md:w-5/12 h-56 md:h-auto relative overflow-hidden flex-shrink-0">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center shadow-md">
                    <span>{branch.badge}</span>
                  </div>

                  <button
                    onClick={() => toggleLike(branch.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md rounded-full text-[#8E8E93] hover:text-[#FF3B30] transition-colors active:scale-90"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#FF3B30] text-[#FF3B30]' : 'text-[#8E8E93]'}`} />
                  </button>
                </div>

                {/* Nội dung e-commerce chi nhánh */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <div className="flex items-center space-x-1 text-[#FFCC00]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[#1C1C1E] dark:text-white text-xs">{branch.star.toFixed(1)}</span>
                        <span className="text-[#8E8E93] font-medium">({branch.reviewsCount} đánh giá)</span>
                      </div>
                      <span className="text-[#8E8E93] flex items-center font-semibold">
                        <MapPin className="w-3.5 h-3.5 mr-0.5 text-[#30B0C7]" />
                        {branch.location.split(',')[1]}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-current group-hover:text-[#007AFF] transition-colors line-clamp-2 leading-snug">
                      {branch.name}
                    </h3>

                    <p className="text-[10px] text-[#007AFF] font-bold bg-[#007AFF]/10 px-2.5 py-1 rounded-lg inline-block">
                      Điểm chuỗi: {branch.score} • Xuất sắc
                    </p>

                    <p className="text-[11px] text-[#8E8E93] leading-relaxed">
                      {branch.tagline}
                    </p>
                  </div>

                  {/* Giá phòng sàn & Nút điều hướng CTA */}
                  <div className="flex justify-between items-end pt-3 border-t border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60">
                    <div>
                      <p className="text-[10px] text-[#8E8E93] uppercase font-bold tracking-wider">Giá sàn thành viên</p>
                      <p className="text-base font-black text-[#007AFF] font-mono">
                        {formatMoney(branch.basePrice)}
                        <span className="text-[10px] text-[#8E8E93] font-semibold font-sans"> / đêm</span>
                      </p>
                    </div>

                    <Link
                      href={`/main/hotels?branchId=${branch.id}`}
                      className="px-4 py-2 bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-xs text-white font-bold rounded-xl transition-all shadow-md shadow-[#007AFF]/15"
                    >
                      Khám phá phòng
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}