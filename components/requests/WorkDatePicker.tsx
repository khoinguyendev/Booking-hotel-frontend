"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Check, Clock3, ArrowRight } from "lucide-react";

import { format, isSameDay, parseISO } from "date-fns";

import { vi } from "date-fns/locale";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";

import { WorkScheduleResponse } from "@/types/workSchedule";

import { RequestResponse } from "@/types/requests";

interface Props {
  workDate?: Date;
  schedules: WorkScheduleResponse[];
  //   requests: RequestResponse[];
  onSelect: (date: Date,selectedSchedule:WorkScheduleResponse|null) => void;
}

export function WorkDatePicker({
  workDate,
  schedules,
  //   requests,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  /**
   * Lịch của ngày đang chọn
   */
  const selectedSchedule = useMemo(() => {
    if (!workDate) return null;

    return (
      schedules.find((item) => isSameDay(parseISO(item.workDate), workDate)) ??
      null
    );
  }, [workDate, schedules]);

  /**
   * Các đơn đổi ca đang chờ xử lý
   *
   * status = 1
   * type = 2
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
   * Kiểm tra ngày có đơn đổi ca pending không
   */
  //   const hasPendingRequest = (date: Date) => {
  //     return pendingShiftChangeDates.some((dateString) =>
  //       isSameDay(
  //         parseISO(dateString),
  //         date,
  //       ),
  //     );
  //   };

  /**
   * Lấy label ca
   */
  const getShiftLabel = () => {
    if (!selectedSchedule) {
      return null;
    }

    if (selectedSchedule.isDayOff) {
      return {
        title: "Ngày nghỉ",
        time: null,
      };
    }

    if (!selectedSchedule.shift) {
      return {
        title: "Chưa phân ca",
        time: null,
      };
    }

    return {
      title: selectedSchedule.shift.name,
      time: `${selectedSchedule.shift.startTime.slice(
        0,
        5,
      )} - ${selectedSchedule.shift.endTime.slice(0, 5)}`,
    };
  };
  const shiftInfo = getShiftLabel();
  const isDateSelectable = (date: Date) => {
    const schedule = schedules.find((item) =>
      isSameDay(parseISO(item.workDate), date),
    );

    // Không có lịch
    if (!schedule) {
      return false;
    }

    // Ngày nghỉ
    if (schedule.isDayOff) {
      return false;
    }

    // Không có ca
    if (!schedule.shift) {
      return false;
    }

    // Đang có đơn đổi ca
    //   if (hasPendingRequest(date)) {
    //     return false;
    //   }

    return true;
  };
  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          flex
          h-14
          w-full
          items-center
          gap-3
          rounded-2xl
          border
          border-[#E5E5EA]
          
          px-4
          text-left
          transition
          hover:border-[#007AFF]
          
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#007AFF]/10
          "
        >
          <CalendarDays size={18} className="text-[#007AFF]" />
        </div>

        <div className="min-w-0 flex-1">
          {workDate ? (
            <>
              <div className="text-sm font-semibold text-[#007AFF]">
                {format(workDate, "EEEE, dd/MM/yyyy", {
                  locale: vi,
                })}
              </div>

              {shiftInfo?.time ? (
                <div className="mt-0.5 flex items-center gap-1 text-xs text-[#8E8E93]">
                  <Clock3 size={13} />

                  <span>{shiftInfo.title}</span>

                  <span>•</span>

                  <span>{shiftInfo.time}</span>
                </div>
              ) : (
                <div className="mt-0.5 text-xs text-[#8E8E93]">
                  {shiftInfo?.title ?? "Chưa chọn ngày"}
                </div>
              )}
            </>
          ) : (
            <span className="text-sm text-[#8E8E93]">Chọn ngày làm việc</span>
          )}
        </div>
      </button>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Chọn ngày làm việc
            </DialogTitle>
          </DialogHeader>

          <Calendar
            mode="single"
            selected={workDate}
            locale={vi}
            className="w-full"
            disabled={(date) => !isDateSelectable(date)}
            onSelect={(date) => {
                
              if (!date) return;
 
              if (!isDateSelectable(date)) {
                return;
              }
              
             onSelect(date,selectedSchedule);
              setOpen(false);
            }}
            modifiers={{
              hasSchedule: schedules
                .filter((item) => !item.isDayOff && item.shift)
                .map((item) => parseISO(item.workDate)),

            //   pending: pendingShiftChangeDates.map((date) => parseISO(date)),
            }}
            modifiersClassNames={{
              hasSchedule: "font-semibold text-[#007AFF]",

              pending: "bg-orange-50 text-orange-600",
            }}
          />

          {/* Legend */}
          <div className="flex flex-wrap gap-4 border-t pt-4 text-xs text-[#8E8E93]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#007AFF]" />
              Có lịch làm
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              Đang chờ đổi ca
            </div>
          </div>

          {/* Selected day */}
          {workDate && (
            <div className="rounded-2xl bg-[#F5F5F7] p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
                Lịch làm việc
              </div>

              {selectedSchedule?.isDayOff ? (
                <div className="font-semibold">Ngày nghỉ</div>
              ) : selectedSchedule?.shift ? (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#1C1C1E]">
                      {selectedSchedule.shift.name}
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-sm text-[#8E8E93]">
                      <Clock3 size={14} />

                      {selectedSchedule.shift.startTime.slice(0, 5)}

                      {" - "}

                      {selectedSchedule.shift.endTime.slice(0, 5)}
                    </div>
                  </div>

                  <Check size={20} className="text-[#007AFF]" />
                </div>
              ) : (
                <div className="text-sm text-[#8E8E93]">Chưa phân ca</div>
              )}

              {/* {hasPendingRequest(workDate) && (
                <div className="mt-3 rounded-xl bg-orange-50 px-3 py-2 text-xs font-medium text-orange-600">
                  Ngày này đang có yêu cầu đổi ca
                  chờ xử lý.
                </div>
              )} */}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
