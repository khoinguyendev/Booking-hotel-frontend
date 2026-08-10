import { useCallback, useEffect, useState } from "react";

import { requestService } from "@/services/request.service";
import { usePagination } from "./usePayroll";
import { RequestFilter, RequestResponse } from "@/types/requests";
import { PaginatedResponse } from "@/types/pagination";
import { toast } from "sonner";

interface Props {
  keyword?: string;
  type?: number;
  status?: number;
  fromDate?: string;
  toDate?: string;
}

export function useManagerRequests({
  keyword,
  type,
  status,
  fromDate,
  toDate,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [approvingId, setApprovingId] = useState<number | null>(null);

  const [requests, setRequests] = useState<RequestResponse[]>([]);

  const pagination = usePagination();

  const { page, pageSize, setTotalItems, setTotalPages } = pagination;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const params: RequestFilter = {
        keyword: keyword?.trim() || undefined,
        type: type && type > 0 ? type : undefined,
        status: status && status > 0 ? status : undefined,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
        page,
        pageSize,
      };
      console.log(params);
      const res = await requestService.getByManager(params);

      const data: PaginatedResponse<RequestResponse> = res.data.data;

      setRequests(data.items);

      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch staff requests:", err);
    } finally {
      setLoading(false);
    }
  }, [
    keyword,
    type,
    status,
    fromDate,
    toDate,
    page,
    pageSize,
    setTotalItems,
    setTotalPages,
  ]);
  const approveRequest = async (
    record: RequestResponse,
    approveFn: (id: number) => Promise<unknown>,
    successMessage: string,
  ) => {
    try {
      setApprovingId(record.id);

      await approveFn(record.id);

      toast.success(successMessage);

      await fetchData();
    } catch (err) {
      toast.error("Duyệt đơn thất bại");
      throw err;
    } finally {
      setApprovingId(null);
    }
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const approveLeaveRequest = (record: RequestResponse) =>
    approveRequest(
      record,
      requestService.approveLeaveRequest,
      "Đã duyệt đơn nghỉ phép",
    );

  const approveShiftRequest = (record: RequestResponse) =>
    approveRequest(
      record,
      requestService.approveShiftRequest,
      "Đã duyệt đơn đổi ca",
    );
  return {
    requests,
    approveLeaveRequest,
    approvingId,
    loading,
    pagination,
    approveShiftRequest,
    refetch: fetchData,
  };
}
