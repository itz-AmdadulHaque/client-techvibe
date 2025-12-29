import ImageGallery from "@/components/custom/ImageGallery/ImageGallery";
import { fetchData } from "@/lib/fetchFunction";
import { Product } from "@/Types/Types";
import Image from "next/image";
import React from "react";
import HandleAddToCart from "../HandleAddToCart";
import ProductPrice from "@/components/custom/ProductPrice/ProductPrice";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const data = await fetchData(`/products/${(await params).slug}`);
  if (!data) {
    return {};
  }
  const product: Product = data.data;

  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.thumbnail}`;

  return {
    title: product.title,
    description: `${product.title} - ${product.modelNumber} - ${
      product.category.title
    } - ${product.subCategory.title} ${product.price ? product.price : ""}`,

    openGraph: {
      title: product.title,
      description: `${product.title} - ${product.modelNumber} - ${
        product.category.title
      } - ${product.subCategory.title} ${product.price ? product.price : ""}`,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 630,
          height: 630,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: `${product.title} - ${product.modelNumber} - ${
        product.category.title
      } - ${product.subCategory.title} ${product.price ? product.price : ""}`,
      images: [imageUrl],
    },
  };
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const data = await fetchData(`/products/${(await params).slug}`);

  const product: Product = data.data;

  return (
    <div className="container mx-auto mb-16 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10">
        <div>
          <ImageGallery images={product.images} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          {product.brand && (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product.brand.image}`}
              alt={product.brand.title}
              width={100}
              height={100}
              className="w-16 h-14 object-contain mb-2"
            />
          )}

          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <h2 className="text-lg mb-3">
            <span className="text-xl font-semibold">Model:</span>{" "}
            {product.modelNumber}
          </h2>

          <h2 className="my-3">
            Category:{" "}
            <span className="font-semibold">{product.category.title}</span>
          </h2>

          <h2 className="mb-5">
            Sub Category:{" "}
            <span className="font-semibold">{product.subCategory.title}</span>
          </h2>

          {product.stock > 0 ? (
            <p className="text-green-700 font-semibold text-lg">In Stock</p>
          ) : (
            <p className="text-red-700 font-semibold text-lg">Out Of Stock</p>
          )}

          <ProductPrice product={product} align="left" />

          <HandleAddToCart id={product.id} slug={product.slug} />
        </div>
      </div>

      <div className="my-10">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <div
          className="tiptap"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
