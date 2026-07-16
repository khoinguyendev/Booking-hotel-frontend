// app/main/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { 
  Search, MapPin, Calendar, Users, Star, Flame, 
  Percent, ArrowRight, ShieldCheck, Heart, Sparkles,
  Compass, Landmark, Trees, Umbrella
} from 'lucide-react';
import Link from 'next/link';

export default function EcommerceMainPage() {
  const { user } = useAuthStore();
  const [likedHotels, setLikedHotels] = useState<number[]>([]);

  // Lọc nhanh theo danh mục điểm đến nghỉ dưỡng
  const categories = [
    { label: 'Bãi biển', icon: Umbrella, count: '142 khách sạn' },
    { label: 'Biệt thự / Villa', icon: Trees, count: '85 khu' },
    { label: 'Di sản / Cổ kính', icon: Landmark, count: '39 điểm' },
    { label: 'Gần gũi thiên nhiên', icon: Compass, count: '64 homestay' },
  ];

  // Danh sách khách sạn chuẩn e-commerce (Có giá gốc, giá giảm, lượt đánh giá)
  const hotelDeals = [
    {
      id: 1,
      name: 'Grand Apple Resort & Spa',
      city: 'Vũng Tàu',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      star: 5.0,
      reviewsCount: 1240,
      originalPrice: 3200000,
      salePrice: 2450000, // Đã giảm 23%
      badge: 'Bán chạy nhất',
      tagline: 'Miễn phí hủy phòng • Không cần thanh toán trước'
    },
    {
      id: 2,
      name: 'Apple Luxury Boutique Hotel',
      city: 'Đà Lạt',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
      star: 4.8,
      reviewsCount: 856,
      originalPrice: 2500000,
      salePrice: 1850000, // Đã giảm 26%
      badge: 'Đánh giá xuất sắc',
      tagline: 'Bao gồm bữa sáng buffet sang trọng'
    }
  ];

  const toggleLike = (id: number) => {
    if (likedHotels.includes(id)) {
      setLikedHotels(likedHotels.filter(item => item !== id));
    } else {
      setLikedHotels([...likedHotels, id]);
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-10 animate-in fade-in duration-500 text-[#1C1C1E] dark:text-white">
      
      {/* 1. HERO BANNER & BỘ LỌC TÌM KIẾM ĐA NĂNG (Airbnb & Agoda Style) */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[280px] sm:min-h-[360px] flex flex-col justify-between p-6 sm:p-10 shadow-xl">
        <img 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80" 
          alt="Luxury Resort Banner" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.55] dark:brightness-[0.45] pointer-events-none"
        />
        
        {/* Lời chào chào đón khách hàng */}
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#FFCC00] text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
            <span>Đặc quyền thành viên Gold</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Khám phá kỳ nghỉ tiếp theo của <br />
            <span className="bg-gradient-to-r from-[#30B0C7] to-[#007AFF] bg-clip-text text-transparent">
              {user?.fullName || 'Quý khách'}
            </span>
          </h1>
        </div>

        {/* Form Tìm kiếm / Lọc Booking Thông minh (E-commerce search bar) */}
        <div className="relative z-10 bg-white dark:bg-[#1C1C1E] text-[#1C1C1E] dark:text-white p-4 rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E5E5EA] dark:border-[#2C2C2E] grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          
          {/* Cột 1: Điểm đến */}
          <div className="space-y-1 border-b md:border-b-0 md:border-r border-[#E5E5EA] dark:border-[#2C2C2E] pb-3 md:pb-0 md:pr-4 flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-[#007AFF] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-[9px] font-black text-[#8E8E93] uppercase tracking-wider block">Điểm đến</label>
              <input 
                type="text" 
                placeholder="Vũng Tàu, Đà Lạt, Phú Quốc..." 
                className="w-full bg-transparent text-xs font-bold focus:outline-none placeholder-[#8E8E93] p-0 mt-0.5"
              />
            </div>
          </div>

          {/* Cột 2: Ngày nhận / Trả phòng */}
          <div className="space-y-1 border-b md:border-b-0 md:border-r border-[#E5E5EA] dark:border-[#2C2C2E] pb-3 md:pb-0 md:px-4 flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-[#34C759] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-[9px] font-black text-[#8E8E93] uppercase tracking-wider block">Thời gian lưu trú</label>
              <input 
                type="text" 
                placeholder="Chọn ngày đi - ngày về" 
                className="w-full bg-transparent text-xs font-bold focus:outline-none placeholder-[#8E8E93] p-0 mt-0.5"
              />
            </div>
          </div>

          {/* Cột 3: Số lượng khách */}
          <div className="space-y-1 pb-3 md:pb-0 md:px-4 flex items-center space-x-3">
            <Users className="w-5 h-5 text-[#FF9500] flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <label className="text-[9px] font-black text-[#8E8E93] uppercase tracking-wider block">Số lượng khách</label>
              <input 
                type="text" 
                placeholder="2 người lớn, 1 trẻ em" 
                className="w-full bg-transparent text-xs font-bold focus:outline-none placeholder-[#8E8E93] p-0 mt-0.5"
              />
            </div>
          </div>

          {/* Cột 4: Nút Tìm Kiếm hành động lớn */}
          <button className="w-full bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-white text-xs font-bold py-3 px-6 rounded-xl sm:rounded-2xl shadow-md transition-all flex items-center justify-center space-x-2">
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Tìm kiếm phòng</span>
          </button>
        </div>
      </section>

      {/* 2. CATEGORY SELECTOR (Biểu tượng Phân loại xu hướng du lịch) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon;
          return (
            <button 
              key={idx}
              className="p-4 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-2xl flex items-center space-x-4 hover:border-[#007AFF] transition-all text-left group"
            >
              <div className="p-3 bg-[#F2F2F7] dark:bg-[#2C2C2E] group-hover:bg-[#007AFF]/10 rounded-xl transition-colors">
                <IconComponent className="w-5 h-5 text-[#8E8E93] group-hover:text-[#007AFF] transition-colors" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-current">{cat.label}</h4>
                <p className="text-[10px] text-[#8E8E93] mt-0.5 font-medium">{cat.count}</p>
              </div>
            </button>
          );
        })}
      </section>

      {/* 3. FLASH DEAL & ƯU ĐÃI KHỦNG (Gamification & Conversion Rate) */}
      <section className="bg-gradient-to-r from-[#FF3B30] to-[#FF9500] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden shadow-lg shadow-rose-500/10">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white text-[#FF3B30] text-[9px] font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
            Hạn giờ ưu đãi
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">Flash Sale độc quyền: Giảm đến 45% phòng Luxury!</h2>
          <p className="text-xs text-white/90 max-w-xl">
            Cơ hội duy nhất trong ngày hôm nay để nâng cấp lên hạng phòng Suite hoàng gia với chi phí tối ưu nhất cho chuyến đi mùa hè của bạn.
          </p>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto relative z-10 flex-shrink-0">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl text-center min-w-[70px]">
            <p className="text-xs font-black font-mono">02</p>
            <p className="text-[8px] text-white/80 uppercase font-bold tracking-wider">Giờ</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl text-center min-w-[70px]">
            <p className="text-xs font-black font-mono">45</p>
            <p className="text-[8px] text-white/80 uppercase font-bold tracking-wider">Phút</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl text-center min-w-[70px]">
            <p className="text-xs font-black font-mono">12</p>
            <p className="text-[8px] text-white/80 uppercase font-bold tracking-wider">Giây</p>
          </div>
        </div>
      </section>

      {/* 4. DANH SÁCH SẢN PHẨM KHÁCH SẠN (E-commerce Hotel Products) */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
              <Percent className="w-5.5 h-5.5 text-[#FF3B30]" />
              Deal hời đặt nhiều nhất tuần này
            </h2>
            <p className="text-xs text-[#8E8E93]">Ưu đãi giảm giá đặc quyền chỉ dành riêng cho bạn.</p>
          </div>
          <Link 
            href="/main/hotels" 
            className="text-xs font-black text-[#007AFF] hover:underline flex items-center gap-0.5"
          >
            <span>Xem tất cả Deal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid danh sách khách sạn sản phẩm */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {hotelDeals.map((hotel) => {
            const isLiked = likedHotels.includes(hotel.id);
            const discountPercent = Math.round(((hotel.originalPrice - hotel.salePrice) / hotel.originalPrice) * 100);

            return (
              <div 
                key={hotel.id}
                className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col md:flex-row h-full"
              >
                {/* Hình ảnh bên trái */}
                <div className="md:w-5/12 h-56 md:h-auto relative overflow-hidden flex-shrink-0">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Nhãn Tag giảm giá góc trái ảnh */}
                  <div className="absolute top-3 left-3 bg-[#FF3B30] text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center space-x-0.5 shadow-md">
                    <span>GIẢM {discountPercent}%</span>
                  </div>

                  {/* Nút yêu thích dạng thả tim */}
                  <button 
                    onClick={() => toggleLike(hotel.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md rounded-full text-[#8E8E93] hover:text-[#FF3B30] transition-colors active:scale-90"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#FF3B30] text-[#FF3B30]' : 'text-[#8E8E93]'}`} />
                  </button>
                </div>

                {/* Thông tin nội dung bên phải */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Badge & Địa điểm */}
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-[#007AFF] bg-[#007AFF]/10 px-2.5 py-0.5 rounded-full uppercase">
                        {hotel.badge}
                      </span>
                      <span className="text-[#8E8E93] flex items-center font-semibold">
                        <MapPin className="w-3.5 h-3.5 mr-0.5 text-[#30B0C7]" />
                        {hotel.city}
                      </span>
                    </div>

                    {/* Tên khách sạn */}
                    <h3 className="font-extrabold text-base text-current group-hover:text-[#007AFF] transition-colors line-clamp-1 leading-snug">
                      {hotel.name}
                    </h3>

                    {/* Đánh giá sao */}
                    <div className="flex items-center space-x-1.5 text-xs text-[#8E8E93] font-bold">
                      <Star className="w-4 h-4 text-[#FFCC00] fill-current" />
                      <span className="text-[#1C1C1E] dark:text-white">{hotel.star.toFixed(1)}</span>
                      <span>({hotel.reviewsCount} đánh giá)</span>
                    </div>

                    <p className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg inline-block">
                      {hotel.tagline}
                    </p>
                  </div>

                  {/* Giá cả & Nút CTA */}
                  <div className="flex justify-between items-end pt-3 border-t border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60">
                    <div>
                      <p className="text-[10px] text-[#8E8E93] line-through font-mono">
                        {formatMoney(hotel.originalPrice)}
                      </p>
                      <p className="text-base font-black text-[#FF3B30] font-mono">
                        {formatMoney(hotel.salePrice)}
                        <span className="text-[10px] text-[#8E8E93] font-semibold font-sans"> / đêm</span>
                      </p>
                    </div>

                    <Link
                      href={`/main/hotels?id=${hotel.id}`}
                      className="px-4 py-2 bg-[#007AFF] hover:bg-[#0066CC] active:scale-95 text-xs text-white font-bold rounded-xl transition-all shadow-md shadow-[#007AFF]/15"
                    >
                      Đặt ngay
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