"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function RegisterForm() {
    const { register, verify, resendEmail } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [showOtpModal, setShowOtpModal] = useState(false);

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const OTP_EXPIRE = 5; // 2 phút

    const [timeLeft, setTimeLeft] = useState(OTP_EXPIRE);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    useEffect(() => {
        if (!showOtpModal) return;

        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [showOtpModal, timeLeft]);
    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp.");
            return;
        }

        try {
            setLoading(true);

            const res = await register(email, password);
            if (res.success) {
                setShowOtpModal(true);
                setTimeLeft(OTP_EXPIRE);
                setCanResend(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Đăng ký thất bại.");
        } finally {
            setLoading(false);
        }
    }
    function handleOtpChange(index: number, value: string) {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }
    async function handleVerify() {
        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            alert("Vui lòng nhập đủ 6 số.");
            return;
        }
        try {
            await verify(email, otpCode);
        } catch (err) {
            alert("OTP không đúng.");
        }
    }
    async function handleResendOtp() {
        try {
            await resendEmail(email);

            setOtp(["", "", "", "", "", ""]);

            setTimeLeft(OTP_EXPIRE);

            setCanResend(false);

            inputRefs.current[0]?.focus();
        } catch {
            toast.error("Không thể gửi lại OTP.");
        }
    }
    return (
        <div
            className="relative min-h-screen w-full overflow-hidden bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: "url('/images/hotel-login.jpg')",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

            {/* Light Effect */}
            <div className="absolute top-0 left-0 h-full w-full">
                <div className="absolute top-20 left-20 h-80 w-80 rounded-full bg-[#D4AF37]/15 blur-3xl" />
                <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-md px-5">
                <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

                    {/* Badge */}
                    <div className="mb-8 flex justify-end">
                        <div className="rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E8D4B8] px-4 py-1">
                            <span className="text-xs font-bold text-black">
                                HOTEL ADMIN
                            </span>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="mb-8 text-center">
                        <h1 className="bg-gradient-to-r from-[#D4AF37] via-white to-[#E8D4B8] bg-clip-text text-4xl font-bold text-transparent">
                            Create Account
                        </h1>

                        <p className="mt-2 text-white/60">
                            Tạo tài khoản để sử dụng hệ thống quản lý khách sạn
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* Email */}
                        <div className="relative">
                            <label className="absolute -top-2 left-4 bg-[#173353] px-2 text-xs font-semibold text-[#D4AF37]">
                                Email
                            </label>

                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="absolute -top-2 left-4 bg-[#173353] px-2 text-xs font-semibold text-[#D4AF37]">
                                Password
                            </label>

                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label className="absolute -top-2 left-4 bg-[#173353] px-2 text-xs font-semibold text-[#D4AF37]">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]"
                            />
                        </div>

                        {/* Register */}
                        <button
                            disabled={loading}
                            className="w-full rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E8D4B8] py-3 font-bold text-black transition hover:scale-[1.02] disabled:opacity-60"
                        >
                            {loading
                                ? "Đang đăng ký..."
                                : "Đăng ký"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-8 flex items-center">
                        <div className="h-px flex-1 bg-white/20" />
                        <span className="mx-4 text-sm text-white/50">
                            hoặc
                        </span>
                        <div className="h-px flex-1 bg-white/20" />
                    </div>

                    {/* Google */}
                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/10 py-3 font-semibold text-white transition hover:bg-white/20"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>

                        Đăng ký bằng Google
                    </button>

                    <div className="mt-6 text-center text-sm text-white/50">
                        Đã có tài khoản?{" "}
                        <button
                            type="button"
                            onClick={() => (window.location.href = "/quan-ly/dang-nhap")}
                            className="font-semibold text-[#D4AF37] hover:text-[#E8D4B8]"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
            {showOtpModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="w-full max-w-md rounded-2xl bg-white p-8">
                        <h2 className="text-center text-2xl font-bold">
                            Xác thực Email
                        </h2>

                        <p className="mt-2 text-center text-gray-500">
                            Nhập mã OTP gồm 6 số đã gửi tới
                        </p>

                        <p className="text-center font-semibold">
                            {email}
                        </p>

                        <div className="mt-8 flex justify-center gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    value={digit}
                                    onChange={(e) =>
                                        handleOtpChange(index, e.target.value)
                                    }
                                    maxLength={1}
                                    className="h-14 w-14 rounded-xl border text-center text-2xl font-bold outline-none focus:border-blue-500"
                                />
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            {!canResend ? (
                                <p className="text-sm text-gray-500">
                                    OTP hết hạn sau{" "}
                                    <span className="font-bold text-red-500">
                                        {formatTime(timeLeft)}
                                    </span>
                                </p>
                            ) : (
                                <button
                                    onClick={handleResendOtp}
                                    className="font-semibold text-blue-600 hover:underline"
                                >
                                    Gửi lại mã OTP
                                </button>
                            )}
                        </div>
                        <button
                            onClick={handleVerify}
                            className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-bold text-white"
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
}