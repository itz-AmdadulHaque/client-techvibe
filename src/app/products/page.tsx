import SearchFilters from "./components/SearchFilter";
import { Product } from "@/Types/Types";
import { fetchData } from "@/lib/fetchFunction";
import CustomPagination from "@/components/custom/Pagination/Pagination";
import ProductCard from "@/components/custom/ProductCard/ProductCard";
import { Metadata } from "next";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ListFilterPlus } from "lucide-react";

interface SearchPageProps {
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
  title: "Products | TechVibe Global",
  description:
    "We can provide all the essential products needed for our services — including CCTV systems, computers, laptops, printers, projectors, accessories, fire safety equipment, and more.",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {

  const filters = {
    name: (await searchParams).search || "",
    brand: (await searchParams).brand?.split(",") || [],
    category: (await searchParams).category?.split(",") || [],
    subCategory: (await searchParams).subCategory?.split(",") || [],
    minPrice: Number((await searchParams).minPrice || null),
    maxPrice: Number((await searchParams).maxPrice || null),
  };

  const page = Number((await searchParams).page || 1);
  const limit = Number((await searchParams).limit || 20);

  const query = new URLSearchParams({
    ...(filters.name.length > 0 ? { search: filters.name } : {}),
    ...(filters.brand.length > 0 ? { brands: filters.brand.join(",") } : {}),
    ...(filters.category.length > 0
      ? { category: filters.category.join(",") }
      : {}),
    ...(filters.subCategory.length > 0
      ? { subCategory: filters.subCategory.join(",") }
      : {}),
    minPrice: String(filters.minPrice),
    maxPrice: String(filters.maxPrice),
    ...(page > 1 ? { page: String(page) } : {}), // don't include if page is 1
    limit: String(limit), // don't include if limit is default
  }).toString();

  const data = await fetchData(`/products?${query}`);

  const products = data.data.products || [];

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <SearchFilters initialFilters={filters} />
      </div>
      <div className="lg:col-span-3 ">
        <div className="font-bold bg-gray-200 dark:bg-gray-800 p-2 px-4 my-4 rounded-md flex justify-between items-center">
          <p>Found Products ({products.length})</p>

          <Sheet>
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
              <SearchFilters initialFilters={filters} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.length === 0 && (
            <p className="col-span-full text-center text-xl font-bold">
              No products found
            </p>
          )}
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {data?.data?.totalPages > 1 && (
          <CustomPagination
            currentPage={data.data.currentPage}
            totalPages={data.data.totalPages || 1}
            limitOptions={[20, 30, 40]}
          />
        )}
      </div>
    </div>
  );
}
