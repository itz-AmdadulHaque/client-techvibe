import ImageGallery from "@/components/custom/ImageGallery/ImageGallery";
import { fetchData } from "@/lib/fetchFunction";
import { Product } from "@/Types/Types";
import Image from "next/image";
import React from "react";
import HandleAddToCart from "../HandleAddToCart";
import ProductPrice from "@/components/custom/ProductPrice/ProductPrice";
import { Metadata } from "next";
import { truncateHtml } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchData(`/products/${slug}`);

  if (!data?.data) return { title: "Product Not Found" };
  const product = data.data;
  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${product?.thumbnail}`;

  // Clean, SEO-friendly description
  const seoTitle = `${product.title} ${
    product.modelNumber ? `(${product.modelNumber})` : ""
  }, ${product?.price ? `BDT ${product.price}` : ""} | TechVibe Global`;
  const seoDescription = truncateHtml(product.description, 160) + "...";

  return {
    title: `${product.title} | TechVibe Global}`,
    description: seoDescription,

    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article", // Use article or website
      url: `/products/${slug}`, //added base url in layout
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
      canonical: `/products/${slug}`, // added base url in layout
    },
  };
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const data = await fetchData(`/products/${(await params).slug}`);
  if (!data?.data)
    return <p className="text-2xl mt-12 font-bold text-center">Product Not Found</p>;
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
