import api from "@/lib/axios";
import {
  ApiResponse,
  CreateHotelStaffRequest,
  HotelStaff,
  HotelStaffPaging,
} from "@/types/hotel-staff";

export const hotelStaffService = {
  // Danh sách nhân viên
  getAll(page = 1, pageSize = 10) {
    return api.get<ApiResponse<HotelStaffPaging>>(
      "/hotel-staffs/all",
      {
        params: {
          Page: page,
          PageSize: pageSize,
        },
      }
    );
  },

  // Chi tiết nhân viên
  getById(id: number) {
    return api.get<ApiResponse<HotelStaff>>(
      `/hotel-staffs/${id}`
    );
  },
  getByEmployeeCode(code: string) {
    return api.get<ApiResponse<any>>(
      `/hotel-staffs/by-code/${code}`
    );
  },
  // Thêm nhân viên
  create(data: CreateHotelStaffRequest) {
    return api.post<ApiResponse<null>>(
      "/hotel-staffs",
      data
    );
  },

  // Cập nhật nhân viên
  update(
    id: number,
    data: Partial<CreateHotelStaffRequest>
  ) {
    return api.put<ApiResponse<null>>(
      `/hotel-staffs/${id}`,
      data
    );
  },

  // Xóa nhân viên
  delete(id: number) {
    return api.delete<ApiResponse<null>>(
      `/hotel-staffs/${id}`
    );
  },

  importStaff(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return api.post("/hotel-staffs/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};