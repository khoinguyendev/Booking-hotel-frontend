"use client";

import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import toast from "react-hot-toast";
export function useAuth() {
  const router = useRouter();

  const loginStore = useAuthStore((x) => x.login);

  async function login(email: string, password: string) {
    try {
      const res = await authService.login({
        email,
        password,
      });

      console.log(res);

      const data = res.data.data;
      const user = data.user;

      loginStore(
        data.accessToken,
        user.roleName,
        user as any,
        user.hotelId?.toString() ?? null,
        user.hotelStaffId?.toString() ?? null,
      );

      toast.success(res.data.message);

      router.replace("/quan-ly/khach-san");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại.");
    }
  }

  async function register(email: string, password: string) {
    try {
      const res = await authService.register({
        email,
        password,
      });
      toast.success("Đăng ký thành công.");
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Đăng ký thất bại.");
      throw error;
    }
  }

  async function verify(email: string, otp: string) {
    await authService.verifyEmail({
      email,
      otp,
    });

    router.push("/dang-nhap");
  }
  async function resendEmail(email: string) {
    await authService.resendEmail({
      email,
    });
  }
  return {
    login,
    register,
    verify,
    resendEmail,
  };
}
