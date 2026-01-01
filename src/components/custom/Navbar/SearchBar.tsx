"use client";

import React, { useState, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Product, ServiceType, ConsultantType } from "@/Types/Types";
import ProductPrice from "../ProductPrice/ProductPrice";

type SearchTab = "products" | "services" | "consultants";

export default function GlobalSearchModal() {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // This state holds the value that actually triggers the API call
  const [triggerSearch, setTriggerSearch] = useState("");
  const [activeTab, setActiveTab] = useState<SearchTab>("products");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isFetching, isFetched } = useQuery({
    queryKey: ["global-search-modal", activeTab, triggerSearch],
    queryFn: async () => {
      const res = await axiosPrivate.get(
        `/${activeTab}?search=${triggerSearch}&limit=5`
      );
      return res.data.data;
    },
    enabled: !!triggerSearch,
    staleTime: 1000 * 60 * 2, // Cache for 2 minutes
  });

  const handleSearchTrigger = () => {
    if (searchTerm.trim()) {
      setTriggerSearch(searchTerm.trim());
    } else {
      inputRef.current?.focus();
    }
  };

  const handleItemClick = (item: Product | ServiceType | ConsultantType) => {
    if (activeTab === "consultants") {
      router.push(
        `/consultants?search=${encodeURIComponent(
          "fullName" in item ? item.fullName : item.title
        )}`
      );
    } else {
      const path = activeTab === "products" ? "product" : "services";
      router.push(`/${path}/${item.slug}`);
    }
    setOpen(false);
  };

  const getDisplayData = (item: Product | ServiceType | ConsultantType) => {
    if ("fullName" in item) {
      return {
        name: item.fullName,
        img: item.image,
        sub: item.title,
        priceItem: null,
      };
    } else {
      return {
        name: item.title,
        img: item.thumbnail,
        sub: item.category?.title || "",
        priceItem: item as Product,
      };
    }
  };

  const results: (Product | ServiceType | ConsultantType)[] =
    data?.[activeTab] ||
    data?.products ||
    data?.consultants ||
    data?.services ||
    [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-8.5 border-slate-300 hover:border-red-500 group rounded-sm"
        >
          <Search className="h-4 w-4 group-hover:text-red-500" />
          <span className="hidden sm:block text-muted-foreground pr-1 ">Search</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] rounded-sm p-0 flex flex-col max-h-[85vh] border-none shadow-2xl overflow-hidden">
        <DialogHeader className="p-4 bg-slate-50 border-b">
          <DialogTitle className="text-red-500 font-bold">
            Global Search
          </DialogTitle>
        </DialogHeader>

        {/* Search Tabs */}
        <div className="flex p-2 gap-2 bg-slate-100">
          {(["products", "services", "consultants"] as const).map((tab) => (
            <Button
              key={tab}
              size="sm"
              variant="ghost"
              className={cn(
                "flex-1 capitalize font-bold",
                activeTab === tab
                  ? "bg-white text-red-500 shadow-sm"
                  : "text-slate-500"
              )}
              onClick={() => {
                setActiveTab(tab);
                setSearchTerm("");
                setTriggerSearch(""); // Clear results when switching
              }}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Search Input */}
        <div className="px-4 py-2 flex gap-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              placeholder={`Search for ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchTrigger()}
              className="h-12 pl-4 border-2 focus-visible:ring-0 focus-visible:border-green-500"
            />
            {searchTerm && (
              <X
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer text-slate-400 hover:text-red-500"
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>
          <Button
            onClick={handleSearchTrigger}
            className="h-12 px-6 bg-red-500 hover:bg-red-600"
          >
            {isFetching ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Search"
            )}
          </Button>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4 min-h-[350px]">
          {!isFetched && !isFetching && (
            <div className="text-center pt-20 text-slate-400 italic">
              Enter search keywords...
            </div>
          )}

          {isFetched && results.length === 0 && (
            <div className="text-center pt-20 font-medium">
              No results found.
            </div>
          )}

          {/* Loading / Skeleton State */}
          {isFetching && (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 animate-pulse"
                >
                  <div className="h-14 w-14 bg-slate-200 rounded-md shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            {results.map((item) => {
              const info = getDisplayData(item);
              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center gap-4 p-3 rounded-lg border hover:border-green-500 hover:bg-green-50/30 cursor-pointer transition-all group"
                >
                  <div className="relative h-14 w-14 border rounded-md overflow-hidden shrink-0 bg-white">
                    <Image
                      src={
                        info.img
                          ? `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${info.img}`
                          : "/altImage.jpg"
                      }
                      alt={info.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate group-hover:text-red-500">
                      {info.name}
                    </h4>

                    {/* Logic for Price/On Request for Products and Services */}
                    {activeTab !== "consultants" ? (
                      <div>
                        {info.priceItem?.price ? (
                          <ProductPrice product={info.priceItem} align="left" />
                        ) : (
                          <p className="text-xs text-muted-foreground font-semibold">
                            Price on Request
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 truncate">
                        {info.sub}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {results.length > 0 && (
          <div className="p-4 border-t bg-slate-50 text-center">
            <Button
              variant="link"
              className="text-red-500 font-bold"
              onClick={() => {
                router.push(`/${activeTab}?search=${searchTerm}`);
                setOpen(false);
              }}
            >
              See all results
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
