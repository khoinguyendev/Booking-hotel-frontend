// app/admin/hotel/page.tsx
'use client';

import AmenitySection from '@/components/hotel/AmenitySection';
import GallerySection from '@/components/hotel/GallerySection';
import HotelHeader from '@/components/hotel/HotelHeader';
import HotelInfoCard from '@/components/hotel/HotelInfoCard';
import HotelOverviewCards from '@/components/hotel/HotelOverviewCards';
import PolicySection from '@/components/hotel/PolicySection';
import RoomSummaryCard from '@/components/hotel/RoomSummaryCard';
import RoomTypeSection from '@/components/hotel/RoomTypeSection';
import SurchargeSection from '@/components/hotel/SurchargeSection';
import { useState } from 'react';



export default function HotelPage() {
  const [hotel] = useState({
    id: 1,

    name: 'Sunrise Hotel',

    brand: 'AAA Hotels',

    star: 4,

    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',

    phone: '02838220001',

    email: 'sunrise@gmail.com',

    description:
      'Khách sạn 4 sao nằm ngay trung tâm thành phố, thuận tiện di chuyển đến các điểm tham quan.',

    checkin: '14:00',

    checkout: '12:00',

    banner:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600',

    gallery: [
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
      'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=800',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
    ],

    overview: {
      roomTypes: 5,
      rooms: 120,
      amenities: 18,
      surcharges: 6,
      images: 24,
    },

    roomTypes: [
      {
        id: 1,
        name: 'Standard',
        roomCount: 30,
        price: 800000,
      },
      {
        id: 2,
        name: 'Superior',
        roomCount: 25,
        price: 1200000,
      },
      {
        id: 3,
        name: 'Deluxe',
        roomCount: 40,
        price: 1800000,
      },
      {
        id: 4,
        name: 'Suite',
        roomCount: 20,
        price: 2800000,
      },
      {
        id: 5,
        name: 'Family',
        roomCount: 5,
        price: 3500000,
      },
    ],

    roomSummary: {
      total: 120,
      active: 115,
      maintenance: 5,
    },

    amenities: [
      'Wifi',
      'Hồ bơi',
      'Spa',
      'Gym',
      'Nhà hàng',
      'Bar',
      'Bãi đỗ xe',
      'Đưa đón sân bay',
    ],

    surcharges: [
      {
        id: 1,
        name: 'Check-in sớm',
        value: '300.000đ',
        status: true,
      },
      {
        id: 2,
        name: 'Check-out muộn',
        value: '500.000đ',
        status: true,
      },
      {
        id: 3,
        name: 'Thêm người',
        value: '250.000đ',
        status: false,
      },
    ],

    policies: [
      'Check-in sau 14:00',
      'Check-out trước 12:00',
      'Không hút thuốc trong phòng',
      'Cho phép trẻ em',
      'Không mang thú cưng',
    ],
  });

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black p-6 space-y-6">
      <HotelHeader hotel={hotel} />

      <HotelOverviewCards overview={hotel.overview} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <HotelInfoCard hotel={hotel} />

          <RoomTypeSection roomTypes={hotel.roomTypes} />

          <RoomSummaryCard roomSummary={hotel.roomSummary} />

          <SurchargeSection surcharges={hotel.surcharges} />
        </div>

        <div className="space-y-6">
          <AmenitySection amenities={hotel.amenities} />

          <GallerySection images={hotel.gallery} />

          <PolicySection policies={hotel.policies} />
        </div>
      </div>
    </div>
  );
}