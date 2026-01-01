"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavItemType } from "@/Types/ComponentTypes";
import { ChevronDown, Menu} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navbarcollapse from "./NavbarCollaps";

export function NavbarDrawer({ navItems }: { navItems: NavItemType[] }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = () => setSheetOpen(false);
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button
          size="icon"
          className="bg-transparent cursor-pointer text-black border h-8 w-8 rounded-sm hover:bg-transparent dark:border dark:bg-transparent dark:border-white"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent className="px-4 w-full" side="left">
        <SheetHeader className="px-0 border-b">
          <SheetTitle className="px-0">
            <Link href="/" onClick={closeSheet}>
              <Image
                src="/logo.png"
                alt="TechVibe"
                width={300}
                height={100}
                priority
                className="w-40 aspect-[3/1] h-auto"
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col  justify-start gap-3">
          {navItems.map((item) =>
            item.links ? (
              <Collapsible key={item.label}>
                <CollapsibleTrigger className="group flex items-center justify-between w-full text-left">
                  <div className="text-xl font-semibold flex items-center gap-2">
                    {item.icon && (
                      <span className="bg-accent rounded-sm p-1.5">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-2 sm:mt-0 pl-2 flex flex-col items-start">
                  {item.links.map((category) => (
                    <Navbarcollapse
                      key={category.label}
                      category={category}
                      closeSheet={closeSheet}
                    />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                href={item.href!}
                className="w-full text-xl font-semibold flex items-center gap-2"
                key={item.href + item.label}
                onClick={closeSheet}
              >
                {item.icon && (
                  <span className="bg-accent rounded-sm p-1.5">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </Link>
            )
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
