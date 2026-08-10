"use client";

import { useMemo } from "react";
import {
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Users,
  XCircle,
} from "lucide-react";

import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

import {
  AttendanceStatsResponse,
  CalendarAttendanceResponse,
} from "@/types/attendance";

interface Props {
  data: CalendarAttendanceResponse[];
  stats: AttendanceStatsResponse | null;
  selectedDate?: Date;
  onSelect?: (date: Date) => void;
}

export default function AttendanceOverview({
  data,
  stats,
  selectedDate,
  onSelect,
}: Props) {
  const maxValue = Math.max(
    ...data.map(
      (item) => (item.present ?? 0) + (item.late ?? 0) + (item.absent ?? 0),
    ),
    1,
  );

  const attentionDays = useMemo(() => {
    return data
      .filter((item) => (item.late ?? 0) > 0 || (item.absent ?? 0) > 0)
      .sort((a, b) => {
        const aScore = (a.absent ?? 0) * 2 + (a.late ?? 0);
        const bScore = (b.absent ?? 0) * 2 + (b.late ?? 0);

        return bScore - aScore;
      })
      .slice(0, 5);
  }, [data]);

  const totalPresent = useMemo(() => {
    return data.reduce((sum, item) => sum + (item.present ?? 0), 0);
  }, [data]);

  const totalLate = useMemo(() => {
    return data.reduce((sum, item) => sum + (item.late ?? 0), 0);
  }, [data]);

  const totalAbsent = useMemo(() => {
    return data.reduce((sum, item) => sum + (item.absent ?? 0), 0);
  }, [data]);

  const total = useMemo(() => {
    return totalPresent + totalLate + totalAbsent;
  }, [totalPresent, totalLate, totalAbsent]);

  const presentPercent =
    total > 0 ? Math.round((totalPresent / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* ===================== */}
      {/* Stats */}
      {/* ===================== */}

      {/* <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Tổng lượt chấm công"
          value={total}
          icon={<Users size={20} />}
          iconClassName="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
        />

        <StatCard
          title="Có mặt"
          value={totalPresent}
          icon={<CheckCircle2 size={20} />}
          iconClassName="bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300"
        />

        <StatCard
          title="Đi trễ"
          value={totalLate}
          icon={<CircleAlert size={20} />}
          iconClassName="bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300"
        />

        <StatCard
          title="Vắng"
          value={totalAbsent}
          icon={<XCircle size={20} />}
          iconClassName="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300"
        />
      </div> */}

      {/* ===================== */}
      {/* Charts */}
      {/* ===================== */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Daily chart */}

        <div className="rounded-3xl border border-[#E5E5EA] bg-white p-6 shadow-sm dark:border-[#2C2C2E] dark:bg-[#1C1C1E]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Chấm công theo ngày</h2>

              <p className="mt-1 text-sm text-[#8E8E93]">
                Tổng quan tình hình chấm công trong tháng
              </p>
            </div>

            <CalendarDays size={20} className="text-[#8E8E93]" />
          </div>

          {/* Legend */}

          <div className="mb-5 flex flex-wrap gap-5 text-sm">
            <Legend className="bg-green-500" label="Có mặt" />

            <Legend className="bg-orange-400" label="Đi trễ" />

            <Legend className="bg-red-500" label="Vắng" />
          </div>

          {/* Chart */}

          <div className="mt-6">
            <div className="flex">
              {/* Y Axis */}
              <div className="flex w-10 shrink-0 flex-col justify-between pb-8 text-right text-xs text-[#8E8E93]">
                {Array.from(
                  { length: maxValue + 1 },
                  (_, index) => maxValue - index,
                ).map((value) => (
                  <span key={value}>{value}</span>
                ))}
              </div>

              {/* Chart */}
              <div className="relative min-w-0 flex-1">
                {/* Grid lines */}
                <div className="pointer-events-none absolute inset-0 bottom-8 flex flex-col justify-between">
                  {Array.from({ length: maxValue + 1 }, (_, index) => (
                    <div
                      key={index}
                      className="border-t border-dashed border-[#E5E5EA] dark:border-[#2C2C2E]"
                    />
                  ))}
                </div>

                {/* Bars */}
                <div
                  className="relative grid h-[240px] items-end gap-3 border-b border-[#8E8E93]"
                  style={{
                    gridTemplateColumns: `repeat(${data.length}, minmax(45px, 1fr))`,
                  }}
                >
                  {data.map((item) => {
                    const present = item.present ?? 0;
                    const late = item.late ?? 0;
                    const absent = item.absent ?? 0;

                    //   const selected =
                    //     selectedDate &&
                    //     format(selectedDate, "yyyy-MM-dd") ===
                    //       item.date;

                    return (
                      <button
                        key={item.date}
                        type="button"
                        onClick={() => onSelect?.(parseISO(item.date))}
                        className="group relative flex h-full items-end justify-center rounded-t-xl px-2 transition hover:bg-[#F2F2F7] dark:hover:bg-[#2C2C2E]"
                      >
                        {/* Tooltip */}

                        {/* Tooltip */}
                        <div
                          className="
    pointer-events-none
    absolute
    bottom-full
    left-1/2
    z-30
    mb-3
    hidden
    w-[180px]
    -translate-x-1/2
    overflow-hidden
    rounded-2xl
    border
    border-white/10
    bg-[#1C1C1E]/95
    text-white
    shadow-2xl
    backdrop-blur-md
    group-hover:block
  "
                        >
                          {/* Header */}
                          <div className="border-b border-white/10 px-4 py-3">
                            <p className="text-xs text-white/50">
                              Ngày chấm công
                            </p>

                            <p className="mt-0.5 text-sm font-bold">
                              {format(parseISO(item.date), "dd/MM/yyyy")}
                            </p>
                          </div>

                          {/* Stats */}
                          <div className="space-y-2 px-4 py-3">
                            {/* Có mặt */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-green-500/15">
                                  <CheckCircle2
                                    size={14}
                                    className="text-green-400"
                                  />
                                </div>

                                <span className="text-xs text-white/70">
                                  Có mặt
                                </span>
                              </div>

                              <span className="text-sm font-bold text-green-400">
                                {present}
                              </span>
                            </div>

                            {/* Đi trễ */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-400/15">
                                  <Clock3
                                    size={14}
                                    className="text-orange-400"
                                  />
                                </div>

                                <span className="text-xs text-white/70">
                                  Đi trễ
                                </span>
                              </div>

                              <span className="text-sm font-bold text-orange-400">
                                {late}
                              </span>
                            </div>

                            {/* Vắng */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-500/15">
                                  <XCircle size={14} className="text-red-400" />
                                </div>

                                <span className="text-xs text-white/70">
                                  Vắng
                                </span>
                              </div>

                              <span className="text-sm font-bold text-red-400">
                                {absent}
                              </span>
                            </div>
                          </div>

                          {/* Total */}
                          <div className="border-t border-white/10 bg-white/[0.03] px-4 py-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/50">
                                Tổng lượt
                              </span>

                              <span className="text-sm font-bold">
                                {present + late + absent}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bars */}

                        <div className="flex h-[220px] items-end gap-1">
                          <div
                            className="w-3 rounded-t-md bg-green-500 transition-all group-hover:opacity-80"
                            style={{
                              height:
                                present > 0
                                  ? `${(present / maxValue) * 100}%`
                                  : "2px",
                            }}
                          />

                          <div
                            className="w-3 rounded-t-md bg-orange-400 transition-all group-hover:opacity-80"
                            style={{
                              height:
                                late > 0
                                  ? `${(late / maxValue) * 100}%`
                                  : "2px",
                            }}
                          />

                          <div
                            className="w-3 rounded-t-md bg-red-500 transition-all group-hover:opacity-80"
                            style={{
                              height:
                                absent > 0
                                  ? `${(absent / maxValue) * 100}%`
                                  : "2px",
                            }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* X Axis */}
                <div
                  className="grid gap-3 pt-3"
                  style={{
                    gridTemplateColumns: `repeat(${data.length}, minmax(45px, 1fr))`,
                  }}
                >
                  {data.map((item) => (
                    <div
                      key={item.date}
                      className="text-center text-xs text-[#8E8E93]"
                    >
                      {format(parseISO(item.date), "dd")}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Axis labels */}

            <div className="mt-3 flex">
              <div className="w-10 shrink-0" />

              <div className="flex-1 text-center text-xs text-[#8E8E93]">
                Ngày trong tháng
              </div>
            </div>

            <p className="mt-1 text-xs text-[#8E8E93]">Số lượt</p>
          </div>
        </div>

        {/* Distribution */}

        <div className="rounded-3xl border border-[#E5E5EA] bg-white p-6 shadow-sm dark:border-[#2C2C2E] dark:bg-[#1C1C1E]">
          <h2 className="text-lg font-bold">Phân bố trạng thái</h2>

          <p className="mt-1 text-sm text-[#8E8E93]">
            Tình hình chấm công trong tháng
          </p>

          <div className="mt-8 flex justify-center">
            <div
              className="relative flex h-44 w-44 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(
                  #22c55e 0% ${presentPercent}%,
                  #fb923c ${presentPercent}% ${
                    presentPercent + (total ? (totalLate / total) * 100 : 0)
                  }%,
                  #ef4444 ${
                    presentPercent + (total ? (totalLate / total) * 100 : 0)
                  }% 100%
                )`,
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white dark:bg-[#1C1C1E]">
                <span className="text-3xl font-bold">{presentPercent}%</span>

                <span className="text-xs text-[#8E8E93]">Có mặt</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <DistributionItem
              label="Có mặt"
              value={totalPresent}
              total={total}
              dotClassName="bg-green-500"
            />

            <DistributionItem
              label="Đi trễ"
              value={totalLate}
              total={total}
              dotClassName="bg-orange-400"
            />

            <DistributionItem
              label="Vắng"
              value={totalAbsent}
              total={total}
              dotClassName="bg-red-500"
            />
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* Attention days */}
      {/* ===================== */}

      <div className="rounded-3xl border border-[#E5E5EA] bg-white p-6 shadow-sm dark:border-[#2C2C2E] dark:bg-[#1C1C1E]">
        <div className="mb-5">
          <h2 className="text-lg font-bold">Ngày cần chú ý</h2>

          <p className="mt-1 text-sm text-[#8E8E93]">
            Những ngày có nhân viên đi trễ hoặc vắng
          </p>
        </div>

        {attentionDays.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl bg-green-50 py-8 text-sm font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
            Không có ngày nào cần chú ý
          </div>
        ) : (
          <div className="divide-y divide-[#E5E5EA] dark:divide-[#2C2C2E]">
            {attentionDays.map((item) => {
              const date = parseISO(item.date);

              return (
                <button
                  key={item.date}
                  type="button"
                  onClick={() => onSelect?.(date)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 flex-col items-center justify-center rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]">
                      <span className="text-xs text-[#8E8E93]">
                        {format(date, "EEE", {
                          locale: vi,
                        })}
                      </span>

                      <span className="font-bold">{format(date, "dd")}</span>
                    </div>

                    <div>
                      <p className="font-semibold">
                        {format(date, "dd/MM/yyyy")}
                      </p>

                      <p className="mt-1 text-sm text-[#8E8E93]">
                        {item.absent ?? 0} vắng · {item.late ?? 0} đi trễ
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-900/20 dark:text-red-300">
                    Xem
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  iconClassName,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClassName: string;
}) {
  return (
    <div className="rounded-3xl border border-[#E5E5EA] bg-white p-5 shadow-sm dark:border-[#2C2C2E] dark:bg-[#1C1C1E]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#8E8E93]">{title}</p>

          <p className="mt-2 text-3xl font-bold">
            {value.toLocaleString("vi-VN")}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconClassName}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${className}`} />

      <span className="text-[#636366] dark:text-[#AEAEB2]">{label}</span>
    </div>
  );
}

function DistributionItem({
  label,
  value,
  total,
  dotClassName,
}: {
  label: string;
  value: number;
  total: number;
  dotClassName: string;
}) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${dotClassName}`} />

          <span>{label}</span>
        </div>

        <span className="font-semibold">
          {value} ({percent}%)
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#F2F2F7] dark:bg-[#2C2C2E]">
        <div
          className={`h-full rounded-full ${dotClassName}`}
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  );
}
