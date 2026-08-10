// components/request/RequestEmpty.tsx

"use client";

import { FileSearch } from "lucide-react";

export default function RequestEmpty() {
  return (
    <tr>
      <td
        colSpan={6}
        className="px-6 py-16"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2F2F7] text-[#8E8E93] dark:bg-[#2C2C2E]">
            <FileSearch size={26} />
          </div>

          <h3 className="mt-4 text-base font-bold">
            Không có đơn từ
          </h3>

          <p className="mt-1 text-center text-sm text-[#8E8E93]">
            Không tìm thấy đơn nào phù hợp với
            bộ lọc hiện tại.
          </p>
        </div>
      </td>
    </tr>
  );
}