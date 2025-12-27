import { getCategories, getServices } from "./apiCalls";
import { CategoryType, ServiceType } from "@/Types/Types";
import CustomPagination from "@/components/custom/Pagination/Pagination";
import ServiceCard from "@/components/custom/ServiceCard/ServiceCard";
import { SearchInput } from "@/components/custom/Filters/input-search";
import { SelectFilter } from "@/components/custom/Filters/select-search";
import SectionTitle from "@/components/custom/SectionTitle/SectionTitle";

export async function ServiceList({
  searchParams,
}: {
  searchParams: {
    name?: string;
    page?: string;
    limit?: string;
    category?: string;
  };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 9;

  const data = await getServices({
    name: searchParams.name,
    page,
    limit,
    category: searchParams.category,
  });

  const services = data.services || [];

  const categories = await getCategories();

  return (
    <div className="container mx-auto space-y-4">
      <SectionTitle title="Our Services" />

      {/* Filters */}
      <section className="flex gap-2 justify-center">
        <SearchInput
          className="max-w-[300px]"
          paramName="name"
          placeholder="Type to search..."
        />

        <SelectFilter
          options={categories.map((cat: CategoryType) => ({
            value: cat.slug,
            label: cat.title,
          }))}
          paramName="category"
          placeholder="All Categories"
          allOptionLabel="All Categories"
          allOptionValue="all"
          clearParams={["name"]}
        />
      </section>

      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {services.map((service: ServiceType) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </div>

      {/* Pagination */}
      <CustomPagination
        currentPage={data.currentPage}
        totalPages={data.totalPages || 1}
      />
    </div>
  );
}
