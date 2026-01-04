// app/consultants/page.tsx
import { Metadata } from "next";
import { ConsultantList } from "./components/ConsultantsList";
import { SelectFilter } from "@/components/custom/Filters/select-search";
import { SearchInput } from "@/components/custom/Filters/input-search";
import SectionTitle from "@/components/custom/SectionTitle/SectionTitle";
import { getCategories } from "./components/apiCalls";
import { CategoryType } from "@/Types/Types";

export const metadata: Metadata = {
  title: "Engineering Consultancy & Compliance Audits | TechVibe Global",
  description:
    "Certified consultancy for Fire & Life Safety, Electrical Audits, and IT Infrastructure. We provide strategic engineering guidance and the essential products required for nationwide regulatory compliance.",
};

export default async function ConsultantsPage({
  searchParams,
}: {
  searchParams: Promise<{
    name?: string;
    page?: string;
    limit?: string;
    category?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const categories = await getCategories();

  return (
    <div className="container mx-auto space-y-4 pb-6">
      <SectionTitle
        title="Engineering Consultancy"
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

      <ConsultantList searchParams={resolvedSearchParams} />
    </div>
  );
}
