"use client";

import { useState } from "react";

import { CalendarDays, Clock3, Timer } from "lucide-react";

import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function OvertimeRequestForm() {
  const [date, setDate] = useState<Date>();

  const [fromTime, setFromTime] = useState("");

  const [toTime, setToTime] = useState("");

  const calculateHours = () => {
    if (!fromTime || !toTime) return 0;

    const start = new Date(`2026-01-01T${fromTime}`);

    const end = new Date(`2026-01-01T${toTime}`);

    const diff = (end.getTime() - start.getTime()) / 1000 / 60 / 60;

    return diff > 0 ? diff : 0;
  };

  const hours = calculateHours();

  return (
    <div
      className="
space-y-6
"
    >
      {/* Date */}

      <div>
        <label
          className="
mb-2
block
text-sm
font-semibold
"
        >
          Ngày tăng ca
        </label>

        <Popover>
<PopoverTrigger
  className="
    flex h-12 w-full items-center gap-3
    rounded-2xl border border-[#E5E5EA]
    px-4 text-left text-sm
  "
>
  <CalendarDays size={18} className="text-[#007AFF]" />

  {date ? (
    format(date, "dd/MM/yyyy")
  ) : (
    <span className="text-gray-400">Chọn ngày</span>
  )}
</PopoverTrigger>

          <PopoverContent className="p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time */}

      <div
        className="
grid
gap-4
md:grid-cols-2
"
      >
        <div>
          <label
            className="
mb-2
block
text-sm
font-semibold
"
          >
            Bắt đầu
          </label>

          <div
            className="
relative
"
          >
            <Clock3
              size={18}
              className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"
            />

            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="
h-12
w-full

rounded-2xl

border

border-[#E5E5EA]

pl-12

dark:border-[#2C2C2E]

dark:bg-[#1C1C1E]
"
            />
          </div>
        </div>

        <div>
          <label
            className="
mb-2
block
text-sm
font-semibold
"
          >
            Kết thúc
          </label>

          <div
            className="
relative
"
          >
            <Clock3
              size={18}
              className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-400
"
            />

            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              className="
h-12
w-full

rounded-2xl

border

border-[#E5E5EA]

pl-12

dark:border-[#2C2C2E]

dark:bg-[#1C1C1E]
"
            />
          </div>
        </div>
      </div>

      {/* Hours */}

      {hours > 0 && (
        <div
          className="
flex
items-center
gap-3

rounded-2xl

bg-green-50

p-4

dark:bg-green-950/30
"
        >
          <Timer size={22} className="text-green-600" />

          <div>
            <p
              className="
text-sm
font-semibold
text-green-700

dark:text-green-300
"
            >
              Tổng thời gian tăng ca
            </p>

            <p
              className="
text-xl
font-black
text-green-700

dark:text-green-300
"
            >
              {hours.toFixed(1)} giờ
            </p>
          </div>
        </div>
      )}

      {/* Reason */}

      <div>
        <label
          className="
mb-2
block
text-sm
font-semibold
"
        >
          Lý do tăng ca
        </label>

        <textarea
          rows={4}
          placeholder="
Nhập lý do cần tăng ca...
"
          className="
w-full

resize-none

rounded-2xl

border

border-[#E5E5EA]

p-4

outline-none

focus:border-[#007AFF]

dark:border-[#2C2C2E]

dark:bg-[#1C1C1E]
"
        />
      </div>
    </div>
  );
}
