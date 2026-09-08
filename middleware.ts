import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value;

  const isAuthPage =
    pathname === "/dang-nhap" ||
    pathname === "/dang-ky";

  const isProtectedPage =
    pathname.startsWith("/quan-ly");

  // Đã đăng nhập → không cho vào login/register
  if (isAuthPage) {
    if (token && role && role !== "Customer") {
      return NextResponse.redirect(
        new URL("/quan-ly/khach-san", request.url)
      );
    }

    return NextResponse.next();
  }

  // Bảo vệ các trang quản lý
  if (isProtectedPage) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/dang-nhap", request.url)
      );
    }

    if (role === "Customer") {
      return NextResponse.redirect(
        new URL("/403", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dang-nhap",
    "/dang-ky",
    "/quan-ly/:path*",
    "/admin/:path*",
    "/nhan-vien/:path*",
  ],
};