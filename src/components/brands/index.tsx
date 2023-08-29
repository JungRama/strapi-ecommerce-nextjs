import NextImage from '@/components/next-image'
import Link from 'next/link';

import { SkeletonBrand } from '../skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { useQuery } from '@tanstack/react-query';
import { GetBrands } from '@/features/brands';
import { IMAGE_URL } from '@/features/const';
import { ErrorCard } from '../errors/error-card';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';

export default function BrandList ({ activeBrand, clearQuerySearch = true }: {
  activeBrand?: string,
  clearQuerySearch?: boolean
}) {
  
  const router = useRouter()

  const { data: brands, isLoading, isError, error } = 
  useQuery({
    queryKey: ['brand-list'], 
    queryFn: async () => {
      return await GetBrands()
    }
  })

  const brandLinkPath = (slug: string) => {
    return {
      pathname: '/product',
      query: (() => {
        if(clearQuerySearch) {
          const newQuery = {
            brand: activeBrand === slug ? undefined : slug
          }

          if(activeBrand === slug) {
            delete newQuery.brand
          }

          return newQuery
        }else {
          const newQuery = {
            ...router.query,
            brand: activeBrand === slug ? undefined : slug
          }
          
          if(activeBrand === slug) {
            delete newQuery.brand
          }

          return newQuery
        }
      })()
    }
  }

  if(isLoading) {
    return (
      <div className='mb-10'>
        <SkeletonBrand></SkeletonBrand>
      </div>
    )
  }

  else if(isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>
  }

  return (
    <Swiper
      spaceBetween={5}
      grabCursor={true}
      slidesPerView={2.5}
      breakpoints={
        {
          '620': {
            slidesPerView: 4.5
          },
          '1024': {
            slidesPerView: 8.5
          }
        }
      }
    >
      {brands?.map(item => {
          return (
            <SwiperSlide key={'brand-'+item.id}>
              <Link href={brandLinkPath(item.slug)}>
                <div className={
                  cn('bg-slate-100 px-3 w-full py-3 flex items-center justify-center flex-col rounded-md border border-transparent hover:shadow-sm hover:border-slate-300', 
                  activeBrand === item.slug ? 'border-black' : 'border-transparent')
                }>
                  {item.logo &&
                    <NextImage src={IMAGE_URL+ (item.logo.url ?? '')} height={50} width={50} alt={item.name}></NextImage>
                  }
                  <p>{item.name}</p>
                </div>
              </Link>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  )
}