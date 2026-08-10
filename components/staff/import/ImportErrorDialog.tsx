"use client";

import {
  AlertCircle,
  FileWarning,
  XCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export interface ImportError {
  row: number;
  message: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  totalRows: number;
  errors: ImportError[];
}

export default function ImportErrorDialog({
  open,
  onOpenChange,
  totalRows,
  errors,
}: Props) {
  const grouped = errors.reduce<Record<number, string[]>>((acc, error) => {
    if (!acc[error.row]) {
      acc[error.row] = [];
    }

    acc[error.row].push(error.message);

    return acc;
  }, {});

  const failedRows = Object.keys(grouped).length;

  const successRows = totalRows - failedRows;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <FileWarning size={22} />

            Import thất bại
          </DialogTitle>

          <DialogDescription>
            Một số dòng không thể import.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4">
          <StatCard
            title="Tổng dòng"
            value={totalRows}
            color="blue"
          />

          <StatCard
            title="Thành công"
            value={successRows}
            color="green"
          />

          <StatCard
            title="Có lỗi"
            value={failedRows}
            color="red"
          />
        </div>

        <ScrollArea className="h-[420px] rounded-xl border">
          <div className="space-y-4 p-4">
            {Object.entries(grouped).map(([row, messages]) => (
              <div
                key={row}
                className="rounded-xl border p-4"
              >
                <div className="mb-3 flex items-center gap-2 font-semibold">
                  <AlertCircle
                    size={18}
                    className="text-red-500"
                  />

                  Dòng {row}
                </div>

                <ul className="space-y-2">
                  {messages.map((message, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm"
                    >
                      <XCircle
                        size={16}
                        className="mt-0.5 shrink-0 text-red-500"
                      />

                      {message}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: "blue" | "green" | "red";
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div
      className={`rounded-xl p-4 text-center ${colors[color]}`}
    >
      <div className="text-3xl font-bold">
        {value}
      </div>

      <div className="mt-1 text-sm font-medium">
        {title}
      </div>
    </div>
  );
}