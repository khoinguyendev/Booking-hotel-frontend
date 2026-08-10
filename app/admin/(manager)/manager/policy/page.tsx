"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import OvertimePolicySection from "@/components/policy/manager/OvertimePolicy";
import OvertimePolicyDialog, {
  OvertimePolicyFormValues,
} from "@/components/policy/manager/OvertimePolicyDialog";

import PositionSalaryPolicyDialog, {
  PositionSalaryPolicyFormValues,
} from "@/components/policy/manager/PositionSalaryPolicyDialog";

import { useOvertimePolicies } from "@/hooks/useOvertimePolicies";
import { usePositionSalaryPolicies } from "@/hooks/usePositionSalaryPolicies";
import { usePositions } from "@/hooks/usePositions";

import { PositionSalaryPolicyResponse } from "@/types/positionSalaryPolicy";
import { OvertimePolicyResponse } from "@/services/overtimePolicy.service";
import PositionSalaryPolicySection from "@/components/policy/manager/PositionSalaryPolicy";
import { PositionResponse } from "@/services/position.service";
import PositionSection from "@/components/policy/manager/PositionSection";
import PositionDialog, {
  PositionFormValues,
} from "@/components/policy/manager/PositionDialog";
import { useShifts } from "@/hooks/useShift";
import ShiftDialog, {
  ShiftFormValues,
} from "@/components/policy/manager/ShiftDialog";
import ShiftSection from "@/components/policy/manager/ShiftSection";
import { ShiftResponse } from "@/services/shift.service";
import { AllowanceTypeResponse } from "@/services/allowanceType.service";
import { useAllowanceTypes } from "@/hooks/useAllowanceTypes";
import AllowanceTypeDialog, {
  AllowanceTypeFormValues,
} from "@/components/policy/manager/AllowanceTypeDialog";
import AllowanceTypeSection from "@/components/policy/manager/AllowanceTypeSection";
import { useAttendancePolicies } from "@/hooks/useAttendancePolicies";
import { AttendancePolicyResponse } from "@/services/attendancePolicy.service";
import AttendancePolicyDialog, {
  AttendancePolicyFormValues,
} from "@/components/policy/manager/AttendancePolicyDialog";
import AttendancePolicySection from "@/components/policy/manager/AttendancePolicySection";

