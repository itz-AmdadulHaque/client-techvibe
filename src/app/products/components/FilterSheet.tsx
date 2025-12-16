"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ListFilterPlus } from "lucide-react";
import SearchFilters from "./SearchFilter";
import { useState } from "react";

interface Filters {
  name: string;
  brand: string[];
  category: string[];
  subCategory: string[];
  minPrice: number;
  maxPrice: number;
}

function FilterSheet({filters}: { filters: Filters }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="lg:hidden" asChild>
        <Button
          variant="default"
          size="icon"
          className="bg-transparent p-2 border-1 border-black hover:bg-slate-300 text-black w-max h-max"
        >
          Filter <ListFilterPlus />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-4/5">
        <SheetHeader>
          <SheetTitle asChild>
            <h3 className="text-2xl font-semibold">Filter Products</h3>
          </SheetTitle>
        </SheetHeader>
        <SearchFilters initialFilters={filters} handleClose={handleClose} />
      </SheetContent>
    </Sheet>
  );
}

export default FilterSheet;