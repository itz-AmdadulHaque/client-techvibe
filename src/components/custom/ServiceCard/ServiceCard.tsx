import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceType } from "@/Types/Types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToCart from "../AddToCart/AddToCart";

export function truncateHtml(html: string, length: number) {
  // Strip tags for counting
  const text = html.replace(/<[^>]+>/g, "");
  return text.length > length ? text.slice(0, length) + "..." : text;
}

const ServiceCard = ({ service }: { service: ServiceType }) => {
  return (
    <Card className="rounded-sm overflow-hidden shadow-sm py-0">
      <CardContent className="relative p-0 h-[340px]">
        {/* Background Image */}
        <div className="absolute inset-0 aspect-square">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${service.thumbnail}`}
            alt={service.title}
            width={300}
            height={300}
            quality={100}
            className="object-cover h-full w-full object-center"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 shadow-sm"></div>

        {/* Bottom Content */}
        <div className="absolute bg-black/40 bottom-0 w-full px-4 py-4 text-white space-y-2">
          {/* Title */}
          <h3 className="text-lg font-semibold">{service.title}</h3>

          {/* Description */}
          <p
            className="text-sm text-gray-200 leading-snug line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: truncateHtml(service.description, 200),
            }}
          />

          {/* Optional Price */}
          {!service.price && (
            <p className="text-lg font-semibold text-green-400">
              500 ৳ {service.price}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-2 pt-1">
            {/* View Details Button */}
            <Button
              variant="default"
              className="bg-transparent border text-white font-semibold flex-1 rounded-sm"
              asChild
            >
              <Link href={`/services/${service.slug}`}>View Details</Link>
            </Button>

            {/* Add to Cart */}
            <AddToCart
              id={service.id}
              slug={service.slug}
              type="service"
              count={1}
              className="flex-1 bg-white text-black "
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
