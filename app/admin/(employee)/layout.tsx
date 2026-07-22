  // app/admin/layout.tsx
  'use client';

  import React, { useEffect, useState } from 'react';
  import { Sidebar } from '@/components/dashboard/Sidebar';
  import { ProfileModal } from '@/components/dashboard/ProfileModal'; // Import Modal mới tại đây
  import { useDashboardStore } from '@/store/dashboard.store';
  import { useAuthStore } from '@/store/auth.store';
  import { Menu, LogOut, Bell, ShieldCheck, ChevronDown, User } from 'lucide-react';
  import { useRouter } from 'next/navigation';

  export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useDashboardStore();
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // Trạng thái mở Profile Modal
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setSidebarOpen(true);
        } else {
          setSidebarOpen(false);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [setSidebarOpen]);

    const handleLogout = () => {
      logout();
      router.push('/quan-ly/dang-nhap');
    };

    const getInitials = (name?: string) => {
      if (!name) return 'AD';
      const parts = name.trim().split(' ');
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
    };

   const userFullName = mounted
  ? user?.fullName || 'Quản trị viên'
  : 'Quản trị viên';

const userAvatar = mounted ? user?.avatar : undefined;

    return (
      <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#000000] flex transition-colors duration-300">
        <Sidebar />

        <div 
          className={`flex flex-col min-h-screen w-full min-w-0 transition-all duration-300 ease-in-out
            pl-0 
            lg:pl-20 ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-20'}`}
        >
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
              <div className="hidden xs:flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold select-none">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Mode</span>
              </div>

              <button className="p-2 text-slate-500 hover:text-[#007AFF] hover:bg-[#E5E5EA]/50 dark:hover:bg-[#2C2C2E]/50 rounded-full relative transition-all active:scale-90">
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF3B30] rounded-full animate-pulse"></span>
                <Bell className="w-4.5 h-4.5" />
              </button>

              <span className="h-5 w-[1px] bg-[#E5E5EA] dark:bg-[#2C2C2E]" />

              <div className="relative">
                {/* BẤM VÀO TÊN HOẶC CỤM USER ĐỂ KÍCH HOẠT DROPDOWN/MODAL */}
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1 hover:bg-[#E5E5EA]/50 dark:hover:bg-[#2C2C2E]/50 rounded-xl transition-all active:scale-95"
                >
                
                  {mounted && userAvatar ? (
                    <img 
                      src={userAvatar} 
                      alt={userFullName} 
                      className="w-7 h-7 rounded-full object-cover border border-[#E5E5EA] dark:border-[#2C2C2E]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#34C759] to-[#30B0C7] flex items-center justify-center font-bold text-[10px] text-white">
                      {mounted ? getInitials(userFullName) : "AD"}
                    </div>
                  )}
                  
                  <span className="text-xs font-bold text-[#1C1C1E] dark:text-white max-w-[120px] truncate hidden md:inline-block">
                    {mounted ? userFullName : ""}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      
                      {/* Mục bấm vào thông tin tóm tắt để mở thẳng Modal chỉnh sửa */}
                      <button 
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setIsProfileModalOpen(true);
                        }}
                        className="w-full px-4 py-2 border-b border-[#E5E5EA] dark:border-[#2C2C2E] text-left hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E] transition-colors"
                      >
                        <p className="text-[9px] text-[#8E8E93] font-bold uppercase tracking-wider">Hồ sơ cá nhân</p>
                        <p className="text-xs font-bold text-[#1C1C1E] dark:text-white truncate mt-0.5">{mounted ? userFullName : ""}</p>
                      </button>

                      {/* Mục Chỉnh sửa hồ sơ */}
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

                      {/* Đăng xuất */}
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

          <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
            {children}
          </main>
        </div>

        {/* RENDER PROFILE MODAL TẠI ĐÂY */}
        <ProfileModal 
          isOpen={isProfileModalOpen} 
          onClose={() => setIsProfileModalOpen(false)} 
        />
      </div>
    );
  }