"use client";

import { useMemo, useState } from "react";



import { SalaryDetail } from "@/types/salary";
import { mockSalaries } from "@/data/mock1";
import SalarySummary from "@/components/salary/SalarySummary";
import SalaryStatistics from "@/components/salary/SalaryStatistics";
import SalaryDetailList from "@/components/salary/SalaryDetailList";
import SalaryHistoryTable from "@/components/salary/SalaryHistoryTable";
import SalaryDetailDialog from "@/components/salary/SalaryDetailDialog";

export default function SalaryPage() {
  const [selectedMonth, setSelectedMonth] = useState(7);

  const [selectedYear, setSelectedYear] = useState(2026);

  const [selectedDetail, setSelectedDetail] =
    useState<SalaryDetail | null>(null);

  const [open, setOpen] = useState(false);

  const salary = useMemo(() => {
    return (
      mockSalaries.find(
        (x) =>
          x.month === selectedMonth &&
          x.year === selectedYear
      ) ?? mockSalaries[0]
    );
  }, [selectedMonth, selectedYear]);

  return (
    <div className="min-h-screen bg-[#F2F2F7] p-6 dark:bg-black">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">
              Bảng lương
            </h1>

            <p className="mt-1 text-sm text-[#8E8E93]">
              Theo dõi lương, phụ cấp, thưởng và khấu trừ
            </p>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(Number(e.target.value))
              }
              className="h-11 rounded-2xl border px-4"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(Number(e.target.value))
              }
              className="h-11 rounded-2xl border px-4"
            >
              <option value={2026}>2026</option>
              <option value={2025}>2025</option>
            </select>
          </div>
        </div>

        {/* Summary */}

        <SalarySummary salary={salary} />

        {/* Statistics */}

        <SalaryStatistics salary={salary} />

        {/* Details + History */}

        <div className="grid gap-6 xl:grid-cols-4">
          <div className="xl:col-span-2">
            <SalaryDetailList
              details={salary.salaryDetails}
              onSelect={(item) => {
                setSelectedDetail(item);
                setOpen(true);
              }}
            />
          </div>

          <div className="xl:col-span-2">
            <SalaryHistoryTable
              salaries={mockSalaries}
            />
          </div>
        </div>

        <SalaryDetailDialog
          open={open}
          onOpenChange={setOpen}
          detail={selectedDetail}
        />
      </div>
    </div>
  );
}