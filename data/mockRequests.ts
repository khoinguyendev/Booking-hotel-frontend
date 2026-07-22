import { StaffRequest } from "@/types/requests";

export const mockRequests: StaffRequest[] = [
  {
    id: 1,
    employeeCode: 'EMP001',
    employeeName: 'Nguyễn Văn An',
    createdAt: '2026-07-18',
    type: 'Leave',
    status: 'Pending',  
    reason: 'Có việc gia đình.',
    leave: {
      fromDate: '2026-07-20',
      toDate: '2026-07-21',
    },
  },

  {
    id: 2,
    employeeCode: 'EMP002',
    employeeName: 'Trần Thị Bình',
    createdAt: '2026-07-18',
    type: 'ShiftChange',
    status: 'Approved',
    reason: 'Muốn đổi sang ca chiều.',
    approvedBy: 'Quản lý',
    approvedAt: '2026-07-18 10:30',
    shiftChange: {
      currentShift: 'Ca sáng',
      targetShift: 'Ca chiều',
      newDate: '2026-07-19',
    },
  },

  {
    id: 3,
    employeeCode: 'EMP003',
    employeeName: 'Lê Quốc Cường',
    createdAt: '2026-07-18',
    type: 'Overtime',
    status: 'Approved',
    reason: 'Khách đoàn check-in muộn.',
    overtime: {
      workDate: '2026-07-18',
      fromTime: '18:00',
      toTime: '22:00',
      hours: 4,
    },
  },

  {
    id: 4,
    employeeCode: 'EMP004',
    employeeName: 'Phạm Thu Dung',
    createdAt: '2026-07-17',
    type: 'Leave',
    status: 'Rejected',
    rejectReason: 'Thiếu nhân sự.',
    reason: 'Xin nghỉ cá nhân.',
    leave: {
      fromDate: '2026-07-19',
      toDate: '2026-07-19',
    },
  },

  {
    id: 5,
    employeeCode: 'EMP005',
    employeeName: 'Hoàng Minh Đức',
    createdAt: '2026-07-17',
    type: 'ShiftChange',
    status: 'Pending',
    reason: 'Có lịch học.',
    shiftChange: {
      currentShift: 'Ca tối',
      targetEmployee: 'EMP008',
      newDate: '2026-07-20',
    },
  },

  {
    id: 6,
    employeeCode: 'EMP006',
    employeeName: 'Võ Thanh Hà',
    createdAt: '2026-07-17',
    type: 'Overtime',
    status: 'Pending',
    reason: 'Hỗ trợ lễ tân.',
    overtime: {
      workDate: '2026-07-17',
      fromTime: '17:00',
      toTime: '20:00',
      hours: 3,
    },
  },

  {
    id: 7,
    employeeCode: 'EMP007',
    employeeName: 'Nguyễn Khánh Linh',
    createdAt: '2026-07-16',
    type: 'Leave',
    status: 'Approved',
    reason: 'Khám bệnh.',
    approvedBy: 'Quản lý',
    approvedAt: '2026-07-16 09:15',
    leave: {
      fromDate: '2026-07-22',
      toDate: '2026-07-22',
    },
  },

  {
    id: 8,
    employeeCode: 'EMP008',
    employeeName: 'Đặng Hải Long',
    createdAt: '2026-07-16',
    type: 'ShiftChange',
    status: 'Rejected',
    reason: 'Muốn đổi ca.',
    rejectReason: 'Không tìm được người thay.',
    shiftChange: {
      currentShift: 'Ca sáng',
      targetEmployee: 'EMP005',
    },
  },

  {
    id: 9,
    employeeCode: 'EMP009',
    employeeName: 'Lý Minh Quân',
    createdAt: '2026-07-15',
    type: 'Overtime',
    status: 'Approved',
    reason: 'Sự kiện khách sạn.',
    overtime: {
      workDate: '2026-07-15',
      fromTime: '19:00',
      toTime: '23:00',
      hours: 4,
    },
  },

  {
    id: 10,
    employeeCode: 'EMP010',
    employeeName: 'Bùi Thị Yến',
    createdAt: '2026-07-14',
    type: 'Leave',
    status: 'Pending',
    reason: 'Việc cá nhân.',
    leave: {
      fromDate: '2026-07-25',
      toDate: '2026-07-27',
    },
  },

  {
    id: 11,
    employeeCode: 'EMP011',
    employeeName: 'Nguyễn Gia Bảo',
    createdAt: '2026-07-14',
    type: 'ShiftChange',
    status: 'Approved',
    reason: 'Đổi ca trực.',
    shiftChange: {
      currentShift: 'Ca chiều',
      targetShift: 'Ca sáng',
      newDate: '2026-07-16',
    },
  },

  {
    id: 12,
    employeeCode: 'EMP012',
    employeeName: 'Trương Quốc Nam',
    createdAt: '2026-07-13',
    type: 'Overtime',
    status: 'Rejected',
    rejectReason: 'Không có nhu cầu tăng ca.',
    reason: 'Hoàn thành công việc tồn.',
    overtime: {
      workDate: '2026-07-13',
      fromTime: '18:00',
      toTime: '20:00',
      hours: 2,
    },
  },
];