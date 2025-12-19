"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { customerSchema, CustomerSchema } from "../../validators/customer.validation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/config/axios";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const form = useForm<CustomerSchema>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            confirmPassword: "",
            phone: "",
            // address: "",
            // thana: "",
            // district: ""
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter()

    const { setAuth } = useAuth();

    const customerSignUp = async (data: CustomerSchema) => {

        // Exclude confirmPassword before sending
        const { confirmPassword, ...submitData } = data;

        const res = await axiosPrivate.post("/auth/register", submitData)


        return res.data;

    }



    const { mutate, isPending } = useMutation(
        {
            mutationFn: customerSignUp,
            onSuccess: (data) => {

                setAuth({
                    accessToken: data.data.accessToken,
                    user: data.data.user,
                    isLoading: false
                })


                toast.success("Sign up successful", {
                    position: "top-center",
                });

                router.push('/verify-OTP')

            },
            onError: (error) => {
                // Narrow error type to AxiosError to access response
                const err = error as import('axios').AxiosError<{ message?: string }>;
                console.error("Sign up failed", err.response?.data?.message);
                toast.error(err.response?.data?.message || "Unexpected error", {
                    position: "top-center",
                });
            }
        }
    );

    const onSubmit = (data: CustomerSchema) => {
        mutate(data); // ✅ use mutation
    };


    return (
        <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">

            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 grid md:grid-cols-2 gap-4 my-4">

                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Your first name"
                                            {...field}
                                        />
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
                                        <Input
                                            type="text"
                                            placeholder="Your last name"
                                            {...field}
                                        />
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
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="Your phone number"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            type="email"
                                            placeholder="you@example.com"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <div>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        className="pr-[46px]"
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
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
                            </div>



                            <div>
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
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Re enter your password"
                                                        {...field}
                                                        disabled={form?.formState?.isSubmitting}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-muted-foreground/5 rounded-l-none"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        {showConfirmPassword ? (
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
                            </div>



                            {/* <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{"District (Optional)"}</FormLabel>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="Your district"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="thana"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{"Thana (Optional)"}</FormLabel>
                                        <Input
                                            type="text"
                                            {...field}
                                            placeholder="Your thana"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <div className="md:col-span-2">

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{"Address (Optional)"}</FormLabel>
                                            <textarea
                                                className="w-full h-24 p-2 border rounded-md"
                                                {...field}
                                                placeholder="Your detailed address"
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div> */}



                            <Button type="submit" className="w-full md:col-span-2" disabled={isPending}>
                                {isPending ? "Signing Up..." : "Sign Up"}
                            </Button>

                        </form>
                    </Form>


                </CardContent>
            </Card>

        </div>
    );
}
