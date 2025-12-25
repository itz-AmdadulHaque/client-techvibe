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
import OrdersList from "./component/OrdersList";

function ProfileComponent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "profile";

  //order
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const status = searchParams.get("status");

  const router = useRouter();

  const { auth } = useAuth();

  const user = auth.user;

  const handleTabChange = (value: string) => {
    router.push(`/profile?tab=${value}`);
  };

  return (
    <AuthCheck className="">
      <div className="min-h-screen container mx-auto">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:mt-12">
          <ImageEditor />
          <div className="text-center sm:text-left">
            <h2 className="font-bold text-2xl my-2">
              {user?.firstName} {user?.lastName}
            </h2>
            <h3>{user?.phone || user?.email}</h3>
          </div>
        </div>

        <div className="mt-12">
          <Tabs value={defaultTab} onValueChange={handleTabChange}>
            <TabsList className="w-full">
              <TabsTrigger value="profile">Profile</TabsTrigger>

              <TabsTrigger value="address">Address</TabsTrigger>

              <TabsTrigger value="password">Password</TabsTrigger>

              <TabsTrigger value="orders">Orders</TabsTrigger>
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

            <TabsContent value="orders">
              <OrdersList searchParams={{ page, limit, status, search }} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthCheck>
  );
}

export default ProfileComponent;
