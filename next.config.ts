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
                source: "/quan-ly/trang-chu",
                destination: "/admin/dashboard",
            },
        ];
    },
};

export default nextConfig;
