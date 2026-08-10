import { useMemo, useState } from "react";

export function useRowSelection<T extends number | string>(ids: T[]) {
  const [selectedIds, setSelectedIds] = useState<Set<T>>(new Set());

  const isSelected = (id: T) => selectedIds.has(id);

  const toggle = (id: T) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds((prev) => {
      if (prev.size === ids.length) {
        return new Set();
      }

      return new Set(ids);
    });
  };

  const clear = () => {
    setSelectedIds(new Set());
  };

  const selectedCount = selectedIds.size;

  const allSelected = useMemo(() => {
    return ids.length > 0 && selectedIds.size === ids.length;
  }, [ids, selectedIds]);

  return {
    selectedIds,
    selectedCount,
    allSelected,

    isSelected,

    toggle,
    toggleAll,
    clear,
  };
}