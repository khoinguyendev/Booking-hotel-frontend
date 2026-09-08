"use client";

import { useState } from "react";

import QuickSalaryFilter from "@/components/salary/manager/QuickSalaryFilter";
import { salaryMock } from "@/data/salary.mock";
import SalaryFilter from "@/components/salary/manager/SalaryFilter";
import SalaryStats from "@/components/salary/manager/SalaryStats";
import SalaryTable from "@/components/salary/manager/SalaryTable";
import SalaryDrawer from "@/components/salary/manager/SalaryDrawer";
import EditSalaryDialog from "@/components/salary/manager/EditSalaryDialog";
import CalculateSalaryDialog from "@/components/salary/manager/CalculateSalaryDialog";
import PaySalaryDialog from "@/components/salary/manager/PaySalaryDialog";
import SalaryExpenseChart from "@/components/salary/manager/SalaryExpenseChart";
import SalaryComparisonCard from "@/components/salary/manager/SalaryComparisonCard";
import { useManagerSalaries } from "@/hooks/useSalary";
import { usePositions } from "@/hooks/usePositions";
import { SalaryResponseItem } from "@/types/salary";
import DataTablePagination from "@/components/pagination/DataTablePagination";
import Loading from "@/components/common/Spinner";
import { Calculator, FileSpreadsheet, Plus, Users } from "lucide-react";

export default function ManagerSalary() {
  const now = new Date();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { positions } = usePositions();
  const [status, setStatus] = useState(0);
  const [position, setPosition] = useState(0);
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [selectedSalary, setSelectedSalary] =
    useState<SalaryResponseItem | null>(null);
  const {
    salaries,
    loading,
    creating,
    createMonthlySalary,
    pagination,
    refetch,
  } = useManagerSalaries({
    month: month,
    year: year,
    status: status > 0 ? status : undefined,
    // positionId: selectedPositionId,
    // keyword,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [calculateOpen, setCalculateOpen] = useState(false);

  const [payOpen, setPayOpen] = useState(false);
  const handleCalculateAll = () => {};
  const handleExportExcel = () => {};
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Quản lý lương</h1>

        <p className="text-muted-foreground">Quản lý bảng lương nhân viên</p>
      </div>

      <SalaryStats
        stats={{
          calculated: 1,
          paid: 1,
          totalSalary: 1,
          unCalculated: 1,
        }}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalaryExpenseChart />
        </div>

        <SalaryComparisonCard current={586000000} previous={548000000} />
      </div>
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
          setSearch("");
          setPosition(0);
          setStatus(0);
        }}
      />

      <QuickSalaryFilter value={status} onChange={setStatus} />

      <div className="flex flex-wrap items-center justify-end gap-3">
        {/* Tạo bảng lương */}
        <button
          disabled={creating}
          onClick={createMonthlySalary}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Tạo bảng lương
        </button>

        {/* Tính lương tháng */}
        <button
          onClick={() => setCalculateOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-violet-700 hover:shadow-md"
        >
          <Calculator className="h-4 w-4" />
          Tính lương tháng
        </button>

        {/* Tính lương tất cả */}
        {/* <button
          onClick={handleCalculateAll}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md"
        >
          <Users className="h-4 w-4" />
          Tính lương tất cả
        </button> */}

        {/* Xuất Excel */}
        <button
          onClick={handleExportExcel}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-600 hover:shadow-md"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Xuất Excel
        </button>
      </div>

      <SalaryTable
        salaries={salaries}
        onView={(salary) => {
          console.log("a");
          setSelectedSalary(salary);
          setDrawerOpen(true);
        }}
        onEdit={(salary) => {
          console.log("b");
          setSelectedSalary(salary);
          setEditOpen(true);
        }}
        onCaculate={(salary) => {
          setSelectedSalary(salary);
          console.log(salary);
        }}
        onPay={(salary) => {
          setSelectedSalary(salary);
          setPayOpen(true);
        }}
      />
      <DataTablePagination
        page={pagination.page}
        pageSize={pagination.pageSize}
        totalItems={pagination.totalItems}
        totalPages={pagination.totalPages}
        onPageChange={pagination.setPage}
        onPageSizeChange={(size) => {
          pagination.setPageSize(size);
          pagination.setPage(1);
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
        totalEmployees={salaryMock.length}
        onCalculate={() => {
          console.log("calculate");
        }}
      />

      {/* Pay */}

      <PaySalaryDialog
        open={payOpen}
        onOpenChange={setPayOpen}
        employeeCount={1}
        totalAmount={selectedSalary?.netSalary ?? 0}
        onSubmit={(data) => {
          console.log(data);
        }}
      />
      {creating || (loading && <Loading fullScreen={true} />)}
    </div>
  );
}
