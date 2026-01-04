"use client";
import AuthCheck from "@/components/custom/AuthCheck";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {
  PaymentType,
  ProductOrderItemType,
  ServiceItemType,
} from "@/Types/ComponentTypes";
import { useQuery } from "@tanstack/react-query";
import { Minus, MoveLeft, Plus } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import ProductItemBox from "./components/ProductItem";
import ServiceItemBox from "./components/ServiceItemBox";
import Image from "next/image";
import { dateFormatter } from "@/lib/dateFormatter";
import { ProductRequestOrderItemType } from "@/Types/Types";
import ProductRequestItemBox from "./components/ProductRequestItem";
import { LoadingOverlay } from "@/components/custom/LoadingOverlay/LoadingOverlay";

export default function OrderInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <AuthCheck className="">
      <OrderDetails params={params}></OrderDetails>
    </AuthCheck>
  );
}

const OrderDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const [productOpen, setProductOpen] = useState(true);
  const [serviceOpen, setServiceOpen] = useState(true);
  const [productRequestOpen, setProductRequestOpen] = useState(true);

  const axiosPrivate = useAxiosPrivate();

  const getOrderDetails = async () => {
    const url = `/orders/${(await params).id}`;
    const res = await axiosPrivate.get(url);

    return res.data.data;
  };

  const { data: orderDetails, isPending } = useQuery({
    queryKey: ["get-order-details"],
    queryFn: getOrderDetails,
  });

  const products = useMemo(
    () => orderDetails?.productItems ?? [],
    [orderDetails]
  );
  const services = useMemo(
    () => orderDetails?.serviceItems ?? [],
    [orderDetails]
  );
  const productRequests = useMemo(
    () => orderDetails?.productRequests ?? [],
    [orderDetails]
  );

  const {
    productTotal,
    serviceTotal,
    productRequestTotal,
    allProductHasPrice,
    allServiceHasPrice,
    allProductRequestHasPrice,
    totalDue,
  } = useMemo(() => {
    let productTotal = 0;
    let serviceTotal = 0;
    let productRequestTotal = 0;
    let totalDue = 0;

    let allProductHasPrice = true;
    let allServiceHasPrice = true;
    let allProductRequestHasPrice = true;

    for (const productItem of products) {
      if (!productItem.price) {
        allProductHasPrice = false;
      } else {
        productTotal += Number(productItem.price) * productItem.quantity;
      }
    }

    for (const serviceItem of services) {
      if (!serviceItem.price) {
        allServiceHasPrice = false;
      } else {
        serviceTotal += Number(serviceItem.price);
      }
    }

    for (const productRequest of productRequests) {
      if (!productRequest.price) {
        allProductRequestHasPrice = false;
      } else {
        productRequestTotal +=
          Number(productRequest.price) * productRequest.quantity;
      }
    }

    if (
      allProductHasPrice &&
      allServiceHasPrice &&
      allProductRequestHasPrice &&
      orderDetails
    ) {
      totalDue = productTotal + serviceTotal + productRequestTotal;
      for (const payment of orderDetails.payments) {
        totalDue -= payment.amount;
      }
    }

    return {
      productTotal,
      serviceTotal,
      productRequestTotal,
      allProductHasPrice,
      allServiceHasPrice,
      allProductRequestHasPrice,
      totalDue,
    };
  }, [products, services, productRequests, orderDetails]);

  return (
    <div className="container mx-auto min-h-screen">
      <LoadingOverlay visible={isPending} blur />

      <div>
        <div className="flex justify-between flex-wrap gap-3 items-center">
          <Link href={"/orders"}>
            <Button>
              <MoveLeft /> Back to orders
            </Button>
          </Link>
          <h1 className="text-2xl font-bold p-6">
            Order# ord-{orderDetails?.id}
          </h1>

          <h2 className="font-semibold">
            Order Date: {dateFormatter(orderDetails?.createdAt)}
          </h2>
        </div>

        {/* TODO: status */}

        <div className="lg:grid grid-cols-4 gap-2">
          <div className="col-span-3">
            {/* product */}
            {orderDetails?.productItems?.length > 0 && (
              <Collapsible
                open={productOpen}
                onOpenChange={setProductOpen}
                className="border px-6 py-4 w-full text-left rounded-md bg-muted mt-6"
              >
                <CollapsibleTrigger className="w-full text-xl font-semibold flex justify-between mb-2">
                  <p>Products</p>
                  {productOpen ? (
                    <Minus strokeWidth={2.5} />
                  ) : (
                    <Plus strokeWidth={2.5} />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {orderDetails?.productItems.map(
                    (productItem: ProductOrderItemType) => (
                      <ProductItemBox
                        key={productItem.id}
                        product={productItem}
                      />
                    )
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* service */}
            {orderDetails?.serviceItems?.length > 0 && (
              <Collapsible
                open={serviceOpen}
                onOpenChange={setServiceOpen}
                className="border px-6 py-4 w-full text-left rounded-md bg-muted mt-6"
              >
                <CollapsibleTrigger className="w-full text-xl font-semibold flex justify-between mb-2">
                  <p>Services</p>
                  {serviceOpen ? (
                    <Minus strokeWidth={2.5} />
                  ) : (
                    <Plus strokeWidth={2.5} />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {orderDetails?.serviceItems.map(
                    (serviceItem: ServiceItemType) => (
                      <ServiceItemBox
                        key={serviceItem.id}
                        service={serviceItem}
                        date={serviceItem.createdAt}
                      />
                    )
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* product requests */}
            {orderDetails?.productRequests?.length > 0 && (
              <Collapsible
                open={productRequestOpen}
                onOpenChange={setProductRequestOpen}
                className="border px-6 py-4 w-full text-left rounded-md bg-muted mt-6"
              >
                <CollapsibleTrigger className="w-full text-xl font-semibold flex justify-between mb-2">
                  <p>Product Requests</p>
                  {productRequestOpen ? (
                    <Minus strokeWidth={2.5} />
                  ) : (
                    <Plus strokeWidth={2.5} />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {orderDetails?.productRequests.map(
                    (requestItem: ProductRequestOrderItemType) => (
                      <ProductRequestItemBox
                        key={requestItem.id}
                        product={requestItem}
                      />
                    )
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>

          {/* order summary */}
          <div>
            <div className="min-h-96 border-2 m-4 p-4 rounded-md text-sm">
              <p className="text-xl font-semibold mb-4">Order Summary</p>

              <p className="flex justify-between items-center">
                <span>{`Products (${products.length})`}</span>

                {allProductHasPrice ? (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/taka.png"
                      alt="Taka symbol"
                      width={15}
                      height={15}
                    />
                    {productTotal}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Quote Required</span>
                )}
              </p>

              <p className="flex justify-between items-center my-2">
                <span>{`Services (${services.length})`}</span>

                {allServiceHasPrice ? (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/taka.png"
                      alt="Taka symbol"
                      width={15}
                      height={15}
                    />
                    {serviceTotal}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Quote Required</span>
                )}
              </p>

              <p className="flex justify-between items-center">
                <span>{`Product Requests (${productRequests.length})`}</span>

                {allProductRequestHasPrice ? (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/taka.png"
                      alt="Taka symbol"
                      width={15}
                      height={15}
                    />
                    {productRequestTotal}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Quote Required</span>
                )}
              </p>

              <div className="border-t-2 my-2"></div>

              <p className="flex justify-between items-center font-bold">
                <span>Total</span>

                {!allProductHasPrice ||
                !allServiceHasPrice ||
                !allProductRequestHasPrice ? (
                  <span className="text-muted-foreground">Quote Required</span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/taka.png"
                      alt="Taka symbol"
                      width={15}
                      height={15}
                    />
                    {productTotal + serviceTotal + productRequestTotal}
                  </span>
                )}
              </p>
              {orderDetails?.payments.map((item: PaymentType) => {
                return (
                  <p
                    key={item.id}
                    className="flex justify-between items-center font-semibold"
                  >
                    <span>Paid on {`(${dateFormatter(item.updatedAt)})`}</span>

                    <span className="flex items-center gap-1">
                      <Image
                        src="/taka.png"
                        alt="Taka symbol"
                        width={15}
                        height={15}
                      />
                      {item.amount}
                    </span>
                  </p>
                );
              })}

              <div className="border-t-2 my-2"></div>

              <p className="flex justify-between items-center font-bold">
                <span>Due</span>

                {!allProductHasPrice ||
                !allServiceHasPrice ||
                !allProductRequestHasPrice ? (
                  <span className="text-muted-foreground">Quote Required</span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Image
                      src="/taka.png"
                      alt="Taka symbol"
                      width={15}
                      height={15}
                    />
                    {totalDue}
                  </span>
                )}
              </p>

              {/* TODO: add payment info */}

              {(!allProductHasPrice ||
                !allServiceHasPrice ||
                !allProductRequestHasPrice) && (
                <div className="mt-6 p-3 border rounded-md bg-yellow-50 text-yellow-800 text-sm">
                  Some items require pricing approval
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO: update price and status
