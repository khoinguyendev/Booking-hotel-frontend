"use client";

import { forwardRef, useImperativeHandle } from "react";

import { Clock3, RefreshCcw, Users } from "lucide-react";

import { format, isSameDay, parseISO } from "date-fns";

import { z } from "zod";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ShiftChangeRequest } from "@/types/requests";

import { useShifts } from "@/hooks/useShift";
import { useMyWorkSchedule } from "@/hooks/useMyWorkSchedule";

import ShiftChangeSelector from "./ShiftChangeSelector";
import { WorkDatePicker } from "../requests/employee/WorkDatePicker";
import { NewWorkDatePicker } from "../requests/employee/NewWorkDatePicker";

/* =====================================================
 * Schema
 * ===================================================== */

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

          return date >= today;
        },
        {
          message: "Ngày đổi ca không được ở quá khứ",
        },
      ),

    newWorkDate: z.date().optional(),

    mode: z.enum(["employee", "shift"]),

    newShiftId: z.number().optional(),

    targetWorkScheduleId: z.number().optional(),

    reason: z
      .string()
      .min(5, "Lý do tối thiểu 5 ký tự")
      .max(500, "Lý do tối đa 500 ký tự"),
  })
  .superRefine((data, ctx) => {
    /* Đổi sang ca khác */
    if (data.mode === "shift" && !data.newShiftId) {
      ctx.addIssue({
        code: "custom",
        path: ["newShiftId"],
        message: "Vui lòng chọn ca mới",
      });
    }

    /* Đổi với nhân viên */
    if (data.mode === "employee" && !data.targetWorkScheduleId) {
      ctx.addIssue({
        code: "custom",
        path: ["targetWorkScheduleId"],
        message: "Vui lòng chọn nhân viên đổi ca",
      });
    }
  });

export type ShiftChangeFormData = z.infer<typeof schema>;

/* =====================================================
 * Ref
 * ===================================================== */

export interface ShiftChangeRequestFormRef {
  submit: () => void;
  reset: () => void;
}

/* =====================================================
 * Props
 * ===================================================== */

interface Props {
  onSubmit: (data: ShiftChangeRequest) => void;
}

/* =====================================================
 * Component
 * ===================================================== */

