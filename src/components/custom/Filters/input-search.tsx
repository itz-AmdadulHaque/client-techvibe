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
      {/* 1. Add 'group' to the wrapper. 
          2. Any focus inside this div will trigger 'group-focus-within' 
      */}
      <div className="relative flex-1 group">
        
        {/* Search Button */}
        <button
          type="button"
          onClick={handleSearch}
          className={cn(
            "absolute flex justify-center items-center h-full aspect-square rounded-l-sm transition-colors z-10 text-white",
            "bg-red-500",                   // Default color
            "group-focus-within:bg-green-500" // Changes to green when input is clicked/focused
          )}
          aria-label="Submit search"
        >
          <Search className="h-5 w-5" />
        </button>

        <Input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "pl-12 pr-9 border-slate-600 transition-colors",
            "focus-visible:ring-0 focus-visible:ring-offset-0", // Clean focus
            "focus-visible:border-black" // Input border turns black on focus
          )}
          aria-label={placeholder}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black transition-colors z-20"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
