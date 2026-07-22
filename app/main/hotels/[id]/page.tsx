// app/main/hotels/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useHotelConsoleStore } from '@/store/hotel-console.store';
import { SurchargeStatus, AmountType } from '@/services/hotel-console.service';
import { 
  MapPin, Star, Phone, Mail, Clock, ChevronLeft,
  Wifi, Dumbbell, Utensils, Waves, Flower2, Sparkles,
  Layers, Info, Heart, Check, ShieldCheck,
  Building2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CustomerBranchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { hotel, loading, fetchHotelData } = useHotelConsoleStore();
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'rooms' | 'surcharges'>('rooms');

  useEffect(() => {
    // Gọi store lấy dữ liệu chi nhánh (Trong thực tế sẽ truyền params.id vào API)
    fetchHotelData();
  }, [fetchHotelData, params.id]);

  if (loading || !hotel) {
    return (
      <div className="p-12 text-center text-xs text-[#8E8E93] flex flex-col items-center justify-center space-y-3 animate-pulse">
        <div className="w-8 h-8 rounded-full border-2 border-[#007AFF] border-t-transparent animate-spin" />
        <span>Đang kết nối đến không gian chi nhánh...</span>
      </div>
    );
  }

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves className="w-4 h-4 text-[#007AFF]" />;
      case 'Dumbbell': return <Dumbbell className="w-4 h-4 text-[#007AFF]" />;
      case 'Utensils': return <Utensils className="w-4 h-4 text-[#007AFF]" />;
      case 'Wifi': return <Wifi className="w-4 h-4 text-[#007AFF]" />;
      case 'Flower2': return <Flower2 className="w-4 h-4 text-[#007AFF]" />;
      default: return <Sparkles className="w-4 h-4 text-[#007AFF]" />;
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount);
  };

  const handleBooking = (roomTypeName: string) => {
    toast.success(`Đã chọn hạng phòng: ${roomTypeName}. Đang chuyển hướng đến trang thanh toán...`);
    // router.push(`/main/bookings/checkout?branch=${params.id}&type=...`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-500 text-[#1C1C1E] dark:text-white">
      
      {/* 1. NÚT BACK ĐIỀU HƯỚNG QUAY LẠI DANH SÁCH */}
      <button 
        onClick={() => router.back()}
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#8E8E93] hover:text-[#007AFF] transition-colors group"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        <span>Quay lại danh sách chi nhánh</span>
      </button>

      {/* 2. HERO BRAND BANNER LỚN */}
      <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-[#E5E5EA] dark:border-[#2C2C2E]">
        <img 
          src={hotel.brand.banner} 
          alt={hotel.name} 
          className="w-full h-full object-cover brightness-[0.6] dark:brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl">{hotel.brand.logo}</span>
                <span className="text-xs font-black text-[#FFD60A] uppercase tracking-widest">{hotel.brand.name} Luxury Collection</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{hotel.name}</h1>
              <div className="flex items-center space-x-1.5 text-xs sm:text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-[#30B0C7]" />
                <span>{hotel.address}</span>
              </div>
            </div>

            {/* Tác vụ tương tác nhanh */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  toast.success(!isWishlisted ? 'Đã lưu chi nhánh!' : 'Đã bỏ lưu.');
                }}
                className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:text-[#FF3B30] transition-colors"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#FF3B30] text-[#FF3B30]' : ''}`} />
              </button>
              
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20">
                <div className="flex items-center text-[#FFCC00]">
                  {Array.from({ length: hotel.star }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white font-mono">5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BỐ CỤC NỘI DUNG CHÍNH (2 Cột) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* CỘT PHẢI 1 & 2: DANH SÁCH PHÒNG E-COMMERCE & TAB CHÍNH SÁCH */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Menu Tab Điều Hướng Nội Dung */}
          <div className="flex border-b border-[#E5E5EA] dark:border-[#2C2C2E] space-x-6 text-sm font-bold">
            <button 
              onClick={() => setActiveTab('rooms')}
              className={`pb-3 relative transition-colors ${activeTab === 'rooms' ? 'text-[#007AFF]' : 'text-[#8E8E93] hover:text-current'}`}
            >
              Hạng phòng khả dụng
              {activeTab === 'rooms' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF] rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('surcharges')}
              className={`pb-3 relative transition-colors ${activeTab === 'surcharges' ? 'text-[#007AFF]' : 'text-[#8E8E93] hover:text-current'}`}
            >
              Chính sách phụ thu minh bạch
              {activeTab === 'surcharges' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007AFF] rounded-full" />}
            </button>
          </div>

          {/* NỘI DUNG CÁC TAB */}
          {activeTab === 'rooms' ? (
            <div className="space-y-6">
              {hotel.roomTypes.map((type) => {
                // Giả lập giá phòng dựa trên cấu trúc DB
                const mockPrice = type.id === 1 ? 2450000 : 3800000;
                
                return (
                  <div 
                    key={type.id} 
                    className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-all"
                  >
                    {/* Ảnh demo hạng phòng hoặc render logo thương hiệu đại diện */}
                    <div className="sm:w-1/3 aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                      <Building2 className="w-10 h-10 text-[#8E8E93]/40" />
                      <span className="absolute bottom-2 left-2 text-[9px] font-bold uppercase bg-black/60 text-white px-2 py-0.5 rounded-md">
                        {type.roomSize.toFixed(0)} m²
                      </span>
                    </div>

                    {/* Nội dung chi tiết e-commerce của phòng */}
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-black text-lg text-current leading-snug">{type.name}</h3>
                          <span className="text-[10px] font-bold bg-[#34C759]/10 text-[#34C759] px-2.5 py-0.5 rounded-full">
                            Còn phòng trống
                          </span>
                        </div>
                        
                        <p className="text-xs text-[#8E8E93]">
                          Loại giường: <strong className="text-current font-semibold">{type.bedType}</strong> • Tiêu chuẩn: <strong>Tối đa {type.maxGuest} người lớn</strong>
                        </p>

                        {/* Liệt kê các đặc quyền miễn phí phong cách Apple Service */}
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          {['Ăn sáng miễn phí', 'Hủy phòng linh hoạt', 'Nước uống chào mừng', 'Bể bơi & Gym'].map((benefit, idx) => (
                            <div key={idx} className="flex items-center space-x-1.5 text-[11px] text-[#8E8E93] font-medium">
                              <Check className="w-3.5 h-3.5 text-[#34C759]" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Vùng đặt giá và Nút CTA chốt đơn */}
                      <div className="flex justify-between items-end pt-4 border-t border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60">
                        <div>
                          <p className="text-[9px] text-[#8E8E93] uppercase font-bold tracking-wider">Giá thành viên chuỗi</p>
                          <p className="text-lg font-black text-[#007AFF] font-mono">
                            {formatMoney(mockPrice)}
                            <span className="text-xs font-bold text-[#8E8E93] font-sans"> /đêm</span>
                          </p>
                        </div>

                        <button
                          onClick={() => handleBooking(type.name)}
                          className="px-5 py-2.5 bg-[#007AFF] hover:bg-[#0066CC] text-xs font-bold text-white rounded-xl shadow-md shadow-[#007AFF]/10 active:scale-95 transition-all"
                        >
                          Chọn phòng này
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Tab chính sách phụ thu minh bạch */
            <div className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="text-[#8E8E93] font-bold border-b border-[#E5E5EA] dark:border-[#2C2C2E] pb-2">
                      <th className="pb-3">Nội dung nghiệp vụ</th>
                      <th className="pb-3 text-center">Khung giờ quy chuẩn</th>
                      <th className="pb-3 text-center">Hình thức ghi nhận</th>
                      <th className="pb-3 text-right">Mức phụ thu áp dụng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5EA]/60 dark:divide-[#2C2C2E]/60 font-medium">
                    {hotel.surcharges.filter(s => s.status === SurchargeStatus.Active).map((sur) => (
                      <tr key={sur.id} className="hover:bg-slate-50 dark:hover:bg-[#2C2C2E]/30 transition-colors">
                        <td className="py-3">
                          <div className="font-bold text-current">{sur.name}</div>
                          <div className="text-[10px] text-[#8E8E93] mt-0.5">{sur.surchargeTypeName}</div>
                        </td>
                        <td className="py-3 text-center font-mono text-[#8E8E93]">
                          {sur.startTime && sur.endTime ? `${sur.startTime} - ${sur.endTime}` : 'Không giới hạn'}
                        </td>
                        <td className="py-3 text-center">
                          <span className="text-[10px] bg-[#8E8E93]/10 text-[#8E8E93] px-2 py-0.5 rounded-md font-bold">
                            {sur.isRequest ? 'Yêu cầu trước' : 'Hệ thống tự động'}
                          </span>
                        </td>
                        <td className="py-3 text-right font-mono font-black text-sm text-[#FF3B30]">
                          {sur.amountType === AmountType.Percent ? `+${sur.amount}%` : formatMoney(sur.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* CỘT PHẢI 3: SIDEBAR LIÊN HỆ & THƯ VIỆN TIỆN ÍCH RESORT */}
        <div className="space-y-6">
          
          {/* Box thông số thời gian */}
          <div className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#8E8E93] uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#34C759]" /> Quy định lưu trú toàn chuỗi
            </h3>
            <div className="space-y-3.5 text-xs font-medium">
              <div className="flex items-center space-x-3 text-[#8E8E93]">
                <Phone className="w-4 h-4" />
                <span>Hotline chi nhánh: <strong className="text-current">{hotel.phone}</strong></span>
              </div>
              <div className="flex items-center space-x-3 text-[#8E8E93]">
                <Mail className="w-4 h-4" />
                <span className="text-current">{hotel.email}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60 text-center">
                <div className="bg-[#F2F2F7] dark:bg-[#2C2C2E] p-2.5 rounded-xl">
                  <p className="text-[9px] text-[#8E8E93] font-bold uppercase">Giờ nhận phòng</p>
                  <p className="font-mono font-black text-sm text-[#34C759] mt-0.5">{hotel.checkinTime}</p>
                </div>
                <div className="bg-[#F2F2F7] dark:bg-[#2C2C2E] p-2.5 rounded-xl">
                  <p className="text-[9px] text-[#8E8E93] font-bold uppercase">Giờ trả phòng</p>
                  <p className="font-mono font-black text-sm text-[#FF3B30] mt-0.5">{hotel.checkoutTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Box hệ thống tiện ích dịch vụ đi kèm */}
          <div className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#8E8E93] uppercase tracking-wider flex items-center gap-1">
              <Info className="w-4 h-4 text-[#007AFF]" /> Tiện ích tích hợp sẵn
            </h3>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <div 
                  key={amenity.id}
                  className="flex items-center space-x-1.5 px-3 py-2 bg-[#F2F2F7] dark:bg-[#2C2C2E] text-xs font-bold rounded-xl text-current border border-transparent"
                >
                  {getAmenityIcon(amenity.icon)}
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thư viện ảnh thực tế */}
          <div className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-black text-[#8E8E93] uppercase tracking-wider">Album ảnh không gian thực tế ({hotel.images.length})</h3>
            <div className="grid grid-cols-3 gap-2">
              {hotel.images.map((img) => (
                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-[#E5E5EA] dark:border-[#2C2C2E] group cursor-pointer">
                  <img 
                    src={img.imageUrl} 
                    alt="Grand Apple Interior" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}