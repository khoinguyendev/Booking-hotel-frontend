// components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboardStore } from "@/store/dashboard.store";
import { useAuthStore } from "@/store/auth.store"; // Import để lấy thông tin đăng nhập thực tế của bạn
import {
  LayoutDashboard,
  CalendarClock,
  UserCheck,
  TrendingUp,
  CreditCard,
  FileSpreadsheet,
  Bell,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Hotel,
  X,
  Sparkles,
  MailCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

const adminSidebarItems = [
  { title: "Tổng quan", path: "/quan-ly/trang-chu", icon: LayoutDashboard },
  { title: "Khách sạn", path: "/quan-ly/khach-san", icon: Hotel },
  { title: "Đặt Phòng", path: "/quan-ly/dat-phong", icon: BedDouble },
  { title: "Nhân sự", path: "/quan-ly/nhan-su", icon: UserCheck },
  { title: "Chấm công", path: "/quan-ly/cham-cong", icon: CalendarClock },
  { title: "Đánh giá", path: "/quan-ly/danh-gia", icon: UserCheck },
  { title: "KPI hiệu suất", path: "/quan-ly/hieu-suat", icon: TrendingUp },
  { title: "Lương thưởng", path: "/quan-ly/luong-thuong", icon: CreditCard },
  { title: "Báo cáo", path: "/quan-ly/bao-cao", icon: FileSpreadsheet },
  { title: "Sự kiện", path: "/quan-ly/su-kien", icon: Bell },
];
const employeeSidebarItems = [
  { title: "Tổng quan", path: "/nhan-vien/trang-chu", icon: LayoutDashboard },
  { title: "Chấm công", path: "/nhan-vien/cham-cong", icon: CalendarClock },
  // { title: "Đánh giá", path: "/quan-ly/danh-gia", icon: UserCheck },
  { title: "Lịch làm việc", path: "/nhan-vien/lich-lam-viec", icon: CalendarClock },
  { title: "Lương thưởng", path: "/nhan-vien/luong-thuong", icon: CreditCard },
  {
    title: "Yêu cầu",
    path: "/nhan-vien/yeu-cau",
    icon: MailCheck,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

  const { isSidebarOpen, toggleSidebar, closeSidebar } = useDashboardStore();

  // Trích xuất thông tin tài khoản đăng nhập thực tế từ Zustand Auth Store của bạn
  const user = useAuthStore((state) => state.user);
  console.log("user", user);
  // Helper tạo ký tự viết tắt đại diện cho Avatar (Ví dụ: "Nguyễn Kiều Trang" -> "KT")
  const getInitials = (name?: string) => {
    if (!name) return "AD";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (
      parts[parts.length - 2][0] + parts[parts.length - 1][0]
    ).toUpperCase();
  };


 


  useEffect(() => {
    setMounted(true);
  }, []);
const userFullName = mounted
  ? user?.fullName || "Quản trị viên"
  : "";

const userEmail = mounted
  ? user?.email || "admin@hotel.com"
  : "";

const userAvatar = mounted
  ? user?.avatar
  : undefined;
  const getSidebarItems = (role: string) => {
    switch (role) {
      case "Admin":
        return adminSidebarItems;

      case "Staff":
        return employeeSidebarItems;
      case "Manager":
        return adminSidebarItems;
     

      default:
        return [];
    }
  };
const sidebarItems = mounted
  ? getSidebarItems(user?.role ?? "")
  : [];
  return (
    <>
      {/* Lớp phủ mờ (Backdrop) phong cách iOS trên Mobile */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-[#000000]/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 animate-in fade-in"
        />
      )}

      <aside
        className={`bg-[#0A0E1A] text-slate-200 h-screen flex flex-col border-r border-slate-800/50 fixed top-0 bottom-0 left-0 z-50 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 
          ${isSidebarOpen ? "w-64" : "w-20"}
        `}
      >
        {/* HEADER SIDEBAR: Nhận diện thương hiệu đẳng cấp */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/40 relative flex-shrink-0 bg-[#070A13]">
          <div className="flex items-center space-x-3 overflow-hidden whitespace-nowrap">
            {/* Logo Khách sạn tinh xảo */}
            <div className="w-9 h-9 bg-gradient-to-tr from-[#007AFF] to-[#5856D6] rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white shadow-md shadow-[#007AFF]/25 transition-transform active:scale-95">
              <span className="text-sm tracking-tighter"></span>
            </div>

            <div
              className={`transition-all duration-300 ${isSidebarOpen ? "opacity-100 translate-x-0" : "lg:opacity-0 lg:-translate-x-4 lg:hidden"}`}
            >
              <h2 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1">
                Booking Hotel
                <Sparkles className="w-3 h-3 text-[#FFD60A] fill-current" />
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Hệ thống Quản trị
              </p>
            </div>
          </div>

          {/* Nút thu gọn Sidebar trên Desktop (Trượt ẩn mượt mà) */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex absolute -right-3 top-5 w-6 h-6 bg-[#007AFF] hover:bg-[#0066CC] text-white rounded-full items-center justify-center border border-slate-800 shadow-lg transition-transform active:scale-90"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
          </button>

          {/* Nút đóng trên Mobile */}
          <button
            onClick={closeSidebar}
            className="flex lg:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MENU ĐIỀU HƯỚNG */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-800">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive =
  mounted &&
  (pathname === item.path ||
  pathname.startsWith(`${item.path}/`));

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3.5 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-200 group relative ${
                  isActive
                    ? "bg-gradient-to-r from-[#007AFF] to-[#0056B3] text-white shadow-md shadow-[#007AFF]/20"
                    : "text-slate-400 hover:bg-slate-800/30 hover:text-slate-100"
                } ${isSidebarOpen ? "space-x-3.5" : "justify-start lg:justify-center space-x-3.5 lg:space-x-0"}`}
              >
                {/* Thanh căn lề đứng rực sáng khi active đúng phong cách iOS */}
                {isActive && (
                  <span className="absolute left-0 top-3 bottom-3 w-1 bg-white rounded-r-full" />
                )}

                <Icon
                  className={`w-4.5 h-4.5 flex-shrink-0 transition-transform group-hover:scale-105 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}
                />

                <span
                  className={`transition-all duration-200 whitespace-nowrap ${isSidebarOpen ? "opacity-100 translate-x-0" : "lg:opacity-0 lg:-translate-x-2 lg:hidden"}`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* USER PROFILE FOOTER: Hiển thị Động từ Store */}
        <div className="p-4 border-t border-slate-800/40 bg-[#070A13] flex-shrink-0">
          <div
            className={`flex items-center p-1 rounded-xl transition-all ${isSidebarOpen ? "space-x-3.5" : "justify-start lg:justify-center space-x-3.5 lg:space-x-0"}`}
          >
            
            {/* Avatar tròn trịa mượt mà */}
           {mounted && userAvatar ? (
  <img
    src={userAvatar}
    alt={userFullName}
    className="w-9 h-9 rounded-full object-cover border border-slate-700 shadow-inner"
  />
) : (
  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#34C759] to-[#30B0C7] border border-emerald-600/30 flex-shrink-0 flex items-center justify-center font-black text-xs text-white tracking-wider shadow-sm">
    {mounted ? getInitials(userFullName) : "AD"}
  </div>
)}
            {/* Chi tiết thông tin nhân sự */}
            <div
              className={`flex-1 min-w-0 transition-all ${isSidebarOpen ? "block" : "lg:hidden"}`}
            >
              <p className="text-xs font-bold text-white truncate tracking-wide leading-none">
                {userFullName}
              </p>
              <p className="text-[10px] text-slate-500 truncate font-medium mt-1">
                {userEmail}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
