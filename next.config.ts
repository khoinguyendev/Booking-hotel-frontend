import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
        return [
            {
                source: "/quan-ly/dang-nhap",
                destination: "/admin/login",
            },
            {
                source: "/quan-ly/dang-ky",
                destination: "/admin/register",
            },
            {
                source: "/quan-ly/dat-phong",
                destination: "/admin/bookings",
            },
            {
                source: "/quan-ly/trang-chu",
                destination: "/admin/dashboard",
            },
            {
                source: "/quan-ly/nhan-vien",
                destination: "/admin/users",
            },
            {
                source: "/quan-ly/khach-san",
                destination: "/admin/hotels",
            },
            {
                source: "/quan-ly/khach-san/:id",
                destination: "/admin/hotels/[id]",
            },
            {
                source: "/quan-ly/cham-cong",
                destination: "/admin/attendance",
            },
            {
                source: "/quan-ly/danh-gia",
                destination: "/admin/evaluations",
            },
            {
                source: "/quan-ly/hieu-suat",
                destination: "/admin/kpi",
            },
            {
                source: "/quan-ly/luong-thuong",
                destination: "/admin/payroll",
            },
            {
                source: "/quan-ly/bao-cao",
                destination: "/admin/reports",
            },
            {
                source: "/quan-ly/su-kien",
                destination: "/admin/events",
            },
            {
                source: "/trang-chu/khach-san",
                destination: "/main/hotels",
            },
            {
                source: "/trang-chu/khach-san/:id",
                destination: "/main/hotels/[id]",
            },
            {
                source: "/trang-chu",
                destination: "/main",
            },
        ];
    },
};

export default nextConfig;
