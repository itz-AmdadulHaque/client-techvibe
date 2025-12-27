"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  paramName?: string;
  onSearchChange?: (value: string) => void;
}

export function SearchInput({
  placeholder = "Search...",
  className,
  paramName = "search",
  onSearchChange,
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = React.useState(searchParams.get(paramName) || "");

  // Sync state when URL changes (browser back/forward)
  React.useEffect(() => {
    const currentSearch = searchParams.get(paramName) || "";
    if (currentSearch !== value) {
      setValue(currentSearch);
    }
  }, [searchParams, paramName]);

  const updateUrl = React.useCallback(
    (searchTerm: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = searchTerm.trim();

      if (trimmed) {
        params.set(paramName, trimmed);
      } else {
        params.delete(paramName);
      }

      router.push(`${pathname}?${params.toString()}`);
      onSearchChange?.(trimmed);
    },
    [router, pathname, searchParams, paramName, onSearchChange]
  );

  const handleSearch = React.useCallback(() => {
    updateUrl(value);
  }, [value, updateUrl]);

  const handleClear = React.useCallback(() => {
    setValue("");
    updateUrl("");
  }, [updateUrl]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        updateUrl(value);
      }
    },
    [value, updateUrl]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return (
    <div className={cn("flex items-center gap-2 w-full", className)}>
      <div className="relative flex-1">
        <button
          type="button"
          onClick={handleSearch}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:cursor-pointer hover:text-black transition-colors focus:outline-none focus:text-black"
          aria-label="Submit search"
        >
          <Search className="h-4 w-4" />
        </button>

        <Input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-9 pr-9 border-slate-600 focus-visible:border-black  focus-visible:ring-0"
          aria-label={placeholder}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:cursor-pointer hover:text-black transition-colors focus:outline-none focus:text-black"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
