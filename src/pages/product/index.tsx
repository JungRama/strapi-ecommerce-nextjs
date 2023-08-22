import BrandList from "@/components/brands"
import LayoutMain from "@/components/layouts"
import ProductCard from "@/components/product-list/product-card"
import ProductCollectionFilter from "@/components/product-list/product-collection-filter"
import ProductFilter from "@/components/product-list/product-filter"
import ProductSort from "@/components/product-list/product-sort"

export default function ProductList() {
  return (
    <LayoutMain>
      <div className="container-fluid">
        <div className="my-10">
          <h2 className='text-3xl font-bold mb-7'>Explore Brands</h2>
          <BrandList></BrandList>
        </div>

        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center gap-2 justify-between">
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <ProductFilter></ProductFilter>
            <ProductCollectionFilter></ProductCollectionFilter>
          </div>
          <ProductSort></ProductSort>
        </div>

        <div className="grid grid-cols-12 mb-20 gap-[15px] lg:gap-[30px]">
          {[...Array(24)].map(item => {
            return (
              <div key={'product'+item} className="col-span-6 md:col-span-4 lg:col-span-2">
                <ProductCard></ProductCard>
              </div>
            )
          })}
        </div>
      </div>
    </LayoutMain>
  )
}