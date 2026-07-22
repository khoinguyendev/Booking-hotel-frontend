export type SalaryDetailType =
  | "Basic"
  | "Allowance"
  | "Bonus"
  | "Deduction"
  | "Overtime";

export interface SalaryDetail {
  id: number;
  salaryId: number;

  type: SalaryDetailType;

  title: string;

  description?: string;

  amount: number;

  createdAt: string;
}

export interface Salary {
  id: number;

  hotelStaffId: number;

  month: number;

  year: number;

  // Thu nhập
  basicSalary: number;

  totalAllowance: number;

  totalBonus: number;

  overtimeSalary: number;

  // Khấu trừ
  totalDeduction: number;

  // Thực nhận
  netSalary: number;

  // Thống kê
  workingDays: number;

  absentDays: number;

  overtimeHours: number;

  // Thanh toán
  isPaid: boolean;

  paidAt?: string | null;

  createdAt?: string;

  salaryDetails: SalaryDetail[];
}

