"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFilterProps {
  options: SelectOption[];
  placeholder?: string;
  paramName?: string;
  defaultValue?: string;
  allOptionValue?: string; // Value that represents "all" (will remove param from URL)
  allOptionLabel?: string;
  className?: string;
  clearParams?: string[]; // Optional: array of param names to clear when this select changes
  onValueChange?: (value: string) => void;
}

export function SelectFilter({
  options,
  placeholder = "Select...",
  paramName = "category",
  defaultValue = "all",
  allOptionValue = "all",
  allOptionLabel = "All",
  className,
  clearParams = [], // Default to empty array
  onValueChange,
}: SelectFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current value from URL or use default
  const currentValue = searchParams.get(paramName) || defaultValue;

  // Sync with URL changes (browser back/forward)
  const [value, setValue] = React.useState(currentValue);

  React.useEffect(() => {
    const urlValue = searchParams.get(paramName) || defaultValue;
    if (urlValue !== value) {
      setValue(urlValue);
    }
  }, [searchParams, paramName, defaultValue]);

  const updateUrl = React.useCallback(
    (selectedValue: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // If "all" is selected, remove the param from URL
      if (selectedValue === allOptionValue) {
        params.delete(paramName);
      } else {
        params.set(paramName, selectedValue);
      }

      // Clear additional params if specified
      if (clearParams.length > 0) {
        clearParams.forEach((param) => {
          params.delete(param);
        });
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      onValueChange?.(selectedValue);
    },
    [router, pathname, searchParams, paramName, allOptionValue, clearParams, onValueChange]
  );

  const handleValueChange = React.useCallback(
    (selectedValue: string) => {
      setValue(selectedValue);
      updateUrl(selectedValue);
    },
    [updateUrl]
  );

  return (
    <Select onValueChange={handleValueChange} value={value}>
      <SelectTrigger
        className={cn(
          "w-full lg:w-[180px] border-black focus:ring-black",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={allOptionValue}>{allOptionLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}