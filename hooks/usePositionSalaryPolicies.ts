"use client";

import { useCallback, useEffect, useState } from "react";

import { positionSalaryPolicyService } from "@/services/positionSalaryPolicy.service";

import {
  CreatePositionSalaryPolicyRequest,
  PositionSalaryPolicyResponse,
  UpdatePositionSalaryPolicyRequest,
} from "@/types/positionSalaryPolicy";

export function usePositionSalaryPolicies() {
  const [policies, setPolicies] = useState<
    PositionSalaryPolicyResponse[]
  >([]);

  const [loading, setLoading] = useState(false);

  const fetchPolicies = useCallback(async () => {
    try {
      setLoading(true);

      const res =
        await positionSalaryPolicyService.getAll();

      setPolicies(res.data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPolicies();
  }, [fetchPolicies]);

  const create = async (
    data: CreatePositionSalaryPolicyRequest
  ) => {
    await positionSalaryPolicyService.create(data);

    await fetchPolicies();
  };

  const update = async (
    id: number,
    data: UpdatePositionSalaryPolicyRequest
  ) => {
    await positionSalaryPolicyService.update(id, data);

    await fetchPolicies();
  };

  const remove = async (id: number) => {
    await positionSalaryPolicyService.delete(id);

    await fetchPolicies();
  };

  return {
    policies,
    loading,

    refetch: fetchPolicies,

    create,

    update,

    remove,
  };
}