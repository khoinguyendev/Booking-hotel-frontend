// app/quan-ly/don-tu/page.tsx

"use client";

import DataTablePagination from "@/components/pagination/DataTablePagination";
import { OvertimePolicyDialog } from "@/components/requests/manager/OvertimePolicyDialogProps";
import RequestDetailDialog from "@/components/requests/manager/RequestDetailDialog";
import RequestFilter from "@/components/requests/manager/RequestFilter";
import RequestStats from "@/components/requests/manager/RequestStats";
import RequestTable from "@/components/requests/manager/RequestTable";
import { RequestTab } from "@/components/requests/manager/RequestTypeTabs";
import { useManagerRequests } from "@/hooks/useManagerRequests";
import {
  RequestResponse,
  RequestStatsResponse,
  RequestStatus,
  RequestType,
} from "@/types/requests";
import { useState } from "react";

export default function ManagerRequest() {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState<RequestStatus | 0>(0);
  const [disabled, setDisabled] = useState(false);
  const [type, setType] = useState<RequestType | 0>(0);
  const [fromDate, setFromDate] = useState("");
  const [overtimeRecord, setOvertimeRecord] = useState<RequestResponse | null>(
    null,
  );
  const [openOvertimePolicy, setOpenOvertimePolicy] = useState(false);
  const {
    requests,
    pagination,
    approveLeaveRequest,
    approveOvertimeRequest,
    approveShiftRequest,
    approvingId,
  } = useManagerRequests({
    keyword: search,
    type: type,
    status: status,
    fromDate: fromDate ?? undefined,
    toDate: toDate ?? undefined,
  });
  const [selectedRequest, setSelectedRequest] =
    useState<RequestResponse | null>(null);
  const handleView = (record: RequestResponse) => {
    setSelectedRequest(record);
    setDetailOpen(true);
  };

  const handleReject = () => {
    console.log("a");
  };
  const [detailOpen, setDetailOpen] = useState(false);

  const [stats, setStats] = useState<RequestStatsResponse>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [tab, setTab] = useState<RequestTab>("all");

  const handleRefresh = () => {
    setSearch("");
    setStatus(0);
    setFromDate("");
    setToDate("");
    setTab("all");
  };
  const handleApprove = async (record: RequestResponse) => {
    if (record.type === 1) {
      await approveLeaveRequest(record);
      return;
    }

    if (record.type === 2) {
      await approveShiftRequest(record);
      return;
    }
    if (record.type === 3) {
      setOvertimeRecord(record);
      setOpenOvertimePolicy(true);
      return;
    }
    // type khác nếu sau này có
  };

  const handleConfirmOvertime = async (policyId: number) => {
    if (!overtimeRecord) return;
    await approveOvertimeRequest(overtimeRecord, policyId);
    // Đóng modal trước
    setOpenOvertimePolicy(false);
    // Gửi record + policy lên cha

    setOvertimeRecord(null);
    setDisabled(false);
  };
  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Quản lý đơn từ</h1>

        <p className="mt-1 text-sm text-[#8E8E93]">
          Theo dõi và xử lý các yêu cầu của nhân viên
        </p>
      </div>

      {/* Stats */}

      <RequestStats
        pending={stats.pending}
        approved={stats.approved}
        rejected={stats.rejected}
        total={stats.total}
      />

      {/* Type Tabs */}

      {/* <RequestTypeTabs
        value={tab}
        onChange={setTab}
        counts={counts}
      /> */}

      {/* Filter */}

      <RequestFilter
        search={search}
        onSearchInputChange={setSearchInput}
        searchInput={searchInput}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        fromDate={fromDate}
        onFromDateChange={setFromDate}
        toDate={toDate}
        onToDateChange={setToDate}
        onRefresh={handleRefresh}
      />

      {/* Table */}

      <RequestTable
        records={requests}
        onApprove={handleApprove}
        onReject={approveLeaveRequest}
        onView={handleView}
        approvingId={approvingId}
      />
      <DataTablePagination
        page={pagination.page}
        pageSize={pagination.pageSize}
        totalItems={pagination.totalItems}
        totalPages={pagination.totalPages}
        onPageChange={pagination.setPage}
        onPageSizeChange={(size) => {
          pagination.setPageSize(size);
          pagination.setPage(1);
        }}
      />
      <RequestDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        record={selectedRequest}
        onApprove={approveLeaveRequest}
        onReject={handleReject}
      />
      <OvertimePolicyDialog
        open={openOvertimePolicy}
        disabled={disabled}
        onOpenChange={setOpenOvertimePolicy}
        onConfirm={handleConfirmOvertime}
      />
    </div>
  );
}
