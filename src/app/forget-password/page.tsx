"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosPrivate } from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const forgetPasswordSchema = z.object({
  email: z.email("Invalid email"),
});

type ForgetPasswordFormValues = z.infer<typeof forgetPasswordSchema>;

const ForgetPassword = () => {
  const form = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [isApplied, setIsApplied] = useState(false);

  const userLogin = async (data: ForgetPasswordFormValues) => {
    const res = await axiosPrivate.post("/auth/forgot-password-otp", data);

    return res.data;
  };

  const { mutate: resetPasswordFunction, isPending } = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      toast.success(data.message, { position: "bottom-right" });
      setIsApplied(true);
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, { position: "bottom-right" });
    },
  });

  const onSubmit = async (data: ForgetPasswordFormValues) => {
    resetPasswordFunction(data);
  };

  return (
    <div className="container mx-auto flex flex-col gap-16 justify-center items-center min-h-screen ">
      {isApplied && (
        <div className="bg-gray-300 w-full text-center font-medium p-4 rounded-md">
          <p className="text-green-700">
            Reset password link sent to your email
          </p>

          <div className="flex w-56 mx-auto rounded-md justify-center px-2 py-4 items-center gap-8 mt-8 bg-muted">
            <MoveLeft />
            <Link href="/"> Back to home</Link>
          </div>
        </div>
      )}

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Forget password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter you registered email"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? "Sending..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPassword;
