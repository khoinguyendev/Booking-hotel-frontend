// services/evaluation.service.ts

export interface EvaluationRecord {
  id: string;          // Khớp với Mã nhân sự (NV-001, NV-002...)
  name: string;
  department: string;
  avatar: string;      // Chữ cái viết tắt làm avatar iOS
  rating: number;      // Thang điểm 5.0
  attendanceScore: number; // Điểm chấm công chuyên cần (Thang 100)
  kpiScore: number;    // Điểm hiệu suất hoàn thành công việc (Thang 100)
  feedback: string;    // Nhận xét từ Quản lý
  status: 'Excellent' | 'Good' | 'Average' | 'NeedImprovement';
}

export const getMockEvaluations = (): EvaluationRecord[] => [
  {
    id: 'NV-001',
    name: 'Nguyễn Kiều Trang',
    department: 'Lễ tân (Front Office)',
    avatar: 'KT',
    rating: 4.8,
    attendanceScore: 98,
    kpiScore: 95,
    feedback: 'Thái độ phục vụ khách hàng xuất sắc, xử lý tình huống phát sinh nhanh nhạy. Luôn đi làm đúng giờ.',
    status: 'Excellent'
  },
  {
    id: 'NV-002',
    name: 'Phạm Minh Quân',
    department: 'Buồng phòng (Housekeeping)',
    avatar: 'MQ',
    rating: 4.2,
    attendanceScore: 88,
    kpiScore: 90,
    feedback: 'Hoàn thành tốt khối lượng công việc được giao. Cần chú ý cải thiện giờ giấc check-in tránh đi muộn.',
    status: 'Good'
  },
  {
    id: 'NV-003',
    name: 'Lê Hoàng Long',
    department: 'Ẩm thực (F&B)',
    avatar: 'HL',
    rating: 3.5,
    attendanceScore: 75,
    kpiScore: 80,
    feedback: 'Kỹ năng chuyên môn tốt nhưng tỉ lệ vắng mặt không phép trong tháng còn cao. Cần chấn chỉnh thái độ làm việc.',
    status: 'Average'
  },
  {
    id: 'NV-004',
    name: 'Trần Thế Vinh',
    department: 'Kỹ thuật (Engineering)',
    avatar: 'TV',
    rating: 4.9,
    attendanceScore: 100,
    kpiScore: 98,
    feedback: 'Nhân sự cốt cán. Bảo trì hệ thống phòng ốc luôn đạt trạng thái tối ưu. Tỉ lệ chấm công đạt điểm tuyệt đối.',
    status: 'Excellent'
  }
];