"use client";

import { AttendanceRecord } from "@/types/attendance";
import AttendanceTableHeader from "./AttendanceTableHeader";
import AttendanceSkeleton from "./AttendanceSkeleton";
import AttendanceTableRow from "./AttendanceTableRow";
import AttendanceEmpty from "./AttendanceEmpty";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SummaryDialog, { SummaryValues } from "../dialog/SummaryDialog";

interface Props {
  records: AttendanceRecord[];

  loading?: boolean;

  onView?: (record: AttendanceRecord) => void;

  onEdit?: (record: AttendanceRecord) => void;
}

export default function AttendanceTable({
  records,
  loading = false,
  onView,
  onEdit,
}: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-[#E5E5EA]
        bg-white
        shadow-sm
        px-3
        pt-3
        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      

      <div className="overflow-x-auto">
        <table className="w-full">
          <AttendanceTableHeader />

          <tbody>
            {loading && <AttendanceSkeleton />}

            {
              !loading&&records.map((item) => {
               
                  return (
                    <AttendanceTableRow
                      key={item.id}
                      record={item}
                      onView={onView}
                      onEdit={onEdit}
                    />
                  );
              })}
            {!loading && records.length === 0 && <AttendanceEmpty />}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
