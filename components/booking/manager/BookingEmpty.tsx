"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import {
  CalendarX2,
  SearchX,
} from "lucide-react";

interface Props {
  title?: string;
  description?: string;
}

export default function BookingEmpty({
  title = "Không tìm thấy booking",
  description = "Không có booking nào phù hợp với bộ lọc hiện tại.",
}: Props) {
  return (
     <TableRow>
      <TableCell
        colSpan={10}
        className="h-60"
      >
    <div
      className="
        flex
        min-h-[300px]
        flex-col
        items-center
        justify-center

        rounded-3xl

        border
        border-[#E5E5EA]

        bg-white

        px-6
        py-12

        text-center

        shadow-sm

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center

          rounded-2xl

          bg-blue-50
          text-[#007AFF]

          dark:bg-blue-950/30
        "
      >
        <CalendarX2 size={30} />
      </div>

      <h3 className="mt-5 text-base font-bold">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-[#8E8E93]">
        {description}
      </p>
    </div>
    </TableCell></TableRow>
  );
}