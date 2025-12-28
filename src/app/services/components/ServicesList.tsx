"use client";

import { ServiceType } from "@/Types/Types";
import CustomPagination from "@/components/custom/Pagination/Pagination";
import ServiceCard from "@/components/custom/ServiceCard/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export function ServiceList({
  searchParams,
}: {
  searchParams: {
    search?: string;
    page?: string;
    limit?: string;
    category?: string;
  };
}) {
  const axiosPrivate = useAxiosPrivate();

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 9;
  const search = searchParams.search || "";
  const category = searchParams.category || "";

  const getServices = async (
    search: string,
    category: string,
    page: number,
    limit: number
  ) => {
    const res = await axiosPrivate.get(
      `/services?page=${page}&limit=${limit}&search=${search}&category=${category}`
    );
    return res.data.data;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["get-services", page, limit, search, category],
    queryFn: () => getServices(search, category, page, limit),
  });

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="space-y-4">
      {/* Loading */}
      {isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {["1", "2", "3", "4", "5", "6"].map((item) => (
            <Skeleton key={item} className="h-[340px] bg-slate-400" />
          ))}
        </div>
      )}

      {data?.services.length < 1 && (
        <p className="text-center text-xl font-bold">No services found</p>
      )}

      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {data?.services.map((service: ServiceType) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <CustomPagination
          currentPage={data.currentPage}
          totalPages={data.totalPages || 1}
        />
      )}
    </div>
  );
}
