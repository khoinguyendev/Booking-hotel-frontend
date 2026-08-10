// components/request/RequestTableHeader.tsx

"use client";

export default function RequestTableHeader() {
  return (
    <thead>
      <tr className="border-b dark:border-[#2C2C2E]">
        <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Nhân viên
        </th>

        <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Loại đơn
        </th>

        <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Thời gian
        </th>

        <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Trạng thái
        </th>

        <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Lý do
        </th>

        <th className="w-[90px] px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Thao tác
        </th>
      </tr>
    </thead>
  );
}