import { useEffect, useState } from "react";
import { getHotelById } from "@/services/hotel.service";
import { Hotel } from "@/types/hotel";

export const useHotelDetail = (
    id: number
) => {
    const [hotel, setHotel] =
        useState<Hotel | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        if (!id) return;

        fetchHotel();
    }, [id]);

    const fetchHotel = async () => {
        try {
            setLoading(true);

            const res =
                await getHotelById(id);

            setHotel(res.data);
        } finally {
            setLoading(false);
        }
    };

    return {
        hotel,
        loading,
        refresh: fetchHotel,
    };
};