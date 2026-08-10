import { AttendanceRecord, AttendanceStatus } from "@/types/attendance";
import { addDays, format, startOfMonth } from "date-fns";





export interface CalendarAttendance {
  date: string;

  working: number;

  present: number;

  late: number;

  dayOff: number;
}

const positions = [
  "Lễ tân",
  "Buồng phòng",
  "Phục vụ",
  "Bảo vệ",
  "Bếp",
  "Quản lý",
];

const shifts = [
  "Ca sáng",
  "Ca chiều",
  "Ca tối",
];

const names = [
  "Nguyễn Văn An",
  "Nguyễn Văn Bình",
  "Nguyễn Văn Cường",
  "Lê Thị Hoa",
  "Lê Minh",
  "Trần Quốc Khánh",
  "Phạm Văn Long",
  "Đỗ Minh Tâm",
  "Đặng Hải",
  "Trương Mỹ Linh",
];

function random<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomTime(
  start: number,
  end: number
) {
  const h = Math.floor(
    Math.random() * (end - start) + start
  );

  const m = Math.floor(
    Math.random() * 60
  );

  return `${String(h).padStart(
    2,
    "0"
  )}:${String(m).padStart(2, "0")}`;
}

/* ======================================
   Calendar
====================================== */

export function getCalendarAttendance(): CalendarAttendance[] {
  const first = startOfMonth(new Date());

  return Array.from(
    { length: 31 },
    (_, index) => {
      const working =
        35 + Math.floor(Math.random() * 15);

      const late =
        Math.floor(Math.random() * 5);

      const dayOff =
        Math.floor(Math.random() * 4);

      const present =
        working - late - dayOff;

      return {
        date: format(
          addDays(first, index),
          "yyyy-MM-dd"
        ),

        working,

        present,

        late,

        dayOff,
      };
    }
  );
}

/* ======================================
   Attendance
====================================== */

export function getAttendanceByDate(
  date: Date
): AttendanceRecord[] {
  const workDate = format(
    date,
    "yyyy-MM-dd"
  );

  return Array.from(
    { length: 50 },
    (_, index) => {
      const status = random<AttendanceStatus>([
        "Present",
        "Present",
        "Present",
        "Present",
        "Late",
        "DayOff",
        "Absent",
        "NotCheckIn",
      ]);

      let checkIn;
      let checkOut;

      switch (status) {
        case "Present":
          checkIn = randomTime(7, 8);
          checkOut = randomTime(17, 18);
          break;

        case "Late":
          checkIn = randomTime(8, 9);
          checkOut = randomTime(17, 18);
          break;

        case "NotCheckIn":
          checkIn = undefined;
          checkOut = undefined;
          break;

        default:
          checkIn = undefined;
          checkOut = undefined;
      }

      return {
        id: index + 1,
        employeeId: index + 1,
        employeeCode: `NV${String(
          index + 1
        ).padStart(4, "0")}`,

        fullName: random(names),

        avatar: `https://i.pravatar.cc/150?img=${index + 1}`,

        position: random(positions),

        shift: random(shifts),

        workDate,

        checkInTime: checkIn,

        checkOutTime: checkOut,

        status,

        note:
          status === "Late"
            ? "Đến muộn"
            : status === "Absent"
            ? "Nghỉ không phép"
            : "",
      };
    }
  );
}

/* ======================================
   Dashboard
====================================== */

export function getAttendanceStats(
  records: AttendanceRecord[]
) {
  return {
    working: records.length,

    present: records.filter(
      (x) => x.status === "Present"
    ).length,

    late: records.filter(
      (x) => x.status === "Late"
    ).length,

    dayOff: records.filter(
      (x) => x.status === "DayOff"
    ).length,

    notCheckIn: records.filter(
      (x) => x.status === "NotCheckIn"
    ).length,
  };
}