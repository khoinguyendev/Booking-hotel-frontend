import { useCallback, useEffect, useState } from "react";

import { SalaryFilterRequest, salaryService } from "@/services/salary.service";
import {  SalaryResponseItem, SalaryStatus } from "@/types/salary";
import { PaginatedResponse } from "@/types/pagination";
import { usePagination } from "./usePayroll";
import toast from "react-hot-toast";

interface Props {
  month?: number;
  year?: number;
  status?: SalaryStatus;
  positionId?: number;
  keyword?: string;
}

export function useManagerSalaries({
  month,
  year,
  status,
  positionId,
  keyword,
}: Props = {}) {
  const [loading, setLoading] = useState(false);
  const [salaries, setSalaries] = useState<SalaryResponseItem[]>([]);
const [creating, setCreating] = useState(false);
  const pagination = usePagination();

  const {
    page,
    pageSize,
    setTotalItems,
    setTotalPages,
  } = pagination;
const createMonthlySalary = async () => {
  if (!month || !year) {
    return;
  }

  try {
    setCreating(true);

    const res = await salaryService.createSalaryMonth({
      month,
      year,
    });

    toast.success(
      `Đã tạo ${res.data.data.createdCount} bảng lương`,
    );

    await fetchData();
  } catch (error) {
    console.error(error);
    toast.error("Tạo bảng lương thất bại");
  } finally {
    setCreating(false);
  }
};
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const params: SalaryFilterRequest = {
        month: month && month > 0 ? month : undefined,
        year: year && year > 0 ? year : undefined,
        status,
        positionId,
        keyword: keyword?.trim() || undefined,
        page,
        pageSize,
      };

      const response = await salaryService.getByManager(params);

      const data: PaginatedResponse<SalaryResponseItem> =
        response.data.data;

      setSalaries(data.items);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch salaries:", error);
    } finally {
      setLoading(false);
    }
  }, [
    month,
    year,
    status,
    positionId,
    keyword,
    page,
    pageSize,
    setTotalItems,
    setTotalPages,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    salaries,
    loading,
    pagination,
    creating,
    createMonthlySalary,
    refetch: fetchData,
  };
}