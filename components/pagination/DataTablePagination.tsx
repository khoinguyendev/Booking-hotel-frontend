"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;

  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function DataTablePagination({
  page,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (page > 3) pages.push("...");

    const from = Math.max(2, page - 1);
    const to = Math.min(totalPages - 1, page + 1);

    for (let i = from; i <= to; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-xl border bg-white px-6 py-4 md:flex-row md:items-center md:justify-between dark:bg-[#1C1C1E]">
      <div className="text-sm text-muted-foreground">
        Hiển thị{" "}
        <span className="font-semibold">{start}</span>
        {" - "}
        <span className="font-semibold">{end}</span>
        {" trên "}
        <span className="font-semibold">{totalItems}</span> bản ghi
      </div>

      <div className="flex items-center gap-4">
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Hiển thị
            </span>

            <Select
              value={String(pageSize)}
              onValueChange={(v) =>
                onPageSizeChange(Number(v))
              }
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  page > 1 && onPageChange(page - 1)
                }
              />
            </PaginationItem>

            {getPages().map((item, index) => (
              <PaginationItem key={index}>
                {item === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={page === item}
                    onClick={() => onPageChange(item)}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  page < totalPages &&
                  onPageChange(page + 1)
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}