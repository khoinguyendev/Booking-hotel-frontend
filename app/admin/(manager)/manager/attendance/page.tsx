"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import AttendanceStats from "@/components/attendance/manager/AttendanceStats";
import AttendanceFilter from "@/components/attendance/manager/AttendanceFilter";
import QuickAttendanceFilter, {
  AttendanceQuickFilter,
} from "@/components/attendance/manager/QuickAttendanceFilter";
import AttendanceCalendar from "@/components/attendance/manager/calendar/AttendanceCalendar";
import AttendanceEmpty from "@/components/attendance/manager/table/AttendanceEmpty";
import AttendanceTable from "@/components/attendance/manager/table/AttendanceTable";
import { usePositions } from "@/hooks/usePositions";
import { useShifts } from "@/hooks/useShift";
import { useAttendance } from "@/hooks/useAttendance";
import DataTablePagination from "@/components/pagination/DataTablePagination";
import AttendanceOverview from "@/components/attendance/manager/calendar/AttendanceOverview";
import SummaryDialog, {
  SummaryValues,
} from "@/components/attendance/manager/dialog/SummaryDialog";
import { attendanceService } from "@/services/attendance.service";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import ShiftDistributionChart from "@/components/work-schedule/manager/ShiftDistributionChart";

export default function AttendancePage() {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const handleSummary = async (values: SummaryValues) => {
    await attendanceService.summary(values);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState<AttendanceQuickFilter>("all");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [positionId, setPositionId] = useState(0);
  const [shiftId, setShiftId] = useState(0);
  const { positions } = usePositions();
  const { shifts } = useShifts();
  const {
    attendanceRecords,
    attendanceStats,
    calendarAttendance,
    loading,
    pagination,
    refetch,
  } = useAttendance({
    date,
    positionId,
    shiftId,
    search,
  });
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  console.log(calendarAttendance, "calendarAttendance");
  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          Attendance Management
        </p>

        <h1 className="mt-1 text-3xl font-bold">Quản lý chấm công</h1>

        <p className="mt-2 text-muted-foreground">
          Theo dõi tình hình chấm công của nhân viên
        </p>
      </div>

      {/* Stats */}

      <AttendanceStats
        working={attendanceStats?.working || 0}
        present={attendanceStats?.present || 0}
        late={attendanceStats?.late || 0}
        dayOff={attendanceStats?.absent || 0}
        notCheckIn={attendanceStats?.notCheckIn || 0}
      />

      {/* Filter */}

      <AttendanceFilter
        search={search}
        onSearchChange={setSearch}
        onSearchInputChange={setSearchInput}
        searchInput={searchInput}
        date={date}
        onDateChange={setDate}
        position={positionId}
        onPositionChange={setPositionId}
        shift={shiftId}
        onShiftChange={setShiftId}
        positions={positions}
        shifts={shifts}
        onRefresh={() => {
          setSearch("");
          setPositionId(0);
          setShiftId(0);
          setDate(format(new Date(), "yyyy-MM-dd"));
        }}
      />
      <div className="flex gap-2 justify-end">
        <div className="flex gap-2">
          <Button
          onClick={()=>setSummaryOpen(true)}
            className="
    bg-blue-600
    text-white
    hover:bg-blue-700

    dark:bg-blue-500
    dark:hover:bg-blue-400
  "
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            Tổng kết ca
          </Button>
        </div>
      </div>
     <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Danh sách chấm công</h2>

          <p className="text-sm text-muted-foreground">
            {format(selectedDate, "dd/MM/yyyy")}
          </p>
        </div>

        <div className="rounded-xl bg-muted px-4 py-2 text-sm font-semibold">
          {attendanceRecords.length} nhân viên
        </div>
      </div>
      
      {/* Quick */}

      <QuickAttendanceFilter value={status} onChange={setStatus} />
      {/* Header table */}

 
      {/* Table */}

      <AttendanceTable records={attendanceRecords} />
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
      {/* Calendar */}

      {/* <AttendanceCalendar
        data={calendarAttendance}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
      /> */}
      <AttendanceOverview
        data={calendarAttendance}
        stats={attendanceStats}
        selectedDate={selectedDate}
        // onSelect={handleDateSelect}
      />
      <SummaryDialog
        open={summaryOpen}
        onOpenChange={setSummaryOpen}
        shifts={shifts}
        onSubmit={handleSummary}
      />
    </div>
  );
}
