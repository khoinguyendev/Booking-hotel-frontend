import BookingHistorySection from '@/components/room/BookingHistorySection';
import MaintenanceHistorySection from '@/components/room/MaintenanceHistorySection';
import RoomDetailHeader from '@/components/room/RoomDetailHeader';
import RoomImages from '@/components/room/RoomImages';
import RoomInfoCard from '@/components/room/RoomInfoCard';
import RoomOverviewCards from '@/components/room/RoomOverviewCards';

export default function RoomDetailPage() {
  const room = {
    id: 1,
    roomNumber: '101',
    floor: 1,
    status: 'Available' as const,
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
  };

  const roomType = {
    id: 2,
    name: 'Deluxe Double',
    basePrice: 500000,
    maxGuest: 2,
    bedType: '1 Queen Bed',
    roomSize: 35.5,
    view: 'City View',
    smoking: false,
    breakfast: true,
    extraBedPrice: 200000,
    description:
      'Phòng Deluxe rộng rãi với cửa sổ lớn nhìn ra thành phố.',
  };

  const images = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
      isThumbnail: true,
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    },
  ];

  const bookings = [
    {
      id: 1,
      bookingCode: 'BK00001',
      customerName: 'Nguyễn Văn A',
      checkIn: '20/07/2026',
      checkOut: '22/07/2026',
      totalAmount: 1200000,
      status: 'CheckedOut' as const,
    },
    {
      id: 2,
      bookingCode: 'BK00002',
      customerName: 'Trần Thị B',
      checkIn: '25/07/2026',
      checkOut: '27/07/2026',
      totalAmount: 1500000,
      status: 'CheckedIn' as const,
    },
  ];

  const maintenanceHistories = [
    {
      id: 1,
      title: 'Thay máy lạnh',
      description: 'Máy lạnh bị hỏng block',
      maintenanceDate: '10/07/2026',
      technician: 'Nguyễn Văn C',
      cost: 2500000,
      status: 'Completed' as const,
    },
    {
      id: 2,
      title: 'Sơn lại tường',
      description: 'Tường bị bong sơn',
      maintenanceDate: '01/06/2026',
      technician: 'Lê Văn D',
      cost: 1800000,
      status: 'Processing' as const,
    },
  ];

  return (
    <div className="space-y-6">

      <RoomDetailHeader
        room={room}
        roomType={roomType}
      />

      <RoomOverviewCards
        totalBookings={186}
        averageRating={4.8}
        lastCleaning="21/07/2026 09:30"
        currentBooking={{
          guestName: 'Trần Thị B',
          checkIn: '25/07',
          checkOut: '27/07',
        }}
      />

      <RoomInfoCard
        room={room}
        roomType={roomType}
      />

      <RoomImages
        images={images}
      />

      <BookingHistorySection
        bookings={bookings}
      />

      <MaintenanceHistorySection
        histories={maintenanceHistories}
      />

    </div>
  );
}
