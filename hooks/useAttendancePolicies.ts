"use client";

import { useEffect, useState } from "react";
import {
  attendancePolicyService,
  AttendancePolicyResponse,
  CreateAttendancePolicyRequest,
  UpdateAttendancePolicyRequest,
} from "@/services/attendancePolicy.service";

export function useAttendancePolicies() {
  const [attendancePolicies, setAttendancePolicies] = useState<
    AttendancePolicyResponse[]
  >([]);

  const [loading, setLoading] = useState(false);

  const fetchAttendancePolicies = async () => {
    setLoading(true);

    try {
      const res = await attendancePolicyService.getAll();
      setAttendancePolicies(res.data.data);
    } catch(e:any){
      console.log(e.response)
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendancePolicies();
  }, []);

  const create = async (data: CreateAttendancePolicyRequest) => {
    await attendancePolicyService.create(data);
    await fetchAttendancePolicies();
  };

  const update = async (
    id: number,
    data: UpdateAttendancePolicyRequest
  ) => {
    await attendancePolicyService.update(id, data);
    await fetchAttendancePolicies();
  };

  const remove = async (id: number) => {
    await attendancePolicyService.delete(id);
    await fetchAttendancePolicies();
  };

  return {
    attendancePolicies,
    loading,
    create,
    update,
    remove,
    refresh: fetchAttendancePolicies,
  };
}