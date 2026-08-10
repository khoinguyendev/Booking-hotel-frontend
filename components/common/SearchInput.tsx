"use client";

import { Search, X } from "lucide-react";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  className?: string;
}

export default function SearchInput({
  value,
  placeholder = "Tìm kiếm...",
  onChange,
  onSearch,
  className,
}: Props) {
  const handleSearch = () => {
    onSearch(value.trim());
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      <Search
        size={18}
        onClick={handleSearch}
        className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder={placeholder}
        className="
          h-12
          w-full
          rounded-2xl
          border
          border-[#E5E5EA]
          bg-[#F8F8F8]
          pl-11
          pr-12
          outline-none
          transition-colors
          focus:border-[#007AFF]
          dark:border-[#2C2C2E]
          dark:bg-[#2C2C2E]
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            onSearch("");
          }}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-gray-400
            hover:bg-gray-200
            dark:hover:bg-gray-700
          "
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}