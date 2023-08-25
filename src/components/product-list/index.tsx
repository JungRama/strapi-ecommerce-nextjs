import ProductCard from "@/components/product-list/product-card"
import { GetProducts } from "@/features/products"
import { SkeletonProduct } from '@/components/skeleton';
import { useQuery } from "@tanstack/react-query"
import { ErrorCard } from "@/components/errors/error-card"
import { useRouter } from "next/router";

export default function ProductListItem() {
  const router = useRouter()

  const { 
    brand,
    category,
    collection,
    minPrice,
    maxPrice,
    sorting,
   } = router.query

  console.log(router.query);

  const { data: products, isLoading, isError, error } = useQuery(
    ['products', brand, category], async () => {
    return GetProducts({
      brand: brand as string,
      category: category as string,
      collection: collection as string,
      minPrice: minPrice ? parseInt(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined,
      sorting: sorting as string,
    })
  })

  if(isLoading) {
    return (
      <div className="grid grid-cols-12 gap-[10px] lg:gap-[10px]">
        {[...Array(24)].map((item, index) => {
          return (
            <div key={'skeleton-product-'+index} className="col-span-6 md:col-span-4 lg:col-span-2">
              <SkeletonProduct></SkeletonProduct>
            </div>
          )
        })}
      </div>
    )
  }

  if(isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>
  }

  return (
    <div className="grid grid-cols-12 mb-20 gap-[10px] lg:gap-[10px]">
      {products.map((item) => {
        const variantPrice = item.product_variant.map(item => item.variant_price)

        return (
          <div key={'product-featured-'+item.id} className="col-span-6 md:col-span-4 lg:col-span-2">
            <ProductCard
              name={item.name}
              category={item.category}
              brand={item.brand}
              thumbnail={item.thumbnail?.url}
              slug={item.slug}
              variantPrice={variantPrice}
            ></ProductCard>
          </div>
        )
      })}
    </div>
  )
}