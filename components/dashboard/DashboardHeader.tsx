"use client";

import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
    return (
        <div className="flex items-center justify-between mb-8">

            <div>
                <h1 className="text-3xl font-bold">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-1">
                    Welcome back, Admin
                </p>
            </div>

            <div className="flex items-center gap-4">

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        placeholder="Search..."
                        className="pl-10 h-11 w-72 rounded-xl border border-gray-200 outline-none px-4"
                    />

                </div>

                <button className="w-11 h-11 rounded-xl border border-gray-200 flex justify-center items-center">

                    <Bell size={20} />

                </button>

                <img
                    src="https://i.pravatar.cc/100"
                    className="w-11 h-11 rounded-full"
                />

            </div>

        </div>
    );
}