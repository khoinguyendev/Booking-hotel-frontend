import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getHotels,
    createHotel,
    updateHotel,
    deleteHotel,
} from "@/services/hotel.service";

import {
    Hotel,
    CreateHotelRequest,
} from "@/types/hotel";

export const useHotel = () => {
    const [hotels, setHotels] =
        useState<Hotel[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            setLoading(true);

            const res = await getHotels();

            setHotels(res.data);
        } catch {
            toast.error(
                "Không tải được khách sạn"
            );
        } finally {
            setLoading(false);
        }
    };

    const addHotel = async (
        data: CreateHotelRequest
    ) => {
        await createHotel(data);

        toast.success(
            "Tạo khách sạn thành công"
        );

        await fetchHotels();
    };

    const editHotel = async (
        id: number,
        data: CreateHotelRequest
    ) => {
        await updateHotel(id, data);

        toast.success(
            "Cập nhật khách sạn thành công"
        );

        await fetchHotels();
    };

    const removeHotel = async (
        id: number
    ) => {
        await deleteHotel(id);

        toast.success(
            "Đã xóa khách sạn"
        );

        await fetchHotels();
    };

    return {
        hotels,
        loading,

        fetchHotels,

        addHotel,
        editHotel,
        removeHotel,
    };
};