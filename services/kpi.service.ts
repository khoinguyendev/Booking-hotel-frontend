// services/kpi.service.ts

export interface KpiRecord {
  id: string;              // Liên kết mã nhân sự (NV-001, NV-002...)
  name: string;
  department: string;
  kpiName: string;         // Tên mục tiêu KPI chính trong tháng
  target: number;          // Chỉ tiêu đề ra
  actual: number;          // Thực tế đạt được
  unit: string;            // Đơn vị đo lường (Phòng, Khách hàng, Cuộc gọi, %)
  progress: number;        // Tỉ lệ hoàn thành (%) - Giữ nguyên số lẻ thập phân
  status: 'Exceeded' | 'OnTrack' | 'Behind';
}

export const getMockKpis = (): KpiRecord[] => [
  {
    id: 'NV-001',
    name: 'Nguyễn Kiều Trang',
    department: 'Lễ tân (Front Office)',
    kpiName: 'Đón tiếp và check-in phòng khách',
    target: 150,
    actual: 165,
    unit: 'Lượt khách',
    progress: 110.00, // Đạt 110% chỉ tiêu
    status: 'Exceeded'
  },
  {
    id: 'NV-002',
    name: 'Phạm Minh Quân',
    department: 'Buồng phòng (Housekeeping)',
    kpiName: 'Bảo trì & dọn dẹp phòng Standard/Deluxe',
    target: 200,
    actual: 185,
    unit: 'Phòng',
    progress: 92.50, // Đạt 92.5% chỉ tiêu (Không làm tròn số lẻ)
    status: 'OnTrack'
  },
  {
    id: 'NV-003',
    name: 'Lê Hoàng Long',
    department: 'Ẩm thực (F&B)',
    kpiName: 'Doanh thu bán up-sell dịch vụ ăn uống',
    target: 15000000, // 15 triệu VND
    actual: 10250000, // 10.25 triệu VND
    unit: 'VNĐ',
    progress: 68.33, // Đạt 68.33% chỉ tiêu (Bảo lưu độ chính xác)
    status: 'Behind'
  },
  {
    id: 'NV-004',
    name: 'Trần Thế Vinh',
    department: 'Kỹ thuật (Engineering)',
    kpiName: 'Tốc độ xử lý sự cố kỹ thuật phòng máy',
    target: 100, // Tỉ lệ xử lý đúng hạn (%)
    actual: 98.5,
    unit: '%',
    progress: 98.50,
    status: 'OnTrack'
  }
];