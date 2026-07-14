"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/hotel-login.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-[#D4AF37]/15 blur-3xl" />
            <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
                <div className="mb-6 text-7xl">⚠️</div>

                <h1 className="bg-gradient-to-r from-[#D4AF37] via-white to-[#E8D4B8] bg-clip-text text-5xl font-bold text-transparent">
                    Oops!
                </h1>

                <p className="mt-4 text-xl font-semibold text-white">
                    Đã xảy ra lỗi
                </p>

                <p className="mt-3 text-white/70">
                    Hệ thống gặp sự cố ngoài ý muốn.
                    <br />
                    Vui lòng thử lại sau.
                </p>

                <div className="mt-10 flex justify-center gap-4">
                    <button
                        onClick={() => reset()}
                        className="rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E8D4B8] px-6 py-3 font-bold text-black transition hover:scale-105"
                    >
                        Thử lại
                    </button>

                    <button
                        onClick={() => (window.location.href = "/")}
                        className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
                    >
                        Trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
}