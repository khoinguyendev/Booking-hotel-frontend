"use client";

import React, { useState } from "react";
import { Save, X, Globe, Mail, Phone, FileText, Image, Link, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { createHotelBrand } from "@/services/hotel-brand.service";

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddBrandModal({
    open,
    onClose,
    onSuccess,
}: Props) {
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [logo, setLogo] = useState("");
    const [banner, setBanner] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(true);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createHotelBrand({
                name,
                slug,
                logo,
                banner,
                description,
                website,
                phone,
                email,
                status,
            });
            toast.success("Tạo Brand thành công");
            onSuccess();
            onClose();
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message ??
                "Không thể tạo Brand"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Lớp nền mờ Blur chuẩn Apple */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Khung Modal chính */}
            <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#1C1C1E] shadow-2xl border border-[#E5E5EA] dark:border-[#2C2C2E] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 text-[#1C1C1E] dark:text-white">
                
                {/* Header điều hướng */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E5EA] dark:border-[#2C2C2E] bg-slate-50 dark:bg-[#1C1C1E]">
                    <div>
                        <h2 className="text-lg font-black tracking-tight">
                            Thêm Brand khách sạn
                        </h2>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                            Khởi tạo chuỗi thương hiệu mới vào cấu trúc hệ thống
                        </p>
                    </div>
                    <button 
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-current hover:bg-[#E5E5EA] dark:hover:bg-[#2C2C2E] rounded-full transition-all active:scale-90"
                    >
                        <X className="w-4 h-4 stroke-[2.5]" />
                    </button>
                </div>

                {/* Form nhập liệu cấu trúc lưới */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto snippet-scrollbar">
                    
                    {/* Khối 1: Tên & Tên rút gọn */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <FileText className="w-3 h-3" /> Tên thương hiệu
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="E.g., Grand Luxury Resort"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full text-xs font-semibold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 placeholder-slate-400 dark:placeholder-slate-500 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30 focus:bg-[#E5E5EA] dark:focus:bg-[#3A3A3C]"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Link className="w-3 h-3" /> Đường dẫn chuỗi (Slug)
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="E.g., grand-luxury-resort"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full text-xs font-mono font-bold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 placeholder-slate-400 dark:placeholder-slate-500 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30 focus:bg-[#E5E5EA] dark:focus:bg-[#3A3A3C]"
                            />
                        </div>
                    </div>

                    {/* Khối 2: Tài nguyên Ảnh biểu trưng & Banner */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                            <Image className="w-3 h-3" /> Đường dẫn Logo URL
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com/logo.png"
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                            className="w-full text-xs font-mono rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 placeholder-slate-400 dark:placeholder-slate-500 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                            <Image className="w-3 h-3" /> Đường dẫn Banner URL
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com/banner.jpg"
                            value={banner}
                            onChange={(e) => setBanner(e.target.value)}
                            className="w-full text-xs font-mono rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 placeholder-slate-400 dark:placeholder-slate-500 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                        />
                    </div>

                    {/* Khối 3: Văn bản mô tả tổng quan */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                            <FileText className="w-3 h-3" /> Giới thiệu ngắn thương hiệu
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Mô tả tóm tắt lịch sử, giá trị cốt lõi chuỗi khách sạn..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full text-xs font-semibold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 placeholder-slate-400 dark:placeholder-slate-500 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30 resize-none"
                        />
                    </div>

                    {/* Khối 4: Thông tin truyền thông điện tử */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Globe className="w-3 h-3" /> Trang Web chính thức
                            </label>
                            <input
                                type="url"
                                placeholder="https://branddomain.com"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="w-full text-xs font-mono rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 placeholder-slate-400 dark:placeholder-slate-500 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Mail className="w-3 h-3" /> Hòm thư liên hệ
                            </label>
                            <input
                                type="email"
                                placeholder="contact@brand.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-xs font-medium rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 placeholder-slate-400 dark:placeholder-slate-500 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>
                    </div>

                    {/* Khối 5: Đường dây nóng & Trạng thái hoạt động */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Phone className="w-3 h-3" /> Hotline tổng đài
                            </label>
                            <input
                                type="text"
                                placeholder="1900 xxxx hoặc số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full text-xs font-mono font-bold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 placeholder-slate-400 dark:placeholder-slate-500 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Trạng thái phân vùng
                            </label>
                            <label className="flex items-center justify-between h-[42px] cursor-pointer rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 px-4 transition-all hover:bg-[#E5E5EA] dark:hover:bg-[#3A3A3C] select-none">
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                    Kích hoạt hoạt động
                                </span>
                                <input
                                    type="checkbox"
                                    checked={status}
                                    onChange={(e) => setStatus(e.target.checked)}
                                    className="w-4 h-4 rounded-md accent-[#007AFF] cursor-pointer"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Footer điều hướng hành động */}
                    <div className="flex gap-3 pt-4 border-t border-[#E5E5EA]/60 dark:border-[#2C2C2E]/60">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl py-2.5 text-xs font-bold bg-[#F2F2F7] hover:bg-[#E5E5EA] dark:bg-[#2C2C2E] dark:hover:bg-[#3A3A3C] transition-colors"
                        >
                            Hủy bỏ
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-xl py-2.5 text-xs font-bold bg-[#007AFF] hover:bg-[#0066CC] text-white transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-60"
                        >
                            <Save className="w-3.5 h-3.5" />
                            <span>{loading ? "Đang tạo..." : "Tạo Brand mới"}</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}