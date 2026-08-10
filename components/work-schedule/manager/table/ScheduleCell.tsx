"use client";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock3, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import { ScheduleItem } from "@/types/workSchedule";
import { getShiftInfo } from "@/utils/schedule";
import { isAfter, parseISO, startOfDay } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  schedule?: ScheduleItem;
  onClick?: () => void;
  onEdit?: () => void;
  onEditOvertime?: () => void;
  onDelete?: () => void;
  onDeleteOver?: () => void;
}

export default function ScheduleCell({
  schedule,
  onClick,
  onDelete,
  onEdit,
  onDeleteOver,
  onEditOvertime,
}: Props) {
  const isEditable =
    schedule?.workDate &&schedule?.status!="DayOff"&&
    isAfter(parseISO(schedule.workDate), startOfDay(new Date()));
  // Chưa có ca
  if (!schedule?.shiftId&&schedule?.status!="DayOff") {
    return (
      <button
        onClick={isEditable ? onClick : undefined}
        // onClick={onClick}
        disabled={!isEditable}
        className={`
          flex
          h-[70px]
          w-full
          flex-col
          items-center
          justify-center
          gap-1

          rounded-xl
          border
          border-dashed
          border-gray-300

          bg-muted/20

          text-xs
          text-muted-foreground
 ${
   isEditable
     ? "cursor-pointer text-muted-foreground hover:border-primary hover:bg-primary/5 hover:text-primary"
     : "cursor-not-allowed opacity-50"
 }
          transition
          hover:border-primary
          hover:bg-primary/5
          hover:text-primary
        `}
      >
        <Plus size={18} />

        <span>Thêm ca</span>
      </button>
    );
  }

  const config = getShiftInfo(schedule.shiftName);
  const Icon = config.icon;

  return (
    <div className="relative group">
      <button
        onClick={isEditable ? onClick : undefined}
        disabled={!isEditable}
        className={`
      flex
      h-[70px]
      w-full
      flex-col
      items-center
      justify-center
      gap-1
      rounded-xl
      text-xs
      font-medium
      transition
      ${config.className}
      ${isEditable ? "hover:scale-[1.03]" : "cursor-not-allowed opacity-60"}
    `}
      >
        <Icon size={18} />
        <span>{config.label}</span>

        {schedule.startTime && schedule.endTime && (
          <span className="text-[10px] opacity-70">
            {schedule.startTime} - {schedule.endTime}
          </span>
        )}
      </button>
      {schedule.overtime && (
        <div className="absolute top-1 left-1">
          <Tooltip>
            <TooltipTrigger>
              <Badge className="bg-orange-500 text-white text-[10px]">OT</Badge>
            </TooltipTrigger>

            <TooltipContent side="top" className="min-w-52 rounded-xl p-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 border-b pb-2">
                  <span className="rounded-md bg-orange-100 px-2 py-1 text-[10px] font-semibold text-orange-600">
                    OT
                  </span>

                  <span className="font-medium">Thông tin tăng ca</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Thời gian</span>

                  <span className="font-medium">
                    {schedule.overtime.startTime} - {schedule.overtime.endTime}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Số giờ</span>

                  <span className="font-semibold text-orange-600">
                    {schedule.overtime.hours} giờ
                  </span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
      {isEditable && (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="
        absolute
        right-1
        top-1
        flex
        h-7
        w-7
        items-center
        justify-center
        rounded-md
        text-muted-foreground
        opacity-0
        transition-all
        duration-200
        group-hover:opacity-100
        hover:bg-black/10
        hover:text-foreground
        focus:outline-none
        dark:hover:bg-white/10
      "
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={4}
            className="w-44 rounded-xl p-1.5"
          >
            <DropdownMenuItem
              onClick={onEdit}
              className="
          cursor-pointer
          rounded-lg
          px-2.5
          py-2
          text-sm
          focus:bg-muted
        "
            >
              <Pencil className="mr-2.5 h-4 w-4 text-blue-500" />
              <span>Chỉnh sửa ca</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={onEditOvertime}
              className="
            cursor-pointer
            rounded-lg
            px-2.5
            py-2
            text-sm
            focus:bg-muted
          "
            >
              <Clock3 className="mr-2.5 h-4 w-4 text-orange-500" />
              <span>Chỉnh sửa OT</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={onDelete}
              className="
    cursor-pointer
    rounded-lg
    px-2.5
    py-2
    text-sm
    text-red-600
    focus:bg-red-50
    focus:text-red-600
    dark:focus:bg-red-950/30
  "
            >
              <Trash2 className="mr-2.5 h-4 w-4" />
              Xóa ca
            </DropdownMenuItem>
            {schedule?.overtime && (
              <DropdownMenuItem
                onClick={onDeleteOver}
                className="
    cursor-pointer
    rounded-lg
    px-2.5
    py-2
    text-sm
    text-red-600
    focus:bg-red-50
    focus:text-red-600
    dark:focus:bg-red-950/30
  "
              >
                <Trash2 className="mr-2.5 h-4 w-4" />
                Xóa OT
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
