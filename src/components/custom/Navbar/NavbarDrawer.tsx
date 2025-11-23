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
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavItemType } from "@/Types/ComponentTypes";
import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function NavbarDrawer({ navItems }: { navItems: NavItemType[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = () => setIsOpen(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button size="icon" className="border h-8 w-8 rounded-md">
          <Menu color="white" className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent className="px-4">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
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

                <CollapsibleContent className="pl-6 my-4 flex flex-col items-start gap-4">
                  {item.links.map((subItem) => (
                    <SheetClose key={subItem.label}>
                      <Link
                        href={subItem.href!}
                        className="w-full text-left flex items-center"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.icon && (
                          <span className="mr-2">{subItem.icon}</span>
                        )}
                        {subItem.label}
                      </Link>
                    </SheetClose>
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
