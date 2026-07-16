// app/main/layout.tsx
'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Hotel, 
  Calendar, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Compass, 
  Bell, 
  ChevronRight 
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Đăng xuất và điều hướng về trang login
  const handleLogout = () => {
    logout();
    toast.success('Đã đăng xuất tài khoản!');
    router.push('/quan-ly/dang-nhap');
  };

  // Danh sách các Menu trên Sidebar
  const sidebarItems = [
    {
      name: 'Trang chủ',
      href: '/main',
      icon: Compass,
    },
    {
      name: 'Quản lý khách sạn',
      href: '/main/hotels',
      icon: Hotel,
    },
    {
      name: 'Lịch sử đặt phòng',
      href: '/main/bookings',
      icon: Calendar,
    },
    {
      name: 'Hồ sơ cá nhân',
      href: '/main/profile',
      icon: User,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#000000] text-[#1C1C1E] dark:text-white flex transition-colors duration-300">
      
      {/* 1. SIDEBAR CHO DESKTOP */}
      <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-[#1C1C1E] border-r border-[#E5E5EA] dark:border-[#2C2C2E] fixed top-0 bottom-0 left-0 z-30 transition-colors">
        {/* Logo Thương Hiệu */}
        <div className="h-16 flex items-center px-6 border-b border-[#E5E5EA] dark:border-[#2C2C2E]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#007AFF] to-[#30B0C7] flex items-center justify-center shadow-md shadow-[#007AFF]/10">
              <Compass className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-black text-base tracking-tight bg-gradient-to-r from-[#007AFF] to-[#30B0C7] bg-clip-text text-transparent">
              EMA Portal
            </span>
          </div>
        </div>

        {/* Danh Sách Menu Điều Hướng */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#007AFF] text-white shadow-lg shadow-[#007AFF]/15'
                    : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#8E8E93] group-hover:text-current'}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        {/* Nút Đăng Xuất & Thông Tin User Cuối Sidebar */}
        <div className="p-4 border-t border-[#E5E5EA] dark:border-[#2C2C2E] space-y-3">
          <div className="flex items-center space-x-3 p-2 bg-[#F2F2F7]/50 dark:bg-[#2C2C2E]/40 rounded-2xl">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border border-[#007AFF]"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#34C759] to-[#30B0C7] flex items-center justify-center font-black text-sm text-white">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{user?.fullName || 'Tài khoản'}</p>
              <p className="text-[10px] text-[#8E8E93] truncate">{user?.email || 'Chưa cập nhật'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl text-sm font-bold text-[#FF3B30] bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 transition-all active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* 2. SIDEBAR DI ĐỘNG (MOBILE NAVIGATION DRAWERS) */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Lớp nền mờ khi kéo sidebar ra */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        
        <aside className={`absolute top-0 bottom-0 left-0 w-72 bg-white dark:bg-[#1C1C1E] border-r border-[#E5E5EA] dark:border-[#2C2C2E] flex flex-col p-6 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between pb-6 border-b border-[#E5E5EA] dark:border-[#2C2C2E] mb-6">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-[#007AFF] to-[#30B0C7] bg-clip-text text-transparent">EMA Menu</span>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="p-1.5 bg-[#F2F2F7] dark:bg-[#2C2C2E] rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="flex-1 space-y-1.5">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive ? 'bg-[#007AFF] text-white' : 'text-[#8E8E93] hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-[#E5E5EA] dark:border-[#2C2C2E]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl text-sm font-bold text-[#FF3B30] bg-[#FF3B30]/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </aside>
      </div>

      {/* 3. KHU VỰC CHỨA CHÍNH (CONTENT AREA) */}
      <div className="flex-1 flex flex-col lg:pl-72 min-w-0">
        
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 h-16 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-md border-b border-[#E5E5EA] dark:border-[#2C2C2E] flex items-center justify-between px-6">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E] rounded-full transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-[#007AFF] to-[#30B0C7] bg-clip-text text-transparent">
            EMA Portal
          </span>

          <button className="p-2 hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E] rounded-full transition-colors relative">
            <Bell className="w-5 h-5 text-[#8E8E93]" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FF3B30] rounded-full" />
          </button>
        </header>

        {/* Nội dung Page con */}
        <main className="flex-1 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}