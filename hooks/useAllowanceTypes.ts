"use client";

import { useEffect, useState } from "react";

import {
  AllowanceTypeResponse,
  CreateAllowanceTypeRequest,
  UpdateAllowanceTypeRequest,
  allowanceTypeService,
} from "@/services/allowanceType.service";

export function useAllowanceTypes() {
  const [allowanceTypes, setAllowanceTypes] = useState<
    AllowanceTypeResponse[]
  >([]);

  const [loading, setLoading] = useState(false);

  const fetchAllowanceTypes = async () => {
    setLoading(true);

    try {
      const res = await allowanceTypeService.getAll();

      setAllowanceTypes(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllowanceTypes();
  }, []);

  const create = async (data: CreateAllowanceTypeRequest) => {
    await allowanceTypeService.create(data);

    await fetchAllowanceTypes();
  };

  const update = async (
    id: number,
    data: UpdateAllowanceTypeRequest
  ) => {
    await allowanceTypeService.update(id, data);

    await fetchAllowanceTypes();
  };

  const remove = async (id: number) => {
    await allowanceTypeService.delete(id);

    await fetchAllowanceTypes();
  };

  return {
    allowanceTypes,
    loading,
    create,
    update,
    remove,
    refresh: fetchAllowanceTypes,
  };
}