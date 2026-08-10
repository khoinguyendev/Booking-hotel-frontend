'use client';

export default function AttendanceSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <tr
          key={index}
          className="border-b border-[#F2F2F7] dark:border-[#2C2C2E]"
        >
          {/* Nhân viên */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 animate-pulse rounded-full bg-[#E5E5EA] dark:bg-[#3A3A3C]" />

              <div className="space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-[#E5E5EA] dark:bg-[#3A3A3C]" />

                <div className="h-3 w-20 animate-pulse rounded bg-[#E5E5EA] dark:bg-[#3A3A3C]" />
              </div>
            </div>
          </td>

          {/* Chức vụ */}
          <td className="px-4 py-4">
            <div className="h-4 w-24 animate-pulse rounded bg-[#E5E5EA] dark:bg-[#3A3A3C]" />
          </td>

          {/* Ca */}
          <td className="px-4 py-4 text-center">
            <div className="mx-auto h-7 w-24 animate-pulse rounded-full bg-[#E5E5EA] dark:bg-[#3A3A3C]" />
          </td>

          {/* Checkin */}
          <td className="px-4 py-4 text-center">
            <div className="mx-auto h-4 w-14 animate-pulse rounded bg-[#E5E5EA] dark:bg-[#3A3A3C]" />
          </td>

          {/* Checkout */}
          <td className="px-4 py-4 text-center">
            <div className="mx-auto h-4 w-14 animate-pulse rounded bg-[#E5E5EA] dark:bg-[#3A3A3C]" />
          </td>

          {/* Status */}
          <td className="px-4 py-4">
            <div className="mx-auto h-7 w-28 animate-pulse rounded-full bg-[#E5E5EA] dark:bg-[#3A3A3C]" />
          </td>

          {/* Note */}
          <td className="px-4 py-4">
            <div className="h-4 w-36 animate-pulse rounded bg-[#E5E5EA] dark:bg-[#3A3A3C]" />
          </td>

          {/* Action */}
          <td className="px-4 py-4 text-center">
            <div className="mx-auto h-9 w-9 animate-pulse rounded-xl bg-[#E5E5EA] dark:bg-[#3A3A3C]" />
          </td>
        </tr>
      ))}
    </>
  );
}