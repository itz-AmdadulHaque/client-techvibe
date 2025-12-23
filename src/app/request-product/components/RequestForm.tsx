"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload, ShoppingCart, Package, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "sonner";
import { queryClient } from "@/Provider/ReactQueryClientProvider";
import {
  productRequestSchema,
  ProductRequestType,
} from "@/validators/productRequest.validation";
import AuthCheck from "@/components/custom/AuthCheck";
import { imageCompress } from "@/lib/imageCompressor";
import useAuth from "@/hooks/useAuth";

export default function ProductRequestForm() {
  // const [dialog, setDialog] = useState({ open: false, title: '', description: '' });

  const axiosPrivate = useAxiosPrivate();

  const { auth } = useAuth();

  // React Hook Form setup
  const form = useForm({
    resolver: zodResolver(productRequestSchema),
    defaultValues: {
      title: "",
      quantity: 1,
      phone: auth?.user?.phone || "",
      address: auth?.user?.address || "",
      district: auth?.user?.district || "",
      thana: auth?.user?.thana || "",
      description: "",
      file: undefined,
    },
  });

  function buildFormData(values: ProductRequestType) {
    const fd = new FormData();
    fd.append("title", values.title);
    fd.append("quantity", String(values.quantity));
    fd.append("phone", values.phone);
    fd.append("address", values.address);
    fd.append("district", values.district);
    fd.append("thana", values.thana);
    if (values.description) fd.append("description", values.description);
    if (values.file) {
      fd.append("file", values.file, values.file.name);
    }
    return fd;
  }

  // Utility to handle form submission
  const onSubmit = async (data: ProductRequestType, action: string) => {
    const url =
      action === "order-now"
        ? "/product-requests/order-now"
        : "/product-requests";

    const formData = buildFormData(data);

    const res = await axiosPrivate.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res;
  };

  // React Query mutations
  const addCartMutation = useMutation({
    mutationFn: (data: z.infer<typeof productRequestSchema>) =>
      onSubmit(data, "add-to-cart"),
    onSuccess: (data) => {
      toast.success(data.data.message, { position: "bottom-right" });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["cartInfo"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, { position: "bottom-right" });
      console.error("Update failed:", error);
    },
  });

  const orderNowMutation = useMutation({
    mutationFn: (data: z.infer<typeof productRequestSchema>) =>
      onSubmit(data, "order-now"),
    onSuccess: (data) => {
      toast.success(data.data.message, { position: "bottom-right" });
      form.reset();
    },
  });

  const [isCompressing, setIsCompressing] = useState(false);
  const handleImageUpload = async (file: File) => {
    setIsCompressing(true); // disable button while compressing

    const compressedFile = await imageCompress(file, 5);

    if (compressedFile) {
      // setPreview(URL.createObjectURL(compressedFile));
      form.setValue("file", compressedFile);
    }

    setIsCompressing(false); // re-enable after done
  };

  return (
    <AuthCheck className="">
      <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
        <div className="max-w-4xl w-full p-6 space-y-8">
          <Card className="rounded-sm shadow-lg border border-gray-200 dark:border-gray-700">
            <CardHeader className="bg-gray-50 dark:bg-gray-800">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Request Custom Product
              </CardTitle>
              <CardDescription className="text-gray-700 font-semibold dark:text-gray-400">
                If you have a specific product in mind that you don&rsquo;t see
                on our website, please fill out the form below with details
                about the product you need. Our team will review your request
                and provide a quote within 24-48 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) =>
                    addCartMutation.mutate(data)
                  )}
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Product Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the product name or description"
                              {...field}
                              className="rounded-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Quantity <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                              className="rounded-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Mobile Number{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="01xxxxxxxxx"
                              {...field}
                              className="rounded-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            District <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex. Chittagong"
                              {...field}
                              className="rounded-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="thana"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Thana <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex. Panchlaish"
                              {...field}
                              className="rounded-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Delivery Address{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your complete delivery address"
                              {...field}
                              className="rounded-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional specifications, requirements, or notes about the product..."
                            {...field}
                            className="rounded-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Images or Documents</FormLabel>
                        <FormControl>
                          <div
                            className="relative flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-800 cursor-pointer transition-colors hover:border-blue-500 dark:hover:border-blue-400 group"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              if (e.dataTransfer.files.length > 0) {
                                const file = e.dataTransfer.files[0];

                                if (file.type.startsWith("image/")) {
                                  handleImageUpload(file);
                                } else {
                                  form.setValue("file", file, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                  });
                                }
                              }
                            }}
                            onClick={() => {
                              const input =
                                document.getElementById("file-upload-input");
                              if (input) input.click();
                            }}
                          >
                            <input
                              id="file-upload-input"
                              type="file"
                              className="hidden"
                              accept=".jpg,.jpeg,.png,.pdf"
                              onChange={(e) => {
                                e.preventDefault();
                                if (
                                  e.target.files &&
                                  e.target.files.length > 0
                                ) {
                                  const file = e.target.files[0];

                                  if (file.type.startsWith("image/")) {
                                    handleImageUpload(file);
                                  } else {
                                    form.setValue("file", file, {
                                      shouldDirty: true,
                                      shouldValidate: true,
                                    });
                                  }
                                }
                              }}
                            />
                            <div className="text-center">
                              <CloudUpload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Drag & drop files here, or click to select
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500">
                                (Max 1MB per file. Images and PDFs only)
                              </p>
                              {field.value && (
                                <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                  Selected: {field.value.name}
                                </p>
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="button"
                      className="flex-1 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-sm transition-colors disabled:opacity-50"
                      disabled={
                        addCartMutation.isPending ||
                        orderNowMutation.isPending ||
                        isCompressing
                      }
                      onClick={() =>
                        form.handleSubmit((data) =>
                          addCartMutation.mutate(data)
                        )()
                      }
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Button
                      type="button"
                      className="flex-1 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-sm transition-colors disabled:opacity-50"
                      disabled={
                        addCartMutation.isPending ||
                        orderNowMutation.isPending ||
                        isCompressing
                      }
                      onClick={() =>
                        form.handleSubmit((data) =>
                          orderNowMutation.mutate(data)
                        )()
                      }
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Order Now
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100 py-3 rounded-sm transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                      onClick={() => form.reset()}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>


          {/* <Dialog open={dialog.open} onOpenChange={(open) => setDialog(s => ({ ...s, open }))}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{dialog.title}</DialogTitle>
                <DialogDescription>{dialog.description}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setDialog(s => ({ ...s, open: false }))}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </div>
      </div>
    </AuthCheck>
  );
}