const ShiftChangeRequestForm = forwardRef<ShiftChangeRequestFormRef, Props>(
  ({ onSubmit }, ref) => {
    /* =================================================
     * Data
     * ================================================= */

    const { shifts } = useShifts();

    const { schedules } = useMyWorkSchedule(new Date());

    /* =================================================
     * Form
     * ================================================= */

    const {
      watch,
      setValue,
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<ShiftChangeFormData>({
      resolver: zodResolver(schema),

      mode: "onChange",

      defaultValues: {
        mode: "shift",
        reason: "",
        newShiftId: undefined,
        newWorkDate: undefined,
        targetWorkScheduleId: undefined,
      },
    });

    /* =================================================
     * Watch
     * ================================================= */

    const workDate = watch("workDate");

    const mode = watch("mode");

    const newShiftId = watch("newShiftId");

    const newWorkDate = watch("newWorkDate");

    const targetWorkScheduleId = watch("targetWorkScheduleId");

    /* =================================================
     * Selected schedule
     * ================================================= */

    const selectedSchedule = workDate
      ? schedules.find((item) => isSameDay(parseISO(item.workDate), workDate))
      : undefined;

    /* =================================================
     * Submit
     * ================================================= */

    const submit = handleSubmit((data) => {
      if (!selectedSchedule) {
        return;
      }

      const payload: ShiftChangeRequest = {
        workScheduleId: selectedSchedule.id,

        targetWorkScheduleId: data.targetWorkScheduleId,

        newShiftId: data.newShiftId,

        reason: data.reason,

        workDate: format(data.workDate, "yyyy-MM-dd"),

        newWorkDate: data.newWorkDate
          ? format(data.newWorkDate, "yyyy-MM-dd")
          : undefined,
      };

      console.log("SUBMIT:", payload);

      onSubmit(payload);
    });

    /* =================================================
     * Ref
     * ================================================= */

    useImperativeHandle(
      ref,
      () => ({
        submit,

        reset: () => {
          reset({
            mode: "shift",
            reason: "",
            workDate: undefined,
            newWorkDate: undefined,
            newShiftId: undefined,
            targetWorkScheduleId: undefined,
          });
        },
      }),
      [submit, reset],
    );

    /* =================================================
     * Mode
     * ================================================= */

    const handleModeChange = (newMode: "employee" | "shift") => {
      setValue("mode", newMode, {
        shouldDirty: true,
        shouldValidate: true,
      });

      if (newMode === "shift") {
        setValue("targetWorkScheduleId", undefined);
      }

      if (newMode === "employee") {
        setValue("newShiftId", undefined);

        setValue("newWorkDate", undefined);
      }
    };

    /* =================================================
     * Render
     * ================================================= */

    return (
      <div className="space-y-6">
        {/* ============================================
         * Chọn lịch hiện tại
         * ============================================ */}

        <section>
          <label className="mb-2 block text-sm font-semibold text-[#1C1C1E] dark:text-white">
            Chọn lịch đổi ca
          </label>
          <WorkDatePicker
            workDate={workDate}
            schedules={schedules}
            onSelect={(date) => {
              setValue("workDate", date, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          />

          {errors.workDate && (
            <p className="mt-2 text-xs text-red-500">
              {errors.workDate.message}
            </p>
          )}
        </section>

        {/* ============================================
         * Ca hiện tại
         * ============================================ */}

        {selectedSchedule && selectedSchedule.shift && (
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Clock3 size={17} className="text-[#007AFF]" />

              <p className="text-sm font-semibold text-[#1C1C1E] dark:text-white">
                Ca hiện tại
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5E5EA] p-4 dark:border-[#2C2C2E]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1C1C1E] dark:text-white">
                    {selectedSchedule.shift.name}
                  </p>

                  <p className="mt-1 text-xs text-[#8E8E93]">
                    {selectedSchedule.shift.startTime.slice(0, 5)}
                    {" - "}
                    {selectedSchedule.shift.endTime.slice(0, 5)}
                  </p>
                </div>

                <Clock3 size={18} className="text-[#007AFF]" />
              </div>
            </div>
          </section>
        )}

        {/* ============================================
         * Hình thức đổi
         * ============================================ */}

        <section>
          <div className="mb-3 flex items-center gap-2">
            <RefreshCcw size={17} className="text-[#007AFF]" />

            <p className="text-sm font-semibold text-[#1C1C1E] dark:text-white">
              Hình thức đổi
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Đổi nhân viên */}

            <button
              type="button"
              onClick={() => handleModeChange("employee")}
              className={`
                  rounded-2xl
                  border-2
                  p-4
                  text-left
                  transition
                  ${
                    mode === "employee"
                      ? "border-[#007AFF] bg-[#007AFF]/5"
                      : "border-[#E5E5EA] hover:border-[#007AFF]/40 dark:border-[#2C2C2E]"
                  }
                `}
            >
              <Users size={20} className="mb-2 text-orange-500" />

              <p className="text-sm font-semibold text-[#1C1C1E] dark:text-white">
                Đổi nhân viên
              </p>

              <p className="mt-1 text-xs text-[#8E8E93]">
                Đổi lịch với nhân viên khác
              </p>
            </button>

            {/* Đổi ca */}

            <button
              type="button"
              onClick={() => handleModeChange("shift")}
              className={`
                  rounded-2xl
                  border-2
                  p-4
                  text-left
                  transition
                  ${
                    mode === "shift"
                      ? "border-[#007AFF] bg-[#007AFF]/5"
                      : "border-[#E5E5EA] hover:border-[#007AFF]/40 dark:border-[#2C2C2E]"
                  }
                `}
            >
              <RefreshCcw size={20} className="mb-2 text-green-500" />

              <p className="text-sm font-semibold text-[#1C1C1E] dark:text-white">
                Đổi ca khác
              </p>

              <p className="mt-1 text-xs text-[#8E8E93]">Chuyển sang ca khác</p>
            </button>
          </div>
        </section>

        {/* ============================================
         * Đổi nhân viên
         * ============================================ */}

        {mode === "employee" ? (
          <section>
            <label className="mb-2 block text-sm font-semibold text-[#1C1C1E] dark:text-white">
              Chọn nhân viên đổi ca
            </label>

            <select
              value={targetWorkScheduleId ?? ""}
              onChange={(e) => {
                const value = e.target.value;

                setValue(
                  "targetWorkScheduleId",
                  value ? Number(value) : undefined,
                  {
                    shouldDirty: true,
                    shouldValidate: true,
                  },
                );
              }}
              className="
                  h-12
                  w-full
                  rounded-2xl
                  border
                  border-[#E5E5EA]
                  bg-transparent
                  px-4
                  text-sm
                  outline-none
                  focus:border-[#007AFF]
                  dark:border-[#2C2C2E]
                "
            >
              <option value="">-- Chọn nhân viên --</option>

              <option value="1">Nguyễn Văn A - Ca sáng</option>

              <option value="2">Trần Văn B - Ca chiều</option>

              <option value="3">Lê Văn C - Ca tối</option>
            </select>

            {errors.targetWorkScheduleId && (
              <p className="mt-2 text-xs text-red-500">
                {errors.targetWorkScheduleId.message}
              </p>
            )}
          </section>
        ) : (
          /* ==========================================
           * Đổi ca
           * ========================================== */

          <section>
            <label className="mb-2 block text-sm font-semibold text-[#1C1C1E] dark:text-white">
              Chọn ca mới
            </label>

            <ShiftChangeSelector
              currentSchedule={selectedSchedule}
              schedules={schedules}
              shifts={shifts}
              newShiftId={newShiftId}
              newWorkDate={newWorkDate}
              onChange={(shiftId, workDate) => {
                setValue("newShiftId", shiftId ?? undefined, {
                  shouldDirty: true,
                  shouldValidate: true,
                });

                setValue("newWorkDate", workDate ?? undefined, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              onSelectDate={(date) => {
                setValue("newWorkDate", date, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
           
            {errors.newShiftId && (
              <p className="mt-2 text-xs text-red-500">
                {errors.newShiftId.message}
              </p>
            )}

            {errors.newWorkDate && (
              <p className="mt-2 text-xs text-red-500">
                {errors.newWorkDate.message}
              </p>
            )}
          </section>
        )}

        {/* ============================================
         * Lý do
         * ============================================ */}

        <section>
          <label className="mb-2 block text-sm font-semibold text-[#1C1C1E] dark:text-white">
            Lý do đổi ca
          </label>

          <textarea
            rows={4}
            maxLength={500}
            {...register("reason")}
            placeholder="Nhập lý do đổi ca..."
            className="
                w-full
                resize-none
                rounded-2xl
                border
                border-[#E5E5EA]
                bg-transparent
                p-4
                text-sm
                outline-none
                transition
                focus:border-[#007AFF]
                dark:border-[#2C2C2E]
              "
          />

          <div className="mt-2 flex justify-between">
            {errors.reason ? (
              <p className="text-xs text-red-500">{errors.reason.message}</p>
            ) : (
              <span />
            )}

            <span className="text-xs text-[#8E8E93]">Tối đa 500 ký tự</span>
          </div>
        </section>
      </div>
    );
  },
);

ShiftChangeRequestForm.displayName = "ShiftChangeRequestForm";

export default ShiftChangeRequestForm;
