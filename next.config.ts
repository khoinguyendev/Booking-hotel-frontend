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
        source: "/quan-ly/khach-san",
        destination: "/admin/hotels",
      },
      {
        source: "/quan-ly/nhan-su",
        destination: "/admin/staff",
      },
      {
        source: "/quan-ly/nhan-su/:id",
        destination: "/admin/staff/:id",
      },
      {
        source: "/quan-ly/cham-cong",
        destination: "/admin/attendance",
      },
      {
        source: "/quan-ly/cham-cong/phan-ca",
        destination: "/admin/attendance/shifts",
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
        source: "/quan-ly/khach-san/loai-phong/:id",
        destination: "/admin/room-types/:id",
      },
      {
        source: "/quan-ly/khach-san/loai-phong/phong/:id",
        destination: "/admin/room/:id",
      },
      {
        source: "/quan-ly/su-kien",
        destination: "/admin/events",
      },
      {
        source: "/nhan-vien/lich-lam-viec",
        destination: "/admin/employee/workschedule",
      },
      {
        source: "/nhan-vien/cham-cong",
        destination: "/admin/employee/attendance",
      },
      {
        source: "/nhan-vien/luong-thuong",
        destination: "/admin/employee/salary",
      },
      {
        source: "/nhan-vien/trang-chu",
        destination: "/admin/employee/dashboard",
      },
      {
        source: "/nhan-vien/yeu-cau",
        destination: "/admin/employee/requests",
      },
    ];
  },
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
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
