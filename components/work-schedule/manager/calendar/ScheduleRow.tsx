"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import ScheduleCell from "./ScheduleCell";
import { EmployeeSchedule, ScheduleItem } from "@/types/workSchedule";



interface Props {
  employee: EmployeeSchedule;

  onCellClick?: (employee: EmployeeSchedule, schedule: ScheduleItem) => void;
}

export default function ScheduleRow({ employee, onCellClick }: Props) {
    
  return (
    <div
      className="
group

grid

min-w-max

grid-cols-[280px_repeat(7,minmax(140px,1fr))]

border-b

transition

hover:bg-[#F9F9FB]

dark:hover:bg-[#2A2A2D]
"
    >
      {/* Employee */}

      <div
        className="
          sticky
          left-0
          z-20

          flex
          items-center
          gap-4

          border-r

          bg-white

          p-4

          dark:border-[#2C2C2E]
          dark:bg-[#1C1C1E]
        "
      >
        <Avatar className="h-11 w-11">
          <AvatarImage src={employee.avatar} />

          <AvatarFallback>
            {employee.fullName.split(" ").slice(-1)[0][0]}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{employee.fullName}</p>

          <p className="text-xs text-muted-foreground">
            {employee.employeeCode}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {employee.position}
            </Badge>

            {employee.active ? (
              <Badge
                className="
                  bg-green-500
                  hover:bg-green-500
                "
              >
                Đang làm
              </Badge>
            ) : (
              <Badge variant="destructive">Nghỉ</Badge>
            )}
          </div>
        </div>
      </div>

      {/* 7 days */}

      {employee.schedules.map((schedule) => (
        <div key={schedule.id} className="p-2">
          <ScheduleCell
            schedule={schedule}
            onClick={() => onCellClick?.(employee, schedule)}
          />
        </div>
      ))}
    </div>
  );
}
