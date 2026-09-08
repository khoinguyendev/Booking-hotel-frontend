// app/admin/hotel/page.tsx
'use client';

import AmenitySection from '@/components/hotel/manager/AmenitySection';
import GallerySection from '@/components/hotel/manager/GallerySection';
import HotelHeader from '@/components/hotel/manager/HotelHeader';
import HotelInfoCard from '@/components/hotel/manager/HotelInfoCard';
import HotelOverviewCards from '@/components/hotel/manager/HotelOverviewCards';
import PolicySection from '@/components/hotel/manager/PolicySection';
import RoomSummaryCard from '@/components/hotel/manager/RoomSummaryCard';
import RoomTypeSection from '@/components/hotel/manager/RoomTypeSection';
import SurchargeSection from '@/components/hotel/manager/SurchargeSection';
import { useManagerHotel } from '@/hooks/manager/useHotel';
import { Hotel, hotelService } from '@/services/hotel.service';
import { useEffect, useState } from 'react';




export default function ManagerHotel() {

const {
  hotel,
  loading,
  refetch,
} = useManagerHotel();
if (!hotel) return null;
  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black p-6 space-y-6">
      <HotelHeader hotel={hotel} />

      <HotelOverviewCards overview={{roomTypes:hotel?.roomTypeCount??0,rooms:hotel?.roomCount??0,amenities:hotel?.amenityCount??0,surcharges:hotel?.surchargeCount??0}} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <HotelInfoCard hotel={hotel} />

          <RoomTypeSection roomTypes={hotel.roomTypes} />

          {/* <RoomSummaryCard roomSummary={{active:data.r}} /> */}

          <SurchargeSection surcharges={hotel.surcharges} />
        </div>

        <div className="space-y-6">
          <AmenitySection amenities={hotel.amenities} />

          <GallerySection images={hotel.image.split(",")} />

          {/* <PolicySection policies={data} /> */}
        </div>
      </div>
    </div>
  );
}