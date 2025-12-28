"use client";

import ProductCard from "@/components/custom/ProductCard/ProductCard";
import CustomPagination from "@/components/custom/Pagination/Pagination";
import { Product } from "@/Types/Types";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ProductSkeleton } from "./ProductSkeleton";

// Define a proper interface to fix 'any' and type errors
interface ProductParams {
  search?: string;
  brand?: string;
  category?: string;
  subCategory?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
  limit?: string;
}

export default function ProductsList({
  searchParams,
}: {
  searchParams: ProductParams;
}) {
  const axiosPrivate = useAxiosPrivate();

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 20;

  const getProducts = async () => {
    // Create params object and ensure all values are strings
    const params: Record<string, string> = {};

    if (searchParams.search) params.search = searchParams.search;
    if (searchParams.brand) params.brands = searchParams.brand; // Note: 'brands' per your backend
    if (searchParams.category) params.category = searchParams.category;
    if (searchParams.subCategory) params.subCategory = searchParams.subCategory;
    if (searchParams.minPrice) params.minPrice = String(searchParams.minPrice);
    if (searchParams.maxPrice) params.maxPrice = String(searchParams.maxPrice);

    params.page = String(page);
    params.limit = String(limit);

    const query = new URLSearchParams(params).toString();
    const res = await axiosPrivate.get(`/products?${query}`);
    return res.data.data;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["get-products", searchParams],
    queryFn: getProducts,
  });

  if (isError)
    return (
      <div className="py-10 text-center text-red-500">
        Error loading products.
      </div>
    );

  const products = data?.products || [];

  return (
    <div className="space-y-6">
      {isPending && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(limit)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {!isPending && products.length === 0 && (
        <p className="text-center text-xl font-bold py-20">No products found</p>
      )}

      {!isPending && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {data && data.totalPages > 1 && (
        <CustomPagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          limitOptions={[20, 30, 40]}
        />
      )}
    </div>
  );
}
