"use client";

import { WeeklyAttendance } from "@/types/dashboardstaff";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


interface Props {
  data: WeeklyAttendance[];
}

export default function AttendanceWeeklyChart({
  data,
}: Props) {
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

      <div className="mb-6">
        <p className="text-sm text-[#8E8E93]">
          Thời gian làm việc
        </p>

        <h2 className="mt-2 text-2xl font-black">
          7 ngày gần nhất
        </h2>

        <p className="mt-1 text-sm text-[#8E8E93]">
          Số giờ làm mỗi ngày
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              tick={{
                fontSize: 12,
              }}
            />

            <YAxis
              tick={{
                fontSize: 12,
              }}
              unit="h"
            />

            <Tooltip
              cursor={{
                fill: "#F2F2F7",
              }}
              formatter={(value: number) => [
                `${value} giờ`,
                "Làm việc",
              ]}
            />

            <Bar
              dataKey="hours"
              radius={[12, 12, 0, 0]}
            >
              {data.map((item, index) => (
                <Cell
                  key={index}
                  fill={
                    item.hours >= 8
                      ? "#34C759"
                      : item.hours >= 4
                      ? "#FF9500"
                      : "#FF3B30"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}

      <div className="mt-6 grid grid-cols-3 gap-4">
        <Legend
          color="bg-green-500"
          title="Đủ giờ"
          value="≥ 8h"
        />

        <Legend
          color="bg-orange-500"
          title="Thiếu"
          value="4 - 8h"
        />

        <Legend
          color="bg-red-500"
          title="< 4h"
          value="< 4h"
        />
      </div>
    </div>
  );
}

interface LegendProps {
  color: string;
  title: string;
  value: string;
}

function Legend({
  color,
  title,
  value,
}: LegendProps) {
  return (
    <div className="rounded-2xl bg-[#F8F8FA] p-3 dark:bg-[#2C2C2E]">
      <div className="flex items-center gap-2">
        <div className={`h-3 w-3 rounded-full ${color}`} />

        <span className="text-xs font-semibold">
          {title}
        </span>
      </div>

      <p className="mt-2 text-xs text-[#8E8E93]">
        {value}
      </p>
    </div>
  );
}