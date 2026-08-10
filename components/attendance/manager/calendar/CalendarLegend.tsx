'use client';

function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${color}`}
      />

      <span className="text-sm text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function HeatItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-4 w-4 rounded border ${color}`}
      />

      <span className="text-sm text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export default function CalendarLegend() {
  return (
    <div className="border-t dark:border-[#2C2C2E]">

      <div className="flex flex-col gap-6 p-5 lg:flex-row lg:justify-between">

        {/* Attendance */}

        <div>

          <p className="mb-3 text-sm font-semibold">
            Thống kê
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3">

            <LegendItem
              color="bg-blue-500"
              label="Có ca làm"
            />

            <LegendItem
              color="bg-green-500"
              label="Có mặt"
            />

            <LegendItem
              color="bg-orange-500"
              label="Đi trễ"
            />

            <LegendItem
              color="bg-gray-500"
              label="Nghỉ"
            />

          </div>

        </div>

        {/* Heat map */}

        <div>

          <p className="mb-3 text-sm font-semibold">
            Tỷ lệ có mặt
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-3">

            <HeatItem
              color="bg-green-50 dark:bg-green-950/30"
              label="95% - 100%"
            />

            <HeatItem
              color="bg-lime-50 dark:bg-lime-950/30"
              label="80% - 95%"
            />

            <HeatItem
              color="bg-yellow-50 dark:bg-yellow-950/30"
              label="60% - 80%"
            />

            <HeatItem
              color="bg-orange-50 dark:bg-orange-950/30"
              label="40% - 60%"
            />

            <HeatItem
              color="bg-red-50 dark:bg-red-950/30"
              label="< 40%"
            />

          </div>

        </div>

      </div>

    </div>
  );
}