import NextImage from '@/components/next-image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { useQuery } from '@tanstack/react-query';
import { GetBanners } from '@/features/banners';
import { SkeletonBanner } from '../skeleton';
import { IMAGE_URL } from '@/features/const';
import Link from 'next/link';
import { ErrorCard } from '../errors/error-card';

export default function HeroSlider() {
  const { data: banners, isLoading, isError, error } = 
  useQuery({
    queryKey: ['hero-slider'], 
    queryFn: async () => {
      return await GetBanners()
    }
  })

  if(isLoading) {
    return <SkeletonBanner></SkeletonBanner>
  }

  else if(isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>
  }

  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
      >
        {banners?.map(item => {
          return (
            <SwiperSlide key={'banner-home-'+item.id}>
              <Link href={item.url}>
                {item.image &&
                  <NextImage src={IMAGE_URL+ (item.image.url ?? '')} width={2400} height={800} className='w-full' alt='hero-banner' useSkeleton></NextImage>
                }
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}