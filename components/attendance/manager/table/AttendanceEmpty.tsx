"use client";

import { CalendarX } from "lucide-react";

export default function AttendanceEmpty() {
  return (
    <tr>
      <td colSpan={8} className="px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <CalendarX
            size={40}
            className="text-[#8E8E93]"
          />

          <h3 className="mt-5 text-lg font-bold">
            Không có dữ liệu chấm công
          </h3>

          <p className="mt-2 max-w-sm text-center text-sm text-[#8E8E93]">
            Không tìm thấy nhân viên phù hợp với bộ lọc hiện tại.
            Hãy thử thay đổi từ khóa hoặc ngày làm việc.
          </p>
        </div>
      </td>
    </tr>
  );
}