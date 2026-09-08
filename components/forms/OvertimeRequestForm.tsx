"use client";

import { forwardRef, useImperativeHandle, useMemo } from "react";
import { Clock3, Timer } from "lucide-react";
import { format, isSameDay, parseISO } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { WorkDatePicker } from "../requests/employee/WorkDatePicker";
import { useMyWorkSchedule } from "@/hooks/useMyWorkSchedule";
import { OvertimeRequest } from "@/types/requests";

const overtimeSchema = z.object({
  workDate: z
    .date({
      message: "Vui lòng chọn ngày tăng ca",
    })
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return date >= today;
      },
      {
        message: "Ngày tăng ca không được trước ngày hiện tại",
      },
    ),

  overtimeHours: z
    .number({
      message: "Vui lòng chọn thời lượng tăng ca",
    })
    .int("Thời lượng không hợp lệ")
    .min(1, "Tối thiểu 1 giờ")
    .max(4, "Tối đa 4 giờ"),

  reason: z
    .string()
    .trim()
    .min(5, "Lý do tối thiểu 5 ký tự")
    .max(500, "Lý do tối đa 500 ký tự"),
});

export type OvertimeFormData = z.infer<typeof overtimeSchema>;
export interface OvertimeRequestFormRef {
  submit: () => void;
  reset: () => void;
}
interface Props {
  onSubmit: (data: OvertimeRequest) => void;
}

const OvertimeRequestForm = forwardRef<OvertimeRequestFormRef, Props>(
  ({ onSubmit }, ref) => {
    const { schedules } = useMyWorkSchedule(new Date());

    const {
      watch,
      setValue,
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<OvertimeFormData>({
      resolver: zodResolver(overtimeSchema),

      mode: "onChange",

      defaultValues: {
        reason: "",
      },
    });

    const workDate = watch("workDate");
    const overtimeHours = watch("overtimeHours");

    const selectedSchedule = useMemo(() => {
      if (!workDate) return null;

      return (
        schedules.find((item) =>
          isSameDay(parseISO(item.workDate), workDate),
        ) ?? null
      );
    }, [workDate, schedules]);

    const shift = selectedSchedule?.shift;

    const overtimeStartTime = shift?.endTime ? shift.endTime.slice(0, 5) : null;

    const overtimeEndTime = useMemo(() => {
      if (!overtimeStartTime || !overtimeHours) {
        return null;
      }

      const [hour, minute] = overtimeStartTime.split(":").map(Number);

      const totalMinutes = hour * 60 + minute + overtimeHours * 60;

      const endHour = Math.floor(totalMinutes / 60) % 24;

      const endMinute = totalMinutes % 60;

      return `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(
        2,
        "0",
      )}`;
    }, [overtimeStartTime, overtimeHours]);

    /**
     * Submit được gọi từ component cha
     */
    const submit = handleSubmit((data) => {
      const schedule = schedules.find(
        (item) => item.workDate === format(data.workDate, "yyyy-MM-dd"),
      );

      if (!schedule?.shift) {
        return;
      }

      const fromTime = schedule.shift.endTime.slice(0, 5);

      const [hour, minute] = fromTime.split(":").map(Number);

      const endTime = new Date(2000, 0, 1, hour, minute);

      endTime.setHours(endTime.getHours() + data.overtimeHours);

      const toTime = format(endTime, "HH:mm");

      const payload: OvertimeRequest = {
        workScheduleId: schedule.id,
        workDate: format(data.workDate, "yyyy-MM-dd"),
        fromTime,
        toTime,
        reason: data.reason,
      };

      onSubmit(payload);
    });

    useImperativeHandle(ref, () => ({
      submit,
      reset,
    }));

    return (
      <div className="space-y-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="space-y-6"
        >
          {" "}
          {/* ================= DATE ================= */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Ngày tăng ca
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
          </div>
          {/* ================= CURRENT SHIFT ================= */}
          {selectedSchedule?.shift && (
            <div
              className="
            rounded-2xl
            border
            border-[#E5E5EA]
            p-4
          "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#8E8E93]">
                    Ca làm việc
                  </p>

                  <p className="mt-1 text-sm font-bold">{shift?.name}</p>

                  <p className="mt-1 text-xs text-[#8E8E93]">
                    {shift?.startTime.slice(0, 5)}
                    {" - "}
                    {shift?.endTime.slice(0, 5)}
                  </p>
                </div>

                <Clock3 size={20} className="text-[#007AFF]" />
              </div>
            </div>
          )}
          {/* ================= OVERTIME HOURS ================= */}
          <div>
            <div className="mb-3">
              <label className="text-sm font-semibold">
                Thời lượng tăng ca
              </label>

              <p className="mt-1 text-xs text-[#8E8E93]">Chọn từ 1 đến 4 giờ</p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((hours) => {
                const selected = overtimeHours === hours;

                return (
                  <button
                    key={hours}
                    type="button"
                    disabled={!selectedSchedule?.shift}
                    onClick={() => {
                      setValue("overtimeHours", hours, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                    className={`
                  rounded-2xl
                  border-2
                  px-3
                  py-3
                  text-sm
                  font-semibold
                  transition

                  ${
                    selected
                      ? "border-[#007AFF] bg-[#007AFF]/10 text-[#007AFF]"
                      : "border-[#E5E5EA] text-[#8E8E93] hover:border-[#007AFF]/40"
                  }

                  disabled:cursor-not-allowed
                  disabled:opacity-40
                `}
                  >
                    {hours} giờ
                  </button>
                );
              })}
            </div>

            {errors.overtimeHours && (
              <p className="mt-2 text-xs text-red-500">
                {errors.overtimeHours.message}
              </p>
            )}
          </div>
          {/* ================= OVERTIME DETAIL ================= */}
          {overtimeStartTime && overtimeEndTime && overtimeHours && (
            <div
              className="
              rounded-2xl
              bg-[#F2F2F7]
              p-4
            "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#007AFF]/10
                  text-[#007AFF]
                "
                >
                  <Timer size={19} />
                </div>

                <div>
                  <p className="text-xs font-medium text-[#8E8E93]">
                    Chi tiết tăng ca
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    {overtimeStartTime}
                    {" → "}
                    {overtimeEndTime}
                  </p>

                  <p className="mt-1 text-xs text-[#8E8E93]">
                    Tổng thời gian:{" "}
                    <span className="font-semibold text-[#007AFF]">
                      {overtimeHours} giờ
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* ================= REASON ================= */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Lý do tăng ca
            </label>

            <textarea
              rows={4}
              {...register("reason")}
              placeholder="Nhập lý do cần tăng ca..."
              className="
            w-full
            resize-none
            rounded-2xl
            border
            border-[#E5E5EA]
            p-4
            text-sm
            outline-none
            transition
            focus:border-[#007AFF]
            dark:border-[#2C2C2E]
            dark:bg-[#1C1C1E]
          "
            />

            <div className="mt-2 flex justify-between">
              {errors.reason ? (
                <p className="text-xs text-red-500">{errors.reason.message}</p>
              ) : (
                <span />
              )}

              <span className="text-xs text-[#8E8E93]">500 ký tự</span>
            </div>
          </div>
          {/* ================= SUBMIT ================= */}
        </form>
      </div>
    );
  },
);

OvertimeRequestForm.displayName = "OvertimeRequestForm";

export default OvertimeRequestForm;
