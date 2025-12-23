"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { queryClient } from "@/Provider/ReactQueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React from "react";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay";
import { cn } from "@/lib/utils";

const AddToCart = ({
  variant,
  id,
  type,
  count,
  successResponse,
  slug,
  className,
}: {
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost";
  id: string;
  type: string;
  count: number;
  successResponse?: () => void;
  slug: string;
  className?: string;
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const router = useRouter();


  const handleAddToCart = async ({
    id,
    type,
    count,
    description,
  }: {
    id: string;
    type: string;
    count?: number;
    description?: string;
  }) => {
    if (!auth.accessToken) {
      router.push(`/login?type=${type}&slug=${slug}`);
      throw new Error("Please login to continue");
    }

    const cartInfo = {
      type,
      itemId: id,
      quantity: count,
      description: type === "service" ? description : undefined,
    };

    const res = await axiosPrivate.post("/cart", cartInfo);
    return res.data;
  };

  const { mutate: addToCart, isPending } = useMutation({
    mutationKey: ["addToCart"],
    mutationFn: handleAddToCart,
    onSuccess: (data) => {
      toast.success(data.message, { position: "bottom-right" });
      queryClient.setQueryData(["cartInfo"], () => data.data);
      successResponse?.();
    },
    onError: (error: {
      response?: { data?: { message?: string } };
      message?: string;
    }) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred";
      toast.error(errorMessage, { position: "bottom-right" });
    },
  });


  return (
    <Button
      variant={variant}
      onClick={() => addToCart({ id, type, count })}
      disabled={isPending}
      className={cn("rounded-sm", className)}
    >
      {isPending ? "ADDING..." : type !=="service" ? "ADD TO CART" : "Book Now"}

      <LoadingOverlay blur visible={isPending} />
    </Button>
  );
};

export default AddToCart;
