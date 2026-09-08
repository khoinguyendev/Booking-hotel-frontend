import api from "@/lib/axios";
import { AddHotelAmenitiesRequest, Amenitie, AmenityRequest } from "@/types/amenitie";
import { ApiResponse } from "@/types/api";

export const amenityService = {
  create(data: AmenityRequest) {
    return api.post<any>("/amenities", data);
  },
  getAll() {
    return api.get<ApiResponse<Amenitie[]>>("/amenities");
  },

  delete(id: number) {
    return api.delete(`/amenities/${id}`);
  },

   addToHotel(data: AddHotelAmenitiesRequest) {
    return api.post("/hotels/amenities", data);
  },

  removeFromHotel(amenityId: number) {
    return api.delete(`/hotels/amenities/${amenityId}`);
  },
};
