"use client";

import { AttendancePieItem } from "@/types/dashboardstaff";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


interface Props {
  data: AttendancePieItem[];
}

const COLORS = [
  "#34C759",
  "#FF9500",
  "#007AFF",
  "#FF3B30",
];

export default function AttendanceStatusPieChart({
  data,
}: Props) {
  const total = data.reduce(
    (sum, item) => sum + item.value,
    0,
  );

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
      <div className="mb-6">
        <p className="text-sm text-[#8E8E93]">
          Tình trạng chấm công
        </p>

        <h2 className="mt-2 text-2xl font-black">
          Tháng này
        </h2>
      </div>

      <div className="h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 rounded-2xl bg-[#F7F7F9] p-4 dark:bg-[#2C2C2E]">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#8E8E93]">
            Tổng số ngày
          </span>

          <span className="text-xl font-black">
            {total}
          </span>
        </div>
      </div>
    </div>
  );
}