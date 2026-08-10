"use client";

export default function AttendanceTableHeader() {
  return (
    <thead>
      <tr>
        <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Nhân viên
        </th>

        <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Chức vụ
        </th>

        <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Ca làm
        </th>

        <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Check-in
        </th>

        <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Check-out
        </th>

        <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Trạng thái
        </th>

        <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Ghi chú
        </th>

        <th className="w-[90px] px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Thao tác
        </th>
      </tr>
    </thead>
  );
}