"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"; // shadcn utility for conditional classes
import { SearchInput } from "@/components/custom/Filters/input-search";
import { SelectFilter } from "@/components/custom/Filters/select-search";

const formSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ServicesFilterForm({
  categories,
}: {
  categories: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: searchParams.get("name") || "",
      category: searchParams.get("category") || "all",
    },
  });

  // Extract isDirty from formState
  const { isDirty } = form.formState;

  const onSubmit = (values: FormValues) => {
    const params = new URLSearchParams();

    if (values.name) params.set("name", values.name);
    if (values.category && values.category !== "all")
      params.set("category", values.category);

    router.push(`/services?${params.toString()}`);
    form.reset(values);
  };

  const onClear = () => {
    const clearedValues = { name: "", category: "all" };
    form.reset(clearedValues);
    router.push("/services");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-3"
        >
          {/* Name field - grows to take available space on desktop */}
          {/* <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Search services..."
                    className="w-full border-black focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          /> */}

          <SearchInput placeholder="Type to search..." />

          <SelectFilter
            options={categories.map((cat) => ({ value: cat.slug, label: cat.title }))}
            paramName="category"
            placeholder="All Categories"
            allOptionLabel="All Categories"
            allOptionValue="all"
          />

          {/* Category filter */}
          {/* <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full lg:w-[180px] border-black focus:ring-black">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.slug} value={cat.slug}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          /> */}

          {/* Action Buttons - Grouped for mobile alignment */}
          <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
            <Button
              type="submit"
              variant="outline"
              className={cn(
                "flex-1 lg:flex-none min-w-[100px] bg-transparent border-black text-black hover:bg-slate-100 transition-all",
                isDirty && "animate-pulse"
              )}
            >
              {isDirty ? "Apply" : "Search"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onClear}
              className="flex-1 lg:flex-none border-black text-black hover:bg-slate-100"
            >
              Clear
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
