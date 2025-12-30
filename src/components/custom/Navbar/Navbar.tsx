"use client";

import {
  Home,
  ShoppingBag,
  Wrench,
  Briefcase,
  Package2,
  Folder,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import NavUser from "./NavUser";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavbarDrawer } from "./NavbarDrawer";
import { NavItemType } from "@/Types/ComponentTypes";
import SearchBar from "./SearchBar";
import Image from "next/image";
import CartInfo from "../CartInfo/CartInfo";
import { useContext } from "react";
import { DataContext } from "@/Provider/DataProvider/DataProvider";
import Navbarcollapse from "./NavbarCollaps";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { auth, setAuth } = useAuth();

  const { categories } = useContext(DataContext);
  const axiosPrivate = useAxiosPrivate();

  const navItems: NavItemType[] = [
    {
      label: "Home",
      href: "/",
      icon: <Home size={20} />,
    },
    {
      label: "Shop",
      icon: <ShoppingBag size={20} />,
      links: categories?.map((cat) => ({
        label: cat.title,
        href: `/products?category=${cat.slug}`,
        icon: <Folder size={20} />,
        image: cat.image,
        links: cat.subCategories?.map((sub) => ({
          label: sub.title,
          href: `/products?category=${cat.slug}&subCategory=${sub.slug}`,
          icon: <Folder size={16} />,
          image: sub.image,
        })),
      })),
    },
    {
      label: "Services",
      href: "/services",
      icon: <Wrench size={20} />,
    },
    {
      label: "Consultants",
      href: "/consultants",
      icon: <Briefcase size={20} />,
    },
    {
      label: "Request Product",
      href: "/request-product",
      icon: <Package2 size={20} />,
    },
  ];

  const bottomNavItems: NavItemType[] = [
    {
      label: "Home",
      href: "/",
      icon: <Home size={20} />,
    },
    {
      label: "Services",
      href: "/services",
      icon: <Wrench size={20} />,
    },
    {
      label: "Products",
      href: "/products",
      icon: <Package2 size={20} />,
    },
  ];

  const {} = useQuery({
    queryKey: ["clientInfo"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/customer");
      setAuth((prev) => ({
        ...prev,
        user: res.data.data,
        isLoading: false,
      }));
      return res.data;
    },
    enabled: !auth.user,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false
  });

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="shadow-md fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-700">
        <div className="flex justify-between items-center px-2 lg:px-3 py-1.5 md:py-3 container mx-auto">
          <Link href="/" className="flex items-center gap-2 md:gap-4">
            <Image
              src="/logo.png"
              alt="TechVibe"
              width={100}
              height={100}
              className="w-12 rounded-full"
            />
            <h2 className=" hidden xl:block text-xl font-semibold">TechVibe</h2>
          </Link>

          <ul className="hidden lg:flex gap-6 items-center">
            {navItems.map((item) => (
              <li key={item.href || item.label}>
                {item.links ? (
                  <NavigationMenu key={item.label}>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          "group relative transition-colors duration-300",
                          "text-base font-normal px-1 py-2",
                          "hover:text-red-500 data-[state=open]:text-red-500",
                          "!bg-transparent",
                          "!hover:bg-transparent",
                          "!focus:bg-transparent",
                          "!data-[state=open]:bg-transparent",
                          "!focus-visible:bg-transparent"
                        )}
                      >
                        {item.label}

                        {/* ANIMATED UNDERLINE FOR TRIGGER */}
                        <span
                          className={cn(
                            "absolute bottom-0 left-0 h-[2px] bg-red-500",
                            "transition-all duration-300 ease-in-out",
                            "w-0 group-hover:w-full",
                            "data-[state=open]:w-full"
                          )}
                        />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="flex flex-col gap-2 max-w-[100%] max-h-[80vh] overflow-y-auto p-4">
                          {item.links.map((category) => (
                            <Navbarcollapse
                              key={category.label}
                              category={category}
                            />
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenu>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={cn(
                      "group relative transition-colors duration-300",
                      "text-base font-normal px-1 py-2",
                      "hover:text-red-500",
                      pathname === item.href && "text-red-500"
                    )}
                  >
                    {item.label}

                    {/* ANIMATED UNDERLINE FOR SIMPLE LINK */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-[2px] bg-red-500",
                        "transition-all duration-300 ease-in-out",
                        "w-0 group-hover:w-full",
                        pathname === item.href && "w-full"
                      )}
                    />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 md:gap-4">
            <SearchBar />

            <CartInfo className="hidden md:block" />

            {auth?.user ? (
              <NavUser />
            ) : (
              <Link
                href="/login"
                className={cn(
                  "border p-1 px-2 rounded-md hover:text-red-500 hover:border-red-500 dark:text-white dark:border-white",
                  pathname === "login" && "text-red-500 border-red-500"
                )}
              >
                Login
              </Link>
            )}

            <NavbarDrawer navItems={navItems} />
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t z-50">
        <ul className="flex justify-center gap-6 items-center py-2">
          {bottomNavItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href || "#"}
                className={cn(
                  "flex flex-col items-center text-xs",
                  pathname === item.href ? "text-red-500" : "text-black"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}

          <li
            className={cn(
              "flex flex-col items-center text-xs",
              pathname === "/cart" ? "text-red-500" : "text-black"
            )}
          >
            <CartInfo className="" />
            Cart
          </li>

          <li></li>
        </ul>
      </nav>

      {/* Spacer for layout */}
      <div className="h-16 md:h-20" />
    </>
  );
}
