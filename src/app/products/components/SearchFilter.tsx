"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { DataContext } from "@/Provider/DataProvider/DataProvider";
import { CategoryType } from "@/Types/Types";
import { SheetClose } from "@/components/ui/sheet";

interface Filters {
  name: string;
  brand: string[];
  category: string[];
  subCategory: string[];
  minPrice: number;
  maxPrice: number;
}

export default function SearchFilters({
  initialFilters,
  isInSheet = false,
}: {
  initialFilters: Filters
  isInSheet?: boolean
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [filters, setFilters] = useState<Filters>(initialFilters)
  const { categories, brands } = useContext(DataContext)

  const [priceRange, setPriceRange] = useState<[number, number]>([initialFilters.minPrice, initialFilters.maxPrice])

  const [open, setOpen] = useState({
    brand: true,
    category: true,
    subCategory: true,
    price: true,
  })

  const updateField = <K extends keyof Filters>(field: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckbox = (type: "brand" | "category" | "subCategory", value: string) => {
    if (filters[type].includes(value)) {
      updateField(type, [])

      if (type === "category") {
        updateField("subCategory", [])
      }
    } else {
      updateField(type, [value])

      if (type === "category") {
        updateField("subCategory", [])
      }
    }
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (filters.brand.length && filters.brand[0] !== "") {
      params.set("brand", filters.brand.join(","))
    } else {
      params.delete("brand")
    }

    if (filters.category.length && filters.category[0] !== "") {
      params.set("category", filters.category.join(","))
      params.delete("subCategory")
    } else {
      params.delete("category")
    }

    if (filters.subCategory.length && filters.subCategory[0] !== "") {
      params.set("subCategory", filters.subCategory.join(","))
    } else {
      params.delete("subCategory")
    }

    params.delete("page")

    router.push(`${pathname}?${params.toString()}`)
  }

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("minPrice", String(priceRange[0]))
    params.set("maxPrice", String(priceRange[1]))

    if (filters.brand.length) {
      params.set("brand", filters.brand.join(","))
    } else {
      params.delete("brand")
    }

    if (filters.category.length) {
      params.set("category", filters.category.join(","))
    } else {
      params.delete("category")
    }

    if (filters.subCategory.length) {
      params.set("subCategory", filters.subCategory.join(","))
    } else {
      params.delete("subCategory")
    }

    if (!params.get("limit")) params.set("limit", "20")
    params.delete("page")

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearPriceFilter = () => {
    const params = new URLSearchParams()

    if (filters.brand.length) params.set("brand", filters.brand.join(","))
    if (filters.category.length) params.set("category", filters.category.join(","))
    if (filters.subCategory.length) params.set("subCategory", filters.subCategory.join(","))
    if (!params.get("limit")) params.set("limit", "20")
    params.delete("page")

    setPriceRange([0, 0])
    router.push(`/products?search=${encodeURIComponent(filters.name)}&${params.toString()}`)
  }

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("brand")
    params.delete("category")
    params.delete("subCategory")

    router.push(`/products?search=${encodeURIComponent(filters.name)}`)
  }

  const renderCollapsible = (title: string, field: keyof typeof open, children: React.ReactNode) => (
    <Card className="rounded-sm py-0 pb-2">
      <CardContent className="px-3 py-1">
        <Collapsible open={open[field]} onOpenChange={(val) => setOpen((prev) => ({ ...prev, [field]: val }))}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
            <span className="font-semibold text-lg">{title}</span>
            {open[field] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </CollapsibleTrigger>
          <CollapsibleContent className="">{children}</CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )

  const ConditionalSheetClose = ({ children }: { children: React.ReactNode }) => {
    if (isInSheet) {
      return <SheetClose asChild>{children}</SheetClose>
    }
    return <>{children}</>
  }

  return (
    <div className="relative space-y-2 shadow-md p-2 rounded-lg h-full flex flex-col">
      <div className="flex-grow space-y-2 overflow-y-auto pr-2 pb-20">
        {/* price range */}
        {renderCollapsible(
          "Price Range",
          "price",
          <div className="space-y-4">
            <Slider
              min={0}
              max={1000000}
              step={10}
              value={priceRange}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
            />

            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
              />
              <Input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 0])}
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-between items-center mt-2">
              <ConditionalSheetClose>
                <Button className="rounded-sm" size="sm" onClick={applyPriceFilter}>
                  Apply Range
                </Button>
              </ConditionalSheetClose>

              <ConditionalSheetClose>
                <Button className="rounded-sm bg-transparent" size="sm" onClick={clearPriceFilter} variant="outline">
                  Clear Range
                </Button>
              </ConditionalSheetClose>
            </div>
          </div>,
        )}

        {/* brand */}
        {renderCollapsible(
          "Brand",
          "brand",
          brands.map((b) => (
            <div key={b.slug} className="flex items-center space-x-2">
              <Checkbox
                checked={filters.brand.includes(b.slug)}
                onCheckedChange={() => handleCheckbox("brand", b.slug)}
              />
              <label>{b.title}</label>
            </div>
          )),
        )}

        {renderCollapsible(
          "Category",
          "category",
          categories.map((c: CategoryType) => (
            <div key={c.slug} className="flex items-center space-x-2">
              <Checkbox
                checked={filters.category.includes(c.slug)}
                onCheckedChange={() => handleCheckbox("category", c.slug)}
              />
              <label>{c.title}</label>
            </div>
          )),
        )}

        {filters.category.length > 0 &&
          renderCollapsible(
            "Sub Category",
            "subCategory",
            categories
              .filter((c: CategoryType) => (filters.category.length ? filters.category.includes(c.slug) : true))
              .flatMap(
                (c: CategoryType) =>
                  c.subCategories.map((sub) => (
                    <div key={sub.slug} className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.subCategory.includes(sub.slug)}
                        onCheckedChange={() => handleCheckbox("subCategory", sub.slug)}
                      />
                      <label>{sub.title}</label>
                    </div>
                  )) || [],
              ),
          )}
      </div>

      {/* apply and clear filter */}
      <div className="sticky bottom-0 left-0 right-0 p-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 flex gap-3 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
        <ConditionalSheetClose>
          <Button onClick={applyFilters} className="flex-1">
            Apply Filter
          </Button>
        </ConditionalSheetClose>
        <ConditionalSheetClose>
          <Button variant="outline" onClick={clearFilters} className="flex-1 bg-transparent">
            Clear Filter
          </Button>
        </ConditionalSheetClose>
      </div>
    </div>
  )
}