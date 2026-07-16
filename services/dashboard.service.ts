// services/dashboard.service.ts

export interface DashboardData {
  stats: {
    totalStaff: number;
    activeShifts: number;
    attendanceRate: number;
    pendingRequests: number;
  };
  attendanceData: { date: string; checkedIn: number; late: number; absent: number }[];
  staffAllocation: { department: string; count: number }[];
  upcomingEvents: { id: string; title: string; time: string; location: string }[];
  pendingRequestsList: { id: string; staffName: string; type: string; duration: string; reason: string }[];
}

export const getMockDashboardData = (): DashboardData => {
  return {
    stats: {
      totalStaff: 120,
      activeShifts: 3,
      attendanceRate: 94.5, // Giữ nguyên số thập phân theo yêu cầu chính xác dữ liệu
      pendingRequests: 8,
    },
    attendanceData: [
      { date: '10/07', checkedIn: 112, late: 5, absent: 3 },
      { date: '11/07', checkedIn: 115, late: 3, absent: 2 },
      { date: '12/07', checkedIn: 108, late: 8, absent: 4 },
      { date: '13/07', checkedIn: 114, late: 4, absent: 2 },
      { date: '14/07', checkedIn: 110, late: 6, absent: 4 },
    ],
    staffAllocation: [
      { department: 'Buồng phòng (Housekeeping)', count: 45 },
      { department: 'Lễ tân (Front Office)', count: 20 },
      { department: 'Ẩm thực (F&B)', count: 30 },
      { department: 'Nhân sự (Human Resources)', count: 8 },
      { department: 'Kế toán (Accounting)', count: 7 },
      { department: 'Kỹ thuật (Engineering)', count: 10 },
    ],
    upcomingEvents: [
      { id: 'ev-1', title: 'Họp Giao Ban Định Kỳ Ban Giám Đốc', time: '14:00 - 15:30', location: 'Phòng họp lớn' },
      { id: 'ev-2', title: 'Đào tạo Nghiệp vụ Buồng phòng Mới', time: '09:00 - 11:30', location: 'Hội trường B' },
      { id: 'ev-3', title: 'Kiểm tra PCCC Định kỳ Khu vực Khách sạn', time: '08:00 - 17:00', location: 'Toàn bộ khuôn viên' },
    ],
    pendingRequestsList: [
      { id: 'req-1', staffName: 'Nguyễn Văn A', type: 'Xin nghỉ phép', duration: '15/07 (1 ngày)', reason: 'Giải quyết việc gia đình' },
      { id: 'req-2', staffName: 'Trần Thị B', type: 'Đổi ca làm việc', duration: 'Ca Sáng -> Ca Tối (16/07)', reason: 'Trùng lịch khám sức khỏe' },
      { id: 'req-3', staffName: 'Lê Văn C', type: 'Đăng ký làm thêm giờ', duration: '14/07 (3 giờ)', reason: 'Hỗ trợ sự kiện tiệc cưới' },
    ],
  };
};