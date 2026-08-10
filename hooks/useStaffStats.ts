// hooks/useStaffStats.ts

import { useCallback, useEffect, useState } from "react";
import { IStaffStats } from "@/types/staff";
import { staffService } from "@/services/staft.service";

export function useStaffStats() {
  const [staffStats, setStaffStats] = useState<IStaffStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchStaffStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await staffService.getStaffStats();
      setStaffStats(res.data.data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaffStats();
  }, [fetchStaffStats]);

  return {
    staffStats,
    loading,
    error,
    refetch: fetchStaffStats,
  };
}