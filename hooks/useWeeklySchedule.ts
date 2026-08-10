import { useCallback, useEffect, useState } from "react";
import { format, startOfWeek } from "date-fns";

import { EmployeeSchedule } from "@/types/workSchedule";
import { workScheduleService } from "@/services/workSchedule.service";
import { usePagination } from "./usePayroll";

interface Props {
  currentDate: Date;
  positionId?: number;
  shiftId?: number;
  keyword?: string;
}

export function useWeeklySchedule({
  currentDate,
  positionId,
  shiftId,
  keyword,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [employees, setEmployees] = useState<EmployeeSchedule[]>([]);

  // Lịch làm việc của chính nhân viên

  const pagination = usePagination();

  const { page, pageSize, setTotalItems, setTotalPages } = pagination;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await workScheduleService.getWeeklySchedule({
        weekStart: format(
          startOfWeek(currentDate, {
            weekStartsOn: 1,
          }),
          "yyyy-MM-dd",
        ),
        page,
        pageSize,
        positionId: Number(positionId) || undefined,
        shiftId: Number(shiftId) || undefined,
        keyword,
      });

      const data = res.data.data;

      setEmployees(data.items);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [
    currentDate,
    page,
    pageSize,
    positionId,
    shiftId,
    keyword,
    setTotalItems,
    setTotalPages,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    employees,
    loading,
    
    pagination,
    refetch: fetchData,
  };
}
