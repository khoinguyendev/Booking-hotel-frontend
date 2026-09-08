"use client";

import { useCallback, useEffect, useState } from "react";

import { amenityService } from "@/services/amenity.service";
import {
  AddHotelAmenitiesRequest,
  Amenitie,
  AmenityRequest,
} from "@/types/amenitie";

export function useAmenities() {
  const [amenities, setAmenities] = useState<Amenitie[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  const fetchAmenities = useCallback(async () => {
    try {
      setLoading(true);

      const response = await amenityService.getAll();

      setAmenities(response.data.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách tiện ích:", error);
      setAmenities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAmenity = async (data: AmenityRequest) => {
    try {
      setLoading(true);

      await amenityService.create(data);

      await fetchAmenities();

      return true;
    } catch (error) {
      console.error("Lỗi tạo tiện ích:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addAmenitiesToHotel = async (
    data: AddHotelAmenitiesRequest,
  ) => {
    try {
      setAdding(true);

      await amenityService.addToHotel(data);

      return true;
    } catch (error) {
      console.error(
        "Lỗi thêm tiện ích cho khách sạn:",
        error,
      );

      return false;
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, [fetchAmenities]);

  return {
    amenities,
    loading,
    adding,

    fetchAmenities,
    createAmenity,
    addAmenitiesToHotel,
  };
}