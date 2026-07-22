// hooks/useShift.ts

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getShifts, deleteShift,
    updateShift,
    CreateShiftRequest,
} from "@/services/shift.service";
import { Shift } from "@/types/shift";

export const useShift = () => {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchShifts();
    }, []);

    const fetchShifts = async () => {
        try {
            setLoading(true);

            const res = await getShifts();

            setShifts(res.data);
        } catch {
            toast.error("Không tải được danh sách ca làm");
        } finally {
            setLoading(false);
        }
    };
    const editShift = async (
        id: number,
        data: CreateShiftRequest
    ) => {
        await updateShift(id, data);
        await fetchShifts();
    };

    const removeShift = async (id: number) => {
        try {
            await deleteShift(id);

            toast.success("Đã xóa ca làm");

            await fetchShifts();
        } catch {
            toast.error("Xóa thất bại");
        }
    };
    return {
        shifts,
        loading,
        fetchShifts,
        editShift,
        removeShift,
    };
};