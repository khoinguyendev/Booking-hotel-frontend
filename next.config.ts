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
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/customer",
      },
      {
        source: "/khach-san",
        destination: "/customer/hotel",
      },
      {
        source: "/khach-san/:slug",
        destination: "/customer/hotel/:slug",
      },
      {
        source: "/booking/:token",
        destination: "/customer/booking/:token",
      },
      {
        source: "/booking/manage/:token",
        destination: "/customer/booking/manage/:token",
      },
      {
        source: "/payment/success",
        destination: "/customer/payment/success",
      },
      {
        source: "/dang-nhap",
        destination: "/login",
      },
      {
        source: "/dang-ky",
        destination: "/register",
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
        destination: "/admin/staff",
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
        source: "/quan-ly/loai-phong/:id",
        destination: "/admin/roomtype/:id",
      },
      {
        source: "/quan-ly/phong/:id",
        destination: "/admin/room/:id",
      },
      {
        source: "/quan-ly/yeu-cau",
        destination: "/admin/requests",
      },
      {
        source: "/quan-ly/lich-lam-viec",
        destination: "/admin/workschedule",
      },
      {
        source: "/quan-ly/lich-lam-viec/nhan-vien/:id",
        destination: "/admin/workschedule/:id",
      },

      {
        source: "/quan-ly/luong",
        destination: "/admin/salary",
      },
      {
        source: "/quan-ly/tien-ich",
        destination: "/admin/amenity",
      },
      {
        source: "/quan-ly/chinh-sach",
        destination: "/admin/policy",
      },
    ];
  },
};

export default nextConfig;
