"use client";
import ModeToggle from "@/components/theme/mode-toggler";
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
import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
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
        <Button size="icon" className="border h-8 w-8 rounded-md">
          <Menu color="white" className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent className="px-4">
        <SheetHeader className="px-0 border-b">
          <SheetTitle className="px-0">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="TechVibe"
                width={70}
                height={70}
                className="w-12 rounded-full"
              />
              <h2 className="text-2xl font-semibold">TechVibe</h2>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col  justify-start gap-4">
          {navItems.map((item) =>
            item.links ? (
              <Collapsible key={item.label}>
                <CollapsibleTrigger className="group flex items-center justify-between w-full text-left">
                  <div className="flex items-center">
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>

                <CollapsibleContent className="pl-2 flex flex-col items-start gap-4">
                  {item.links.map((category) => (
                    <Navbarcollapse key={category.label} category={category} closeSheet={closeSheet} />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                href={item.href!}
                className="w-full text-left flex items-center"
                key={item.href + item.label}
                onClick={closeSheet}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            )
          )}

          <div className="flex items-center justify-around mt-4">
            <Link href="/cart" onClick={closeSheet}>
              <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300 cursor-pointer" />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
