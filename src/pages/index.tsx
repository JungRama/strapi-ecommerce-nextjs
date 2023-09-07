import LayoutMain from "@/components/layouts";
import BrandList from "@/components/brands";
import HeroSlider from "@/components/home/hero-slider";
import FeaturedSneakers from "@/components/home/featured-sneakers";
import CollectionList from "@/components/home/collection-list";

export default function Home() {
  return (
    <LayoutMain>
      <>
        <HeroSlider></HeroSlider>

        <div className="my-20">
          <div className="container-fluid">
            <h2 className="text-3xl font-bold mb-7">Explore Brands</h2>
            <BrandList></BrandList>
          </div>
        </div>

        <div className="my-20">
          <div className="container-fluid">
            <h2 className="text-3xl font-bold mb-7">Featured Sneakers</h2>
            <FeaturedSneakers></FeaturedSneakers>
          </div>
        </div>

        <div className="my-20">
          <div className="container-fluid">
            <h2 className="text-3xl font-bold mb-7">Collections</h2>
            <CollectionList></CollectionList>
          </div>
        </div>
      </>
    </LayoutMain>
  );
}
