'use client';

import {
  Plus,
  Upload,
  Download,
  CalendarPlus,
  Trash2,
} from 'lucide-react';

interface Props {
  selectedCount?: number;

  onCreate?: () => void;

  onImport?: () => void;

  onExport?: () => void;

  onAssignShift?: () => void;

  onDelete?: () => void;
}

export default function StaffToolbar({
  selectedCount = 0,
  onCreate,
  onImport,
  onExport,
  onAssignShift,
  onDelete,
}: Props) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4

        rounded-3xl

        border
        border-[#E5E5EA]

        bg-white

        p-5

        shadow-sm

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div>

        <h3 className="text-lg font-bold">
          Danh sách nhân viên
        </h3>

        <p className="text-sm text-[#8E8E93]">
          {selectedCount > 0
            ? `Đã chọn ${selectedCount} nhân viên`
            : 'Quản lý thông tin nhân viên'}
        </p>

      </div>

      <div
        className="
          flex
          flex-wrap
          gap-3
        "
      >

        <button
          onClick={onCreate}
          className="
            flex
            items-center
            gap-2

            rounded-2xl

            bg-[#007AFF]

            px-5
            py-3

            text-sm
            font-semibold
            text-white

            transition

            hover:bg-[#0062CC]
          "
        >
          <Plus size={18} />
          Thêm nhân viên
        </button>

        <button
          onClick={onAssignShift}
          className="
            flex
            items-center
            gap-2

            rounded-2xl

            border
            border-[#E5E5EA]

            px-5
            py-3

            text-sm
            font-medium

            hover:border-[#007AFF]

            dark:border-[#2C2C2E]
          "
        >
          <CalendarPlus size={18} />
          Phân ca
        </button>

        <button
          onClick={onImport}
          className="
            flex
            items-center
            gap-2

            rounded-2xl

            border
            border-[#E5E5EA]

            px-5
            py-3

            text-sm
            font-medium

            hover:border-[#007AFF]

            dark:border-[#2C2C2E]
          "
        >
          <Upload size={18} />
          Nhập Excel
        </button>

        <button
          onClick={onExport}
          className="
            flex
            items-center
            gap-2

            rounded-2xl

            border
            border-[#E5E5EA]

            px-5
            py-3

            text-sm
            font-medium

            hover:border-[#007AFF]

            dark:border-[#2C2C2E]
          "
        >
          <Download size={18} />
          Xuất Excel
        </button>

        {selectedCount > 0 && (
          <button
            onClick={onDelete}
            className="
              flex
              items-center
              gap-2

              rounded-2xl

              bg-red-500

              px-5
              py-3

              text-sm
              font-semibold
              text-white

              hover:bg-red-600
            "
          >
            <Trash2 size={18} />
            Xóa ({selectedCount})
          </button>
        )}

      </div>
    </div>
  );
}