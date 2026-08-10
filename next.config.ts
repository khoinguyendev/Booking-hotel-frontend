import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
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
        source: "/admin/quan-ly/dat-phong",
        destination: "/admin/bookings",
      },
      {
        source: "/admin/quan-ly/trang-chu",
        destination: "/admin/dashboard",
      },
      {
        source: "/admin/quan-ly/nhan-vien",
        destination: "/admin/users",
      },
      {
        source: "/admin/quan-ly/khach-san",
        destination: "/admin/hotels",
      },
      {
        source: "/admin/quan-ly/khach-san/:id",
        destination: "/admin/hotels/[id]",
      },
      {
        source: "/admin/quan-ly/cham-cong",
        destination: "/admin/attendance",
      },
      {
        source: "/admin/quan-ly/danh-gia",
        destination: "/admin/evaluations",
      },
      {
        source: "/admin/quan-ly/hieu-suat",
        destination: "/admin/kpi",
      },
      {
        source: "/admin/quan-ly/luong-thuong",
        destination: "/admin/payroll",
      },
      {
        source: "/admin/quan-ly/bao-cao",
        destination: "/admin/reports",
      },
      {
        source: "/admin/quan-ly/su-kien",
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

      {
        source: "/quan-ly/khach-san",
        destination: "/admin/manager/hotels",
      },
      {
        source: "/quan-ly/khach-san/loai-phong/:id",
        destination: "/admin/manager/room-types/[id]",
      },
      {
        source: "/quan-ly/nhan-vien",
        destination: "/admin/manager/staff",
      },
      {
        source: "/quan-ly/cham-cong",
        destination: "/admin/manager/attendance",
      },
      {
        source: "/quan-ly/luong",
        destination: "/admin/manager/salary",
      },
      {
        source: "/quan-ly/chinh-sach",
        destination: "/admin/manager/policy",
      },
       {
        source: "/quan-ly/lich-lam-viec",
        destination: "/admin/manager/workschedule",
      },
      {
        source: "/quan-ly/yeu-cau",
        destination: "/admin/manager/request",
      },
      {
        source: "/quan-ly/nhan-vien/:id/lich-lam-viec",
        destination: "/admin/manager/staff/workschedule/:id",
      },

      {
        source: "/nhan-vien",
        destination: "/admin/employee/dashboard",
      },
      {
        source: "/nhan-vien/cham-cong",
        destination: "/admin/employee/attendance",
      },
      {
        source: "/nhan-vien/yeu-cau",
        destination: "/admin/employee/requests",
      },
      {
        source: "/nhan-vien/luong-thuong",
        destination: "/admin/employee/salary",
      },
      {
        source: "/nhan-vien/lich-lam-viec",
        destination: "/admin/employee/workschedule",
      },
    ];
  },
};

export default nextConfig;
