"use client";
import ProductCard from '@/components/custom/ProductCard/ProductCard';
import SectionTitle from '@/components/custom/SectionTitle/SectionTitle';
import { Product } from '@/Types/Types'

const HomepageProducts = ({ products, title }: { products: Product[], title: string }) => {

    return (
        <div className='my-2 sm:my-10'>
            <SectionTitle title={title} />

            {/* Grid for large screens */}
            <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-6 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default HomepageProducts;
