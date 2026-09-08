import { format, isSameDay, startOfMonth } from "date-fns";
import { vi } from "date-fns/locale";

interface CalendarMonthProps {
  month: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (date: Date) => void;
}

export function CalendarMonth({
  month,
  checkIn,
  checkOut,
  onSelect,
}: CalendarMonthProps) {
  const monthStart = startOfMonth(month);

  const firstDay = monthStart.getDay();

  // Chuyển Chủ nhật = 0 thành thứ 2 = 0
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();

  const days = [];

  for (let i = 0; i < offset; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(month.getFullYear(), month.getMonth(), day));
  }

  const today = new Date();

  return (
    <div>
      {/* Month */}
      <div className="mb-4 text-center">
        <h3 className="font-semibold capitalize text-zinc-900">
          {format(month, "MMMM yyyy", {
            locale: vi,
          })}
        </h3>
      </div>

      {/* Week */}
      <div className="mb-2 grid grid-cols-7">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-zinc-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} />;
          }

          const isToday = isSameDay(date, today);

          const isCheckIn = checkIn && isSameDay(date, checkIn);

          const isCheckOut = checkOut && isSameDay(date, checkOut);

          const isBetween =
            checkIn && checkOut && date > checkIn && date < checkOut;

          const isPast =
            date <
            new Date(today.getFullYear(), today.getMonth(), today.getDate());

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(date)}
              className={`
                relative
                flex
                h-10
                items-center
                justify-center
                text-sm
                transition

                ${
                  isPast
                    ? "cursor-not-allowed text-zinc-300"
                    : "text-zinc-700 hover:bg-zinc-100"
                }

                ${isBetween ? "bg-accent/10 text-accent" : ""}

                ${
                  isCheckIn || isCheckOut
                    ? "rounded-full bg-accent font-semibold text-white hover:bg-accent"
                    : ""
                }
              `}
            >
              {date.getDate()}

              {isToday && !isCheckIn && !isCheckOut && (
                <span
                  className="
                    absolute
                    bottom-1
                    h-1
                    w-1
                    rounded-full
                    bg-accent
                  "
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
