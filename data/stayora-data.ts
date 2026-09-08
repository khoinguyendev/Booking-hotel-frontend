export type Hotel = {
  slug: string;
  name: string;
  city: string;
  region: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  tags: string[];
  description: string;
};

export const hotels: Hotel[] = [
  {
    slug: "anantara-mui-ne",
    name: "Anantara Mui Ne Resort",
    city: "Mũi Né",
    region: "Bình Thuận",
    rating: 4.9,
    reviews: 328,
    price: 3200000,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
    tags: ["Biển", "Nghỉ dưỡng"],
    description: "Kỳ nghỉ bên biển với hồ bơi riêng và dịch vụ chuẩn 5 sao.",
  },
  {
    slug: "intercontinental-danang",
    name: "InterContinental Danang",
    city: "Đà Nẵng",
    region: "Sơn Trà",
    rating: 4.8,
    reviews: 512,
    price: 6800000,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85",
    tags: ["Biển", "Sang trọng"],
    description:
      "Ẩn mình giữa thiên nhiên Sơn Trà, nơi mỗi buổi sáng là một đặc ân.",
  },
  {
    slug: "topas-ecolodge",
    name: "Topas Ecolodge",
    city: "Sa Pa",
    region: "Lào Cai",
    rating: 4.7,
    reviews: 284,
    price: 2900000,
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
    tags: ["Núi", "Bản địa"],
    description: "Bình yên giữa những thửa ruộng bậc thang của Hoàng Liên Sơn.",
  },
  {
    slug: "the-myst-dong-khoi",
    name: "The Myst Đồng Khởi",
    city: "TP. Hồ Chí Minh",
    region: "Quận 1",
    rating: 4.6,
    reviews: 419,
    price: 2400000,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85",
    tags: ["Thành phố", "Thiết kế"],
    description: "Một lát cắt Sài Gòn tinh tế, ngay giữa lòng thành phố.",
  },
  {
    slug: "six-senses-ninh-van-bay",
    name: "Six Senses Ninh Vân Bay",
    city: "Nha Trang",
    region: "Khánh Hòa",
    rating: 4.9,
    reviews: 196,
    price: 9200000,
    image:
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1200&q=85",
    tags: ["Biển", "Riêng tư"],
    description:
      "Biệt thự ẩn mình trong vịnh xanh, nơi thời gian trôi chậm lại.",
  },
  {
    slug: "hotel-de-la-coupole",
    name: "Hotel de la Coupole",
    city: "Sa Pa",
    region: "Trung tâm",
    rating: 4.8,
    reviews: 367,
    price: 3600000,
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=85",
    tags: ["Núi", "Di sản"],
    description: "Sự giao thoa lộng lẫy của Đông Dương và núi rừng Tây Bắc.",
  },
];

export const destinations = [
  {
    name: "Đà Nẵng",
    count: "1.240 chỗ nghỉ",
    image:
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Đà Lạt",
    count: "876 chỗ nghỉ",
    image:
      "https://images.unsplash.com/photo-1555921015-5532091f6026?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Hà Nội",
    count: "2.185 chỗ nghỉ",
    image:
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Phú Quốc",
    count: "654 chỗ nghỉ",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
  },
];

export const formatVND = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value) + " ₫";
export const featuredHotels = hotels.slice(0, 4);
export const offers = [
  {
    title: "Nghỉ dưỡng trọn vẹn",
    subtitle: "Ưu đãi lên đến 20% cho kỳ nghỉ 2 đêm",
    code: "STAY2",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Chào hè rực rỡ",
    subtitle: "Tặng bữa sáng cho mọi đặt phòng",
    code: "SUMMER26",
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1000&q=85",
  },
];
export const bookings = [
  {
    id: "STY-240821",
    hotel: "Anantara Mui Ne Resort",
    city: "Mũi Né",
    date: "21–23 Tháng 8, 2026",
    status: "Đã xác nhận",
    image: hotels[0].image,
    room: "Deluxe Ocean View",
  },
];
export const reviews = [
  {
    hotel: hotels[0].name,
    rating: 5,
    date: "12 Tháng 6, 2026",
    text: "Một trải nghiệm tuyệt vời. Không gian riêng tư, nhân viên vô cùng tinh tế và bữa sáng rất ngon.",
  },
];
export const rooms = [
  {
    name: "Deluxe Ocean View",
    detail: "42 m² · 1 giường king · 2 khách",
    price: 3200000,
    image: hotels[0].image,
  },
  {
    name: "Premier Pool Villa",
    detail: "86 m² · Hồ bơi riêng · 2 khách",
    price: 5800000,
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=85",
  },
];
