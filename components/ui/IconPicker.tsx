"use client";

import { useMemo, useState } from "react";
import {
  icons,
  Search,
  Check,
  ChevronDown,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IconPickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function IconPicker({
  value,
  onChange,
  placeholder = "Chọn icon",
  className,
}: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  /**
   * Tìm icon đang được chọn
   */
  const SelectedIcon = useMemo(() => {
    if (!value) return null;

    return icons[value as keyof typeof icons] as
      | LucideIcon
      | undefined;
  }, [value]);

  /**
   * Lọc danh sách icon
   */
  const filteredIcons = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const entries = Object.entries(icons);

    if (!keyword) {
      return entries;
    }

    return entries.filter(([name]) =>
      name.toLowerCase().includes(keyword),
    );
  }, [search]);

  const handleSelect = (name: string) => {
    onChange(name);
    setOpen(false);
    setSearch("");
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <Popover
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (!value) {
          setSearch("");
        }
      }}
    >
        <Button
          type="button"
          variant="outline"
          className={`w-full justify-between ${className ?? ""}`}
        >
          <div className="flex min-w-0 items-center gap-2">
            {SelectedIcon ? (
              <SelectedIcon className="size-4 shrink-0" />
            ) : (
              <span className="text-muted-foreground">
                Chưa chọn
              </span>
            )}

            {value ? (
              <span className="truncate">
                {value}
              </span>
            ) : (
              <span className="text-muted-foreground">
                {placeholder}
              </span>
            )}
          </div>

          <ChevronDown className="ml-2 size-4 shrink-0 text-muted-foreground" />
        </Button>

      <PopoverContent
        align="start"
        className="w-[360px] p-0"
      >
        {/* Search */}
        <div className="border-b p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              autoFocus
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Tìm icon..."
              className="pr-9 pl-9"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Result */}
        <ScrollArea className="h-[320px]">
          <div className="grid grid-cols-5 gap-1 p-3">
            {filteredIcons.map(([name, Icon]) => {
              const IconComponent =
                Icon as LucideIcon;

              const selected = name === value;

              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => handleSelect(name)}
                  className={`
                    group relative flex h-16
                    flex-col items-center
                    justify-center gap-1
                    rounded-md border
                    transition-colors
                    hover:bg-muted
                    ${
                      selected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-transparent"
                    }
                  `}
                >
                  <IconComponent className="size-5" />

                  <span className="max-w-full truncate px-1 text-[10px] text-muted-foreground group-hover:text-foreground">
                    {name}
                  </span>

                  {selected && (
                    <span className="absolute right-1 top-1">
                      <Check className="size-3 text-primary" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {filteredIcons.length === 0 && (
            <div className="flex h-32 items-center justify-center px-4 text-center">
              <div>
                <p className="text-sm font-medium">
                  Không tìm thấy icon
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Thử tìm với từ khóa khác.
                </p>
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {value && (
          <div className="flex items-center justify-between border-t p-2">
            <div className="flex min-w-0 items-center gap-2 px-2">
              {SelectedIcon && (
                <SelectedIcon className="size-4 shrink-0" />
              )}

              <span className="truncate text-xs text-muted-foreground">
                {value}
              </span>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
            >
              Xóa
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}