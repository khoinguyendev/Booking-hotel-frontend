// store/dashboard.store.ts
import { create } from 'zustand';

interface DashboardState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  closeSidebar: () => void;
  toggleTheme: () => void; // Thêm hàm chuyển đổi theme
}

export const useDashboardStore = create<DashboardState>((set) => ({
  isSidebarOpen: false,
  theme: 'dark', // Mặc định chế độ tối kiểu iOS OLED
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    // Đồng bộ class trên cấu trúc HTML để Tailwind nhận diện selector `dark:`
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(nextTheme);
    }
    return { theme: nextTheme };
  }),
}));