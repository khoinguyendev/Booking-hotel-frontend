"use client";

import { useEffect, useState } from "react";
import {
  CreateShiftRequest,
  ShiftResponse,
  shiftService,
  UpdateShiftRequest,
} from "@/services/shift.service";

export function useShifts() {
  const [shifts, setShifts] = useState<ShiftResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchShifts = async () => {
    setLoading(true);

    try {
      const res = await shiftService.getAll();
      setShifts(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const create = async (data: CreateShiftRequest) => {
    await shiftService.create(data);
    await fetchShifts();
  };

  const update = async (
    id: number,
    data: UpdateShiftRequest
  ) => {
    await shiftService.update(id, data);
    await fetchShifts();
  };

  const remove = async (id: number) => {
    await shiftService.delete(id);
    await fetchShifts();
  };

  return {
    shifts,
    loading,
    create,
    update,
    remove,
    refresh: fetchShifts,
  };
}