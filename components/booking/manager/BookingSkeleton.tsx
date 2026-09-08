'use client';

import {
  TableCell,
  TableRow,
} from '@/components/ui/table';

const SKELETON_ROWS = 8;

export default function BookingSkeleton() {
  return (
    <>
      {Array.from({
        length: SKELETON_ROWS,
      }).map((_, index) => (
        <TableRow
          key={index}
          className="
            border-b
            border-[#E5E5EA]

            dark:border-[#2C2C2E]
          "
        >
          {/* Booking */}
          <TableCell className="px-3 py-3">
            <div className="space-y-1.5">
              <div
                className="
                  h-4
                  w-24
                  animate-pulse
                  rounded-md
                  bg-[#E5E5EA]

                  dark:bg-[#2C2C2E]
                "
              />

              <div
                className="
                  h-3
                  w-12
                  animate-pulse
                  rounded-md
                  bg-[#F2F2F7]

                  dark:bg-[#3A3A3C]
                "
              />
            </div>
          </TableCell>

          {/* Guest */}
          <TableCell className="px-3 py-3">
            <div className="space-y-1.5">
              <div
                className="
                  h-4
                  w-32
                  animate-pulse
                  rounded-md
                  bg-[#E5E5EA]

                  dark:bg-[#2C2C2E]
                "
              />

              <div
                className="
                  h-3
                  w-24
                  animate-pulse
                  rounded-md
                  bg-[#F2F2F7]

                  dark:bg-[#3A3A3C]
                "
              />
            </div>
          </TableCell>

          {/* Room */}
          <TableCell className="px-3 py-3">
            <div className="space-y-1.5">
              <div
                className="
                  h-4
                  w-28
                  animate-pulse
                  rounded-md
                  bg-[#E5E5EA]

                  dark:bg-[#2C2C2E]
                "
              />

              <div
                className="
                  h-3
                  w-16
                  animate-pulse
                  rounded-md
                  bg-[#F2F2F7]

                  dark:bg-[#3A3A3C]
                "
              />
            </div>
          </TableCell>

          {/* Checkin / Checkout */}
          <TableCell className="px-3 py-3">
            <div className="space-y-1.5">
              <div
                className="
                  h-3
                  w-24
                  animate-pulse
                  rounded-md
                  bg-[#E5E5EA]

                  dark:bg-[#2C2C2E]
                "
              />

              <div
                className="
                  h-3
                  w-24
                  animate-pulse
                  rounded-md
                  bg-[#E5E5EA]

                  dark:bg-[#2C2C2E]
                "
              />
            </div>
          </TableCell>

          {/* Quantity */}
          <TableCell className="px-2 py-3">
            <div className="flex justify-center">
              <div
                className="
                  h-7
                  w-7
                  animate-pulse
                  rounded-lg
                  bg-[#E5E5EA]

                  dark:bg-[#2C2C2E]
                "
              />
            </div>
          </TableCell>

          {/* Total */}
          <TableCell className="px-3 py-3">
            <div className="flex flex-col items-end gap-1.5">
              <div
                className="
                  h-4
                  w-24
                  animate-pulse
                  rounded-md
                  bg-[#E5E5EA]

                  dark:bg-[#2C2C2E]
                "
              />

              <div
                className="
                  h-3
                  w-16
                  animate-pulse
                  rounded-md
                  bg-[#F2F2F7]

                  dark:bg-[#3A3A3C]
                "
              />
            </div>
          </TableCell>

          {/* Booking status */}
          <TableCell className="px-3 py-3">
            <div
              className="
                h-6
                w-20
                animate-pulse
                rounded-full
                bg-[#E5E5EA]

                dark:bg-[#2C2C2E]
              "
            />
          </TableCell>

          {/* Payment status */}
          <TableCell className="px-3 py-3">
            <div
              className="
                h-6
                w-20
                animate-pulse
                rounded-full
                bg-[#E5E5EA]

                dark:bg-[#2C2C2E]
              "
            />
          </TableCell>

          {/* Action */}
          <TableCell className="px-2 py-3">
            <div
              className="
                h-8
                w-8
                animate-pulse
                rounded-lg
                bg-[#E5E5EA]

                dark:bg-[#2C2C2E]
              "
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}