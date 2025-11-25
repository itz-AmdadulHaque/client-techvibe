import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/Types/Types";
import AddToCart from "../AddToCart/AddToCart";
import ProductPrice from "../ProductPrice/ProductPrice";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card key={product.id} className="h-full py-0 rounded-sm">
      <CardContent className="h-full flex flex-col p-0">
        <Link
          href={`/product/${product.slug}`}
          className="flex flex-col flex-grow text-center"
        >
          <div className="rounded-md group flex flex-col gap-1">
            <div className="overflow-hidden rounded-sm aspect-square shadow-sm">
              <Image
                src={
                  product.thumbnail
                    ? `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.thumbnail}`
                    : "/altImage.jpg"
                }
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <h2 className="text-base font-bold mb-1">{product.title}</h2>

            <div className="flex justify-center mb-2">
              <ProductPrice product={product} />
            </div>
          </div>
        </Link>

        <AddToCart
          id={product.id}
          type="product"
          count={1}
          slug={product.slug}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
