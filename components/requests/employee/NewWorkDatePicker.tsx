"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Calendar } from "@/components/ui/calendar";

interface Props {
  date?: Date;
  onSelect: (date: Date) => void;
}

export function NewWorkDatePicker({
  date,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);

  /**
   * Chỉ cho chọn ngày SAU hôm nay.
   */
  const isDateSelectable = (date: Date) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return date > today;
  };

  const handleSelect = (selectedDate?: Date) => {
    if (!selectedDate) return;

    if (!isDateSelectable(selectedDate)) {
      return;
    }

    onSelect(selectedDate);
    setOpen(false);
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
          <CalendarDays
            size={18}
            className="text-[#007AFF]"
          />
        </div>

        <div className="min-w-0 flex-1">
          {date ? (
            <>
              <p className="text-sm font-semibold text-[#007AFF]">
                {format(date, "EEEE, dd/MM/yyyy", {
                  locale: vi,
                })}
              </p>

              <p className="mt-0.5 text-xs text-[#8E8E93]">
                Ngày chuyển đến
              </p>
            </>
          ) : (
            <span className="text-sm text-[#8E8E93]">
              Chọn ngày chuyển đến
            </span>
          )}
        </div>
      </button>

      {/* Calendar Dialog */}
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="max-w-md rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Chọn ngày chuyển đến
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-[#8E8E93]">
            Bạn có thể chọn bất kỳ ngày nào sau hôm nay.
          </p>

          <Calendar
            mode="single"
            selected={date}
            locale={vi}
            className="w-full"
            disabled={(day) =>
              !isDateSelectable(day)
            }
            onSelect={handleSelect}
          />

          <div className="rounded-2xl bg-[#F2F2F7] p-3 text-xs text-[#8E8E93]">
            Ngày chuyển đến phải lớn hơn ngày hiện tại.
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}