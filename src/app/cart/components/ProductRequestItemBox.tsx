"use client";

import ItemCounter from "@/components/custom/ItemCounter/ItemCounter";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { queryClient } from "@/Provider/ReactQueryClientProvider";
import { ProductRequestCartItemType } from "@/Types/ComponentTypes";
import { useMutation } from "@tanstack/react-query";
import { Download } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

const ProductRequestItemBox = ({
  product,
}: {
  product: ProductRequestCartItemType;
}) => {
  const [count, setCount] = useState(product.quantity);
  const axiosPrivate = useAxiosPrivate();

  const fileUrl = `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.fileName}`;
  const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(product.fileName);

  const updateCart = async (updateType: string) => {
    const newQuantity = updateType === "+" ? count + 1 : count - 1;
    await axiosPrivate.put(`/cart/product-request/${product.id}`, {
      quantity: newQuantity,
    });
    return updateType;
  };

  const removeItem = async () => {
    const res = await axiosPrivate.delete(
      `/cart/product-request/${product.id}`
    );
    return res;
  };

  const { mutate: updateCount } = useMutation({
    mutationKey: ["updateCart"],
    mutationFn: updateCart,
    onSuccess: (data) => {
      setCount((prev) => (data === "+" ? prev + 1 : prev - 1));
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, { position: "bottom-left" });
      console.error("Update failed:", error);
    },
  });

  const { mutate: removeProductItem } = useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: removeItem,
    onSuccess: (data) => {
      toast.success("Item removed", { position: "bottom-left" });
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, { position: "bottom-left" });
      console.error("Update failed:", error);
    },
  });

  return (
    <div className="border p-3 rounded-md my-3 bg-white flex flex-wrap gap-5 items-center relative group">
      {isImage ? (
        <Image
          height={70}
          width={70}
          className="w-20 h-20 object-contain rounded-md"
          src={fileUrl}
          alt={product.title}
        />
      ) : (
        <a
          href={fileUrl}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-100 transition"
        >
          <Download size={18} />
          <span>Download PDF</span>
        </a>
      )}

      <div>
        <h2 className="text-xl font-semibold">{product.title}</h2>

        {product.price ? (
          <p className="text-md mt-4 flex items-center gap-1">
            <Image src="/taka.png" alt="Taka symbol" width={15} height={15} />

            <span>{product.price}</span>
          </p>
        ) : (
          <p className="text-md mt-4 text-muted-foreground">Price on Request</p>
        )}
      </div>
      <div className="ml-auto">
        <ItemCounter
          value={count}
          onChange={(val) => {
            if (val > count) {
              updateCount("+");
            } else if (val < count) {
              updateCount("-");
            }
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => removeProductItem()}
        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
      >
        ✕
      </button>
    </div>
  );
};

export default ProductRequestItemBox;
