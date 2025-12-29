import AddToCart from "@/components/custom/AddToCart/AddToCart";
import ImageGallery from "@/components/custom/ImageGallery/ImageGallery";
import { fetchData } from "@/lib/fetchFunction";
import { ServiceType } from "@/Types/Types";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const data = await fetchData(`/services/${(await params).slug}`);
  if (!data) {
    return {};
  }
  const service: ServiceType = data.data;

  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${service.thumbnail}`;

  return {
    title: service.title,
    description: `${service.title} - ${service.category.title}`,

    openGraph: {
      title: service.title,
      description: `${service.title} - ${service.category.title}`,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 630,
          height: 630,
          alt: service.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: `${service.title} - ${service.category.title}`,
      images: [imageUrl],
    },
  };
}

const ServiceDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const data = await fetchData(`/services/${(await params).slug}`);

  const service: ServiceType = data.data;

  return (
    <div className="container mx-auto mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 ">
        <div>
          <ImageGallery images={service.images} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold ">{service.title}</h1>

          <h2 className="mt-3 mb-5">
            Category:{" "}
            <span className="font-semibold">{service.category.title}</span>
          </h2>

          <AddToCart
            id={service.id}
            type="service"
            count={1}
            slug={service.slug}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <div
          className="tiptap"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
      </div>
    </div>
  );
};

export default ServiceDetails;
