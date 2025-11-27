"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { queryClient } from "@/Provider/ReactQueryClientProvider";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const EditServiceDescription = ({
  id,
  serviceDescription,
}: {
  serviceDescription: string;
  id: string;
}) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(serviceDescription);
  const axiosPrivate = useAxiosPrivate();

  const updateCart = async () => {
    const res = await axiosPrivate.put(`/cart/service/${id}`, { description });
    return res;
  };

  const { mutate: updateService, isPending } = useMutation({
    mutationKey: ["updateCartService"],
    mutationFn: updateCart,
    onSuccess: () => {
      toast.success("Service item updated", { position: "bottom-center" });
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
      setOpen(false);
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, { position: "bottom-center" });
      console.error("Update failed:", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="border text-sm relative p-2 rounded-md min-w-56">
          <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
            Description
          </span>
          <p className="text-sm text-gray-800">
            {description?.slice(0, 15)}
            {description?.length > 15 ? "..." : ""}
            {description.length == 0 ? "Add description" : ""}
          </p>

          <p className="absolute top-1/2 right-2 -translate-y-1/2 px-1 text-xs text-gray-600">
            <Pencil size={12} />
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <p className="text-lg font-semibold">Edit Description</p>
        </DialogTitle>

        <textarea
          placeholder="Write description for this service..."
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          className="mt-2 p-2"
        />
        <Button
          onClick={() => updateService()}
          className="mt-3 w-full"
          disabled={isPending || description == serviceDescription}
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceDescription;
