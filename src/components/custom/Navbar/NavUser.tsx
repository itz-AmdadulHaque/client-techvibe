"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, LogOut, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { axiosPrivate } from "@/config/axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/utils";

export default function NavUser() {
  const { logOut, auth } = useAuth();
  const handleLogout = async () => {
    try {
      await axiosPrivate("/auth/logout");
      logOut();
    } catch (error) {
      toast.error(generateErrorMessage(error));
    } finally { window.location.reload(); }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${auth?.user?.image}` || undefined}
            alt={`${auth?.user?.firstName} ${auth?.user?.lastName}`}

          />
          <AvatarFallback className="bg-slate-200">
            {auth?.user?.firstName?.[0]}
            {auth?.user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>
          {auth?.user?.firstName} {auth?.user?.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile?tab=profile" className="flex items-center gap-2">
            <User size={16} />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile?tab=password" className="flex items-center gap-2">
            <Lock size={16} />
            Password
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/orders" className="flex items-center gap-2">
            <ShoppingBag size={16} />
            Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full"
          >
            <LogOut size={16} />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
