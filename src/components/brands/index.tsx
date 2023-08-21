import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import NextImage from '@/components/next-image'
import Link from 'next/link';

export default function BrandList () {
  return (
    <Swiper
      spaceBetween={5}
      grabCursor={true}
      slidesPerView={8.5}
    >
      {[...Array(20)].map(item => {
        return (
          <SwiperSlide key={item}>
            <Link key={'brand-item'+item} href={'/brand/nike'}>
              <div className="bg-slate-100 px-3 w-full py-3 flex items-center justify-center flex-col rounded-md border border-transparent hover:shadow-sm hover:border-slate-300">
                <NextImage src={'/images/nike.png'} height={50} width={50} alt='nike'></NextImage>
                <p>Nike</p>
              </div>
            </Link>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}