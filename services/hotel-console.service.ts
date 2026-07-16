// services/hotel-console.service.ts

export enum AmountType {
  Fixed = 0,
  Percent = 1
}

export enum SurchargeStatus {
  Active = 0,
  Inactive = 1
}

export enum RoomStatus {
  Available = 0,
  Occupied = 1,
  Maintenance = 2
}

export interface Amenity {
  id: number;
  name: string;
  icon: string;
}

export interface HotelBrand {
  id: number;
  name: string;
  logo: string;
  banner: string;
  website: string;
  phone: string;
  email: string;
}

export interface HotelImage {
  id: number;
  imageUrl: string;
  sortOrder: number;
}

export interface HotelSurcharge {
  id: number;
  name: string;
  surchargeTypeName: string;
  surchargeTypeCode: string;
  startTime: string | null;
  endTime: string | null;
  amountType: AmountType;
  amount: number;
  isRequest: boolean;
  status: SurchargeStatus;
}

export interface Room {
  id: number;
  roomNumber: string;
  floor: number;
  status: RoomStatus;
}

export interface RoomType {
  id: number;
  name: string;
  maxGuest: number;
  bedType: string;
  roomSize: number; // decimal(6,2)
  description: string;
  rooms: Room[];
}

export interface HotelConsoleData {
  id: number;
  name: string;
  slug: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  star: number;
  city: string;
  checkinTime: string;
  checkoutTime: string;
  status: boolean;
  brand: HotelBrand;
  images: HotelImage[];
  amenities: Amenity[];
  surcharges: HotelSurcharge[];
  roomTypes: RoomType[];
}

export const getMockHotelConsoleData = (): HotelConsoleData => ({
  id: 1,
  name: 'Grand Apple Resort & Spa',
  slug: 'grand-apple-resort-spa',
  description: 'Trải nghiệm không gian nghỉ dưỡng sang trọng bậc nhất với tầm nhìn hướng biển tuyệt đẹp, dịch vụ spa đẳng cấp quốc tế và hệ thống phòng thông minh tích hợp công nghệ đỉnh cao.',
  address: '120 Đường Trần Phú, Phường 5, Vũng Tàu',
  phone: '+84 254 355 1234',
  email: 'contact@grandappleresort.com',
  star: 5,
  city: 'Vũng Tàu',
  checkinTime: '14:00',
  checkoutTime: '12:00',
  status: true,
  brand: {
    id: 10,
    name: 'Apple Luxury Collection',
    logo: '',
    banner: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    website: 'https://appleluxurycollection.com',
    phone: '1900 6000',
    email: 'info@appleluxury.com'
  },
  images: [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80', sortOrder: 1 },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80', sortOrder: 2 },
    { id: 3, imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80', sortOrder: 3 }
  ],
  amenities: [
    { id: 1, name: 'Hồ bơi vô cực', icon: 'Waves' },
    { id: 2, name: 'Phòng Gym 24/7', icon: 'Dumbbell' },
    { id: 3, name: 'Nhà hàng 5 sao', icon: 'Utensils' },
    { id: 4, name: 'Wifi tốc độ cao', icon: 'Wifi' },
    { id: 5, name: 'Spa trị liệu', icon: 'Flower2' }
  ],
  surcharges: [
    {
      id: 101,
      name: 'Phụ thu Check-in sớm',
      surchargeTypeName: 'Nhận phòng sớm',
      surchargeTypeCode: 'EARLY_CHECKIN',
      startTime: '06:00',
      endTime: '12:00',
      amountType: AmountType.Percent,
      amount: 50.00, // 50% tiền phòng
      isRequest: true,
      status: SurchargeStatus.Active
    },
    {
      id: 102,
      name: 'Dịch vụ dọn dẹp đặc biệt',
      surchargeTypeName: 'Vệ sinh phòng',
      surchargeTypeCode: 'EXTRA_CLEANING',
      startTime: null,
      endTime: null,
      amountType: AmountType.Fixed,
      amount: 350000.00, // 350k VNĐ (decimal)
      isRequest: false,
      status: SurchargeStatus.Active
    }
  ],
  roomTypes: [
    {
      id: 201,
      name: 'Deluxe Ocean View',
      maxGuest: 2,
      bedType: '1 King Bed',
      roomSize: 45.50, // decimal(6,2)
      description: 'Phòng Deluxe sang trọng với ban công hướng biển toàn cảnh, bồn tắm nằm cao cấp.',
      rooms: [
        { id: 1001, roomNumber: 'P.301', floor: 3, status: RoomStatus.Available },
        { id: 1002, roomNumber: 'P.302', floor: 3, status: RoomStatus.Occupied },
        { id: 1003, roomNumber: 'P.401', floor: 4, status: RoomStatus.Maintenance }
      ]
    },
    {
      id: 202,
      name: 'Standard Garden Villa',
      maxGuest: 4,
      bedType: '2 Queen Beds',
      roomSize: 72.00,
      description: 'Không gian villa biệt lập bao quanh bởi khu vườn nhiệt đới xanh mát.',
      rooms: [
        { id: 2001, roomNumber: 'V.101', floor: 1, status: RoomStatus.Available },
        { id: 2002, roomNumber: 'V.102', floor: 1, status: RoomStatus.Available }
      ]
    }
  ]
});