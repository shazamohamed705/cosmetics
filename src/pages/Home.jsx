import HeroBanner         from "../components/home/HeroBanner";
import SubAnnouncementBar from "../components/layout/SubAnnouncementBar";
import ShopByConcern      from "../components/home/ShopByConcern";
import FeaturedCategories from "../components/home/FeaturedCategories";
import CategoryShelf      from "../components/home/CategoryShelf";
import SkinTypeBundles    from "../components/home/SkinTypeBundles";
import ProductTabs        from "../components/home/ProductTabs";
import PromoBanner        from "../components/home/PromoBanner";
import TrustBar           from "../components/home/TrustBar";
import Brands             from "../components/home/Brands";
import BestSellers        from "../components/home/BestSellers";
import SocialProof        from "../components/home/SocialProof";
import Newsletter         from "../components/home/Newsletter";

import {
  heroBanner,
  featuredCategories,
  bestSellers,
  promoBanner,
  newArrivals,
  brands,
  skinTypeBundles,
} from "../data/home";

const productTabs = [
  {
    id: "best-sellers",
    label: "Best Sellers",
    viewAllTo: "/collections/best-sellers",
    products: bestSellers,
  },
  {
    id: "new-arrivals",
    label: "New Arrivals",
    viewAllTo: "/collections/new-arrivals",
    products: newArrivals,
  },
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <HeroBanner         slides={heroBanner.slides} />
      <SubAnnouncementBar />
      <ProductTabs        tabs={productTabs} />
      <TrustBar />
      <Brands             brands={brands} />
      <BestSellers        products={bestSellers} />
      <ShopByConcern />
      <FeaturedCategories categories={featuredCategories} />
      <CategoryShelf      categories={featuredCategories} />
      <SkinTypeBundles    bundles={skinTypeBundles} />
      <SocialProof />
      <PromoBanner        {...promoBanner} />
      <TrustBar />
      <Newsletter />
    </main>
  );
}
