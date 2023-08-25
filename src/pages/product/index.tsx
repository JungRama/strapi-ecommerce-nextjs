import BrandList from "@/components/brands"
import LayoutMain from "@/components/layouts"
import ProductListItem from "@/components/product-list"
import ProductCollectionFilter from "@/components/product-list/product-collection-filter"
import ProductFilter from "@/components/product-list/product-filter"
import ProductSort from "@/components/product-list/product-sort"
import { useRouter } from "next/router"


export default function ProductList() {
  const router = useRouter()

  const { brand: activeBrand } = router.query
  
  return (
    <LayoutMain>
      <div className="container-fluid">
        <div className="my-10">
          <h2 className='text-3xl font-bold mb-7'>Explore Brands</h2>
          <BrandList 
          clearQuerySearch={false}
          activeBrand={activeBrand as string}></BrandList>
        </div>

        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center gap-2 justify-between">
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <ProductFilter></ProductFilter>
            <ProductCollectionFilter></ProductCollectionFilter>
          </div>
          <ProductSort></ProductSort>
        </div>

        <ProductListItem></ProductListItem>
      </div>
    </LayoutMain>
  )
}