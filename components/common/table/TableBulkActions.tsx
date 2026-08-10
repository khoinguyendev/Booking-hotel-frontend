"use client";

import { Button } from "@/components/ui/button";

interface Action {
  label: string;
  icon: any;
  onClick: () => void;
}

interface Props {
  count: number;
  actions: Action[];
}

export default function TableBulkActions({ count, actions }: Props) {
  if (count === 0) return null;

  return (
    <div className="mb-4 flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3">
      <span className="text-sm font-medium">Đã chọn {count} nhân viên</span>

      {/* <div className="flex gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            size="lg"
            className="bg-green-500 cursor-pointer"
            variant="outline"
            onClick={action.onClick}
          >
            {action.icon}

            {action.label}
          </Button>
        ))}
      </div> */}
    </div>
  );
}
