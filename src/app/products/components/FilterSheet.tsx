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

      <SheetContent side="left" className="w-4/5 pl-2">
        <SheetHeader className="pb-0 px-2 ">
          <SheetTitle asChild className="py-0 mb-0">
            <h3 className="text-xl font-semibold">Filter Products</h3>
          </SheetTitle>
        </SheetHeader>
        <SearchFilters initialFilters={filters} handleClose={handleClose} />
      </SheetContent>
    </Sheet>
  );
}

export default FilterSheet;