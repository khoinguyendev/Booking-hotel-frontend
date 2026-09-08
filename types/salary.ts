export interface SalaryResponseItem {
  id: number;

  hotelStaffId: number;

  employeeCode: string;

  fullName: string;

  avatar: string | null;

  position: string;

  month: number;

  year: number;

  shiftSalary: number;

  totalAllowance: number;

  workingHours: number;

  totalBonus: number;

  totalDeduction: number;

  overtimeSalary: number;

  netSalary: number;

  workingDays: number;

  absentDays: number;

  overtimeHours: number;

  status: SalaryStatus;

  paidAt: string | null;

  createdAt: string;
}

export enum SalaryStatus {
  Draft = 1, // Đang tính
  Calculated = 2, // Đã tính
  Approved = 3, // Đã duyệt
  Paid = 4, // Đã thanh toán
  Cancelled = 5, // Hủy
}


export  interface CreateMonthlySalaryResponse{
  month:number;

 year :number;

 createdCount :number;
}