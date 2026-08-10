"use client";

import { useCallback, useEffect, useState } from "react";

import { OvertimePolicyResponse, overtimePolicyService } from "@/services/overtimePolicy.service";
import { OvertimePolicyFormValues } from "@/components/policy/manager/OvertimePolicyDialog";

export function useOvertimePolicies() {
  const [policies, setPolicies] = useState<OvertimePolicyResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPolicies = useCallback(async () => {
    try {
      setLoading(true);

      const res = await overtimePolicyService.getAll();

      setPolicies(res.data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const create = async (data: OvertimePolicyFormValues) => {
    await overtimePolicyService.create(data);
    await fetchPolicies();
  };

  const update = async (id: number, data: OvertimePolicyFormValues) => {
    await overtimePolicyService.update(id, data);
    await fetchPolicies();
  };

//   const remove = async (id: number) => {
//     await overtimePolicyService.delete(id);
//     await fetchPolicies();
//   };

  return {
    policies,
    loading,
    refetch: fetchPolicies,
    create,
    update,
  };
}
