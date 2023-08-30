import ProductCard from '@/components/product-list/product-card';
import { GetFeaturedSneakers } from '@/features/products';
import { useQuery } from '@tanstack/react-query';
import { SkeletonProduct } from '../skeleton';
import { ErrorCard } from '../errors/error-card';

export default function FeaturedSneakers() {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['featured-sneakers'],
    queryFn: async () => {
      return GetFeaturedSneakers()
    }
  })

  if(isLoading) {
    return (
      <div className="grid grid-cols-12 gap-[10px] lg:gap-[10px]">
        {[...Array(6)].map((item, index) => {
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
    <div className="grid grid-cols-12 gap-[10px] lg:gap-[10px]">
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