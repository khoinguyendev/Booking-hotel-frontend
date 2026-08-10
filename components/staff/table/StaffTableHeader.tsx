'use client';

interface Props {
  allSelected: boolean;
  onToggleAll: () => void;
}

export default function StaffTableHeader({
  allSelected,
  onToggleAll,
}: Props) {
  return (
    <thead className="bg-[#F8F8F8] dark:bg-[#2C2C2E]">
      <tr className="border-b border-[#E5E5EA] dark:border-[#3A3A3C]">

        {/* Checkbox */}

        <th className="w-12 px-4 py-4 text-left">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleAll}
            className="
              h-4
              w-4
              rounded
              border-gray-300
              text-[#007AFF]
              focus:ring-[#007AFF]
            "
          />
        </th>

        {/* Avatar */}

        <th className="w-20 px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Avatar
        </th>

        {/* Name */}

        <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Nhân viên
        </th>

        {/* Employee Code */}

        <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Mã NV
        </th>

        {/* Position */}

        <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Chức vụ
        </th>

        {/* Shift */}

        {/* <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Ca hôm nay
        </th> */}

        {/* Check in */}

        {/* <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Check-in
        </th> */}

        {/* Check out */}

        {/* <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Check-out
        </th> */}

        {/* Status */}

        {/* <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Trạng thái
        </th> */}
 <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Số điện thoại
        </th>

        {/* Actions */}

        <th className="w-24 px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
          Thao tác
        </th>

      </tr>
    </thead>
  );
}