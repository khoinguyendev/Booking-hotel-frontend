import api from "@/lib/axios";


export const hotelSurchargeService = {
  create(data: any) {
    return api.post("/hotel-surcharges", data);
  },

  update(id: number, data: any) {
    return api.put(`/hotel-surcharges/${id}`, data);
  },

  delete(id: number) {
    return api.delete(`/hotel-surcharges/${id}`);
  },
};