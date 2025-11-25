import { fetchData } from "@/lib/fetchFunction";
import PromoCarousel from "./homePageComponents/Carousel";
import HomepageProducts from "./homePageComponents/HomepageProducts";
import HomepageServices from "./homePageComponents/HomepageServices";
import { BannerType, Product, ServiceType } from "@/Types/Types";


export default async function Home() {
  try {
    const data = await fetchData("/home");

    console.log(data);
    const {
      banners,
      latestProducts,
      featuredProducts,
      featuredServices,
    }: {
      banners: BannerType[];
      latestProducts: Product[];
      featuredProducts: Product[];
      featuredServices: ServiceType[];
    } = data.data;

    return (
      <div className="container mx-auto mt-4 px-1 sm:px-0">
        <PromoCarousel banners={banners} />
        <HomepageProducts products={featuredProducts} title="Featured Products" />
        <HomepageServices services={featuredServices} title="Services" />
        <HomepageProducts products={latestProducts} title="New Arrival" />
      </div>
    );
  } catch (error) {
    console.error("Error loading home data:", error);
    return (
      <div className="container mx-auto mt-10 text-center">
        <h2 className="text-2xl font-semibold text-red-500">Failed to load homepage data</h2>
        <p className="text-gray-500 mt-2">Please try again later.</p>
      </div>
    );
  }
}
