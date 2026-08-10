"use client";

import { useEffect, useState } from "react";

import {
  CreatePositionRequest,
  PositionResponse,
  positionService,
  UpdatePositionRequest,
} from "@/services/position.service";

export function usePositions() {
  const [positions, setPositions] = useState<PositionResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPositions = async () => {
    setLoading(true);

    try {
      const res = await positionService.getAll();
      setPositions(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const create = async (data: CreatePositionRequest) => {
    await positionService.create(data);
    await fetchPositions();
  };

  const update = async (
    id: number,
    data: UpdatePositionRequest
  ) => {
    await positionService.update(id, data);
    await fetchPositions();
  };

  const remove = async (id: number) => {
    await positionService.delete(id);
    await fetchPositions();
  };

  return {
    positions,
    loading,
    create,
    update,
    remove,
    refresh: fetchPositions,
  };
}