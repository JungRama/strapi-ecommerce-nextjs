import LayoutMain from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { ShoppingBasket, Star } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import ImageListProduct from "@/components/product-detail/image-list";

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router";
import { GetProductDetail } from "@/features/products";
import { SkeletonProductDetail } from "@/components/skeleton";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { UseCart } from "@/features/cart";
import { ErrorCard } from "@/components/errors/error-card";
import { useStoreCart } from "@/store/store-cart";
import Reviews from "@/components/product-detail/reviews";
import { GetProductReviewCount } from "@/features/reviews";

export default function ProductDetail() {
  const cartStore = useStoreCart()
  const router = useRouter()
  const { slug } = router.query

  const { AddToCart } = UseCart()

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['products', slug],
    queryFn: async () => {
      return GetProductDetail(slug as string)
    },
    enabled: !!slug
  })

  const { data: productReview, isLoading: isLoadingReviewCount } = useQuery({
    queryKey: ['product-review-count', slug],
    queryFn: async () => {
      return GetProductReviewCount(slug as string)
    }
  })

  const [selectVariant, setSelectedVariant] = useState<number | null>(null)

  // Get price of the product variant
  const getPrice = useMemo(() => {
    const selected = product?.product_variant?.find(item => item.id === selectVariant)

    if(selected) {
      return selected.variant_price
    }else {
      return null
    }
  }, [isLoading, selectVariant]);

  // Set selected product variant
  useEffect(() => {
    setSelectedVariant(product?.product_variant[0]?.id ?? null)
  }, [isLoading])


  if(isLoading ||isLoadingReviewCount) {
    return (
      <LayoutMain>
        <SkeletonProductDetail></SkeletonProductDetail>
      </LayoutMain>
    )
  }

  else if(isError) {
    return (
      <LayoutMain>
        <div className="container mx-auto my-20">
          <ErrorCard message={(error as Error).message}></ErrorCard>
        </div>
      </LayoutMain>
    )
  }

  return (
    <LayoutMain>
      <div className="container mx-auto my-20">
        <div className="grid grid-cols-12 gap-[15px] lg:gap-[30px]">
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <ImageListProduct imageList={product?.images}></ImageListProduct>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5">

            <div className="flex flex-wrap items-center justify-between">
              <h2 className="text-2xl font-bold">{product?.name}</h2>
              <p className="text-slate-500">{product?.category?.name}</p>
            </div>

            <div className="flex items-center my-2">
              <p className="text-sm">{productReview?.totalReviews} Reviews | </p>
              <Star className="h-3 text-yellow-600"></Star>
              <p className="text-sm">{productReview?.averageRating}</p>
            </div>

            <hr className="opacity-50"/>

            <div className="mt-3">
              <p>
                {product?.description}
              </p>
            </div>

            <div className="grid grid-cols-12 gap-[5px] my-4">
              {product?.product_variant.map((item) => {
                return (
                  <div key={'product-variant-'+item.id} className="col-span-6 md:col-span-4 lg:col-span-4">
                    <Button 
                    onClick={() => setSelectedVariant(item.id)}
                    size={"lg"} variant={selectVariant === item.id ? 'secondary' : 'outline'} 
                    className={cn('w-full border', selectVariant === item.id ? 'border-black' : '')}>{item.variant_name}</Button>
                  </div>    
                )
              })}
            </div>

            <Button size={"lg"} className="w-full" onClick={() => {
              AddToCart(product?.id ?? null, selectVariant, 1)
              cartStore.setIsCartOpen(true)
            }}>
              <div className="flex w-full justify-between items-center">
                <span className="font-bold uppercase flex items-center gap-3">
                  <ShoppingBasket></ShoppingBasket>  
                  Add to Cart
                </span> 
                <span className="font-bold">
                  ${ getPrice }
                </span> 
              </div>
            </Button>

            <Accordion type="multiple" className="mt-8" defaultValue={['delivery','reviews']}>
              <AccordionItem value="delivery" data-state='open'>
                <AccordionTrigger>Delivery and Returns</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Standard delivery 6–12 Working Days <br />
                    Express delivery 3–10 Working Days <br /> <br />

                    During checkout, we will provide you with the estimated delivery date based on your order delivery address. Orders are processed and delivered Monday - Friday (excluding public holidays). <br /> <br />

                    Enjoy free returns. Exclusions Apply.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="reviews">
                <AccordionTrigger>Customer Reviews</AccordionTrigger>
                <AccordionContent>
                  <Reviews slug={slug as string}></Reviews>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>
    </LayoutMain>
  )
}