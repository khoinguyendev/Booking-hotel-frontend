"use client";

import { useState } from "react";
import { X, Save, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { hotelStaffService } from "@/services/hotel-staff.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddStaffModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    hotelId: 1,
    positionId: 1,
    role: "Staff",
    codeId: "",
  });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await hotelStaffService.create(form);

      toast.success("Thêm nhân viên thành công");

      onSuccess();

      onClose();

      setForm({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        hotelId: 1,
        positionId: 1,
        role: "Staff",
        codeId: "",
      });
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ??
          "Không thể thêm nhân viên"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">

      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#1C1C1E] shadow-2xl">

        {/* Header */}

        <div className="flex justify-between items-center px-6 py-5 border-b">

          <div>

            <h2 className="font-black text-lg">
              Thêm nhân viên
            </h2>

            <p className="text-xs text-gray-500">
              Tạo tài khoản nhân viên cho khách sạn
            </p>

          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          <div className="grid grid-cols-2 gap-4">

            <div className="col-span-2">

              <label>Họ tên</label>

              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-xl border p-3"
              />

            </div>

            <div>

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-xl border p-3"
              />

            </div>

            <div>

              <label>Số điện thoại</label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full mt-1 rounded-xl border p-3"
              />

            </div>

            <div>

              <label>Mật khẩu</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-xl border p-3"
              />

            </div>

            <div>

              <label>Mã nhân viên</label>

              <input
                name="codeId"
                value={form.codeId}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-xl border p-3"
              />

            </div>

            <div>

              <label>Khách sạn</label>

              <input
                type="number"
                name="hotelId"
                value={form.hotelId}
                onChange={handleChange}
                className="w-full mt-1 rounded-xl border p-3"
              />

            </div>

            <div>

              <label>Chức vụ</label>

              <input
                type="number"
                name="positionId"
                value={form.positionId}
                onChange={handleChange}
                className="w-full mt-1 rounded-xl border p-3"
              />

            </div>

            <div className="col-span-2">

              <label>Role</label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full mt-1 rounded-xl border p-3"
              >
                <option value="Staff">
                  Staff
                </option>

                <option value="Manager">
                  Manager
                </option>

              </select>

            </div>

          </div>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-200"
            >
              Hủy
            </button>

            <button
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#007AFF] text-white"
            >
              <UserPlus size={18} />

              {loading ? "Đang thêm..." : "Thêm nhân viên"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}