'use client';

import {
  TableCell,
  TableRow,
} from '@/components/ui/table';

import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  rows?: number;
}

export default function SalarySkeleton({
  rows = 8,
}: Props) {
  return (
    <>
      {Array.from({
        length: rows,
      }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-4 w-4" />
          </TableCell>

          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>

          <TableCell>
            <Skeleton className="mx-auto h-4 w-8" />
          </TableCell>

          <TableCell>
            <Skeleton className="mx-auto h-4 w-8" />
          </TableCell>

          <TableCell>
            <Skeleton className="ml-auto h-4 w-20" />
          </TableCell>

          <TableCell>
            <Skeleton className="ml-auto h-4 w-20" />
          </TableCell>

          <TableCell>
            <Skeleton className="ml-auto h-4 w-20" />
          </TableCell>

          <TableCell>
            <Skeleton className="ml-auto h-4 w-24" />
          </TableCell>

          <TableCell>
            <Skeleton className="mx-auto h-6 w-24 rounded-full" />
          </TableCell>

          <TableCell>
            <Skeleton className="ml-auto h-8 w-8 rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}