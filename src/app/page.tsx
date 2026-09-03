import { Hero } from "@/components/hero";
import { ValuePropsBar } from "@/components/value-props-bar";
import { CategoriesSection } from "@/components/categories-section";
import { FeaturedProducts } from "@/components/featured-products";
import { StoreModelSection } from "@/components/store-model-section";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuePropsBar />
      <CategoriesSection />
      <FeaturedProducts />
      <StoreModelSection />
      <ContactSection />
    </>
  );
}
