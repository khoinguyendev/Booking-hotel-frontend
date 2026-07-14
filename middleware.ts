import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get("accessToken")?.value;
    const role = request.cookies.get("role")?.value;

    // Nếu đã đăng nhập thì không cho vào Login/Register
    if (
        pathname === "/quan-ly/dang-nhap" ||
        pathname === "/quan-ly/dang-ky"
    ) {
        if (token && role !== "Customer") {
            return NextResponse.redirect(
                new URL("/quan-ly/trang-chu", request.url)
                // hoặc "/admin/dashboard"
            );
        }

        return NextResponse.next();
    }

    // Bảo vệ các trang admin
    if (pathname.startsWith("/quan-ly")) {
        if (!token) {
            return NextResponse.redirect(
                new URL("/quan-ly/dang-nhap", request.url)
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
        "/quan-ly/dang-nhap",
        "/quan-ly/dang-ky",
        "/quan-ly/:path*",
    ],
};