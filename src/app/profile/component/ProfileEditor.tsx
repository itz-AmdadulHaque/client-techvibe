import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  ProfileSchema,
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

const ProfileEditor = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: auth?.user?.firstName || "",
      lastName: auth?.user?.lastName || "",
      companyName: auth?.user?.companyName || "",
      phone: auth?.user?.phone || "",
    },
  });

  const updateUser = async (data: ProfileSchema) => {
    const res = await axiosPrivate.patch("/customer", data);

    return res.data;
  };

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      setAuth((prev) => ({
        ...prev,
        user: data.data,
      }));

      toast.success(data.message, {
        position: "bottom-right",
      });

      form.reset({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        companyName: data.data.companyName,
        phone: data.data.phone,
      });
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
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" placeholder="First name" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" placeholder="Last name" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <Input type="text" placeholder="Company Name" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <Input type="text" placeholder="Phone Number" {...field} />
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

export default ProfileEditor;
