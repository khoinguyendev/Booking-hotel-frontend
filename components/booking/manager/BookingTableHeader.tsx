'use client';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function BookingTableHeader() {
  return (
    <TableHeader>
      <TableRow
        className="
          border-b
          border-[#E5E5EA]
          hover:bg-transparent

          dark:border-[#2C2C2E]
        "
      >

        {/* Booking code */}
        <TableHead
          className="
            w-[130px]
            px-3
            py-3

            text-xs
            font-bold
            uppercase
            tracking-wide

            text-[#8E8E93]
          "
        >
          Booking
        </TableHead>

        {/* Guest */}
        <TableHead
          className="
            min-w-[180px]
            px-3
            py-3

            text-xs
            font-bold
            uppercase
            tracking-wide

            text-[#8E8E93]
          "
        >
          Khách hàng
        </TableHead>

        {/* Room */}
        <TableHead
          className="
            min-w-[130px]
            px-3
            py-3

            text-xs
            font-bold
            uppercase
            tracking-wide

            text-[#8E8E93]
          "
        >
          Phòng
        </TableHead>

        {/* Stay */}
        <TableHead
          className="
            min-w-[155px]
            px-3
            py-3

            text-xs
            font-bold
            uppercase
            tracking-wide

            text-[#8E8E93]
          "
        >
          Lưu trú
        </TableHead>

        {/* Quantity */}
        <TableHead
          className="
            w-[70px]
            px-2
            py-3

            text-center

            text-xs
            font-bold
            uppercase
            tracking-wide

            text-[#8E8E93]
          "
        >
          SL
        </TableHead>

        {/* Total */}
        <TableHead
          className="
            w-[125px]
            px-3
            py-3

            text-right

            text-xs
            font-bold
            uppercase
            tracking-wide

            text-[#8E8E93]
          "
        >
          Tổng tiền
        </TableHead>

        {/* Status */}
        <TableHead
          className="
            w-[120px]
            px-3
            py-3

            text-xs
            font-bold
            uppercase
            tracking-wide

            text-[#8E8E93]
          "
        >
          Trạng thái
        </TableHead>

        {/* Payment */}
        <TableHead
          className="
            w-[110px]
            px-3
            py-3

            text-xs
            font-bold
            uppercase
            tracking-wide

            text-[#8E8E93]
          "
        >
          Thanh toán
        </TableHead>

        {/* Action */}
        <TableHead
          className="
            w-[50px]
            px-2
            py-3
          "
        />
      </TableRow>
    </TableHeader>
  );
}