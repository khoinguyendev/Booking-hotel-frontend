// services/payroll.service.ts

export interface PayrollRecord {
  id: string;              // Liên kết mã nhân sự (NV-001, NV-002...)
  name: string;
  department: string;
  baseSalary: number;      // Lương cơ bản ban đầu
  allowance: number;       // Phụ cấp (Ca gãy, ăn ca, chuyên cần)
  bonus: number;           // Thưởng hiệu suất (KPI/Đánh giá)
  deductions: number;      // Các khoản khấu trừ (Bảo hiểm, phạt đi muộn)
  tax: number;             // Thuế thu nhập cá nhân (PIT)
  netSalary: number;       // Lương thực lĩnh thực tế (Net)
  paymentStatus: 'Paid' | 'Processing' | 'OnHold';
}

export const getMockPayrolls = (): PayrollRecord[] => [
  {
    id: 'NV-001',
    name: 'Nguyễn Kiều Trang',
    department: 'Lễ tân (Front Office)',
    baseSalary: 8500000.00,
    allowance: 1200000.00,
    bonus: 1500000.00,
    deductions: 892500.00, // Bảo hiểm 10.5% lương cơ bản
    tax: 115000.00,
    netSalary: 10192500.00, // Thực lĩnh chính xác 100%
    paymentStatus: 'Paid'
  },
  {
    id: 'NV-002',
    name: 'Phạm Minh Quân',
    department: 'Buồng phòng (Housekeeping)',
    baseSalary: 6500000.00,
    allowance: 950000.00,
    bonus: 800000.00,
    deductions: 682500.00,
    tax: 0.00, // Chưa đạt ngưỡng đóng thuế
    netSalary: 7567500.00,
    paymentStatus: 'Paid'
  },
  {
    id: 'NV-003',
    name: 'Lê Hoàng Long',
    department: 'Ẩm thực (F&B)',
    baseSalary: 7000000.00,
    allowance: 1100000.00,
    bonus: 0.00, // KPI thấp, không có thưởng
    deductions: 935000.00, // Khấu trừ bảo hiểm + phạt chuyên cần do vắng mặt
    tax: 0.00,
    netSalary: 7165000.00,
    paymentStatus: 'OnHold' // Đang tạm giữ để xác minh số ngày công thực tế
  },
  {
    id: 'NV-004',
    name: 'Trần Thế Vinh',
    department: 'Kỹ thuật (Engineering)',
    baseSalary: 10500000.00,
    allowance: 1500000.00,
    bonus: 2500000.00,
    deductions: 1102500.00,
    tax: 215000.00,
    netSalary: 13182500.00,
    paymentStatus: 'Processing' // Đang chuyển khoản ngân hàng
  }
];