"use client";

import React, { useEffect, useState } from "react";
import {
  Menu,
  LogOut,
  Bell,
  ShieldCheck,
  ChevronDown,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";

import { Sidebar } from "@/components/dashboard/shared/Sidebar";
import { ProfileModal } from "@/components/dashboard/shared/ProfileModal";
import ThemeProvider from "@/providers/ThemeProvider";
import QueryProvider from "@/providers/QueryProvider";

import { useDashboardStore } from "@/store/dashboard.store";
import { useAuthStore } from "@/store/auth.store";
import Loading from "@/components/common/Spinner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme, isSidebarOpen, toggleSidebar, setSidebarOpen } =
    useDashboardStore();

  const { user, logout } = useAuthStore();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setSidebarOpen]);

  const handleLogout = () => {
    logout();
    router.replace("/dang-nhap");
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }

    return (
      parts[parts.length - 2][0] + parts[parts.length - 1][0]
    ).toUpperCase();
  };

  const userFullName =
    mounted && user ? user.fullName || "Người dùng" : "Người dùng";

  const userAvatar = mounted ? user?.avatar : null;
  return (
    <div className={`${theme} min-h-screen`}>
      <QueryProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-[#F2F2F7] dark:bg-black flex transition-colors duration-300">
            <Sidebar role={Number(user?.role)} />

            <div
              className={`flex flex-col min-h-screen w-full min-w-0 transition-all duration-300 ease-in-out
                pl-0
                lg:pl-20
                ${isSidebarOpen ? "lg:pl-64" : "lg:pl-20"}
              `}
            >
              {/* Header */}
              <header className="h-16 border-b border-[#E5E5EA] dark:border-[#2C2C2E] bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 text-[#1C1C1E] dark:text-white hover:bg-[#E5E5EA]/50 dark:hover:bg-[#2C2C2E]/50 rounded-xl transition-colors active:scale-95"
                  >
                    <Menu className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <span className="font-bold text-[#1C1C1E] dark:text-white text-sm tracking-tight hidden sm:inline-block">
                    Hệ thống Quản trị
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Role */}
                  <div className="hidden xs:flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold select-none">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{}</span>
                  </div>

                  {/* Notification */}
                  <button className="p-2 text-slate-500 hover:text-[#007AFF] hover:bg-[#E5E5EA]/50 dark:hover:bg-[#2C2C2E]/50 rounded-full relative transition-all active:scale-90">
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF3B30] rounded-full animate-pulse" />

                    <Bell className="w-4.5 h-4.5" />
                  </button>

                  <span className="h-5 w-[1px] bg-[#E5E5EA] dark:bg-[#2C2C2E]" />

                  {/* User */}
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen((prev) => !prev)}
                      className="flex items-center space-x-2 p-1 hover:bg-[#E5E5EA]/50 dark:hover:bg-[#2C2C2E]/50 rounded-xl transition-all active:scale-95"
                    >
                      {userAvatar ? (
                        <img
                          src={userAvatar}
                          alt={userFullName}
                          className="w-7 h-7 rounded-full object-cover border border-[#E5E5EA] dark:border-[#2C2C2E]"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#34C759] to-[#30B0C7] flex items-center justify-center font-bold text-[10px] text-white">
                          {getInitials(userFullName)}
                        </div>
                      )}

                      <span className="text-xs font-bold text-[#1C1C1E] dark:text-white max-w-[120px] truncate hidden md:inline-block">
                        {userFullName}
                      </span>

                      <ChevronDown
                        className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                          isUserMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isUserMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsUserMenuOpen(false)}
                        />

                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-2xl shadow-xl py-1.5 z-50">
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setIsProfileModalOpen(true);
                            }}
                            className="w-full px-4 py-2 border-b border-[#E5E5EA] dark:border-[#2C2C2E] text-left hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E] transition-colors"
                          >
                            <p className="text-[9px] text-[#8E8E93] font-bold uppercase tracking-wider">
                              Hồ sơ cá nhân
                            </p>

                            <p className="text-xs font-bold text-[#1C1C1E] dark:text-white truncate mt-0.5">
                              {userFullName}
                            </p>
                          </button>

                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setIsProfileModalOpen(true);
                            }}
                            className="w-full flex items-center space-x-2 px-4 py-2.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E] transition-colors text-left font-medium"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            <span>Chỉnh sửa Profile</span>
                          </button>

                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              handleLogout();
                            }}
                            className="w-full flex items-center space-x-2 px-4 py-2.5 text-xs font-bold text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Đăng xuất</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </header>

              {/* Content */}
              <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
                {children}
              </main>
            </div>

            <ProfileModal
              isOpen={isProfileModalOpen}
              onClose={() => setIsProfileModalOpen(false)}
            />
          </div>

          {/* Toast dùng chung cho cả 3 role */}

          <Toaster position="bottom-right" />
        </ThemeProvider>
      </QueryProvider>
    </div>
  );
}
