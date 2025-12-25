import { Metadata } from "next";
import OrdersList from "./OrdersList";
import AuthCheck from "@/components/custom/AuthCheck";

export const metadata: Metadata = {
  title: "Orders | TechVibe Global",
  description:
    "Protecting your business with comprehensive fire safety, infrastructure integrity, and IT security solutions from certified professionals.",
};

function page() {
  return (
    <AuthCheck className="">
      <OrdersList />
    </AuthCheck>
  );
}

export default page;
