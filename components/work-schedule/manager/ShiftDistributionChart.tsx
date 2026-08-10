"use client";

interface ShiftDistribution {
  shiftName: string;
  count: number;
}

interface Props {
  data: ShiftDistribution[];
}

export default function ShiftDistributionChart({ data }: Props) {
  const maxValue = Math.max(
    ...data.map((item) => item.count),
    1,
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
      {/* Header */}

      <div>
        <h3 className="text-base font-bold">
          Phân bố ca làm việc
        </h3>

        <p className="mt-1 text-sm text-[#8E8E93]">
          Số lượng nhân viên theo từng ca
        </p>
      </div>

      {/* Chart */}

      <div className="mt-8 space-y-5">
        {data.map((item) => {
          const percentage =
            (item.count / maxValue) * 100;

          return (
            <div key={item.shiftName}>
              {/* Label */}

              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">
                  {item.shiftName}
                </span>

                <span className="text-sm font-bold">
                  {item.count}
                </span>
              </div>

              {/* Bar */}

              <div className="h-3 overflow-hidden rounded-full bg-[#F2F2F7] dark:bg-[#2C2C2E]">
                <div
                  className="
                    h-full
                    rounded-full
                    bg-[#007AFF]
                    transition-all
                    duration-500
                  "
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty */}

      {data.length === 0 && (
        <div className="py-10 text-center text-sm text-[#8E8E93]">
          Chưa có dữ liệu phân ca
        </div>
      )}
    </div>
  );
}