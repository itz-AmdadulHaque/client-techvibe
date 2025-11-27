"use client";

import ItemCounter from "@/components/custom/ItemCounter/ItemCounter";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { queryClient } from "@/Provider/ReactQueryClientProvider";
import { ProductCartItemType } from "@/Types/ComponentTypes";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";
import { X } from "lucide-react";

// --- UTILITY: Properly Typed Debounce Function ---
// T extends unknown[] ensures we only accept array types for arguments (e.g., [number]).
// R is the return type of the function being debounced (void for side-effects).
type DebouncedFunction<T extends unknown[], R> = (...args: T) => R;
type DebouncedReturn<T extends unknown[]> = (...args: T) => void;

const debounce = <T extends unknown[]>(
  func: DebouncedFunction<T, void>, // The function passed in returns void
  delay: number
): DebouncedReturn<T> => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      // The function execution is synchronous (it just triggers the mutation)
      func(...args);
      timeoutId = null;
    }, delay);
  };
};

// --- PROPS for ProductItemBox ---
interface ProductItemBoxProps {
  product: ProductCartItemType;
  isLoading: boolean;
  setIsLoading: (st: boolean) => void;
}

// --- COMPONENT DEFINITION ---
const ProductItemBox = ({
  product,
  isLoading,
  setIsLoading,
}: ProductItemBoxProps) => {
  const [count, setCount] = useState<number>(product.quantity);
  const axiosPrivate = useAxiosPrivate();

  const updateCart = async (newQuantity: number): Promise<number> => {
    console.log("API CALL: updating cart to quantity", newQuantity);

    await axiosPrivate.put(`/cart/product/${product.id}`, {
      quantity: newQuantity,
    });
    return newQuantity;
  };

  // 1. Replaced 'any' with AxiosResponse for standard API return
  const removeItem = async (): Promise<AxiosResponse> => {
    const res = await axiosPrivate.delete(`/cart/product/${product.id}`);
    return res;
  };

  // Typing the useMutation hook result for cart update
  const { mutate: mutateUpdateCount } = useMutation<
    number, // TData: The return value of updateCart (new quantity)
    AxiosError<{ message: string }>, // TError: Expected error structure
    number // TVariables: The input to updateCart (newQuantity)
  >({
    mutationKey: ["updateCart"],
    mutationFn: updateCart,
    onSuccess: (newQuantity: number) => {
      setCount(newQuantity);
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
      setIsLoading(false);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, { position: "bottom-center" });
      console.error("Update failed:", error);
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
    },
  });

  // Typing the useMutation hook result for item removal
  const { mutate: removeProductItem } = useMutation<
    AxiosResponse, // 2. Replaced 'any' with AxiosResponse
    AxiosError<{ message: string }>,
    void // TVariables: The input to removeItem (none needed)
  >({
    mutationKey: ["removeCartItem"],
    mutationFn: removeItem,
    onSuccess: () => {
      toast.success("Item removed", { position: "bottom-center" });
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, { position: "bottom-center" });
      console.error("Removal failed:", error);
    },
  });

  // 3. Constrained generic parameter T to be [number] and R to be void for the debounce utility
  const debouncedUpdateCart = useMemo(() => {
  return debounce<[number]>((newQuantity: number) => {
    setIsLoading(true);
    mutateUpdateCount(newQuantity);
  }, 500);
}, [mutateUpdateCount, setIsLoading]);

  const handleCountChange = (newValue: number): void => {
    setCount(newValue);
    debouncedUpdateCart(newValue);
  };

  const finalPrice: number | null = product?.product?.price
    ? new Date() < new Date(product.product.expiresAt)
      ? product.product.price - product.product.discount
      : product.product.price
    : null;

  return (
    <div className="text-wrap p-1 px-1.5 border rounded-sm flex flex-col md:flex-row md:items-center gap-3 w-full bg-white shadow-sm mb-1">
      {/* LEFT — Image + Title + Price */}
      <section className="md:flex-1 flex flex-row md:justify-start items-start gap-3">
        {/* Product Image */}
        <Image
          height={70}
          width={70}
          className="w-12 h-12 mt-1 object-contain rounded-md bg-gray-50"
          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.product.images[0].image}`}
          alt={product.product.title}
        />

        <div className="">
          <h2 className="text-lg font-semibold">{product.product.title}</h2>

          <p className="text-sm mt-1 flex items-center">
            <span className="bangla-font">
              {finalPrice && count
                ? `৳${finalPrice} * ${count} = ৳${finalPrice! * count}`
                : finalPrice
                ? `${finalPrice}`
                : "Price on Request"}
            </span>
          </p>
        </div>
      </section>

      {/* RIGHT — Counter + Remove Button */}
      <section className=" flex md:flex-col gap-2 justify-between md:justify-end md:items-end">
        {/* Remove Button — push to bottom-left on mobile */}
        <button
          type="button"
          onClick={() => removeProductItem()}
          className="md:mt-0 mt-auto bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-sm w-10 h-5 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <ItemCounter
          value={count}
          onChange={handleCountChange}
          loading={isLoading}
        />
      </section>
    </div>
  );
};

export default ProductItemBox;
