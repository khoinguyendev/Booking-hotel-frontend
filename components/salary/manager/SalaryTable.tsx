'use client';

import {
  Table,
  TableBody,
} from '@/components/ui/table';


import SalaryTableHeader from './SalaryTableHeader';
import SalarySkeleton from './SalarySkeleton';
import SalaryEmpty from './SalaryEmpty';
import SalaryTableRow from './SalaryTableRow';
import { SalaryResponseItem } from '@/types/salary';

interface Props {
  salaries: SalaryResponseItem[];

  loading?: boolean;

  onView?: (salary: SalaryResponseItem) => void;

  onEdit?: (salary: SalaryResponseItem) => void;
  onCaculate?: (salary: SalaryResponseItem) => void;

  onPay?: (salary: SalaryResponseItem) => void;
}

export default function SalaryTable({
  salaries,
  loading = false,
  onView,
  onEdit,
  onCaculate,
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
                  onCaculate={onCaculate}
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