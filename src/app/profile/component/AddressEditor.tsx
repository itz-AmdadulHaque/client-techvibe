import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  AddressSchema,
} from "@/validators/profileEdit.validation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errorMessage";

const AddressEditor = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const form = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: auth?.user?.address || "",
      thana: auth?.user?.thana || "",
      district: auth?.user?.district || "",
    },
  });

  const updateUser = async (data: AddressSchema) => {
    const res = await axiosPrivate.patch("/customer", data);
    return res.data;
  };

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      // Handle successful login, e.g., redirect or show success message

      toast.success(data.message, {
        position: "bottom-right",
      });

      setAuth((prev) => ({
        ...prev,
        user: data.data,
      }));
      form.reset({
        address: data.data.address,
        thana: data.data.thana,
        district: data.data.district,
      });
      // router.push("/")
    },
    onError: (error) => {
      const errMassage = getErrorMessage(error);
      toast.error(errMassage, { position: "bottom-right" });
    },
  });

  return (
    <div>
      <Card className="max-w-[600px] mx-auto mt-12">
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => updateProfile(data))}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <Input type="text" placeholder="District" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="thana"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thana</FormLabel>
                    <Input type="text" placeholder="Thana" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <Input type="text" placeholder="Address" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isPending || !form.formState.isDirty} type="submit" className="w-full">
                {isPending ? "Saving..." : "Save"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressEditor;
