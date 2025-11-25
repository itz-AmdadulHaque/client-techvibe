"use client";
import SectionTitle from "@/components/custom/SectionTitle/SectionTitle";
import ServiceCard from "@/components/custom/ServiceCard/ServiceCard";
import { ServiceType } from "@/Types/Types";

const HomepageServices = ({
  services,
  title,
}: {
  services: ServiceType[];
  title: string;
}) => {

  return (
    <div className="mt-16 mb-8 pb-10">
      <SectionTitle title={title} />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default HomepageServices;
