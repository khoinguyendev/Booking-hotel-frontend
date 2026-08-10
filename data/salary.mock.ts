import {
  SalaryItem,
  SalaryStats,
} from '@/types/salary';

export const salaryStats: SalaryStats = {
  calculated: 45,
  unCalculated: 8,
  paid: 37,
  totalSalary: 586_450_000,
};

export const salaryMock: SalaryItem[] = [
  {
    id: 1,
    employeeId: 1,
    employeeCode: 'NV001',
    employeeName: 'Nguyễn Văn An',
    avatar: 'https://i.pravatar.cc/150?img=1',
    position: 'Lễ tân',

    month: 8,
    year: 2026,

    workingDays: 26,
    overtimeHours: 12,

    basicSalary: 8000000,
    overtimeSalary: 900000,
    allowance: 700000,
    bonus: 1200000,
    deduction: 300000,

    totalSalary: 10500000,

    paymentDate: '2026-08-05',
    paymentMethod: 'bank',

    status: 'paid',
    note: '',
  },

  {
    id: 2,
    employeeId: 2,
    employeeCode: 'NV002',
    employeeName: 'Trần Thị Bình',
    avatar: 'https://i.pravatar.cc/150?img=2',
    position: 'Buồng phòng',

    month: 8,
    year: 2026,

    workingDays: 24,
    overtimeHours: 6,

    basicSalary: 7000000,
    overtimeSalary: 450000,
    allowance: 400000,
    bonus: 500000,
    deduction: 200000,

    totalSalary: 8150000,

    paymentDate: '',
    paymentMethod: undefined,

    status: 'calculated',
    note: '',
  },

  {
    id: 3,
    employeeId: 3,
    employeeCode: 'NV003',
    employeeName: 'Lê Minh Khang',
    avatar: 'https://i.pravatar.cc/150?img=3',
    position: 'Bảo vệ',

    month: 8,
    year: 2026,

    workingDays: 27,
    overtimeHours: 15,

    basicSalary: 7500000,
    overtimeSalary: 1100000,
    allowance: 500000,
    bonus: 800000,
    deduction: 0,

    totalSalary: 9900000,

    paymentDate: '',
    paymentMethod: undefined,

    status: 'pending',
    note: '',
  },
];

// tạo thêm dữ liệu cho bảng
for (let i = 4; i <= 25; i++) {
  salaryMock.push({
    id: i,
    employeeId: i,
    employeeCode: `NV${String(i).padStart(3, '0')}`,
    employeeName: `Nhân viên ${i}`,
    avatar: `https://i.pravatar.cc/150?img=${i}`,
    position: [
      'Lễ tân',
      'Buồng phòng',
      'Phục vụ',
      'Bảo vệ',
      'Kế toán',
    ][i % 5],

    month: 8,
    year: 2026,

    workingDays: 22 + (i % 6),
    overtimeHours: i % 15,

    basicSalary: 7000000 + i * 100000,
    overtimeSalary: (i % 15) * 100000,
    allowance: (i % 4) * 200000,
    bonus: (i % 5) * 300000,
    deduction: (i % 3) * 100000,

    totalSalary:
      7000000 +
      i * 100000 +
      (i % 15) * 100000 +
      (i % 4) * 200000 +
      (i % 5) * 300000 -
      (i % 3) * 100000,

    paymentDate:
      i % 3 === 0
        ? '2026-08-05'
        : undefined,

    paymentMethod:
      i % 3 === 0 ? 'bank' : undefined,

    status:
      i % 3 === 0
        ? 'paid'
        : i % 3 === 1
        ? 'calculated'
        : 'pending',

    note: '',
  });
}