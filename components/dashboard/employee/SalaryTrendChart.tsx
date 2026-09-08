"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TrendingUp } from "lucide-react";
import { SalaryChartItem } from "@/types/dashboardstaff";


interface Props {
  data: SalaryChartItem[];
}

export default function SalaryTrendChart({
  data,
}: Props) {
  const current = data[data.length - 1]?.salary ?? 0;
  const previous = data[data.length - 2]?.salary ?? current;

  const percent =
    previous === 0
      ? 0
      : ((current - previous) / previous) * 100;

  return (
    <div
      className="
        rounded-3xl
        border
        border-[#E5E5EA]
        bg-white
        p-6
        shadow-sm
        dark:border-[#2C2C2E]
        dark:bg-[#1C1C1E]
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#8E8E93]">
            Xu hướng lương
          </p>

          <h2 className="mt-2 text-2xl font-black">
            6 tháng gần nhất
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 dark:bg-green-900/30">
          <TrendingUp
            size={16}
            className="text-green-600"
          />

          <span className="text-sm font-semibold text-green-600">
            {percent >= 0 ? "+" : ""}
            {percent.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Chart */}

      <div className="mt-6 h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="salaryGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#34C759"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#34C759"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 12,
              }}
            />

            <YAxis
              tickFormatter={(value) =>
                `${(value / 1000000).toFixed(0)}M`
              }
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip
              formatter={(value: number) => [
                value.toLocaleString("vi-VN") + " đ",
                "Lương",
              ]}
            />

            <Area
              type="monotone"
              dataKey="salary"
              stroke="#34C759"
              strokeWidth={3}
              fill="url(#salaryGradient)"
              dot={{
                r: 5,
                fill: "#34C759",
              }}
              activeDot={{
                r: 7,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-[#F7F7F9] p-4 dark:bg-[#2C2C2E]">
          <p className="text-xs text-[#8E8E93]">
            Lương hiện tại
          </p>

          <p className="mt-2 text-xl font-black text-green-600">
            {current.toLocaleString("vi-VN")}₫
          </p>
        </div>

        <div className="rounded-2xl bg-[#F7F7F9] p-4 dark:bg-[#2C2C2E]">
          <p className="text-xs text-[#8E8E93]">
            Trung bình / tháng
          </p>

          <p className="mt-2 text-xl font-black">
            {Math.round(
              data.reduce(
                (sum, item) => sum + item.salary,
                0,
              ) / data.length,
            ).toLocaleString("vi-VN")}
            ₫
          </p>
        </div>
      </div>
    </div>
  );
}