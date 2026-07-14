"use client";

export default function NotFound() {
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

            <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
                <p className="text-8xl font-black text-[#D4AF37]">
                    404
                </p>

                <h1 className="mt-4 bg-gradient-to-r from-[#D4AF37] via-white to-[#E8D4B8] bg-clip-text text-4xl font-bold text-transparent">
                    Page Not Found
                </h1>

                <p className="mt-4 text-lg text-white/70">
                    Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
                </p>

                <div className="mt-10 flex justify-center gap-4">
                    <button
                        onClick={() => history.back()}
                        className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
                    >
                        ← Quay lại
                    </button>

                    <button
                        onClick={() => (window.location.href = "/")}
                        className="rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E8D4B8] px-6 py-3 font-bold text-black transition hover:scale-105"
                    >
                        Về trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
}