import type { ReactNode } from "react";

export default function AuthLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100 px-4">
            <div className="w-full">
                {children}
            </div>
        </main>
    );
}