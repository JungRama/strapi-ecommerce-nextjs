import NextImage from "@/components/next-image";

import { useState } from "react";

export default function ImageListProduct() {
  const [selectedImage, setSelectedImage] = useState('/images/product.png')
  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 sticky top-5">
      <div className="flex flex-row md:flex-col gap-2 md:gap-5 flex-wrap">
        <NextImage onMouseEnter={() => setSelectedImage('/images/product.png')} src={'/images/product.png'} height={100} width={100} 
        className="hover:border-black border w-[calc(100%/3-8px)] md:w-full object-cover aspect-square" alt="product"></NextImage>
        <NextImage onMouseEnter={() => setSelectedImage('/images/bg-auth.png')} src={'/images/bg-auth.png'} height={100} width={100} 
        className="hover:border-black border w-[calc(100%/3-8px)] md:w-full object-cover aspect-square" alt="product"></NextImage>
        <NextImage onMouseEnter={() => setSelectedImage('/images/bg-auth-2.png')} src={'/images/bg-auth-2.png'} height={100} width={100} 
        className="hover:border-black border w-[calc(100%/3-8px)] md:w-full object-cover aspect-square" alt="product"></NextImage>
        
      </div>
      <NextImage src={selectedImage} height={1000} width={1000} className="w-full rounded-xl" alt="product"></NextImage>
    </div>
  )
}