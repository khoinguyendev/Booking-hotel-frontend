import RoomTypeHeader from '@/components/room-type/RoomTypeHeader';
import RoomTypeOverview from '@/components/room-type/RoomTypeOverview';
import RoomTypeInfoCard from '@/components/room-type/RoomTypeInfoCard';
import RoomGallery from '@/components/room-type/RoomGallery';
import RoomListSection, { Room } from '@/components/room-type/RoomListSection';
const roomType = {
  id: 2,
  hotelId: 3,
  name: 'Deluxe Double',
  maxGuest: 2,
  basePrice: 500000,
  bedType: '1 Queen Bed',
  roomSize: 35.5,
  description:
    'Phòng Deluxe rộng rãi với giường Queen và cửa sổ lớn nhìn ra thành phố.',
  images:
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267,https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
};


 const a: Room[]=[
  {
    id: 1,
    roomNumber: "101",
    floor: 1,
    status: "Available",
    image: "https://picsum.photos/seed/room101/300/200",
  },
  {
    id: 2,
    roomNumber: "102",
    floor: 1,
    status: "Occupied",
    image: "https://picsum.photos/seed/room102/300/200",
  },
  {
    id: 3,
    roomNumber: "103",
    floor: 1,
    status: "Cleaning",
    image: "https://picsum.photos/seed/room103/300/200",
  },
  {
    id: 4,
    roomNumber: "104",
    floor: 1,
    status: "Maintenance",
    image: "https://picsum.photos/seed/room104/300/200",
  },
  {
    id: 5,
    roomNumber: "201",
    floor: 2,
    status: "Available",
    image: "https://picsum.photos/seed/room201/300/200",
  },
  {
    id: 6,
    roomNumber: "202",
    floor: 2,
    status: "Occupied",
    image: "https://picsum.photos/seed/room202/300/200",
  },
  {
    id: 7,
    roomNumber: "203",
    floor: 2,
    status: "OutOfService",
    image: "https://picsum.photos/seed/room203/300/200",
  },
  {
    id: 8,
    roomNumber: "204",
    floor: 2,
    status: "Cleaning",
    image: "https://picsum.photos/seed/room204/300/200",
  },
  {
    id: 9,
    roomNumber: "301",
    floor: 3,
    status: "Available",
    image: "https://picsum.photos/seed/room301/300/200",
  },
  {
    id: 10,
    roomNumber: "302",
    floor: 3,
    status: "Occupied",
    image: "https://picsum.photos/seed/room302/300/200",
  },
];
const roomss:Room[] = [
  {
    id: 1,
    roomNumber: '101',
    floor: 1,
    status: 'Available',
    image: '',
  },
  {
    id: 2,
    roomNumber: '102',
    floor: 1,
    status: 'Available',
    image: '',
  },
  {
    id: 3,
    roomNumber: '103',
    floor: 1,
    status: 'Available',
    image: '',
  },
  {
    id: 4,
    roomNumber: '104',
    floor: 1,
    status: 'Available',
    image: '',
  },
  {
    id: 5,
    roomNumber: '201',
    floor: 2,
    status: 'Available',
    image: '',
  },
];
export default function RoomTypeDetailPage() {
  return (
    <div className="space-y-6">

      <RoomTypeHeader
        roomType={roomType}
      />

      <RoomTypeOverview
      rooms={roomss}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">

          <RoomTypeInfoCard
            roomType={roomType}
          />

        </div>

        

      </div>

      {/* <RoomGallery
        images=   "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"

      /> */}

     

      <RoomListSection
        rooms={a}
      />

    </div>
  );
}