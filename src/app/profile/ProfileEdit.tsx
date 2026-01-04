"use client";

import AuthCheck from "@/components/custom/AuthCheck";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuth from "@/hooks/useAuth";
import React from "react";
import ProfileEditor from "./component/ProfileEditor";
import AddressEditor from "./component/AddressEditor";
import { useRouter, useSearchParams } from "next/navigation";
import ImageEditor from "./component/ImageEditor";
import ResetPassword from "./component/ResetPassword";
import Link from "next/link";

function ProfileComponent() {
  const searchParams = useSearchParams();
  const defaultTab = ["profile", "address", "password"].includes(
    searchParams.get("tab") || ""
  )
    ? searchParams.get("tab") || "profile"
    : "profile";

  //order
  const router = useRouter();
  const { auth } = useAuth();
  const user = auth.user;

  const handleTabChange = (value: string) => {
    const tabValue = ["profile", "address", "password"].includes(value)
      ? value
      : "profile";
    router.push(`/profile?tab=${tabValue}`);
  };

  return (
    <AuthCheck className="mt-8 md:mt-12">
      <div className="min-h-screen container mx-auto">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 ">
          <ImageEditor />
          <div className="text-center sm:text-left">
            <h2 className="font-bold text-2xl my-2">
              {user?.firstName} {user?.lastName}
            </h2>
            <h3 className="font-semibold text-slate-700">{user?.email}</h3>
            <Link href="/orders" className="underline font-semibold text-sm">
              View All Orders
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <Tabs value={defaultTab} onValueChange={handleTabChange}>
            <TabsList className="w-full">
              <TabsTrigger className="cursor-pointer" value="profile">
                Profile
              </TabsTrigger>

              <TabsTrigger className="cursor-pointer" value="address">
                Address
              </TabsTrigger>

              <TabsTrigger className="cursor-pointer" value="password">
                Password
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileEditor />
            </TabsContent>

            <TabsContent value="address">
              <AddressEditor />
            </TabsContent>

            <TabsContent value="password">
              <ResetPassword />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthCheck>
  );
}

export default ProfileComponent;
