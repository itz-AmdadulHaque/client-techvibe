"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselApi,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BannerType } from "@/Types/Types";
import Link from "next/link";

export default function PromoCarousel({ banners }: { banners: BannerType[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="container mx-auto py-4 pt-1">
      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ delay: 4000, stopOnInteraction: true }), Fade()]}
        opts={{
          loop: true,
          duration: 30,
        }}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner) => {
            const BannerContent = (
              <div className="relative aspect-[11/4] overflow-hidden rounded-sm shadow-lg border-1 border-black/35">
                <div className="relative w-full h-full  overflow-hidden bg-white">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${banner.image}`}
                    alt={banner.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            );

            return (
              <CarouselItem key={banner.id} className="basis-full">
                {banner.link ? (
                  <Link href={banner.link}>{BannerContent}</Link>
                ) : (
                  BannerContent
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-black text-white hover:text-white border-0 h-12 w-10 rounded-full rounded-l-none" />
        <CarouselNext className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-black text-white hover:text-white border-0 h-12 w-10 rounded-full rounded-r-none" />

        {/* Indicators */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-1 sm:h-2 rounded-full transition-all bg-white shadow-sm ${
                index === current ? "w-4 sm:w-8" : "w-1 sm:w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
