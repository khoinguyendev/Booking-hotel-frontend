'use client';

import { Users, Plus } from 'lucide-react';

interface Props {
  title?: string;
  description?: string;
  showCreateButton?: boolean;
  onCreate?: () => void;
}

export default function StaffEmpty({
  title = 'Chưa có nhân viên',
  description = 'Hiện chưa có nhân viên nào trong hệ thống hoặc không có kết quả phù hợp với bộ lọc.',
  showCreateButton = false,
  onCreate,
}: Props) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center

        rounded-3xl
        border
        border-dashed
        border-[#D1D1D6]

        bg-white

        px-8
        py-20

        text-center

        shadow-sm

        dark:border-[#3A3A3C]
        dark:bg-[#1C1C1E]
      "
    >
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center

          rounded-full

          bg-[#F2F2F7]

          dark:bg-[#2C2C2E]
        "
      >
        <Users
          size={36}
          className="text-[#8E8E93]"
        />
      </div>

      <h3 className="mt-6 text-xl font-bold text-[#1C1C1E] dark:text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#8E8E93]">
        {description}
      </p>

      {showCreateButton && (
        <button
          onClick={onCreate}
          className="
            mt-8

            inline-flex
            items-center
            gap-2

            rounded-2xl

            bg-[#007AFF]

            px-6
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
      )}
    </div>
  );
}