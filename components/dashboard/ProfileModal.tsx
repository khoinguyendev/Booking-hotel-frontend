// components/dashboard/ProfileModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X, Camera, Save } from 'lucide-react';
import { useAuthStore, UserInfo } from '@/store/auth.store';
import { useUserStore } from '@/store/user.store'; 
import toast from 'react-hot-toast';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user: authUser, login, token, role } = useAuthStore();
  const updateUserInStore = useUserStore((state) => state.updateUser); 
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authUser) {
      setFullName(authUser.fullName || '');
      setPhone(authUser.phone || '');
      setAvatar(authUser.avatar || '');
    }
  }, [authUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (authUser) {
        // 1. Cập nhật dữ liệu vào DB / Danh sách quản lý thông qua user.store
        await updateUserInStore(authUser.id, {
          fullName,
          phone,
          avatar: avatar || null
        });

        // 2. Định nghĩa object cập nhật tường minh để loại bỏ hoàn toàn khả năng 'undefined'
        const updatedAuthUser: UserInfo = {
          id: authUser.id,
          email: authUser.email,
          role: authUser.role,
          fullName: fullName,
          phone: phone,
          avatar: avatar || null
        };

        if (token && role) {
          login(token, role, updatedAuthUser);
        }

        toast.success('Cập nhật thông tin tài khoản thành công!');
        onClose();
      }
    } catch (error: any) {
      toast.error('Có lỗi xảy ra khi cập nhật.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Lớp nền mờ */}
      <div className="fixed inset-0 bg-[#000000]/60 backdrop-blur-sm" onClick={onClose} />

      {/* Thân Modal */}
      <div className="bg-white dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-[#2C2C2E] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 text-[#1C1C1E] dark:text-white">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E5E5EA] dark:border-[#2C2C2E] bg-slate-50 dark:bg-[#1C1C1E]">
          <h3 className="font-bold text-base tracking-tight">Cài đặt tài khoản</h3>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] rounded-full transition-colors active:scale-90 text-slate-400 hover:text-current"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Avatar Upload Preview */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative group cursor-pointer">
              {avatar ? (
                <img 
                  src={avatar} 
                  alt="Avatar" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#007AFF] shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#34C759] to-[#30B0C7] flex items-center justify-center font-black text-2xl text-white">
                  {fullName ? fullName.charAt(0).toUpperCase() : 'A'}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">Thay đổi ảnh</span>
          </div>

          <div className="space-y-4">
            {/* Email (Disabled theo Entity - email unique không cho đổi) */}
            <div>
              <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block mb-1">Địa chỉ Email</label>
              <input 
                type="email" 
                value={authUser?.email || ''} 
                disabled
                className="w-full px-4 py-2 text-sm rounded-xl bg-[#E5E5EA]/50 dark:bg-[#2C2C2E]/50 text-[#8E8E93] border border-transparent cursor-not-allowed"
              />
            </div>

            {/* Họ và tên (FullName) */}
            <div>
              <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block mb-1">Họ và tên</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Nhập họ và tên..."
                className="w-full px-4 py-2.5 text-sm rounded-xl placeholder-[#8E8E93] border border-transparent focus:outline-none transition-all duration-200
                  bg-[#E5E5EA]/60 dark:bg-[#2C2C2E]/60 text-[#1C1C1E] dark:text-white focus:bg-[#D1D1D6]/80 dark:focus:bg-[#3A3A3C]"
              />
            </div>

            {/* Số điện thoại (Phone) */}
            <div>
              <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block mb-1">Số điện thoại</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại..."
                className="w-full px-4 py-2.5 text-sm rounded-xl placeholder-[#8E8E93] border border-transparent focus:outline-none transition-all duration-200
                  bg-[#E5E5EA]/60 dark:bg-[#2C2C2E]/60 text-[#1C1C1E] dark:text-white focus:bg-[#D1D1D6]/80 dark:focus:bg-[#3A3A3C]"
              />
            </div>

            {/* URL Avatar (Tạm thời nhập text link nếu chưa cấu hình CDN upload ảnh) */}
            <div>
              <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block mb-1">Đường dẫn ảnh đại diện (URL)</label>
              <input 
                type="text" 
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-2.5 text-sm rounded-xl placeholder-[#8E8E93] border border-transparent focus:outline-none transition-all duration-200
                  bg-[#E5E5EA]/60 dark:bg-[#2C2C2E]/60 text-[#1C1C1E] dark:text-white focus:bg-[#D1D1D6]/80 dark:focus:bg-[#3A3A3C]"
              />
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-[#E5E5EA] hover:bg-[#D1D1D6] dark:bg-[#2C2C2E] dark:hover:bg-[#3A3A3C] transition-all"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-[#007AFF] hover:bg-[#0066CC] text-white transition-all flex items-center justify-center space-x-1.5 active:scale-95 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};