import { Metadata } from "next";
import { ServiceList } from "./components/ServicesList";
import { getCategories } from "./components/apiCalls";

export const metadata: Metadata = {
  title: "Services | TechVibe Global",
  description:
    "Protecting your business with comprehensive fire safety, infrastructure integrity, and IT security solutions from certified professionals.",
};

export default async function ServicePage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
    limit?: string;
    category?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const categories = await getCategories();

  return <ServiceList searchParams={resolvedSearchParams} categories={categories} />;
}
