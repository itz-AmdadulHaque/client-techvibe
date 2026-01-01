
import { useCartInfo } from '@/hooks/useCartInfo';

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

const CartInfo = ({ className }: { className: string }) => {

    const { data: cartInfo, isLoading } = useCartInfo();

    const totalItems =
        (cartInfo?.productItems?.length || 0) +
        (cartInfo?.productRequests?.length || 0) +
        (cartInfo?.serviceItems?.length || 0);

    return (
        <Link href="/cart"  className={`relative cursor-pointer ${className}`}>

            <ShoppingCart strokeWidth={2} />

            {!isLoading && totalItems > 0 && (
                <p className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                </p>
            )}
        </Link>
    )
}

export default CartInfo