import { Product } from "@/Types/Types";
import { cn } from "@/lib/utils"; // Shadcn utility

interface ProductPriceProps {
  product: Product;
  align?: "left" | "center" | "right";
}

export default function ProductPrice({ product, align = "center" }: ProductPriceProps) {
  // Mapping for Flexbox containers (justify-center, justify-start, etc.)
  const justifyMap = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  };

  const alignmentClasses = justifyMap[align];

  if (!product.price) {
    return (
      <div className={cn("text-muted-foreground flex items-center font-semibold w-full", alignmentClasses)}>
        Price on Request
      </div>
    );
  }

  const now = new Date();
  const hasDiscount =
    product.discount &&
    product.expiresAt &&
    new Date(product.expiresAt) > now;

  if (hasDiscount) {
    const discountedPrice = product.price - product.discount;

    return (
      <div className={cn("flex flex-wrap items-center font-semibold gap-1 bangla-font w-full", alignmentClasses)}>
        <p className="line-through text-sm font-thin text-red-500">
          {product.price}<span className="bangla-font font-semibold">৳</span>
        </p>
        <p className="font-semibold text-lg">
          {discountedPrice}<span className="bangla-font font-semibold">৳</span>
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full", alignmentClasses)}>
      <p className="text-lg font-semibold">
        {product.price}<span className="bangla-font font-semibold">৳</span>
      </p>
    </div>
  );
}