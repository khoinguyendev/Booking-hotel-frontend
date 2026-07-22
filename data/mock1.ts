import { Salary } from "@/types/salary";

export const mockSalaries: Salary[] = [
  {
    id: 1,
    hotelStaffId: 28,
    month: 7,
    year: 2026,

    basicSalary: 8500000,
    totalAllowance: 1200000,
    totalBonus: 800000,
    totalDeduction: 450000,
    overtimeSalary: 1200000,

    netSalary: 11250000,

    workingDays: 26,
    absentDays: 0,
    overtimeHours: 18,

    isPaid: true,
    paidAt: "2026-07-31",

    salaryDetails: [
      {
        id: 1,
        salaryId: 1,
        type: "Basic",
        title: "Lương cơ bản",
        description: "Lương theo hợp đồng lao động",
        amount: 8500000,
        createdAt: "2026-07-31",
      },

      {
        id: 2,
        salaryId: 1,
        type: "Allowance",
        title: "Phụ cấp ăn trưa",
        description: "26 ngày làm việc",
        amount: 700000,
        createdAt: "2026-07-31",
      },

      {
        id: 3,
        salaryId: 1,
        type: "Allowance",
        title: "Phụ cấp trách nhiệm",
        description: "Nhân viên lễ tân",
        amount: 500000,
        createdAt: "2026-07-31",
      },

      {
        id: 4,
        salaryId: 1,
        type: "Bonus",
        title: "Thưởng KPI",
        description: "Hoàn thành KPI tháng",
        amount: 800000,
        createdAt: "2026-07-31",
      },

      {
        id: 5,
        salaryId: 1,
        type: "Overtime",
        title: "Lương tăng ca",
        description: "18 giờ OT",
        amount: 1200000,
        createdAt: "2026-07-31",
      },

      {
        id: 6,
        salaryId: 1,
        type: "Deduction",
        title: "BHXH",
        description: "Khấu trừ bảo hiểm",
        amount: 350000,
        createdAt: "2026-07-31",
      },

      {
        id: 7,
        salaryId: 1,
        type: "Deduction",
        title: "Đi trễ",
        description: "2 lần",
        amount: 100000,
        createdAt: "2026-07-31",
      },
    ],
  },

  {
    id: 2,
    hotelStaffId: 28,
    month: 6,
    year: 2026,

    basicSalary: 8500000,
    totalAllowance: 1200000,
    totalBonus: 500000,
    totalDeduction: 300000,
    overtimeSalary: 900000,

    netSalary: 10800000,

    workingDays: 25,
    absentDays: 1,
    overtimeHours: 14,

    isPaid: true,
    paidAt: "2026-06-30",

    salaryDetails: [],
  },

  {
    id: 3,
    hotelStaffId: 28,
    month: 5,
    year: 2026,

    basicSalary: 8500000,
    totalAllowance: 1000000,
    totalBonus: 1200000,
    totalDeduction: 500000,
    overtimeSalary: 1500000,

    netSalary: 11700000,

    workingDays: 27,
    absentDays: 0,
    overtimeHours: 22,

    isPaid: true,
    paidAt: "2026-05-31",

    salaryDetails: [],
  },

  {
    id: 4,
    hotelStaffId: 28,
    month: 4,
    year: 2026,

    basicSalary: 8500000,
    totalAllowance: 1100000,
    totalBonus: 650000,
    totalDeduction: 400000,
    overtimeSalary: 950000,

    netSalary: 10800000,

    workingDays: 26,
    absentDays: 0,
    overtimeHours: 15,

    isPaid: true,
    paidAt: "2026-04-30",

    salaryDetails: [],
  },

  {
    id: 5,
    hotelStaffId: 28,
    month: 3,
    year: 2026,

    basicSalary: 8500000,
    totalAllowance: 1000000,
    totalBonus: 500000,
    totalDeduction: 300000,
    overtimeSalary: 700000,

    netSalary: 10400000,

    workingDays: 24,
    absentDays: 2,
    overtimeHours: 10,

    isPaid: true,
    paidAt: "2026-03-31",

    salaryDetails: [],
  },

  {
    id: 6,
    hotelStaffId: 28,
    month: 2,
    year: 2026,

    basicSalary: 8500000,
    totalAllowance: 900000,
    totalBonus: 400000,
    totalDeduction: 250000,
    overtimeSalary: 600000,

    netSalary: 10150000,

    workingDays: 23,
    absentDays: 1,
    overtimeHours: 8,

    isPaid: true,
    paidAt: "2026-02-28",

    salaryDetails: [],
  },

  {
    id: 7,
    hotelStaffId: 28,
    month: 1,
    year: 2026,

    basicSalary: 8500000,
    totalAllowance: 1000000,
    totalBonus: 1000000,
    totalDeduction: 350000,
    overtimeSalary: 1300000,

    netSalary: 11450000,

    workingDays: 27,
    absentDays: 0,
    overtimeHours: 20,

    isPaid: true,
    paidAt: "2026-01-31",

    salaryDetails: [],
  },
];