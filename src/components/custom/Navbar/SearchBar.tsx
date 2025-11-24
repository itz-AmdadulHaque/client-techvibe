"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react"; // 1. Import useRef
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  // 2. Create a ref for the input element
  const inputRef = useRef<HTMLInputElement>(null); 

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (pathname.startsWith("/products/")) {
      setQuery(decodeURIComponent(pathname.split("/")[2]?.split("?")[0] || ""));
    } else {
      setQuery(""); // Clear when not on search page
    }
  }, [pathname]);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      // 3. Focus the input if the query is empty
      inputRef.current?.focus(); 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-1 items-center">
      <Input
        ref={inputRef} // 4. Attach the ref to the Input component
        type="search"
        placeholder="Search Products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          "ml-3 p-2 min-w-28 max-w-96",
          "focus:ring-0 focus:ring-offset-0 focus:border-white focus:outline-none border border-gray-300 dark:border-gray-700"
        )}
      />
      <Button
        onClick={handleSearch}
        className={cn(
          "border h-8 w-8 rounded-md dark:border dark:bg-transparent dark:border-white text-white",
          query &&
            "text-green-500 border border-green-500 dark:border-green-500 animate-pulse"
        )}
        size="icon"
      >
        <Search strokeWidth={2.5} size={32} className=" h-4 w-4 " />
      </Button>
    </div>
  );
}