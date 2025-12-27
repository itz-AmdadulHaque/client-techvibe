import { getCategories, getServices } from "./apiCalls";
import { ServiceType } from "@/Types/Types";
import ServicesFilterForm from "./ServicesFilter";
import CustomPagination from "@/components/custom/Pagination/Pagination";
import ServiceCard from "@/components/custom/ServiceCard/ServiceCard";

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

    const services = data.services || []

    const categories = await getCategories();




    return (
        <div className="container mx-auto space-y-4">
            {/* Filters */}
            <ServicesFilterForm categories={categories} />

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
