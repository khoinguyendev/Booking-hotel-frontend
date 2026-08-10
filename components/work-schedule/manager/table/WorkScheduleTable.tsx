"use client";

import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { EmployeeSchedule, ScheduleItem } from "@/types/workSchedule";
import ScheduleCell from "./ScheduleCell";
import ScheduleLegend from "../calendar/ScheduleLegend";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Layers3,
  Copy,
  Download,
  CalendarPlus,
  Import,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import AssignShiftDialog, {
  AssignShiftValues,
} from "../dialog/AssignShiftDialog";
import { useRef, useState } from "react";
import { Shift } from "@/types/shift";
import { workScheduleService } from "@/services/workSchedule.service";
import toast from "react-hot-toast";
import { useRowSelection } from "@/hooks/useRowSelection";
import TableBulkActions from "@/components/common/table/TableBulkActions";
import TableCheckbox from "@/components/common/table/TableCheckbox";
import BatchAssignDialog, {
  BatchShiftValues,
} from "../dialog/BatchAssignDialog";
import CopyScheduleDialog, {
  CopyScheduleValues,
} from "../dialog/CopyScheduleDialog";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import ImportStaffDialog from "@/components/staff/import/ImportStaffDialog";
import ImportErrorDialog from "@/components/staff/import/ImportErrorDialog";
import { useImportFile } from "@/hooks/useImportStaff";
import ExportExcelDialog, {
  ExportExcelValues,
} from "../dialog/ExportExceDialog";
import OvertimeDialog, { OvertimeFormValues } from "../dialog/OvertimeDialog";
import { overtimeService } from "@/services/overtimeService.service";
import { useOvertimePolicies } from "@/hooks/useOvertimePolicies";
interface Props {
  employees: EmployeeSchedule[];
  days: Date[];
  shifts: Shift[];
  onCellClick?: (employee: EmployeeSchedule, schedule: ScheduleItem) => void;
  onRefresh: () => Promise<void>;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  onToday?: () => void;
}

