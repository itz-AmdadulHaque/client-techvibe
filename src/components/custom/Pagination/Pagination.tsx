"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  limitOptions?: number[];
}

export default function CustomPagination({
  currentPage,
  totalPages,
  limitOptions = [],
}: CustomPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [goTo, setGoTo] = useState("");

  // Read limit from query param, default to 20
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : 20;

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const goToPage = useCallback(
    (page: number) => {
      updateParams({
        page: page > 1 ? String(page) : null,
        limit: limit !== 20 ? String(limit) : null,
      });
    },
    [limit, pathname, searchParams, updateParams]
  );

  const changeLimit = (value: number) => {
    updateParams({
      limit: value !== 20 ? String(value) : null,
      page: null, // reset to page 1 on limit change
    });
  };

  const handleGoToPage = () => {
    const pageNum = Number(goTo);
    if (!pageNum || pageNum < 1 || pageNum > totalPages) return;
    goToPage(pageNum);
  };

  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).slice(Math.max(0, currentPage - 3), Math.min(currentPage + 2, totalPages));

  return (
    <div className="flex flex-col  gap-6 md:flex-row md:items-center md:justify-between py-6 px-4 border-t">
      {/* Left Section: Settings (Items per page & Go to) */}
      <div className="flex flex-wrap order-2 md:order-1 items-center justify-center md:justify-start gap-6">
        {/* Limit Selection */}
        {limitOptions.length >= 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Items per page
            </span>
            <Select
              value={String(limit)}
              onValueChange={(val) => changeLimit(Number(val))}
            >
              <SelectTrigger className="w-[70px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {limitOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Go To Page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Page
          </span>
          <div className="flex items-center">
            <Input
              type="number"
              value={goTo}
              onChange={(e) => setGoTo(e.target.value)}
              className="w-14 h-9 rounded-r-none border-r-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={1}
              max={totalPages}
              disabled={totalPages <= 1}
            />
            <Button
              variant="outline"
              size="sm"
              disabled={totalPages <= 1}
              className="h-9 rounded-l-none border-l-1 bg-muted/50 hover:bg-accent"
              onClick={handleGoToPage}
            >
              Go
            </Button>
          </div>
        </div>
      </div>

      {/* Right Section: Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex order-1 md:order-2 w-full md:w-auto justify-center md:justify-end">
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) goToPage(currentPage - 1);
                  }}
                />
              </PaginationItem>

              {visiblePages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) goToPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
