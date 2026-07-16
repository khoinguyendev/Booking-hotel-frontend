// services/event.service.ts

export interface HotelEvent {
  id: string;              // Mã sự kiện (EV-XXXX)
  title: string;           // Tiêu đề sự kiện
  description: string;     // Mô tả ngắn gọn
  type: 'Conference' | 'Internal' | 'Maintenance' | 'Holiday';
  startDate: string;       // Thời gian bắt đầu
  endDate: string;         // Thời gian kết thúc
  location: string;        // Địa điểm tổ chức (Phòng Ballroom, Sảnh, Toàn bộ KS...)
  attendeesCount: number;  // Số lượng người tham gia dự kiến
  status: 'Upcoming' | 'Live' | 'Completed';
}

export const getMockEvents = (): HotelEvent[] => [
  {
    id: 'EV-2026-001',
    title: 'Hội nghị Thượng đỉnh Công nghệ Tech Summit 2026',
    description: 'Đón tiếp đoàn đại biểu quốc tế, yêu cầu lễ tân túc trực 100% và chuẩn bị phòng VIP đặc biệt.',
    type: 'Conference',
    startDate: '2026-07-20T08:00:00',
    endDate: '2026-07-22T18:00:00',
    location: 'Grand Ballroom (Tầng 3)',
    attendeesCount: 350,
    status: 'Upcoming'
  },
  {
    id: 'EV-2026-002',
    title: 'Bảo trì Định kỳ Hệ thống Điều hòa Tổng',
    description: 'Kỹ thuật viên kiểm tra hệ thống lạnh trung tâm. Có thể ảnh hưởng nhẹ tới khu vực sảnh.',
    type: 'Maintenance',
    startDate: '2026-07-16T13:00:00', // Đang diễn ra dựa theo mốc thời gian hệ thống
    endDate: '2026-07-16T17:00:00',
    location: 'Khu kỹ thuật & Toàn bộ tòa nhà',
    attendeesCount: 5,
    status: 'Live'
  },
  {
    id: 'EV-2026-003',
    title: 'Tiệc Nội bộ: Vinh danh Nhân viên Xuất sắc Tháng 06',
    description: 'Khen thưởng các cá nhân đạt KPI xuất sắc và công bố bảng lương thưởng.',
    type: 'Internal',
    startDate: '2026-07-10T15:00:00',
    endDate: '2026-07-10T17:30:00',
    location: 'Nhà hàng Skyview (Tầng 20)',
    attendeesCount: 45,
    status: 'Completed'
  },
  {
    id: 'EV-2026-004',
    title: 'Chiến dịch Khuyến mãi Lễ Quốc Khánh 02/09',
    description: 'Chuẩn bị kịch bản đón tiếp khách du lịch đợt cao điểm nghỉ lễ dài ngày.',
    type: 'Holiday',
    startDate: '2026-09-01T00:00:00',
    endDate: '2026-09-03T23:59:59',
    location: 'Toàn bộ hệ thống khách sạn',
    attendeesCount: 1200,
    status: 'Upcoming'
  }
];