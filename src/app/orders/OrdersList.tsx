"use client";
import CustomPagination from "@/components/custom/Pagination/Pagination";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { dateFormatter } from "@/lib/dateFormatter";
import { OrderType } from "@/Types/Types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const OrdersList = () => {
  const axiosPrivate = useAxiosPrivate();

  // 2. Extract search params
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  // 3. Update fetch function to accept params
  const getOrders = async (page: string, limit: string) => {
    const res = await axiosPrivate.get(`/orders?page=${page}&limit=${limit}`);
    return res.data.data;
  };

  // 4. Add params to queryKey so it refetches when URL changes
  const { data, isPending, isError } = useQuery({
    queryKey: ["get-orders", page, limit],
    queryFn: () => getOrders(page, limit),
  });

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500/15 text-yellow-600 border-yellow-500/20",
    IN_PROGRESS: "bg-blue-500/15 text-blue-600 border-blue-500/20",
    PARTIALLY_DONE: "bg-purple-500/15 text-purple-600 border-purple-500/20",
    COMPLETED: "bg-green-500/15 text-green-600 border-green-500/20",
    CANCELLED: "bg-gray-500/15 text-gray-600 border-gray-500/20",
    REJECTED: "bg-red-500/15 text-red-600 border-red-500/20",
  };

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl pt-4 pb-3 font-semibold">My Orders</h1>
      {data?.orders?.length < 1 && (
        <div className="font-semibold flex gap-2">
          <p>No order yet,</p>
          <Link className="underline text-blue-500" href="/">
            Continue Shopping
          </Link>
        </div>
      )}

      {isPending && (
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
          {["1", "2", "3", "4", "5", "6", "7", "8"].map((item) => (
            <Skeleton key={item} className="h-40" />
          ))}
        </div>
      )}
      
      {/* order list */}
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
        {!isPending &&
          data?.orders?.map((order: OrderType) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <div className="text-sm border p-6 pb-4 bg-muted rounded-sm">
                <div className="flex flex-wrap justify-between pb-3 border-b-2">
                  <span className="font-semibold">ID: {order.id}</span>

                  <Badge className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                </div>

                <div className="text-sm font-semibold text-gray-700 p-1">
                  <p>Products: {order._count.productItems}</p>
                  <p>Services: {order._count.serviceItems}</p>
                  <p>Product Requests: {order._count.productRequests}</p>
                </div>

                <p className="font-bold text-end pt-2">
                  {dateFormatter(order.createdAt)}
                </p>
              </div>
            </Link>
          ))}
      </div>

      {data?.totalPages > 1 && (
        <CustomPagination
          currentPage={data?.currentPage}
          totalPages={data?.totalPages || 1}
        />
      )}
    </div>
  );
};

export default OrdersList;
