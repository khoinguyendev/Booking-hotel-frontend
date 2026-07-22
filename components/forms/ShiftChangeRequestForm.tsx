"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { CalendarDays, Clock3, RefreshCcw, Users } from "lucide-react";

import { format } from "date-fns";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { shiftService } from "@/services/shift.service";
import { Shift } from "@/types/shift";
import { WorkScheduleResponse } from "../work-schedule/WorkCalendar";
import { staffService } from "@/services/staft.service";
import { ShiftChangeRequest } from "@/types/requests";

const schema = z
  .object({
    workDate: z
      .date({
        message: "Vui lòng chọn ngày đổi ca",
      })
      .refine(
        (date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          return date > today;
        },
        {
          message: "Ngày đổi ca phải sau ngày hiện tại",
        },
      ),

    currentShiftId: z.number({
      message: "Vui lòng chọn ca hiện tại",
    }),

    mode: z.enum(["employee", "shift"]),

    newShiftId: z.number().optional(),

    targetWorkScheduleId: z.number().optional(),

    reason: z
      .string()
      .min(5, "Lý do tối thiểu 5 ký tự")
      .max(500, "Lý do tối đa 500 ký tự"),
  })
  .superRefine((data, ctx) => {
    if (data.mode === "shift" && !data.newShiftId) {
      ctx.addIssue({
        code: "custom",
        path: ["newShiftId"],
        message: "Vui lòng chọn ca mới",
      });
    }

    if (data.mode === "employee" && !data.targetWorkScheduleId) {
      ctx.addIssue({
        code: "custom",
        path: ["targetWorkScheduleId"],
        message: "Vui lòng chọn nhân viên đổi ca",
      });
    }

    if (
      data.newShiftId &&
      data.currentShiftId &&
      data.newShiftId === data.currentShiftId
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["newShiftId"],
        message: "Ca mới phải khác ca hiện tại",
      });
    }
  });

export type ShiftChangeFormData = z.infer<typeof schema>;

export interface ShiftChangeRequestFormRef {
  submit: () => void;
  reset: () => void;
}

interface Props {
  onSubmit: (data: ShiftChangeRequest) => void;
}

