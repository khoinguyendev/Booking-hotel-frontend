import { useState } from "react";

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  return {
    page,
    setPage,

    pageSize,
    setPageSize,

    totalItems,
    setTotalItems,

    totalPages,
    setTotalPages,
  };
}