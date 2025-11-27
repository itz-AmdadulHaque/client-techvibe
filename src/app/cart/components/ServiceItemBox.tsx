"use client";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { queryClient } from "@/Provider/ReactQueryClientProvider";
import { ServiceItemType } from "@/Types/ComponentTypes";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import EditServiceDescription from "./EditServiceDescription";
import { X } from "lucide-react";

const ServiceItemBox = ({ service }: { service: ServiceItemType }) => {
  const axiosPrivate = useAxiosPrivate();

  const removeItem = async () => {
    const res = await axiosPrivate.delete(`/cart/service/${service.id}`);
    return res;
  };

  const { mutate: removeProductItem } = useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: removeItem,
    onSuccess: () => {
      toast.success("Item removed", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, { position: "top-center" });
      console.error("Update failed:", error);
    },
  });

  return (
    <div className="text-wrap p-1 px-1.5 border rounded-sm flex flex-col md:flex-row md:items-center gap-3 w-full bg-white shadow-sm mb-1">
      <section className="md:flex-1 flex flex-row md:justify-start items-start gap-3">
        {/* Product Image */}
        <Image
          height={70}
          width={70}
          className="w-12 h-12 mt-1 object-contain rounded-md bg-gray-50"
          src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${service.service.images[0].image}`}
          alt={service.service.title}
        />

        <div className="">
          <h2 className="text-lg font-semibold">{service.service.title}</h2>

          <p className="text-sm mt-1 flex items-center">
            <span className="bangla-font">
              {service.service.price
                ? `${service.service.price}`
                : "Price on Request"}
            </span>
          </p>
        </div>
      </section>

      <section className=" flex md:flex-col gap-2 justify-between md:justify-end md:items-end">
        {/* Remove Button — push to bottom-left on mobile */}
        <button
          type="button"
          onClick={() => removeProductItem()}
          className="md:mt-0 mt-auto bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-sm w-10 h-5 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <EditServiceDescription
          id={service.id}
          serviceDescription={service.description}
        />
      </section>
    </div>
  );
};

export default ServiceItemBox;