export default function PolicyPage() {
  const {
    attendancePolicies,
    create: createAttendancePolicy,
    update: updateAttendancePolicy,
    remove: removeAttendancePolicy,
  } = useAttendancePolicies();

  const [attendancePolicyOpen, setAttendancePolicyOpen] = useState(false);

  const [editingAttendancePolicy, setEditingAttendancePolicy] =
    useState<AttendancePolicyResponse | null>(null);

  const handleAddAttendancePolicy = () => {
    setEditingAttendancePolicy(null);
    setAttendancePolicyOpen(true);
  };
  const handleEditAttendancePolicy = (item: AttendancePolicyResponse) => {
    setEditingAttendancePolicy(item);
    setAttendancePolicyOpen(true);
  };
  const handleSubmitAttendancePolicy = async (
    values: AttendancePolicyFormValues,
  ) => {
    if (editingAttendancePolicy) {
      await updateAttendancePolicy(editingAttendancePolicy.id, values);

      toast.success("Sửa thành công");
    } else {
      await createAttendancePolicy(values);

      toast.success("Thêm thành công");
    }

    setAttendancePolicyOpen(false);
  };

  const handleDeleteAttendancePolicy = async (id: number) => {
    await removeAttendancePolicy(id);

    toast.success("Xóa thành công");
  };
  ////
  const {
    allowanceTypes,
    create: createAllowanceType,
    update: updateAllowanceType,
    remove: removeAllowanceType,
  } = useAllowanceTypes();

  const [allowanceTypeOpen, setAllowanceTypeOpen] = useState(false);

  const [editingAllowanceType, setEditingAllowanceType] =
    useState<AllowanceTypeResponse | null>(null);

  const handleAddAllowanceType = () => {
    setEditingAllowanceType(null);
    setAllowanceTypeOpen(true);
  };

  const handleEditAllowanceType = (item: AllowanceTypeResponse) => {
    setEditingAllowanceType(item);
    setAllowanceTypeOpen(true);
  };

  const handleSubmitAllowanceType = async (values: AllowanceTypeFormValues) => {
    if (editingAllowanceType) {
      await updateAllowanceType(editingAllowanceType.id, values);

      toast.success("Sửa thành công");
    } else {
      await createAllowanceType(values);

      toast.success("Thêm thành công");
    }

    setAllowanceTypeOpen(false);
  };

  const handleDeleteAllowanceType = async (id: number) => {
    await removeAllowanceType(id);

    toast.success("Xóa thành công");
  };
  // =========================
  const {
    shifts,
    create: createShift,
    update: updateShift,
    remove: removeShift,
  } = useShifts();

  const [shiftOpen, setShiftOpen] = useState(false);

  const [editingShift, setEditingShift] = useState<ShiftResponse | null>(null);

  const handleAddShift = () => {
    setEditingShift(null);
    setShiftOpen(true);
  };

  const handleEditShift = (item: ShiftResponse) => {
    setEditingShift(item);
    setShiftOpen(true);
  };

  const handleSubmitShift = async (values: ShiftFormValues) => {
    if (editingShift) {
      await updateShift(editingShift.id, values);

      toast.success("Sửa thành công");
    } else {
      await createShift(values);

      toast.success("Thêm thành công");
    }

    setShiftOpen(false);
  };

  const handleDeleteShift = async (id: number) => {
    await removeShift(id);

    toast.success("Xóa thành công");
  };

  // =========================
  const {
    positions,
    create: createPosition,
    update: updatePosition,
    remove: removePosition,
  } = usePositions();

  const [positionOpen, setPositionOpen] = useState(false);

  const [editingPosition, setEditingPosition] =
    useState<PositionResponse | null>(null);
  const handleAddPosition = () => {
    setEditingPosition(null);
    setPositionOpen(true);
  };
  const handleEditPosition = (item: PositionResponse) => {
    setEditingPosition(item);
    setPositionOpen(true);
  };
  const handleSubmitPosition = async (values: PositionFormValues) => {
    if (editingPosition) {
      await updatePosition(editingPosition.id, values);

      toast.success("Sửa thành công");
    } else {
      await createPosition(values);

      toast.success("Thêm thành công");
    }

    setPositionOpen(false);
  };

  const handleDeletePosition = async (id: number) => {
    await removePosition(id);

    toast.success("Xóa thành công");
  };
  // =========================
  // OVERTIME POLICY
  // =========================

  const { policies, create, update } = useOvertimePolicies();

  const [overtimeOpen, setOvertimeOpen] = useState(false);

  const [editingOvertime, setEditingOvertime] =
    useState<OvertimePolicyResponse | null>(null);

  const handleAddOvertime = () => {
    setEditingOvertime(null);
    setOvertimeOpen(true);
  };

  const handleEditOvertime = (item: OvertimePolicyResponse) => {
    setEditingOvertime(item);
    setOvertimeOpen(true);
  };

  const handleSubmitOvertime = async (values: OvertimePolicyFormValues) => {
    if (editingOvertime) {
      await update(editingOvertime.id, values);

      toast.success("Sửa thành công");
    } else {
      await create(values);

      toast.success("Thêm thành công");
    }

    setOvertimeOpen(false);
  };

  // =========================
  // POSITION SALARY POLICY
  // =========================

  const {
    policies: positionPolicies,
    create: createSalary,
    update: updateSalary,
    remove: removeSalary,
  } = usePositionSalaryPolicies();

  const [salaryOpen, setSalaryOpen] = useState(false);

  const [editingSalary, setEditingSalary] =
    useState<PositionSalaryPolicyResponse | null>(null);

  const handleAddSalary = () => {
    setEditingSalary(null);

    setSalaryOpen(true);
  };

  const handleEditSalary = (item: PositionSalaryPolicyResponse) => {
    setEditingSalary(item);

    setSalaryOpen(true);
  };

  const handleDeleteSalary = async (id: number) => {
    await removeSalary(id);

    toast.success("Xóa thành công");
  };

  const handleSubmitSalary = async (values: PositionSalaryPolicyFormValues) => {
    if (editingSalary) {
      await updateSalary(editingSalary.id, {
        hourlyRate: values.hourlyRate,

        shiftMultiplier: values.shiftMultiplier,

        effectiveFrom: values.effectiveFrom,

        effectiveTo: values.effectiveTo,
      });

      toast.success("Sửa thành công");
    } else {
      await createSalary(values);

      toast.success("Thêm thành công");
    }

    setSalaryOpen(false);
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#F2F2F7]
        dark:bg-black
        p-6
        space-y-8
      "
    >
      <div>
        <h1 className="text-2xl font-bold">Chính sách khách sạn</h1>

        <p
          className="
          text-sm
          text-muted-foreground
        "
        >
          Quản lý chính sách tăng ca và lương nhân viên
        </p>
      </div>

      {/* OVERTIME */}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Chính sách tăng ca</h2>

        <OvertimePolicySection
          policies={policies}
          onAdd={handleAddOvertime}
          onEdit={handleEditOvertime}
        />

        <OvertimePolicyDialog
          open={overtimeOpen}
          onOpenChange={setOvertimeOpen}
          defaultValues={
            editingOvertime
              ? {
                  type: editingOvertime.type,
                  multiplier: editingOvertime.multiplier,

                  allowance: editingOvertime.allowance,

                  effectiveFrom: editingOvertime.effectiveFrom,

                  effectiveTo: editingOvertime.effectiveTo ?? "",
                }
              : undefined
          }
          onSubmit={handleSubmitOvertime}
        />
      </section>

      {/* POSITION SALARY */}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Chính sách lương theo chức vụ</h2>

        <PositionSalaryPolicySection
          policies={positionPolicies}
          onAdd={handleAddSalary}
          onEdit={handleEditSalary}
          // onDelete={handleDeleteSalary}
          onDelete={()=>console.log("a")}
        />

        <PositionSalaryPolicyDialog
          open={salaryOpen}
          onOpenChange={setSalaryOpen}
          editing={editingSalary}
          positions={positions.map((x) => ({
            id: x.id,
            name: x.name,
          }))}
          shifts={shifts.map((x) => ({
            id: x.id,
            name: x.name,
          }))}
          onSubmit={handleSubmitSalary}
        />
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Chính sách lương theo chức vụ</h2>

        <PositionSection
          positions={positions}
          onAdd={handleAddPosition}
          onEdit={handleEditPosition}
          // onDelete={handleDeletePosition}
        />

        <PositionDialog
          open={positionOpen}
          onClose={() => setPositionOpen(false)}
          initialValues={
            editingPosition
              ? {
                  name: editingPosition.name,
                  description: editingPosition.description ?? "",
                  status: editingPosition.status,
                }
              : undefined
          }
          onSubmit={handleSubmitPosition}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Chính sách lương theo chức vụ</h2>

        <ShiftSection
          shifts={shifts}
          onAdd={handleAddShift}
          onEdit={handleEditShift}
          onDelete={handleDeleteShift}
        />

        <ShiftDialog
          open={shiftOpen}
          onClose={() => setShiftOpen(false)}
          initialValues={
            editingShift
              ? {
                  name: editingShift.name,
                  startTime: editingShift.startTime,
                  endTime: editingShift.endTime,
                  breakMinutes: editingShift.breakMinutes,
                  status: editingShift.status,
                }
              : undefined
          }
          onSubmit={handleSubmitShift}
        />
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Chính sách lương theo chức vụ</h2>

        <AllowanceTypeSection
          allowanceTypes={allowanceTypes}
          onAdd={() => {
            setEditingAllowanceType(null);
            setAllowanceTypeOpen(true);
          }}
          onEdit={(item) => {
            setEditingAllowanceType(item);
            setAllowanceTypeOpen(true);
          }}
          // onDelete={handleDeleteAllowanceType}
        />

        <AllowanceTypeDialog
          open={allowanceTypeOpen}
          onClose={() => setAllowanceTypeOpen(false)}
          initialValues={
            editingAllowanceType
              ? {
                  name: editingAllowanceType.name,
                  description: editingAllowanceType.description ?? "",
                }
              : undefined
          }
          onSubmit={handleSubmitAllowanceType}
        />
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Chính sách tăng ca</h2>

        <AttendancePolicySection
          attendancePolicies={attendancePolicies}
          onAdd={handleAddAttendancePolicy}
          onEdit={handleEditAttendancePolicy}
          // onDelete={handleDeleteAttendancePolicy}
        />
        <AttendancePolicyDialog
          open={attendancePolicyOpen}
          onClose={() => setAttendancePolicyOpen(false)}
          initialValues={
            editingAttendancePolicy
              ? {
                  lateToleranceMinutes:
                    editingAttendancePolicy.lateToleranceMinutes,
                  earlyLeaveToleranceMinutes:
                    editingAttendancePolicy.earlyLeaveToleranceMinutes,
                  latePenaltyPerMinute:
                    editingAttendancePolicy.latePenaltyPerMinute,
                  earlyLeavePenaltyPerMinute:
                    editingAttendancePolicy.earlyLeavePenaltyPerMinute,
                  absencePenaltyPercent:
                    editingAttendancePolicy.absencePenaltyPercent,
                }
              : undefined
          }
          onSubmit={handleSubmitAttendancePolicy}
        />
      </section>
    </div>
  );
}
