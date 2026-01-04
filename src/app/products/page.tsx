import SearchFilters from "./components/SearchFilter";
import { Metadata } from "next";
import FilterSheet from "./components/FilterSheet";
import ProductsList from "./components/ProductsList";

export interface SearchPageProps {
  searchParams: Promise<{
    search?: string;
    brand?: string;
    category?: string;
    subCategory?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: string;
  }>;
}

export const metadata: Metadata = {
  title: "High-Quality Engineering & Safety Products | TechVibe Global ",
  description:
    "Shop premium equipment for Fire & Life Safety, Electrical Safety, and IT Surveillance. We provide certified, essential products to support your infrastructure.",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;

  // We still parse filters here to pass to the Filter UI components
  const filters = {
    name: resolvedSearchParams.search || "",
    brand: resolvedSearchParams.brand?.split(",") || [],
    category: resolvedSearchParams.category?.split(",") || [],
    subCategory: resolvedSearchParams.subCategory?.split(",") || [],
    minPrice: Number(resolvedSearchParams.minPrice || null),
    maxPrice: Number(resolvedSearchParams.maxPrice || null),
  };

  return (
    <div className="container pt-4 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Filters */}
      <div className="hidden lg:block lg:col-span-1">
        <SearchFilters initialFilters={filters} />
      </div>

      <div className="lg:col-span-3">
        {/* Top Header bar */}
        <div className="font-bold p-2 px-4 bg-gray-200 dark:bg-gray-800 my-4 rounded-md flex justify-between items-center">
          <p>Products</p>
          <FilterSheet filters={filters} />
        </div>

        {/* Client-side List Fetcher */}
        <ProductsList searchParams={resolvedSearchParams} />
      </div>
    </div>
  );
}
