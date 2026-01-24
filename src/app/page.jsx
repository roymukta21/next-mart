import Benefit from "@/Component/Pages/LandPage/Benefit";
import Brands from "@/Component/Pages/LandPage/Brands";
import Categories from "@/Component/Pages/LandPage/Categories";
import Deals from "@/Component/Pages/LandPage/Deals";
//import Deals from "@/Component/Pages/LandPage/Deals";
import Featured from "@/Component/Pages/LandPage/Featured";
import Hero from "@/Component/Pages/LandPage/Hero";
import Newsletter from "@/Component/Pages/LandPage/Newsletter";
import Testimonials from "@/Component/Pages/LandPage/Testimonials";
import TrendingNow from "@/Component/Pages/LandPage/TrendingNow";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <Featured />
      <TrendingNow />
      <Deals />
      <Benefit />
      <Testimonials />
      <Brands />
      <Newsletter />
    </main>
  );
}
