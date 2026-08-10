'use client';

import {
  Table,
  TableBody,
} from '@/components/ui/table';


import { SalaryItem } from '@/types/salary';
import SalaryTableHeader from './SalaryTableHeader';
import SalarySkeleton from './SalarySkeleton';
import SalaryEmpty from './SalaryEmpty';
import SalaryTableRow from './SalaryTableRow';

interface Props {
  salaries: SalaryItem[];

  loading?: boolean;

  onView?: (salary: SalaryItem) => void;

  onEdit?: (salary: SalaryItem) => void;

  onPay?: (salary: SalaryItem) => void;
}

export default function SalaryTable({
  salaries,
  loading = false,
  onView,
  onEdit,
  onPay,
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

        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      <div className="overflow-x-auto">
        <Table>

          <SalaryTableHeader />

          <TableBody>

            {loading ? (
              <SalarySkeleton />
            ) : salaries.length === 0 ? (
              <SalaryEmpty />
            ) : (
              salaries.map((salary) => (
                <SalaryTableRow
                  key={salary.id}
                  salary={salary}
                  onView={onView}
                  onEdit={onEdit}
                  onPay={onPay}
                />
              ))
            )}

          </TableBody>

        </Table>
      </div>
    </div>
  );
}