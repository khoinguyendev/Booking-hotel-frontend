// components/request/RequestTable.tsx

"use client";


import RequestTableHeader from "./RequestTableHeader";
import RequestTableRow from "./RequestTableRow";
import RequestEmpty from "./RequestEmpty";
import { RequestResponse } from "@/types/requests";

interface Props {
  records: RequestResponse[];
  loading?: boolean;
  approvingId:number|null
  onView?: (record: RequestResponse) => void;
  onApprove?: (id: RequestResponse) => void;
  onReject?: (record: RequestResponse) => void;
}

export default function RequestTable({
  records,
  approvingId,
  loading = false,
  onView,
  onApprove,
  onReject,
}: Props) {
  console.log(records);
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
        <table className="w-full">
          <RequestTableHeader />

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-16 text-center text-sm text-[#8E8E93]"
                >
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : records.length === 0 ? (
              <RequestEmpty />
            ) : (
              records.map((record) => (
                <RequestTableRow
                  key={record.id}
                  record={record}
                  approvingId={approvingId}
                  onView={onView}
                  onApprove={onApprove}
                  onReject={onReject}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}