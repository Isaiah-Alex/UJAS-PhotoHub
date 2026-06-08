import Hero from "@/components/photohub/Hero";
import FeaturedPhotographers from "@/components/photohub/FeaturedPhotographers";
import TrendingCategories from "@/components/photohub/TrendingCategories";
import StatsBand from "@/components/photohub/StatsBand";
import MarketplacePreview from "@/components/photohub/MarketplacePreview";
import Spotlight from "@/components/photohub/Spotlight";
import Testimonials from "@/components/photohub/Testimonials";
import Footer from "@/components/photohub/Footer";
import {auth} from "@clerk/nextjs/server";


export default function Page() {
  async function isLoggedIn(){
    const { isAuthenticated } = await auth()
    if(!isAuthenticated){
      console.log("isLoggedIn");
    }
  }
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
