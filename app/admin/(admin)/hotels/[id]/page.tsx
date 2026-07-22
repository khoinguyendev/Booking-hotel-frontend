// app/admin/hotel/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  getMockHotelConsoleData,
  HotelConsoleData,
  AmountType,
  RoomStatus,
  SurchargeStatus
} from '@/services/hotel-console.service';
import {
  Building, Star, MapPin, Phone, Mail, Globe,
  Clock, Shield, Wifi, Dumbbell, Utensils, Waves,
  Flower2, Layers, DollarSign, Eye, ShieldAlert, Sparkles, Plus
} from 'lucide-react';
import { useParams } from "next/navigation";
import { useHotelDetail } from "@/hooks/useHotelDetail";
export default function HotelConsolePage() {
  const [hotel, setHotel] = useState<HotelConsoleData | null>(null);
  const [openAddHotel, setOpenAddHotel] = useState(false);
  useEffect(() => {
    setHotel(getMockHotelConsoleData());
  }, []);

  if (!hotel) {
    return <div className="p-8 text-center text-xs text-[#8E8E93]">Đang tải dữ liệu khách sạn...</div>;
  }

  // Khớp nhanh Icon tiện ích dựa trên chuỗi lưu trữ từ DB
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6 bg-[#F2F2F7] dark:bg-[#000000] min-h-full p-4 sm:p-6 text-[#1C1C1E] dark:text-white font-sans antialiased transition-colors duration-300">

      {/* 1. Brand Banner Header (Tận dụng HotelBrand, Hotel) */}
      <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg border border-[#E5E5EA] dark:border-[#2C2C2E] group">
        {/* 1. Ảnh nền Banner */}
        <img
          src={hotel.brand.banner}
          alt={hotel.brand.name}
          className="w-full h-full object-cover brightness-[0.75] dark:brightness-[0.55] transition-transform duration-700 group-hover:scale-105"
        />

        {/* Lớp phủ Gradient mịn màng hơn */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 flex flex-col justify-between p-6 sm:p-8">

          {/* 2. HÀNG ĐỈNH BANNER: Đẩy nút "Thêm Brand" về góc phải */}
        

          {/* 3. HÀNG ĐÁY BANNER: Khối thông tin định vị */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 w-full">

            {/* Cột trái: Brand Info & Địa chỉ */}
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 w-fit">
                <span className="text-base leading-none">{hotel.brand.logo}</span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{hotel.brand.name}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-sm">
                {hotel.name}
              </h1>

              <div className="flex items-center space-x-1.5 text-xs text-white/80 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#007AFF]" />
                <span className="truncate">{hotel.address}</span>
              </div>
            </div>

            {/* Cột phải: Khối xếp hạng Star Rating */}
            <div className="flex items-center space-x-2.5 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 flex-shrink-0">
              <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider font-mono">Xếp hạng:</span>
              <div className="flex items-center gap-0.5 text-[#FFCC00]">
                {Array.from({ length: hotel.star }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current drop-shadow" />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Grid điều phối 3 cột chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CỘT 1 & 2: VẬN HÀNH PHÒNG ỐC VÀ PHỤ THU */}
        <div className="lg:col-span-2 space-y-6">

          {/* Cấu hình Phòng ốc (Tận dụng RoomType, Room) */}
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] p-6 space-y-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60 pb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#007AFF]" />
                Sơ đồ phân loại phòng ({hotel.roomTypes.length})
              </h2>
            </div>

            <div className="space-y-6">
              {hotel.roomTypes.map((type) => (
                <div key={type.id} className="border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-2xl p-4 space-y-4 bg-[#F2F2F7]/40 dark:bg-[#000000]/20">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60 pb-3">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-current">{type.name}</h3>
                      <p className="text-xs text-[#8E8E93] mt-0.5">{type.bedType} • Diện tích: <span className="font-mono">{type.roomSize.toFixed(2)} m²</span></p>
                    </div>
                    <span className="text-xs bg-[#007AFF]/10 text-[#007AFF] px-2.5 py-1 rounded-full font-bold">
                      Tối đa {type.maxGuest} khách
                    </span>
                  </div>

                  {/* Sơ đồ trạng thái phòng vật lý */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {type.rooms.map((room) => (
                      <div
                        key={room.id}
                        className={`p-3 rounded-xl border flex flex-col justify-between h-20 transition-all ${room.status === RoomStatus.Available
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
                          : room.status === RoomStatus.Occupied
                            ? 'bg-[#007AFF]/10 border-[#007AFF]/20 text-[#007AFF]'
                            : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                          }`}
                      >
                        <span className="font-mono font-bold text-xs">Tầng {room.floor}</span>
                        <div className="flex justify-between items-end">
                          <span className="font-bold text-sm text-current">{room.roomNumber}</span>
                          <span className="w-2 h-2 rounded-full bg-current" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cấu hình Phụ thu Tài chính (Tận dụng HotelSurcharge, SurchargeType) */}
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] p-6 space-y-6 shadow-sm">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60 pb-4">
              <DollarSign className="w-5 h-5 text-[#34C759]" />
              Thiết lập phụ thu khách sạn
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="text-[#8E8E93] font-semibold border-b border-[#E5E5EA] dark:border-[#2C2C2E] pb-2">
                    <th className="pb-3">Tên phụ thu / Loại</th>
                    <th className="pb-3 text-center">Khung giờ áp dụng</th>
                    <th className="pb-3 text-center">Khách duyệt trước</th>
                    <th className="pb-3 text-right">Giá trị phụ thu</th>
                    <th className="pb-3 pr-2 text-right">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5EA]/60 dark:divide-[#2C2C2E]/60">
                  {hotel.surcharges.map((sur) => (
                    <tr key={sur.id} className="hover:bg-[#F2F2F7]/30 dark:hover:bg-[#2C2C2E]/30 transition-colors">
                      <td className="py-3">
                        <div className="font-bold text-current">{sur.name}</div>
                        <div className="text-[10px] text-[#8E8E93] mt-0.5">{sur.surchargeTypeName} ({sur.surchargeTypeCode})</div>
                      </td>
                      <td className="py-3 text-center font-mono text-[#8E8E93]">
                        {sur.startTime && sur.endTime ? `${sur.startTime} - ${sur.endTime}` : 'Không giới hạn'}
                      </td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full font-semibold ${sur.isRequest ? 'bg-amber-500/10 text-amber-500' : 'bg-[#8E8E93]/10 text-[#8E8E93]'
                          }`}>
                          {sur.isRequest ? 'Bắt buộc' : 'Tự động'}
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-sm">
                        {sur.amountType === AmountType.Percent ? (
                          <span className="text-[#007AFF]">{sur.amount.toFixed(2)}%</span>
                        ) : (
                          <span className="text-current">{formatCurrency(sur.amount)}</span>
                        )}
                      </td>
                      <td className="py-3 pr-2 text-right">
                        <span className={`inline-flex items-center w-2 h-2 rounded-full ${sur.status === SurchargeStatus.Active ? 'bg-[#34C759]' : 'bg-[#FF3B30]'
                          }`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* CỘT 3: THÔNG TIN VẬN HÀNH, HÌNH ẢNH & TIỆN ÍCH */}
        <div className="space-y-6">

          {/* Liên hệ Vận hành */}
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#8E8E93] uppercase tracking-wider">Thông tin liên hệ vận hành</h2>
            <div className="space-y-3 text-xs text-current">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#8E8E93]" />
                <span>HOTLINE: <strong className="font-semibold">{hotel.phone}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#8E8E93]" />
                <span>{hotel.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#8E8E93]" />
                <span>Check-in: <strong className="font-mono">{hotel.checkinTime}</strong> | Check-out: <strong className="font-mono">{hotel.checkoutTime}</strong></span>
              </div>
            </div>
          </div>

          {/* Thư viện Tiện ích (Tận dụng Amenity, HotelAmenity) */}
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#8E8E93] uppercase tracking-wider">Hệ thống tiện ích tích hợp ({hotel.amenities.length})</h2>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <span
                  key={amenity.id}
                  className="flex items-center space-x-1.5 px-3 py-2 bg-[#F2F2F7] dark:bg-[#2C2C2E] text-xs font-semibold rounded-2xl transition-colors text-current border border-transparent dark:border-[#2C2C2E]"
                >
                  {getAmenityIcon(amenity.icon)}
                  <span>{amenity.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Quản lý Album ảnh (Tận dụng HotelImage) */}
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-[#E5E5EA] dark:border-[#2C2C2E] p-6 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-bold text-[#8E8E93] uppercase tracking-wider">Thư viện ảnh ({hotel.images.length})</h2>
              <span className="text-[10px] bg-[#E5E5EA] dark:bg-[#2C2C2E] px-2 py-0.5 rounded-full font-semibold">Tối đa 500px</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {hotel.images.map((img) => (
                <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden border border-[#E5E5EA] dark:border-[#2C2C2E] group">
                  <img
                    src={img.imageUrl}
                    alt="Phòng khách sạn"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/60 text-[9px] font-mono text-white px-1.5 py-0.5 rounded-md">
                    #{img.sortOrder}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}