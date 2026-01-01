"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { NavItemType } from "@/Types/ComponentTypes";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Navbarcollapse({ category, closeSheet }: { category: NavItemType, closeSheet?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      key={category?.label + category?.href}
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full flex-col px-0 pt-0 pb-0"
    >
      <div
        className={cn(
          "flex items-center justify-between gap-2 p-1 ml-2 mt-2 w-full",
          "hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400",
          isOpen &&
            "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
        )}
      >
        <Link
          href={category.href!}
          className="min-w-0 flex-1 flex items-center gap-3 rounded-sm transition-all duration-200"
          onClick={closeSheet}
        >
          {category.image && (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${category.image}`}
              alt={category.label}
              width={20}
              height={20}
              className="w-8 h-8 rounded-sm object-cover shadow-sm"
            />
          )}
          {category.label}
        </Link>

        {category?.links && category?.links?.length > 0 && (
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700/50 dark:text-gray-400 rounded-full"
            >
              {isOpen ? (
                <ChevronUp className="size-5" />
              ) : (
                <ChevronDown className="size-5" />
              )}
              <span className="sr-only">Toggle {category.label} submenu</span>
            </Button>
          </CollapsibleTrigger>
        )}
      </div>

      <CollapsibleContent className="flex flex-col">
        {category?.links?.map((subItem) => (
          <Link
            key={subItem.label}
            href={subItem.href!}
            className={cn(
              "flex items-center gap-3 ml-8 pl-4 py-1.5 rounded-r-lg transition-colors duration-200",
              "border-l-2 border-gray-200 dark:border-gray-700",
              "text-sm font-normal text-gray-600 dark:text-gray-300",
              "hover:bg-green-50 hover:text-green-600 hover:border-green-500 dark:hover:bg-green-900/20 dark:hover:text-green-400"
            )}
            onClick={closeSheet}
          >
            {subItem.image && (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${subItem.image}`}
                alt={subItem.label}
                width={20}
                height={20}
                className="w-6 h-6 rounded-sm object-cover shadow-sm"
              />
            )}
            {subItem.label}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default Navbarcollapse;
