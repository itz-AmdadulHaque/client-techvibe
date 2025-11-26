import { Product } from "@/Types/Types";

export default function ProductPrice({ product }: { product: Product }) {
    if (!product.price) {
        return (
            <div className="text-muted-foreground flex items-center font-semibold">
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
        const discountedPrice =
            product.price - product.discount;

        return (
            <div className="flex flex-wrap items-center justify-center font-semibold gap-1 bangla-font ">
                {/* <Image src="/taka.png" alt="Taka symbol" width={20} height={20} /> */}
                <p className="line-through text-sm font-thin text-red-500">{product.price}<span className="bangla-font font-semibold">৳</span></p>
                <p className="font-semibold text-lg">{discountedPrice}<span className="bangla-font font-semibold">৳</span></p>
            </div>
        );
    }

    return (
        <div >
            {/* <Image src="/taka.png" alt="Taka symbol" width={20} height={20} /> */}
            <p className="text-lg font-semibold ">{product.price}<span className="bangla-font font-semibold">৳</span></p>
        </div>
    );
}