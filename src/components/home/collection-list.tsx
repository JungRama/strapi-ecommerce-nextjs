import NextImage from '@/components/next-image'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Link from 'next/link';
import { SkeletonCollectionList } from '../skeleton';
import { GetCollections } from '@/features/products';
import { useQuery } from '@tanstack/react-query';
import { IMAGE_URL } from '@/features/const';
import { ErrorCard } from '../errors/error-card';


export default function CollectionList () {
  const { data: collections, isLoading, isError, error } = 
  useQuery({
    queryKey: ['collection-list'], 
    queryFn: async () => {
      return await GetCollections()
    }
  })

  if(isLoading) {
    return <SkeletonCollectionList></SkeletonCollectionList>
  }

  else if(isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>
  }

  return (
    <Swiper
      spaceBetween={15}
      grabCursor={true}
      slidesPerView={1.5}
      breakpoints={
        {
          '620': {
            slidesPerView: 2.5
          },
          '1024': {
            slidesPerView: 3.5
          }
        }
      }
    >
      {collections.map(item => {
        return (
          <SwiperSlide key={'collection-'+item.id}>
            <Link href={`/product?collection=${item.slug}`}>
              <div className='relative rounded-md overflow-hidden'>
                <div className="overlay flex items-center justify-center absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.6)]">
                  <div>
                    <p className='text-white text-2xl text-center'>{item.name}</p>
                  </div>
                </div>
                <NextImage src={IMAGE_URL + (item.image?.url ?? '')} height={1200} width={1200} className='w-full' 
                classNames={{
                  image: 'object-cover aspect-square'
                }} alt={item.name}></NextImage>
              </div>
            </Link>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}