export default function WorkScheduleTable({
  employees,
  days,
  onPrevWeek,
  onNextWeek,
  onToday,
  shifts,
  onRefresh,
  onCellClick,
}: Props) {
  const [assignOpen, setAssignOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const [overtimeOpen, setOvertimeOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [deleteType, setDeleteType] = useState<"ca" | "ot">("ca");
  const importState = useImportFile({
    importFn: workScheduleService.importWorkSchedule,
    onSuccess: () => onRefresh(),
  });
  const { policies } = useOvertimePolicies();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeSchedule | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(
    null,
  );
  const {
    selectedIds,
    selectedCount,
    allSelected,
    toggle,
    toggleAll,
    clear,
    isSelected,
  } = useRowSelection(employees.map((x) => x.id));
  const openSchedule = (
    employee: EmployeeSchedule,
    schedule?: ScheduleItem,
  ) => {
    setSelectedEmployee(employee);
    setSelectedSchedule(schedule ?? null);
    setMode(schedule?.shiftId ? "edit" : "create");
  };

  const handleAssignShift = async (values: AssignShiftValues) => {
    await workScheduleService.createWorkSchedule({
      hotelStaffId: selectedEmployee!.id,
      workDate: selectedSchedule!.workDate,
      shiftId: Number(values.shiftId),
      isDayOff: values.isDayOff,
      // note: values.note,
    });
    await onRefresh();
    toast.success("Phân ca thành công");
  };
  const handleEditShift = async (values: AssignShiftValues) => {
    if (!selectedSchedule) return;
    await workScheduleService.updateSchedule(selectedSchedule.id, {
      workDate: selectedSchedule!.workDate,
      shiftId: Number(values.shiftId),
    });
    await onRefresh();
    toast.success("chỉnh sửa thành công");
  };
  const hanldeBatchShift = async (values: BatchShiftValues) => {
    await workScheduleService.createManySchedule({
      hotelStaffIds: [...selectedIds],
      fromDate: values.fromDate,
      toDate: values.toDate,
      shiftId: Number(values.shiftId),
      isDayOff: false,
    });
    await onRefresh();
    toast.success("Phân ca thành công");
  };
  const handleExportExcel = async (values: ExportExcelValues) => {
    const response = await workScheduleService.exportExcel({
      toDate: values.sourceTo,
      fromDate: values.sourceFrom,
    });

    const blob = new Blob([response.data], {
      type: response.headers["content-type"]?.toString(),
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    // Lấy tên file từ header nếu có
    const disposition = response.headers["content-disposition"];
    let fileName = "work-schedule.xlsx";

    if (disposition) {
      const match = disposition.match(/filename="?([^"]+)"?/);
      if (match?.[1]) {
        fileName = match[1];
      }
    }

    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
    toast.success("Đa xuất file");
  };
  const handleDelete = async () => {
    if (!selectedSchedule) return;
    try {
      setLoading(true);
      await workScheduleService.deleteSchedule(selectedSchedule.id);

      await onRefresh();
      toast.success("Xóa thành công");
      setDeleteOpen(false);
    } catch {
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteOvertime = async () => {
    if (!selectedSchedule?.overtime) return;
    try {
      setLoading(true);
      await overtimeService.delete(selectedSchedule.overtime.id);

      await onRefresh();
      toast.success("Xóa thành công");
      setDeleteOpen(false);
    } catch (e: any) {
      setLoading(false);
      console.log(e.response);
    } finally {
      setLoading(false);
    }
  };
  const hanldeCopyShift = async (values: CopyScheduleValues) => {
    await workScheduleService.copySchedule({
      mode: values.mode,
      sourceFrom: values.sourceFrom,
      sourceTo: values.sourceTo,
      targetFrom: values.targetFrom,
    });
    await onRefresh();
    toast.success("Phân ca thành công");
  };
  const hanldeOvertimeSubmit = async (values: OvertimeFormValues) => {
    if (mode == "create") {
      if (!selectedSchedule) return;
      await overtimeService.create({
        endTime: values.endTime,
        policyId: values.policyId,
        startTime: values.startTime,
        workScheduleId: selectedSchedule.id,
      });
    } else {
      if (!selectedSchedule?.overtime) return;
      await overtimeService.update(selectedSchedule.overtime?.id, {
        endTime: values.endTime,
        policyId: values.policyId,
        startTime: values.startTime,
      });
    }

    await onRefresh();
    toast.success("Thêm OT thành công");
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 ">
        <div>
          <h2 className="text-xl font-bold">Lịch làm việc</h2>

          <p className="text-smt ext-muted-foreground">
            Tuần từ{" "}
            <span className="font-medium text-foreground">
              {format(days[0], "dd/MM/yyyy")}
            </span>
            {" - "}
            <span className="font-medium text-foreground">
              {format(days[6], "dd/MM/yyyy")}
            </span>
          </p>
        </div>

        <div
          className="
    flex
    items-center
    gap-2
    "
        >
          <Button variant="outline" size="icon" onClick={onPrevWeek}>
            <ChevronLeft size={18} />
          </Button>

          <Button variant="outline" onClick={onToday} className="gap-2">
            <CalendarDays size={16} />
            Tuần này
          </Button>

          <Button variant="outline" size="icon" onClick={onNextWeek}>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>

      {/* Legend */}

      <ScheduleLegend />
      <div className="flex gap-2 justify-end">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (selectedCount == 0) {
                toast.error("Chọn tối thiểu 1 nhân viên");
                return;
              }
              setBatchOpen(true);
            }}
            className="
    bg-blue-600
    text-white
    hover:bg-blue-700

    dark:bg-blue-500
    dark:hover:bg-blue-400
  "
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            Phân ca hàng loạt
          </Button>

          <Button
            onClick={() => setCopyOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            <Copy className="mr-2 h-4 w-4" />
            Sao chép
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="
    bg-emerald-600
    text-white
    hover:bg-emerald-700

    dark:bg-emerald-500
    dark:hover:bg-emerald-400
  "
          >
            <Import className="mr-2 h-4 w-4" />
            Import Excel
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".xlsx,.xls"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                importState.startImport(file);
              }

              e.target.value = "";
            }}
          />
          <Button
            onClick={() => setExportOpen(true)}
            className="
    bg-emerald-600
    text-white
    hover:bg-emerald-700

    dark:bg-emerald-500
    dark:hover:bg-emerald-400
  "
          >
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
      </div>
      <TableBulkActions
        count={selectedCount}
        actions={[
          {
            label: "Phân ca hàng loạt",
            icon: <Layers3 className="mr-2 h-4 w-4" />,
            onClick: () => console.log([...selectedIds]),
          },
        ]}
      />
      <div
        className="
      overflow-x-auto
      rounded-2xl
      border
      bg-white
      dark:bg-[#1C1C1E]
      "
      >
        <table
          className="
        min-w-full
        border-collapse
        "
        >
          <thead>
            <tr
              className="
            border-b
            dark:border-[#2C2C2E]
            "
            >
              <th className="w-14 p-4">
                <TableCheckbox
                  checked={allSelected}
                  onCheckedChange={toggleAll}
                />
              </th>
              <th
                className="
              sticky
              left-0
              z-20

              min-w-[200px]

              bg-white

              p-4

              text-left

              dark:bg-[#1C1C1E]
              "
              >
                Nhân viên
              </th>

              {days.map((day) => (
                <th
                  key={day.toISOString()}
                  className="
                  min-w-[130px]
                  p-3
                  text-center
                  "
                >
                  <div
                    className="
                    text-xs
                    text-muted-foreground
                    "
                  >
                    {format(day, "EEEE", {
                      locale: vi,
                    })}
                  </div>

                  <div
                    className="
                    font-bold
                    "
                  >
                    {format(day, "dd/MM")}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="
              border-b
              hover:bg-muted/40

              dark:border-[#2C2C2E]
              "
              >
                <td className="p-4">
                  <TableCheckbox
                    checked={isSelected(employee.id)}
                    onCheckedChange={() => toggle(employee.id)}
                  />
                </td>
                <td
                  className="
                sticky
                left-0
                z-10

                bg-white

                p-4

                dark:bg-[#1C1C1E]
                "
                >
                  <div
                    className="
                  font-medium
                  "
                  >
                    {employee.fullName}
                  </div>

                  <div
                    className="
                  text-xs
                  text-muted-foreground
                  "
                  >
                    {employee.position}
                  </div>
                  <div
                    className="
                  text-xs
                  text-muted-foreground
                  "
                  >
                    {employee.employeeCode}
                  </div>
                </td>

                {days.map((day) => {
                  const schedule = employee.schedules?.find(
                    (x) => x.workDate === format(day, "yyyy-MM-dd"),
                  );

                  return (
                    <td
                      key={day.toISOString()}
                      className="
                      p-2
                      "
                    >
                      <ScheduleCell
                        schedule={schedule}
                        onDelete={() => {
                          setDeleteType("ca");
                          openSchedule(employee, schedule);
                          setDeleteOpen(true);
                        }}
                        onEdit={() => {
                          openSchedule(employee, schedule);
                          setAssignOpen(true);
                        }}
                        onDeleteOver={() => {
                          setDeleteType("ot");
                          openSchedule(employee, schedule);
                          setDeleteOpen(true);
                        }}
                        onEditOvertime={() => {
                          openSchedule(employee, schedule);

                          if (schedule?.overtime) {
                            setMode("edit");
                          } else {
                            setMode("create");
                          }
                          setOvertimeOpen(true);
                        }}
                        onClick={() => {
                          openSchedule(employee, schedule);
                          setAssignOpen(true);
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <AssignShiftDialog
          open={assignOpen}
          onOpenChange={setAssignOpen}
          employeeName={selectedEmployee?.fullName ?? ""}
          schedule={selectedSchedule}
          employeeCode={selectedEmployee?.employeeCode ?? ""}
          workDate={selectedSchedule?.workDate ?? ""}
          shifts={shifts}
          onCreate={handleAssignShift}
          onUpdate={handleEditShift}
          mode={mode}
        />
        <BatchAssignDialog
          open={batchOpen}
          onOpenChange={setBatchOpen}
          employeeCount={selectedCount}
          shifts={shifts}
          onSubmit={hanldeBatchShift}
        />
        <CopyScheduleDialog
          open={copyOpen}
          onOpenChange={setCopyOpen}
          onSubmit={hanldeCopyShift}
        />
        <ExportExcelDialog
          open={exportOpen}
          onOpenChange={setExportOpen}
          onSubmit={handleExportExcel}
        />
        <OvertimeDialog
          onOpenChange={setOvertimeOpen}
          open={overtimeOpen}
          onSubmit={hanldeOvertimeSubmit}
          policies={policies}
          schedule={selectedSchedule}
        />
        <ConfirmDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          loading={loading}
          title={deleteType == "ca" ? "Xóa ca làm" : "Xóa OT"}
          description={`Bạn có chắc chắn muốn ${deleteType} này? Thao tác này không thể hoàn tác.`}
          confirmText="Xóa"
          onConfirm={deleteType == "ca" ? handleDelete : handleDeleteOvertime}
        />
        <ImportStaffDialog
          open={importState.open}
          onOpenChange={importState.setOpen}
          setErrorDialogOpen={importState.setErrorDialogOpen}
          fileName={importState.fileName}
          progress={importState.progress}
          steps={importState.steps}
          errorMessage={importState.errorMessage}
          totalRows={importState.totalRows}
          processedRows={importState.processedRows}
          successRows={importState.successRows}
          errorRows={importState.errorRows}
        />
        <ImportErrorDialog
          open={importState.errorDialogOpen}
          onOpenChange={importState.setErrorDialogOpen}
          totalRows={importState.totalRows}
          errors={importState.importErrors}
        />
      </div>
    </div>
  );
}
