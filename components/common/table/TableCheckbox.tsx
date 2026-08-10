"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  checked: boolean;
  onCheckedChange: () => void;
}

export default function TableCheckbox({
  checked,
  onCheckedChange,
}: Props) {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={onCheckedChange}
    />
  );
}