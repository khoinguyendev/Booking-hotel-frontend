"use client";

import { Coffee, Plus, Sunrise, Sunset, MoonStar } from "lucide-react";
import { WorkScheduleResponse } from "./WorkCalendar";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { format, isBefore, startOfDay } from "date-fns";
import { Shift } from "@/types/shift";
import { useParams, useSearchParams } from "next/navigation";
import { workService } from "@/services/work.service";
import toast from "react-hot-toast";

interface Props {
  date: Date;
  isCurrentMonth: boolean;
  shifts: Shift[];
  schedule?: WorkScheduleResponse;
  onClick?: (schedule?: WorkScheduleResponse) => void;
}

export default function CalendarDay({
  date,
  isCurrentMonth,
  schedule,
  shifts,
}: Props) {
  if (!isCurrentMonth) {
    return <div className="aspect-square" />;
  }
  const searchParams = useSearchParams();

  const id = searchParams.get("employeeId");
  const [open, setOpen] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState<number>();
  const today = startOfDay(new Date());

  const isToday =
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear();

  const hasSchedule = !!schedule;

  const isPastDate = isBefore(startOfDay(date), today);

  const handleOpen = () => {
    

    setOpen(true);
  };
  const style = getStyle(schedule);
  const handleSubmit = async () => {
    try {
      const payload = {
        workDate: format(date, "yyyy-MM-dd"),
        shiftId: selectedShiftId,
        hotelStaffId: id,
        isDayOff: false,
      };
      await workService.createWork(payload);
      toast.success("Work schedule created successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error creating work schedule:", error);
    }
  };
  return (
    <>
      <button
      disabled={isPastDate || hasSchedule}
        onClick={handleOpen}
        className={`
        relative
        aspect-square
        min-h-[135px]
        rounded-3xl
        border
        p-3
        text-left
        shadow-sm
        transition-colors
        hover:border-[#007AFF]
        hover:shadow-md

        ${style.bg}

        ${isToday ? "border-[#007AFF] ring-2 ring-[#007AFF]/15" : style.border}
      `}
      >
        {/* Header */}

        <div className="flex items-start justify-between">
          <div
            className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            text-sm
            font-black

            ${
              isToday
                ? "bg-[#007AFF] text-white"
                : "text-[#1C1C1E] dark:text-white"
            }
          `}
          >
            {date.getDate()}
          </div>

          {isToday && (
            <span
              className="
              rounded-full
              bg-[#EAF4FF]
              px-2.5
              py-1
              text-[10px]
              font-bold
              text-[#007AFF]
              dark:bg-[#0A3D73]
              dark:text-[#6EB8FF]
            "
            >
              Hôm nay
            </span>
          )}
        </div>

        {/* Body */}

        <div className="mt-4 flex h-[74px] flex-col justify-between">
          {!schedule && (
            <>
              {/* // <div className="flex flex-1 flex-col items-center justify-center text-gray-400">

          //   <Plus size={18} />

          //   <p className="mt-2 text-[11px] font-medium">
          //     Chưa phân ca
          //   </p>

          // </div> */}
              <div className="flex flex-1 flex-col items-center justify-center">
                <Coffee size={22} className="text-gray-500" />

                <p className="mt-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Ngày nghỉ
                </p>

                <p className="mt-1 text-[10px] text-gray-400">
                  Không có ca làm
                </p>
              </div>
            </>
          )}

          {schedule?.isDayOff && (
            <div className="flex flex-1 flex-col items-center justify-center">
              <Plus size={18} />
              <Coffee size={22} className="text-gray-500" />

              <p className="mt-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                Ngày nghỉ
              </p>

              <p className="mt-1 text-[10px] text-gray-400">Không có ca làm</p>
            </div>
          )}

          {schedule && !schedule.isDayOff && schedule.shift && (
            <>
              <div className="flex items-center gap-2">
                {getIcon(schedule.shift.name)}

                <span className={`truncate text-sm font-bold ${style.text}`}>
                  {schedule.shift.name}
                </span>
              </div>

              <div className="rounded-2xl bg-white/70 py-2 text-center shadow-sm dark:bg-[#2C2C2E]">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                  {schedule.shift.startTime.slice(0, 5)}

                  <span className="mx-2 text-gray-400">—</span>

                  {schedule.shift.endTime.slice(0, 5)}
                </p>
              </div>
            </>
          )}
        </div>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Đăng ký ca làm</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              {format(date, "dd/MM/yyyy")}
            </p>

            {shifts.map((shift) => (
              <button
                key={shift.id}
                onClick={() => setSelectedShiftId(shift.id)}
                className={`w-full rounded-xl border p-4 text-left transition
            ${
              selectedShiftId === shift.id
                ? "border-[#007AFF] bg-blue-50"
                : "border-[#E5E5EA]"
            }
          `}
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{shift.name}</span>

                  <span className="text-xs text-gray-500">
                    {shift.startTime.slice(0, 5)}
                    {" - "}
                    {shift.endTime.slice(0, 5)}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>

            <Button
              disabled={!selectedShiftId}
              onClick={() => handleSubmit()}
              // onClick={() => {
              //   console.log({
              //     workDate: format(date, "yyyy-MM-dd"),
              //     shiftId: selectedShiftId,
              //     hotelStaffId: id,
              //   });

              //   setOpen(false);
              // }}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function getIcon(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes("sáng"))
    return <Sunrise size={18} className="text-blue-500" />;

  if (lower.includes("chiều"))
    return <Sunset size={18} className="text-orange-500" />;

  if (lower.includes("đêm") || lower.includes("tối"))
    return <MoonStar size={18} className="text-violet-500" />;

  return <Coffee size={18} />;
}

function getStyle(schedule?: WorkScheduleResponse) {
  if (!schedule) {
    return {
      bg: "bg-white dark:bg-[#1C1C1E]",
      border: "border-[#E5E5EA] dark:border-[#2C2C2E]",
      text: "text-gray-700",
    };
  }

  if (schedule.isDayOff) {
    return {
      bg: "bg-gray-100 dark:bg-[#2C2C2E]",
      border: "border-gray-300",
      text: "text-gray-700",
    };
  }

  const name = schedule.shift?.name.toLowerCase() ?? "";

  if (name.includes("sáng")) {
    return {
      bg: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-500/40",
      text: "text-blue-700 dark:text-blue-400",
    };
  }

  if (name.includes("chiều")) {
    return {
      bg: "bg-orange-50 dark:bg-orange-950/20",
      border: "border-orange-200",
      text: "text-orange-700 dark:text-orange-300",
    };
  }

  if (name.includes("đêm") || name.includes("tối")) {
    return {
      bg: "bg-violet-50 dark:bg-violet-950/20",
      border: "border-violet-200",
      text: "text-violet-700 dark:text-violet-300",
    };
  }

  return {
    bg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-200",
    text: "text-green-700 dark:text-green-300",
  };
}
