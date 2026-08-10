'use client';

import { useMemo, useState } from 'react';

import { HotelStaff } from '@/types/staff';

import StaffTableHeader from './StaffTableHeader';
import StaffTableRow from './StaffTableRow';
import StaffEmpty from './StaffEmpty';
interface Props {
  records: HotelStaff[];

  loading?: boolean;

  onView?: (staff: HotelStaff) => void;

  onEdit?: (staff: HotelStaff) => void;

  onDelete?: (staff: HotelStaff) => void;
}

export default function StaffTable({
  records,
  loading = false,
  onView,
  onEdit,
  onDelete,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const allSelected =
    records.length > 0 &&
    selectedIds.length === records.length;

  const handleToggleAll = () => {
    if (allSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(records.map((x) => x.id));
  };

  const handleToggle = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  if (!loading && records.length === 0) {
    return <StaffEmpty />;
  }

  return (
    <div
      className="
        overflow-hidden

        rounded-3xl

        border
        border-[#E5E5EA]

        bg-white

        shadow-sm

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <StaffTableHeader
            allSelected={allSelected}
            onToggleAll={handleToggleAll}
          />

          <tbody>

            {records.map((staff) => (
              <StaffTableRow
                key={staff.id}
                staff={staff}
                checked={selectedIds.includes(staff.id)}
                onCheck={() => handleToggle(staff.id)}
                onView={() => onView?.(staff)}
                onEdit={() => onEdit?.(staff)}
                onDelete={() => onDelete?.(staff)}
              />
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}