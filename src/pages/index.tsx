import HeroSlider from '@/components/home/hero-slider'
import NextImage from '@/components/next-image'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Link from 'next/link';
import LayoutMain from '@/components/layouts';
import ProductCard from '@/components/product-list/product-card';
import BrandList from '@/components/brands';

export default function Home() {
  return (
    <LayoutMain>
      <>
        <HeroSlider></HeroSlider>

        <div className="my-20">
          <div className="container-fluid">
            <h2 className='text-3xl font-bold mb-7'>Explore Brands</h2>
            <BrandList></BrandList>
          </div>
        </div>

        <div className="my-20">
          <div className="container-fluid">
            <h2 className='text-3xl font-bold mb-7'>Featured Sneakers</h2>
            <div className="grid grid-cols-12 md:gap-[15px] lg:gap[30px]">
              {[...Array(6)].map(item => {
                return (
                  <div key={item} className="col-span-10 md:col-span-4 lg:col-span-2">
                    <ProductCard></ProductCard>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="my-20">
          <div className="container-fluid">
            <h2 className='text-3xl font-bold mb-7'>Collections</h2>

            <Swiper
              spaceBetween={15}
              grabCursor={true}
              slidesPerView={3.5}
            >
              {[...Array(20)].map(item => {
                return (
                  <SwiperSlide key={item}>
                    <Link key={item} href={'/brand/nike'}>
                      <div className='relative rounded-md overflow-hidden'>
                        <div className="overlay flex items-center justify-center absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.8)] hover:bg-[rgba(0,0,0,0.6)]">
                          <div>
                            <p className='text-white text-2xl text-center'>Air Force One</p>
                            <p className='text-white text-md text-center opacity-50'>3 Items</p>
                          </div>
                        </div>
                        <NextImage src={'/images/bg-auth.png'} height={1200} width={1200} className='w-full' alt='nike'></NextImage>
                      </div>
                    </Link>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </>
    </LayoutMain>
  )
}
