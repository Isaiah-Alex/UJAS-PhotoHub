import Hero from "@/components/photohub/hero";
import FeaturedPhotographers from "@/components/photohub/feauturedPhotographers";
import TrendingCategories from "@/components/photohub/trendingCategories";
import StatsBand from "@/components/photohub/statsBand";
import MarketplacePreview from "@/components/photohub/marketplacePreview";
import Spotlight from "@/components/photohub/spotlight";
import Testimonials from "@/components/photohub/testimonials";
import Footer from "@/components/photohub/footer";


export default function Page() {
  return <main>
    <Hero />
      <StatsBand />
      <FeaturedPhotographers />
      <TrendingCategories />
      <MarketplacePreview />
      <Spotlight />
      <Testimonials />
      <Footer />
  </main>;
}
