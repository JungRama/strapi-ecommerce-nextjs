import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import NextImage from '../next-image';

export default function HeroSlider() {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide>
          <NextImage src={'/images/banner-hero.png'} width={2400} height={800} className='w-full' alt='hero-banner' useSkeleton></NextImage>
        </SwiperSlide>
      </Swiper>
    </>
  )
}