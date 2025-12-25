"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordSchema,
  PasswordSchema,
} from "@/validators/profileEdit.validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { getErrorMessage } from "@/lib/errorMessage";

const ResetPassword = () => {
  const axiosPrivate = useAxiosPrivate();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const form = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const updateUser = async (data: PasswordSchema) => {
    const res = await axiosPrivate.post("auth/reset-password", {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
    return res.data;
  };

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success(data.message, {
        position: "bottom-right",
      });

      form.reset();
    },
    onError: (error) => {
      const errMassage = getErrorMessage(error);
      toast.error(errMassage, { position: "bottom-right" });
    },
  });

  return (
    <div>
      <Card className="max-w-[600px] mx-auto my-12">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            Please enter your current password and new password. If you logged
            in with Google, use a dummy old password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => updateProfile(data))}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="pr-[46px]"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your current password"
                          {...field}
                          disabled={form?.formState?.isSubmitting}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-1/2 -translate-y-1/2 bg-muted-foreground/5 rounded-l-none"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="pr-[46px]"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          {...field}
                          disabled={form?.formState?.isSubmitting}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-1/2 -translate-y-1/2 bg-muted-foreground/5 rounded-l-none"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="pr-[46px]"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Re Enter new password"
                          {...field}
                          disabled={form?.formState?.isSubmitting}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-1/2 -translate-y-1/2 bg-muted-foreground/5 rounded-l-none"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? "Saving..." : "Save"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
