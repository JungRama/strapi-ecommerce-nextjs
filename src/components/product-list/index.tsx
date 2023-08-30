import ProductCard from "@/components/product-list/product-card"
import { GetProducts } from "@/features/products"
import { SkeletonProduct } from '@/components/skeleton';
import { useQuery } from "@tanstack/react-query"
import { ErrorCard } from "@/components/errors/error-card"
import { useRouter } from "next/router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import ReactPaginate from 'react-paginate';
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function ProductListItem() {
  const router = useRouter()

  const { 
    brand,
    category,
    collection,
    minPrice,
    maxPrice,
    sort,
    page,
   } = router.query

  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products', page, brand, category, collection, minPrice, maxPrice, sort],
    queryFn: async () => {
      return GetProducts({
        brand: brand as string,
        category: category as string,
        collection: collection as string,
        minPrice: minPrice ? minPrice as string : undefined,
        maxPrice: maxPrice ? maxPrice as string : undefined,
        sort: sort as string,
      }, page as string)
    }
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

  if(products.data.length <= 0) {
    return (
      <div className="flex h-[450px] mb-10 shrink-0 items-center justify-center rounded-md border border-dashed">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <Search></Search>
          <p className="mt-4 text-lg font-semibold">No Product Found</p>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">Oops, it seems like there are no products currently available in this category. Please explore other categories to discover exciting products.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-12 mb-20 gap-[10px] lg:gap-[10px]">
        {products.data.map((item) => {
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

      <div className="mb-10">
        <ReactPaginate
          breakLabel="..."
          forcePage={products.pagination.page ? products.pagination.page - 1 : 1}
          nextLabel={<>Next<ChevronRight className="h-4"></ChevronRight></>}
          previousLabel={<><ChevronLeft className="h-4"></ChevronLeft>Prev</>}
          containerClassName="flex space-x-1 justify-center items-center"
          pageLinkClassName={buttonVariants({variant: 'secondary'})}
          previousLinkClassName={buttonVariants({variant: 'secondary'})}
          nextLinkClassName={buttonVariants({variant: 'secondary'})}
          activeLinkClassName={'!bg-black !hover:bg-black !text-white !hover:text-white'}
          onPageChange={(e) => {
            router.push({
              pathname: '/product',
              query: {
                ...router.query,
                page: e.selected + 1
              }
            })
          }}
          pageRangeDisplayed={2}
          pageCount={products.pagination.pageCount}
        />
      </div>
    </>
  )
}