"use client";
import { ConsultantType } from "@/Types/Types";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomPagination from "@/components/custom/Pagination/Pagination";
import { ConsultantDetails } from "./ConsultantDetails";
import ContactAdmin from "./ContactAdmin";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { ConsultantSkeleton } from "./ConsultantSkeleton";

export function ConsultantList({
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

  const getConsultants = async (
    search: string,
    category: string,
    page: number,
    limit: number
  ) => {
    const res = await axiosPrivate.get(
      `/consultants?page=${page}&limit=${limit}&search=${search}&category=${category}`
    );
    return res.data.data;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["get-consultants", page, limit, search, category],
    queryFn: () => getConsultants(search, category, page, limit),
  });

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="space-y-6">
      {/* Loader skeleton */}
      {isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ConsultantSkeleton key={i} />
          ))}
        </div>
      )}

      {data?.consultants.length < 1 && (
        <p className="text-center text-xl font-bold">No Consultants found</p>
      )}

      {/* Consultants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data &&
          data?.consultants.map((consultant: ConsultantType) => (
            <Card
              key={consultant.id}
              className="shadow-md rounded-sm overflow-hidden flex flex-col h-full"
            >
              <CardHeader className="flex flex-row items-center gap-4 mb-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${consultant.image}`}
                  alt={consultant.fullName}
                  width={80}
                  height={80}
                  className="w-24 h-24 rounded-full object-cover shrink-0"
                />
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                    {consultant.fullName}
                  </h1>
                  <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                    {consultant.title}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                    <span className="font-semibold text-gray-700">
                      {consultant.experience} Years
                    </span>{" "}
                    of Professional Experience
                  </p>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 pt-0">
                <p className="text-sm mb-4 text-gray-600 line-clamp-3">
                  {consultant.bio.length > 120
                    ? consultant.bio.slice(0, 120) + "..."
                    : consultant.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {consultant.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-[10px] font-bold uppercase bg-gray-100 text-gray-600 rounded-sm border border-gray-200"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between gap-2 mt-auto pt-4 border-t">
                  <ConsultantDetails consultant={consultant} />
                  <ContactAdmin />
                </div>
              </CardContent>
            </Card>
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
