import AddToCart from "@/components/custom/AddToCart/AddToCart";
import ImageGallery from "@/components/custom/ImageGallery/ImageGallery";
import { fetchData } from "@/lib/fetchFunction";
import { truncateHtml } from "@/lib/utils";
import { ServiceType } from "@/Types/Types";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchData(`/services/${slug}`);

  if (!data?.data) return { title: "Service Not Found" };

  const service = data.data;
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${service?.thumbnail}`;

  // Clean, SEO-friendly description
  const seoTitle = `${service.title} ${
    service?.price ? `- BDT ${service.price}` : ""
  } | TechVibe Global`;
  const seoDescription = truncateHtml(service.description, 160) + "...";

  return {
    title: `${service.title} | TechVibe Global}`,
    description: seoDescription,

    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article", // Use article or website
      url: `/services/${slug}`, //added base url in layout
      images: [
        {
          url: imageUrl,
          width: 1200, // Standard OG size
          height: 630,
          alt: seoTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
    },

    // Technical SEO: Prevents duplicate content issues
    alternates: {
      canonical: `/services/${slug}`, // added base url in layout
    },
  };
}

const ServiceDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const data = await fetchData(`/services/${slug}`);
  if (!data?.data)
    return <p className="text-2xl mt-12 font-bold text-center">Service Not Found</p>;

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
