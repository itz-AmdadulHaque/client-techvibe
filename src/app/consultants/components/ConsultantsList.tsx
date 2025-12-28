"use client";
import { ConsultantType } from "@/Types/Types";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomPagination from "@/components/custom/Pagination/Pagination";
import { ConsultantDetails } from "./ConsultantDetails";
import ContactAdmin from "./ContactAdmin";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

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
      {/* Loading */}
      {isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {["1", "2", "3", "4", "5", "6"].map((item) => (
            <Skeleton key={item} className="h-[340px] bg-slate-400" />
          ))}
        </div>
      )}

      {data?.consultants.length < 1 && (
        <p className="text-center text-xl font-bold">No services found</p>
      )}

      {/* Consultants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data &&
          data?.consultants.map((consultant: ConsultantType) => (
            <Card
              key={consultant.id}
              className="shadow-md rounded-2xl overflow-hidden"
            >
              <CardHeader className="flex items-center gap-4 mb-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${consultant.image}`}
                  alt={consultant.fullName}
                  width={80}
                  height={80}
                  className="w-28 h-28 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{consultant.fullName}</h3>
                  <p className="text-sm text-gray-500">{consultant.title}</p>
                  <p className="text-xs text-gray-400">
                    {consultant.experience} years experience
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  {consultant.bio.length > 70
                    ? consultant.bio.slice(0, 70) + "......"
                    : consultant.bio}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {consultant.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-gray-100 rounded-full border"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  {/* <Button asChild variant="default">
                                    <Link href={`/consultants/${consultant.slug}`}>Show Details</Link>
                                </Button> */}
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
