"use client";

import React, { useState } from "react";
import { X, Save, Building2, MapPin, Image as ImageIcon, FileText, Compass, Phone, Mail, Star, Clock, UploadCloud, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { createHotel } from "@/services/hotel.service";
import { useHotelBrand } from "@/hooks/useHotelBrand";

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}
const initialForm = {
    brandId: 1,
    city: "",
    name: "",
    slug: "",
    images: [] as string[],
    description: "",
    address: "",
    latitude: 0,
    longitude: 0,
    phone: "",
    email: "",
    star: 5,
    checkinTime: "14:00",
    checkoutTime: "12:00",
    status: true,
};
export default function AddHotelModal({
    open,
    onClose,
    onSuccess,
}: Props) {
    const { brands } = useHotelBrand();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState(initialForm);

    if (!open) return null;
    const resetForm = () => {
        setForm({
            ...initialForm,
            images: [],
        });
    };
    const handleUploadImage = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files;

        if (!files?.length) return;

        try {
            setUploading(true);

            toast.loading("Đang tải ảnh...", {
                id: "upload",
            });

            const urls: string[] = [];

            for (const file of Array.from(files)) {
                const formData = new FormData();

                formData.append("file", file);
                formData.append(
                    "upload_preset",
                    "unsigned_upload"
                );

                const res = await fetch(
                    "https://api.cloudinary.com/v1_1/dhr4kekdx/image/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await res.json();

                urls.push(data.secure_url);
            }

            setForm(prev => ({
                ...prev,
                images: [...prev.images, ...urls],
            }));

            toast.success("Upload thành công", {
                id: "upload",
            });
        } catch {
            toast.error("Upload thất bại", {
                id: "upload",
            });
        } finally {
            setUploading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (form.images.length === 0) {
                toast.error("Vui lòng tải hình khách sạn");
                return;
            }
            setLoading(true);

            const payload = {
                ...form,
                image: form.images.join(";"),
                checkinTime: `${form.checkinTime}:00`,
                checkoutTime: `${form.checkoutTime}:00`,
            };

            await createHotel(payload);

            toast.success("Tạo khách sạn thành công");
            resetForm();
            onSuccess?.();
            onClose();
        } catch (err: any) {
            toast.error(
                err.response?.data?.message ?? "Không thể tạo khách sạn"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Overlay Glassmorphism */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            />

            {/* Container Modal */}
            <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-[#1C1C1E] shadow-2xl border border-[#E5E5EA] dark:border-[#2C2C2E] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 text-[#1C1C1E] dark:text-white">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-[#E5E5EA] dark:border-[#2C2C2E] bg-slate-50 dark:bg-[#17171C]">
                    <div>
                        <h2 className="text-base font-black tracking-tight">
                            Thêm khách sạn mới
                        </h2>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                            Cấu hình chi nhánh vận hành mới vào chuỗi cơ sở dữ liệu
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

                {/* Form Body */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-4 max-h-[78vh] overflow-y-auto snippet-scrollbar"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Dropdown Brand */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-[#007AFF]" /> Thuộc chuỗi thương hiệu
                            </label>
                            <select
                                name="brandId"
                                value={form.brandId}
                                onChange={handleChange}
                                className="w-full text-xs font-semibold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            >
                                {brands.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Thành phố */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#007AFF]" /> Thành phố / Khu vực
                            </label>
                            <input
                                required
                                name="city"
                                placeholder="E.g., Hồ Chí Minh"
                                value={form.city}
                                onChange={handleChange}
                                className="w-full text-xs font-semibold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        {/* Tên khách sạn */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-[#007AFF]" /> Tên chi nhánh khách sạn
                            </label>
                            <input
                                required
                                name="name"
                                placeholder="E.g., Signature Premium Hotel"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full text-xs font-semibold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        {/* Slug */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#007AFF]" /> Slug định tuyến URL
                            </label>
                            <input
                                required
                                name="slug"
                                placeholder="E.g., signature-premium-hotel"
                                value={form.slug}
                                onChange={handleChange}
                                className="w-full text-xs font-mono font-bold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        {/* KHU VỰC UPLOAD HÌNH ẢNH THƯƠNG MẠI ĐIỆN TỬ CAO CẤP */}
                        <div className="col-span-1 sm:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <ImageIcon className="w-3 h-3 text-[#007AFF]" /> Bộ sưu tập hình ảnh khách sạn ({form.images.length})
                            </label>

                            {/* Danh sách ảnh đã upload */}
                            {form.images.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-3 bg-[#F2F2F7]/50 dark:bg-[#2C2C2E]/30 rounded-2xl border border-[#E5E5EA] dark:border-[#2C2C2E]">
                                    {form.images.map((img, index) => (
                                        <div
                                            key={index}
                                            className="relative group rounded-xl overflow-hidden aspect-video border border-black/5 shadow-sm bg-slate-100 dark:bg-black/20"
                                        >
                                            <img
                                                src={img}
                                                alt={`Hotel upload ${index}`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setForm(prev => ({
                                                        ...prev,
                                                        images: prev.images.filter((_, i) => i !== index),
                                                    }))
                                                }
                                                className="absolute top-1.5 right-1.5 bg-rose-500/90 hover:bg-rose-600 text-white rounded-full p-1 shadow-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                                                title="Xóa ảnh"
                                            >
                                                <X className="w-3 h-3 stroke-[2.5]" />
                                            </button>
                                            <span className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-mono text-white">
                                                #{index + 1}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Khung Dropzone Tải ảnh */}
                            <label className={`relative h-28 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer group ${uploading
                                    ? "border-[#007AFF] bg-[#007AFF]/5"
                                    : "border-[#E5E5EA] dark:border-[#2C2C2E] hover:border-[#007AFF] bg-[#F2F2F7]/40 dark:bg-[#2C2C2E]/20 hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E]/50"
                                }`}>
                                {uploading ? (
                                    <div className="flex flex-col items-center space-y-1 text-[#007AFF]">
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span className="text-xs font-bold">Đang tải ảnh lên Cloudinary...</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center space-y-1 text-slate-400 group-hover:text-[#007AFF] transition-colors">
                                        <UploadCloud className="w-6 h-6 stroke-[1.5]" />
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-[#007AFF]">
                                            Bấm để chọn hoặc kéo thả nhiều ảnh khách sạn
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-mono">
                                            Hỗ trợ định dạng JPG, PNG, WEBP
                                        </span>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    disabled={uploading}
                                    className="hidden"
                                    onChange={handleUploadImage}
                                />
                            </label>
                        </div>

                        {/* Mô tả ngắn */}
                        <div className="col-span-1 sm:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <FileText className="w-3 h-3 text-[#007AFF]" /> Mô tả ngắn về chi nhánh
                            </label>
                            <textarea
                                rows={3}
                                name="description"
                                placeholder="Thông tin tổng quan, đặc điểm nổi bật và dịch vụ trọng tâm của cơ sở..."
                                value={form.description}
                                onChange={handleChange}
                                className="w-full text-xs font-semibold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30 resize-none"
                            />
                        </div>

                        {/* Địa chỉ chính xác */}
                        <div className="col-span-1 sm:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#007AFF]" /> Địa chỉ chính xác
                            </label>
                            <input
                                required
                                name="address"
                                placeholder="Số nhà, tên đường, quận/huyện..."
                                value={form.address}
                                onChange={handleChange}
                                className="w-full text-xs font-semibold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        {/* Tọa độ Vệ tinh */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Compass className="w-3 h-3 text-[#007AFF]" /> Kinh độ (Latitude)
                            </label>
                            <input
                                type="number"
                                step="0.000001"
                                name="latitude"
                                value={form.latitude}
                                onChange={handleChange}
                                className="w-full text-xs font-mono font-bold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Compass className="w-3 h-3 text-[#007AFF]" /> Vĩ độ (Longitude)
                            </label>
                            <input
                                type="number"
                                step="0.000001"
                                name="longitude"
                                value={form.longitude}
                                onChange={handleChange}
                                className="w-full text-xs font-mono font-bold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        {/* Điện thoại */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#007AFF]" /> Điện thoại liên hệ
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Số hotline chi nhánh"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full text-xs font-mono font-bold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Mail className="w-3 h-3 text-[#007AFF]" /> Hòm thư điện tử (Email)
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="frontdesk@hotel.com"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full text-xs font-medium rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        {/* Tiêu chuẩn Sao */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Star className="w-3 h-3 text-[#FFCC00]" /> Tiêu chuẩn hạng sao
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                name="star"
                                value={form.star}
                                onChange={handleChange}
                                className="w-full text-xs font-bold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        <div className="hidden sm:block" />

                        {/* Khung giờ Check-in / Check-out */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-emerald-500" /> Giờ nhận phòng (Check In)
                            </label>
                            <input
                                type="time"
                                name="checkinTime"
                                value={form.checkinTime}
                                onChange={handleChange}
                                className="w-full text-xs font-mono font-bold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-rose-500" /> Giờ trả phòng (Check Out)
                            </label>
                            <input
                                type="time"
                                name="checkoutTime"
                                value={form.checkoutTime}
                                onChange={handleChange}
                                className="w-full text-xs font-mono font-bold rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]/60 text-current px-4 py-3 outline-none transition-all focus:ring-1 focus:ring-[#007AFF]/30"
                            />
                        </div>

                    </div>

                    {/* Footer tác vụ */}
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
                            disabled={loading || uploading}
                            className="flex-1 rounded-xl py-2.5 text-xs font-bold bg-[#007AFF] hover:bg-[#0066CC] text-white transition-all flex justify-center items-center gap-1.5 active:scale-95 disabled:opacity-60"
                        >
                            <Save className="w-3.5 h-3.5" />
                            <span>{loading ? "Đang tạo..." : "Tạo khách sạn"}</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}