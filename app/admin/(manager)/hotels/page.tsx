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
import { hotelService } from '@/services/hotel.service';
import { Hotel } from '@/types/hotel';
import { useEffect, useState } from 'react';



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
    hotelId: 1,
    name: "Check-in sớm",
    description: "Phụ thu khi khách nhận phòng trước giờ quy định.",
    chargeType: "Fixed",
    applyType: "Booking",
    amount: 300000,
    isRequired: false,
    isActive: true,
  },
  {
    id: 2,
    hotelId: 1,
    name: "Check-out muộn",
    description: "Áp dụng khi khách trả phòng sau giờ quy định.",
    chargeType: "Fixed",
    applyType: "Booking",
    amount: 500000,
    isRequired: false,
    isActive: true,
  },
  {
    id: 3,
    hotelId: 1,
    name: "Phụ thu thêm người",
    description: "Áp dụng cho mỗi khách vượt quá số lượng tiêu chuẩn.",
    chargeType: "Fixed",
    applyType: "Room",
    amount: 250000,
    isRequired: true,
    isActive: true,
  },
  {
    id: 4,
    hotelId: 1,
    name: "Phụ thu cuối tuần",
    description: "Tăng giá vào thứ 7 và Chủ nhật.",
    chargeType: "Percent",
    applyType: "Booking",
    amount: 10,
    isRequired: true,
    isActive: true,
  },
  {
    id: 5,
    hotelId: 1,
    name: "Phụ thu lễ/Tết",
    description: "Áp dụng trong các ngày lễ lớn.",
    chargeType: "Percent",
    applyType: "Booking",
    amount: 20,
    isRequired: true,
    isActive: false,
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
  const [data,setData]=useState<Hotel>();
  const [loading,setLoading]=useState(true);
  useEffect(() => {
      const fetchData = async () => {
          try {
              setLoading(true);
  
              const response = await hotelService.getHotelByManager();
              console.log('Fetched employees:', response); 
              setData(response.data.data); 
          } catch (error) {
              console.error(error);
          } finally {
              setLoading(false);
          }
      };
  
      fetchData();
  }, []);
  console.log(data);
  if(!data) return null;
  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black p-6 space-y-6">
      <HotelHeader hotel={data} />

      <HotelOverviewCards overview={{roomTypes:data?.roomTypeCount??0,rooms:data?.roomCount??0,amenities:data?.amenityCount??0,surcharges:data?.amenities.length??0}} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <HotelInfoCard hotel={data} />

          <RoomTypeSection roomTypes={data.roomTypes} />

          <RoomSummaryCard roomSummary={hotel.roomSummary} />

          <SurchargeSection surcharges={data.surcharges} />
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