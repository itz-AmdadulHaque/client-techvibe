"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import googleLogo from "../../../public/google.png";
import axios from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { getErrorMessage } from "@/lib/errorMessage";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const searchParams = useSearchParams();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setAuth } = useAuth();
  const router = useRouter();

  const userLogin = async (data: LoginFormValues) => {
    const res = await axios.post("/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return res.data;
  };

  const { mutate: loginFunction, isPending } = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      setAuth({
        accessToken: data.data.accessToken,
        user: data.data.user,
        isLoading: false,
      });

      const type = searchParams.get("type");
      const slug = searchParams.get("slug");

      if (type && slug) {
        router.push(`/${type}/${slug}`);
      } else {
        router.push("/profile");
      }
    },
    onError: (error) => {
      const errMassage = getErrorMessage(error);
      toast.error(errMassage, { position: "bottom-right" });
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    loginFunction(data);
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full mb-4"
          variant="outline"
          onClick={handleGoogleLogin}
        >
          <Image
            src={googleLogo}
            alt="Google Icon"
            width={16}
            height={16}
            className="inline-block mr-2 h-4 w-4"
          />
          Continue with Google
        </Button>

        <div className="text-center my-4 text-muted-foreground">or</div>
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
                    placeholder="example@mail.com"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="flex justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            New user?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>

          <p className="text-sm text-muted-foreground">
            <a href="/forget-password" className="hover:underline">
              Forgot you password?
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