const ShiftChangeRequestForm = forwardRef<ShiftChangeRequestFormRef, Props>(
  ({ onSubmit }, ref) => {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [workSchedules, setWorkSchedules] = useState<WorkScheduleResponse[]>(
      [],
    );

    const {
      watch,
      setValue,
      register,
      handleSubmit,
      reset,
      setError,
  clearErrors,
      formState: { errors },
    } = useForm<ShiftChangeFormData>({
      resolver: zodResolver(schema),
      mode: "onChange",
      defaultValues: {
        mode: "shift",
        reason: "",
      },
    });

    useImperativeHandle(ref, () => ({
      submit,
      reset,
    }));

    const workDate = watch("workDate");
    const mode = watch("mode");
    const currentShiftId = watch("currentShiftId");
    const newShiftId = watch("newShiftId");
    const targetWorkScheduleId = watch("targetWorkScheduleId");
    const submit = handleSubmit((data) => {
      const selectedDate = format(data.workDate, "yyyy-MM-dd");

      const schedule = workSchedules.find(
        (x) =>
          x.workDate === selectedDate && x.shift?.id === data.currentShiftId,
      );

      if (!schedule) {
        setError("currentShiftId", {
          type: "manual",
          message: "Bạn không có ca làm trong ngày này",
        });

        return;
      }

      clearErrors("currentShiftId");
      const payload = {
        workScheduleId: schedule.id,
        targetWorkScheduleId: data.targetWorkScheduleId,
        newShiftId: data.newShiftId,
        reason: data.reason,
        workDate: format(data.workDate, "yyyy-MM-dd"),
};
      onSubmit(payload);
    });
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await shiftService.getShifts();
          const response2 = await staffService.getWorkScheduleByMe(
            "2026",
            "07",
          );
          setShifts(response.data.data);
          setWorkSchedules(response2.data.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, []);

    return (
      <div className="space-y-6">
        {/* Work Date */}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Ngày đổi ca
          </label>

          <Popover>
            <PopoverTrigger className="flex h-12 w-full items-center gap-3 rounded-2xl border border-[#E5E5EA] px-4 text-left text-sm">
              <CalendarDays size={18} className="text-[#007AFF]" />

              {workDate ? (
                format(workDate, "dd/MM/yyyy")
              ) : (
                <span className="text-gray-400">Chọn ngày</span>
              )}
            </PopoverTrigger>

            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={workDate}
                disabled={{ before: new Date() }}
                onSelect={(date) =>
                  setValue("workDate", date as Date, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
              />
            </PopoverContent>
          </Popover>

          {errors.workDate && (
            <p className="mt-2 text-xs text-red-500">
              {errors.workDate.message}
            </p>
          )}
        </div>

        {/* Current Shift */}

        <div>
          <label className="mb-3 block text-sm font-semibold">
            Ca hiện tại
          </label>

          <div className="space-y-3">
            {shifts.map((shift) => (
              <button
                type="button"
                key={shift.id}
                onClick={() =>
                  setValue("currentShiftId", shift.id, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  currentShiftId === shift.id
                    ? "border-[#007AFF] bg-blue-50"
                    : "border-[#E5E5EA]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{shift.name}</p>

                    <p className="text-xs text-gray-500">
                      {shift.startTime} - {shift.endTime}
                    </p>
                  </div>

                  <Clock3 size={18} className="text-[#007AFF]" />
                </div>
              </button>
            ))}
          </div>

          {errors.currentShiftId && (
            <p className="mt-2 text-xs text-red-500">
              {errors.currentShiftId.message}
            </p>
          )}
        </div>

        {/* Change Mode */}

        <div>
          <label className="mb-3 block text-sm font-semibold">
            Hình thức đổi
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setValue("mode", "employee", {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              className={`rounded-2xl border p-4 ${
                mode === "employee"
                  ? "border-[#007AFF] bg-blue-50"
                  : "border-[#E5E5EA]"
              }`}
            >
              <Users className="mx-auto mb-2 text-orange-500" />

              <p className="text-sm font-semibold">Đổi nhân viên</p>
            </button>

            <button
              type="button"
              onClick={() =>
                setValue("mode", "shift", {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              className={`rounded-2xl border p-4 ${
                mode === "shift"
                  ? "border-[#007AFF] bg-blue-50"
                  : "border-[#E5E5EA]"
              }`}
            >
              <RefreshCcw className="mx-auto mb-2 text-green-500" />

              <p className="text-sm font-semibold">Đổi ca khác</p>
            </button>
          </div>
        </div>
        {/* Target */}

        {mode === "employee" ? (
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Chọn nhân viên đổi ca
            </label>

            {/* Thay dữ liệu mẫu bằng API WorkSchedule của bạn */}
            <select
              value={targetWorkScheduleId ?? ""}
              onChange={(e) =>
                setValue("targetWorkScheduleId", Number(e.target.value), {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              className="h-12 w-full rounded-2xl border border-[#E5E5EA] px-4 dark:bg-[#1C1C1E]"
            >
              <option value="">-- Chọn nhân viên --</option>
              <option value={1}>Nguyễn Văn A - Ca sáng</option>
              <option value={2}>Trần Văn B - Ca chiều</option>
              <option value={3}>Lê Văn C - Ca tối</option>
            </select>

            {errors.targetWorkScheduleId && (
              <p className="mt-2 text-xs text-red-500">
                {errors.targetWorkScheduleId.message}
              </p>
            )}
          </div>
        ) : (
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Chọn ca mới
            </label>

            <div className="space-y-2">
              {shifts.map((shift) => (
                <button
                  type="button"
                  key={shift.id}
                  onClick={() =>
                    setValue("newShiftId", shift.id, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                  className={`flex w-full justify-between rounded-2xl border p-4 transition ${
                    newShiftId === shift.id
                      ? "border-[#007AFF] bg-blue-50"
                      : "border-[#E5E5EA]"
                  }`}
                >
                  <span className="font-semibold">{shift.name}</span>

                  <span className="text-xs text-gray-500">
                    {shift.startTime} - {shift.endTime}
                  </span>
                </button>
              ))}
            </div>

            {errors.newShiftId && (
              <p className="mt-2 text-xs text-red-500">
                {errors.newShiftId.message}
              </p>
            )}
          </div>
        )}

        {/* Reason */}

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Lý do đổi ca
          </label>

          <textarea
            rows={4}
            {...register("reason")}
            placeholder="Nhập lý do đổi ca..."
            className="w-full resize-none rounded-2xl border border-[#E5E5EA] p-4 text-sm outline-none focus:border-[#007AFF] dark:border-[#2C2C2E] dark:bg-[#1C1C1E]"
          />

          <div className="mt-2 flex justify-between">
            {errors.reason ? (
              <p className="text-xs text-red-500">{errors.reason.message}</p>
            ) : (
              <span />
            )}

            <span className="text-xs text-gray-400">500 ký tự</span>
          </div>
        </div>
      </div>
    );
  },
);

ShiftChangeRequestForm.displayName = "ShiftChangeRequestForm";

export default ShiftChangeRequestForm;
