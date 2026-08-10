'use client';

import { useMemo, useState } from 'react';





import { SalaryItem } from '@/types/salary';
import QuickSalaryFilter, { SalaryQuickFilter } from '@/components/salary/manager/QuickSalaryFilter';
import { salaryMock } from '@/data/salary.mock';
import SalaryFilter from '@/components/salary/manager/SalaryFilter';
import SalaryStats from '@/components/salary/manager/SalaryStats';
import SalaryTable from '@/components/salary/manager/SalaryTable';
import SalaryDrawer from '@/components/salary/manager/SalaryDrawer';
import EditSalaryDialog from '@/components/salary/manager/EditSalaryDialog';
import CalculateSalaryDialog from '@/components/salary/manager/CalculateSalaryDialog';
import PaySalaryDialog from '@/components/salary/manager/PaySalaryDialog';
import SalaryExpenseChart from '@/components/salary/manager/SalaryExpenseChart';
import SalaryComparisonCard from '@/components/salary/manager/SalaryComparisonCard';

export default function SalaryPage() {
  const [search, setSearch] = useState('');

  const [month, setMonth] = useState('8');

  const [year, setYear] = useState('2026');

  const [position, setPosition] =
    useState('all');

  const [status, setStatus] =
    useState('all');

  const [quickFilter, setQuickFilter] =
    useState<SalaryQuickFilter>('all');

  const [selectedSalary, setSelectedSalary] =
    useState<SalaryItem>();

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [calculateOpen, setCalculateOpen] =
    useState(false);

  const [payOpen, setPayOpen] =
    useState(false);

  const positions = [
    {
      value: 'receptionist',
      label: 'Lễ tân',
    },
    {
      value: 'housekeeping',
      label: 'Buồng phòng',
    },
    {
      value: 'security',
      label: 'Bảo vệ',
    },
    {
      value: 'accountant',
      label: 'Kế toán',
    },
    {
      value: 'service',
      label: 'Phục vụ',
    },
  ];

  const salaries = useMemo(() => {
    return salaryMock.filter((item) => {
      const matchSearch =
        item.employeeName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.employeeCode
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchPosition =
        position === 'all' ||
        item.position ===
          positions.find(
            (x) => x.value === position
          )?.label;

      const matchStatus =
        status === 'all' ||
        item.status === status;

      const matchQuick =
        quickFilter === 'all'
          ? true
          : item.status === quickFilter;

      return (
        matchSearch &&
        matchPosition &&
        matchStatus &&
        matchQuick
      );
    });
  }, [
    search,
    position,
    status,
    quickFilter,
  ]);

  return (
    <div className="space-y-6 p-6">

      <div>

        <h1 className="text-3xl font-bold">
          Quản lý lương
        </h1>

        <p className="text-muted-foreground">
          Quản lý bảng lương nhân viên
        </p>

      </div>

      <SalaryStats stats={{
        calculated:1,
        paid:1,
        totalSalary:1,
        unCalculated:1
      }} />
{/* <div className="grid gap-6 lg:grid-cols-3">

    <div className="lg:col-span-2">
        <SalaryExpenseChart />
    </div>

    <SalaryComparisonCard
        current={586000000}
        previous={548000000}
    />

</div> */}
      <SalaryFilter
        search={search}
        onSearchChange={setSearch}
        month={month}
        onMonthChange={setMonth}
        year={year}
        onYearChange={setYear}
        position={position}
        onPositionChange={setPosition}
        status={status}
        onStatusChange={setStatus}
        positions={positions}
        onRefresh={() => {
          setSearch('');
          setPosition('all');
          setStatus('all');
          setQuickFilter('all');
        }}
      />

      <QuickSalaryFilter
        value={quickFilter}
        onChange={setQuickFilter}
      />

      <div className="flex justify-end">

        <button
          onClick={() =>
            setCalculateOpen(true)
          }
          className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Tính lương tháng
        </button>

      </div>

      <SalaryTable
        salaries={salaries}
        onView={(salary) => {
          setSelectedSalary(salary);
          setDrawerOpen(true);
        }}
        onEdit={(salary) => {
          setSelectedSalary(salary);
          setEditOpen(true);
        }}
        onPay={(salary) => {
          setSelectedSalary(salary);
          setPayOpen(true);
        }}
      />

      {/* Drawer */}

      <SalaryDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        salary={selectedSalary}
        onEdit={() => {
          setDrawerOpen(false);
          setEditOpen(true);
        }}
        onPay={() => {
          setDrawerOpen(false);
          setPayOpen(true);
        }}
      />

      {/* Edit */}

      <EditSalaryDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        salary={selectedSalary}
        onSave={(data) => {
          console.log(data);
        }}
      />

      {/* Calculate */}

      <CalculateSalaryDialog
        open={calculateOpen}
        onOpenChange={setCalculateOpen}
        month={Number(month)}
        year={Number(year)}
        totalEmployees={
          salaryMock.length
        }
        onCalculate={() => {
          console.log('calculate');
        }}
      />

      {/* Pay */}

      <PaySalaryDialog
        open={payOpen}
        onOpenChange={setPayOpen}
        employeeCount={1}
        totalAmount={
          selectedSalary?.totalSalary ?? 0
        }
        onSubmit={(data) => {
          console.log(data);
        }}
      />

    </div>
  );
}