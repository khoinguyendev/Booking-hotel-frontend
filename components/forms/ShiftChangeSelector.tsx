"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Check, Clock3, Repeat2 } from "lucide-react";

import { format, isSameDay, parseISO } from "date-fns";
import { vi } from "date-fns/locale";



import { Shift } from "@/types/shift";
import { WorkScheduleResponse } from "@/types/workSchedule";

import { NewWorkDatePicker } from "../requests/employee/NewWorkDatePicker";

interface Props {
  currentSchedule: WorkScheduleResponse;
  schedules: WorkScheduleResponse[];
  shifts: Shift[];
  //   requests: RequestResponse[];

  onSelectDate: (date: Date | undefined) => void;
  newShiftId?: number;
  newWorkDate?: Date;

  onChange: (shiftId: number, workDate: Date | null) => void;
}

export default function ShiftChangeSelector({
  currentSchedule,
  schedules,
  shifts,
  //   requests,
  onSelectDate,
  newShiftId,
  newWorkDate,
  onChange,
}: Props) {
  const [mode, setMode] = useState<"same" | "different">(
    newWorkDate ? "different" : "same",
  );

  /**
   * Ca hiện tại
   */
  const currentShift = currentSchedule?.shift;



  /**
   * Các ngày đang có đơn đổi ca pending
   */
  //   const pendingShiftChangeDates = useMemo(() => {
  //     return requests
  //       .filter(
  //         (request) =>
  //           request.type === 2 &&
  //           request.status === 1 &&
  //           request.shiftChange,
  //       )
  //       .map(
  //         (request) =>
  //           request.shiftChange!.currentWorkDate,
  //       );
  //   }, [requests]);

  /**
   * Kiểm tra ngày có thể chọn
   */
  const isDateSelectable = (date: Date) => {
    const schedule = schedules.find((item) =>
      isSameDay(parseISO(item.workDate), date),
    );

    // Không có lịch
    if (!schedule) return false;

    // Ngày nghỉ
    if (schedule.isDayOff) return false;

    // Không có ca
    if (!schedule.shift) return false;

    // Đã có đơn đổi ca pending
    // const pending = pendingShiftChangeDates.some(
    //   (dateString) =>
    //     isSameDay(
    //       parseISO(dateString),
    //       date,
    //     ),
    // );

    // if (pending) return false;

    return true;
  };

  /**
   * Ca được phép chọn
   *
   * Nếu cùng ngày:
   * → loại ca hiện tại
   *
   * Nếu khác ngày:
   * → lấy ca theo ngày đích
   */
  const availableShifts = useMemo(() => {
    // Cùng ngày:
    // lấy các ca có thể đổi trong ngày hiện tại
    if (mode === "same") {
      return shifts.filter((shift) => shift.id !== currentSchedule?.shift?.id);
    }

    // Khác ngày:
    // ngày mới không cần có WorkSchedule
    // => cho chọn toàn bộ ca
    if (mode === "different" && newWorkDate) {
      return shifts;
    }

    return [];
  }, [mode, newWorkDate, shifts, currentSchedule]);

  const selectedShift = shifts.find((shift) => shift.id === newShiftId);

  /**
   * Chuyển mode
   */
  const handleModeChange = (nextMode: "same" | "different") => {
    setMode(nextMode);

    // Reset dữ liệu cũ
    onChange(0, null);
  };



  return (
    <div className="space-y-6">
     
      {/* ========================= */}
      {/* CHANGE TYPE */}
      {/* ========================= */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Repeat2 size={17} className="text-[#007AFF]" />

          <p className="text-sm font-semibold text-[#1C1C1E]">Loại đổi ca</p>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[#E5E5EA] p-1">
          <button
            type="button"
            onClick={() => handleModeChange("same")}
            className={`
        rounded-xl
        border
        px-4
        py-3
        text-sm
        font-medium
        transition-all
        ${
          mode === "same"
            ? "border-[#007AFF] text-[#007AFF]"
            : "border-transparent text-[#8E8E93] "
        }
      `}
          >
            Cùng ngày
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("different")}
            className={`
        rounded-xl
        border
        px-4
        py-3
        text-sm
        font-medium
        transition-all
        ${
          mode === "different"
            ? "border-[#007AFF] text-[#007AFF]"
            : "border-transparent text-[#8E8E93]"
        }
      `}
          >
            Khác ngày
          </button>
        </div>
      </section>
      {/* ========================= */}
      {/* DIFFERENT DATE */}
      {/* ========================= */}
      {mode === "different" && (
        <div className="space-y-3">
          <label className="block text-sm font-semibold">Ngày chuyển đến</label>

          <NewWorkDatePicker date={newWorkDate} onSelect={onSelectDate} />
        </div>
      )}
      {/* ========================= */}
      {/* SHIFT SELECTION */}
      {/* ========================= */}
      {(mode === "same" || newWorkDate) && (
        <section>
          <div className="mb-3">
            <p className="text-sm font-semibold text-[#1C1C1E]">Chọn ca mới</p>

            <p className="mt-1 text-xs text-[#8E8E93]">
              {mode === "same"
                ? "Chọn ca khác trong cùng ngày."
                : "Chọn ca cho ngày chuyển đến."}
            </p>
          </div>

          <div className="space-y-2">
            {availableShifts.length > 0 ? (
              availableShifts.map((shift) => {
                const selected = newShiftId === shift.id;
                const color = getShiftColor(shift.name);

                return (
                  <button
                    key={shift.id}
                    type="button"
                    onClick={() =>
                      onChange(
                        shift.id,
                        mode === "same" ? null : (newWorkDate ?? null),
                      )
                    }
                    className={`
          group
          flex
          w-full
          items-center
          justify-between
          rounded-2xl
          border-2
          bg-transparent
          p-4
          text-left
          text-[#1C1C1E]
          transition-all
          duration-200

          ${selected ? color.border : `border-[#E5E5EA] ${color.hover}`}
        `}
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div
                        className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl

              ${selected ? color.iconBg : color.iconBg}
            `}
                      >
                        <Clock3
                          size={17}
                          strokeWidth={2}
                          className={selected ? color.icon : color.icon}
                        />
                      </div>

                      {/* Info */}
                      <div className="min-w-0">
                        <p
                          className={`
                truncate
                text-sm
                font-semibold

                ${selected ? color.text : "!text-[#8E8E93]"}
              `}
                        >
                          {shift.name}
                        </p>

                        <p className="mt-1 text-xs !text-[#8E8E93]">
                          {shift.startTime.slice(0, 5)}
                          {" - "}
                          {shift.endTime.slice(0, 5)}
                        </p>
                      </div>
                    </div>

                    {/* Selected */}
                    {selected && (
                      <div
                        className={`
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              ${color.iconBg}
            `}
                      >
                        <Check
                          size={15}
                          strokeWidth={2.5}
                          className={color.icon}
                        />
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-[#E5E5EA] p-6 text-center">
                <Clock3 size={24} className="mx-auto !text-[#C7C7CC]" />

                <p className="mt-2 text-sm font-medium !text-[#1C1C1E]">
                  Chưa có ca phù hợp
                </p>

                <p className="mt-1 text-xs !text-[#8E8E93]">
                  Vui lòng chọn ngày khác.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
      {/* ========================= */}
      {/* SUMMARY */}
      {/* ========================= */}
      {selectedShift && (
        <section className="overflow-hidden rounded-2xl border border-[#D1D1D6]">
          {/* Header */}
          <div className="border-b border-[#D1D1D6] px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#6E6E73]">
              Tóm tắt thay đổi
            </p>
          </div>

          <div className="p-4">
            <div className="flex items-stretch gap-3">
              {/* Ca hiện tại */}
              <div className="min-w-0 flex-1 rounded-xl border border-[#D1D1D6] p-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93]">
                  Ca hiện tại
                </p>

                <p className="truncate text-sm font-bold text-[#1C1C1E] dark:text-white">
                  {currentShift?.name}
                </p>

                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#6E6E73]">
                  <Clock3 size={13} />

                  <span>
                    {currentShift?.startTime.slice(0, 5)}
                    {" - "}
                    {currentShift?.endTime.slice(0, 5)}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex shrink-0 items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D1D1D6]">
                  <ArrowRight size={15} className="text-[#8E8E93]" />
                </div>
              </div>

              {/* Ca mới */}
              <div className="min-w-0 flex-1 rounded-xl border border-[#007AFF] p-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#007AFF]">
                  Ca mới
                </p>

                <p className="truncate text-sm font-bold text-[#007AFF]">
                  {selectedShift.name}
                </p>

                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#4F83C2]">
                  <Clock3 size={13} />

                  <span>
                    {selectedShift.startTime.slice(0, 5)}
                    {" - "}
                    {selectedShift.endTime.slice(0, 5)}
                  </span>
                </div>
              </div>
            </div>

            {/* Ngày chuyển đến */}
            {mode === "different" && newWorkDate && (
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#007AFF] px-3.5 py-3">
                <CalendarDays size={16} className="shrink-0 text-[#007AFF]" />

                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-[#8E8E93]">
                    Ngày chuyển đến
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-[#007AFF]">
                    {format(newWorkDate, "EEEE, dd/MM/yyyy", { locale: vi })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
const getShiftColor = (shiftName: string) => {
  const name = shiftName.toLowerCase();

  if (name.includes("sáng")) {
    return {
      border: "border-[#F59E0B]",
      hover: "hover:border-[#F59E0B]/60",
      icon: "!text-[#F59E0B]",
      iconBg: "bg-[#F59E0B]/10",
      text: "!text-[#D97706]",
    };
  }

  if (name.includes("chiều")) {
    return {
      border: "border-[#8B5CF6]",
      hover: "hover:border-[#8B5CF6]/60",
      icon: "!text-[#8B5CF6]",
      iconBg: "bg-[#8B5CF6]/10",
      text: "!text-[#7C3AED]",
    };
  }

  if (name.includes("đêm")) {
    return {
      border: "border-[#007AFF]",
      hover: "hover:border-[#007AFF]/60",
      icon: "!text-[#007AFF]",
      iconBg: "bg-[#007AFF]/10",
      text: "!text-[#007AFF]",
    };
  }

  return {
    border: "border-[#8E8E93]",
    hover: "hover:border-[#8E8E93]/60",
    icon: "!text-[#8E8E93]",
    iconBg: "bg-[#F2F2F7]",
    text: "!text-[#1C1C1E]",
  };
};
