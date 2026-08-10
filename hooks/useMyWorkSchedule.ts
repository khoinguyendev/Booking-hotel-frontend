import { staffService } from "@/services/staft.service";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export function useMyWorkSchedule(currentDate: Date) {
  const year = format(currentDate, "yyyy");
  const month = format(currentDate, "MM");

  const query = useQuery({
    queryKey: ["my-work-schedule", year, month],
    queryFn: async () => {
      const response = await staffService.getWorkScheduleByMe(
        year,
        month,
      );

      return response.data.data ?? [];
    },

    // Cache 5 phút
    staleTime: 10 * 60 * 1000,
  });

  return {
    schedules: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}