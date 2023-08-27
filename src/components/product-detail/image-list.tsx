import NextImage from "@/components/next-image";
import { IMAGE_URL } from "@/features/const";
import { ImageInterface } from "@/types/api/image";

import { useState } from "react";

export default function ImageListProduct({ imageList }: { imageList?: ImageInterface[] }) {
  const [selectedImage, setSelectedImage] = useState(imageList?.[0]?.url ? IMAGE_URL+imageList[0].url : '/images/fallback-image.png')
  
  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 sticky top-5">
      {/* --{JSON.stringify(imageList)} */}
      <div className="flex flex-row md:flex-col gap-2 md:gap-5 flex-wrap">
        {imageList?.map(item => {
          return (
            <NextImage key={'image-product-'+item.id} 
            onMouseEnter={() => setSelectedImage(IMAGE_URL+item.url)} src={IMAGE_URL+item.url} height={100} width={100} 
            className="hover:border-black border w-[calc(100%/3-8px)] md:w-full object-cover aspect-square" alt="product"></NextImage>
          )  
        })}
      </div>
      <NextImage src={selectedImage} height={1000} width={1000} className="w-full rounded-xl" alt="product"></NextImage>
    </div>
  )
}