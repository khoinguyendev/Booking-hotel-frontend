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

export type SalaryStatus =
  | 'pending'
  | 'calculated'
  | 'paid';

export type PaymentMethod =
  | 'cash'
  | 'bank';

export interface SalaryItem {
  id: number;

  employeeId: number;

  employeeCode: string;

  employeeName: string;

  avatar?: string;

  position: string;

  month: number;

  year: number;

  workingDays: number;

  overtimeHours: number;

  basicSalary: number;

  overtimeSalary: number;

  allowance: number;

  bonus: number;

  deduction: number;

  totalSalary: number;

  paymentDate?: string;

  paymentMethod?: PaymentMethod;

  note?: string;

  status: SalaryStatus;
}

export interface SalaryStats {
  calculated: number;

  unCalculated: number;

  paid: number;

  totalSalary: number;
}

export interface SalaryFilter {
  search: string;

  month: string;

  year: string;

  position: string;

  status: string;
}

export interface SalaryHistoryItem {
  id: number;

  month: number;

  year: number;

  totalSalary: number;

  paymentDate?: string;

  paymentMethod?: PaymentMethod;

  status: SalaryStatus;
}

export interface SalaryBreakdown {
  basicSalary: number;

  overtimeSalary: number;

  allowance: number;

  bonus: number;

  deduction: number;

  totalSalary: number;
}

export interface CalculateSalaryRequest {
  month: number;

  year: number;
}

export interface PaySalaryRequest {
  salaryIds: number[];

  paymentDate: string;

  paymentMethod: PaymentMethod;

  note?: string;
}

export interface UpdateSalaryRequest {
  allowance: number;

  bonus: number;

  deduction: number;

  note?: string;
}
