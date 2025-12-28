import { Metadata } from "next";
import { ServiceList } from "./components/ServicesList";
import { getCategories } from "./components/apiCalls";
import { SearchInput } from "@/components/custom/Filters/input-search";
import { SelectFilter } from "@/components/custom/Filters/select-search";
import SectionTitle from "@/components/custom/SectionTitle/SectionTitle";
import { CategoryType } from "@/Types/Types";

export const metadata: Metadata = {
  title: "Services | TechVibe Global",
  description:
    "Protecting your business with comprehensive fire safety, infrastructure integrity, and IT security solutions from certified professionals.",
};

export default async function ServicePage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
    limit?: string;
    category?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const categories = await getCategories();

  return (
    <div className="container mx-auto space-y-4">
      <SectionTitle
        title="Our Services"
        desciption="Protecting your business with comprehensive fire safety, infrastructure integrity, and IT security solutions from certified professionals."
      />

      {/* Filters */}
      <section className="flex flex-col sm:flex-row gap-2 justify-center">
        <SearchInput
          className="sm:max-w-[300px]"
          paramName="search"
          placeholder="Type to search..."
        />

        <SelectFilter
          options={categories.map((cat: CategoryType) => ({
            value: cat.slug,
            label: cat.title,
          }))}
          className="sm:max-w-[300px]"
          paramName="category"
          placeholder="All Categories"
          allOptionLabel="All Categories"
          allOptionValue="all"
          clearParams={["name"]}
        />
      </section>

      <ServiceList searchParams={resolvedSearchParams} />
    </div>
  );
}
