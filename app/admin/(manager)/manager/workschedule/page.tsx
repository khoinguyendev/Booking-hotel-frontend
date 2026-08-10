"use client";

import { useMemo, useState } from "react";
import { addDays, addWeeks, format, startOfWeek, subWeeks } from "date-fns";

import WorkScheduleFilter from "@/components/work-schedule/manager/WorkScheduleFilter";
import WorkScheduleStats from "@/components/work-schedule/manager/WorkScheduleStats";
import WorkScheduleTable from "@/components/work-schedule/manager/table/WorkScheduleTable";
import { usePositions } from "@/hooks/usePositions";
import DataTablePagination from "@/components/pagination/DataTablePagination";
import { useWeeklySchedule } from "@/hooks/useWeeklySchedule";
import { useStaffStats } from "@/hooks/useStaffStats";
import { useShifts } from "@/hooks/useShift";
import { TooltipProvider } from "@/components/ui/tooltip";
import ShiftDistributionChart from "@/components/work-schedule/manager/ShiftDistributionChart";


export default function WorkSchedulePage() {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState(0);
  const [shift, setShift] = useState(0);
  const { positions, loading: positionLoading } = usePositions();
  const { shifts: shifts, loading: shiftLoading } = useShifts();
  const [status, setStatus] = useState("all");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState("");
  const { staffStats } = useStaffStats();

  const { employees, loading, pagination, refetch } = useWeeklySchedule({
    currentDate,
    positionId: position || undefined,
    shiftId: shift || undefined,
    keyword: search,
  });

  // lấy tuần hiện tại (T2 - CN)
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, {
      weekStartsOn: 1,
    });

    return Array.from(
      {
        length: 7,
      },
      (_, i) => addDays(start, i),
    );
  }, [currentDate]);
  const handlePrevWeek = () => {
    setCurrentDate((prev) => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => addWeeks(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  console.log({employees})
  return (
     <TooltipProvider>
<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý lịch làm việc</h1>

          <p className="text-muted-foreground">Quản lý và phân ca nhân viên</p>
        </div>
      </div>

      <WorkScheduleStats
        stats={{
          working: staffStats?.workingStaff??0,
          dayOff: staffStats?.dayOffStaff??0,
          noShift: staffStats?.noShiftStaff??0,
          totalShift: staffStats?.totalStaff??0,
        }}
      />
      <ShiftDistributionChart data={[
  { shiftName: "Ca sáng", count: 12 },
  { shiftName: "Ca chiều", count: 9 },
  { shiftName: "Ca tối", count: 6 },
  { shiftName: "Ca đêm", count: 3 },
]}/>
      <WorkScheduleFilter
        search={search}
        onSearchChange={setSearch}
        onSearchInputChange={setSearchInput}
        searchInput={searchInput}
        position={position}
        onPositionChange={setPosition}
        shift={shift}
        onShiftChange={setShift}
        status={status}
        onStatusChange={setStatus}
        positions={positions}
        shifts={shifts}
        statuses={[
          {
            value: "assigned",
            label: "Đã phân ca",
          },
          {
            value: "unassigned",
            label: "Chưa phân ca",
          },
        ]}
      />

      {/* <QuickScheduleFilter value={status} onChange={setStatus} /> */}

      {/* <WorkScheduleCalendar
        employees={filteredEmployees}
        onCellClick={(employee, schedule) => {
          setSelectedEmployee(employee);

          setSelectedSchedule(schedule);

          setDrawerOpen(true);
        }}
      /> */}

      <WorkScheduleTable
        employees={employees}
        days={weekDays}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        shifts={shifts}
        onToday={handleToday}
        onRefresh={refetch}
        // onCellClick={handleCellClick}
      />

      {/* <ScheduleDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        schedule={
          selectedEmployee && selectedSchedule
            ? {
                employeeName: selectedEmployee.fullName,

                avatar: selectedEmployee.avatar,

                employeeCode: selectedEmployee.employeeCode,

                position: selectedEmployee.position,

                workDate: new Date(selectedSchedule.workDate),

                shiftName: selectedSchedule.shiftName ?? "",

                startTime: selectedSchedule.startTime ?? "",

                endTime: selectedSchedule.endTime ?? "",

                isDayOff: selectedSchedule.isDayOff,

                attendance: selectedSchedule.attendance,

                note: selectedSchedule.note,
              }
            : undefined
        }
        onEdit={() => {
          setDrawerOpen(false);

          setAssignOpen(true);
        }}
        onAttendance={() => {
          alert("Mở module chấm công");
        }}
        onDayOff={() => {
          alert("Đánh dấu nghỉ");
        }}
      /> */}
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

      
    </div>
     </TooltipProvider>
    
  );
}
