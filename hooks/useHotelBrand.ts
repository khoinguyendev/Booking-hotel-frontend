import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getHotelBrands,
    createHotelBrand,
    updateHotelBrand,
    deleteHotelBrand,
} from "@/services/hotel-brand.service";

import {
    HotelBrand,
    CreateHotelBrandRequest,
} from "@/types/hotel-brand";

export const useHotelBrand = () => {
    const [brands, setBrands] = useState<
        HotelBrand[]
    >([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            setLoading(true);

            const res =
                await getHotelBrands();

            setBrands(res.data);
        } catch {
            toast.error(
                "Không tải được danh sách thương hiệu"
            );
        } finally {
            setLoading(false);
        }
    };

    const addBrand = async (
        data: CreateHotelBrandRequest
    ) => {
        try {
            await createHotelBrand(data);

            toast.success(
                "Thêm thương hiệu thành công"
            );

            await fetchBrands();
        } catch {
            toast.error(
                "Không thể thêm thương hiệu"
            );
        }
    };

    const editBrand = async (
        id: number,
        data: CreateHotelBrandRequest
    ) => {
        try {
            await updateHotelBrand(id, data);

            toast.success(
                "Cập nhật thành công"
            );

            await fetchBrands();
        } catch {
            toast.error(
                "Không thể cập nhật"
            );
        }
    };

    const removeBrand = async (
        id: number
    ) => {
        try {
            await deleteHotelBrand(id);

            toast.success(
                "Đã xóa thương hiệu"
            );

            await fetchBrands();
        } catch {
            toast.error(
                "Không thể xóa thương hiệu"
            );
        }
    };

    return {
        brands,
        loading,
        fetchBrands,
        addBrand,
        editBrand,
        removeBrand,
    };
};