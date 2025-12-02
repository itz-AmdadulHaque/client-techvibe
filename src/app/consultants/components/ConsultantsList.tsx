// app/consultants/consultant-list.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCategories, getConsultants } from "./apiCalls";
import { ConsultantType } from "@/Types/Types";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ConsultantsFilterForm from "./consultantsFilter";
import CustomPagination from "@/components/custom/Pagination/Pagination";
import { ConsultantDetails } from "./ConsultantDetails";
import SectionTitle from "@/components/custom/SectionTitle/SectionTitle";
import ContactAdmin from "./ContactAdmin";
// import { ConsultantsPageProps } from "../page";

export async function ConsultantList({
    searchParams,
}: {
    searchParams: Record<string, string | undefined>;
}) {
    const page = Number(searchParams.page) || 1;
    const limit = Number(searchParams.limit) || 9;

    const data = await getConsultants({
        name: Array.isArray(searchParams.name) ? searchParams.name[0] : searchParams.name,
        page,
        limit,
        category: Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category,
    });

    const consultants = data.consultants || []

    const categories = await getCategories();

    

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">

            <SectionTitle title="Expert Safety & IT Consulting Services" />

            <p className="text-center my-16 max-w-[650px] mx-auto">Protecting your business with comprehensive fire safety, infrastructure integrity, and IT security solutions from certified professionals.</p>
            {/* Filters */}
            <ConsultantsFilterForm categories={categories} />

            {/* Consultants */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {consultants.map((consultant: ConsultantType) => (
                    <Card key={consultant.id} className="shadow-md rounded-2xl overflow-hidden">
                        <CardHeader className="flex items-center gap-4 mb-4">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${consultant.image}`}
                                alt={consultant.fullName}
                                width={80}
                                height={80}
                                className="w-28 h-28 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-semibold">{consultant.fullName}</h3>
                                <p className="text-sm text-gray-500">{consultant.title}</p>
                                <p className="text-xs text-gray-400">{consultant.experience} years experience</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm mb-3">{
                                consultant.bio.length > 70 ?
                                    consultant.bio.slice(0, 70) + "......"
                                    :
                                    consultant.bio
                            }</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {consultant.specializations.map((spec, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 text-xs bg-gray-100 rounded-full border"
                                    >
                                        {spec}
                                    </span>
                                ))}
                            </div>
                            <div className="flex justify-between">
                                {/* <Button asChild variant="default">
                                    <Link href={`/consultants/${consultant.slug}`}>Show Details</Link>
                                </Button> */}
                                <ConsultantDetails consultant={consultant} />
                                <ContactAdmin />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>


            <CustomPagination
                currentPage={data.pagination.currentPage}
                totalPages={data.pagination.totalPages || 1}
            />
        </div>
    );
}
