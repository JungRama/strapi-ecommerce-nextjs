import Link from "next/link";
import NextImage from "../next-image";
import { CategoryInterface } from "@/types/api/category";
import { IMAGE_URL } from "@/features/const";
import { BrandInterface } from "@/types/api/brand";

export interface ProductCardInterface {
  name: string
  category?: Pick<CategoryInterface, "name" | "slug">
  brand?: Pick<BrandInterface, "name" | "slug">
  thumbnail: string | null
  variantPrice: number[]
  slug: string
}

export default function ProductCard({ name, category, brand, thumbnail, variantPrice, slug }: ProductCardInterface) {
  const getCheapestPrice = () => {
    if(variantPrice.length <= 0) {
      return 0
    }

    return Math.min(...variantPrice)
  }
  
  const currenctFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  
  return (
    <Link href={`/product/${slug}`}>
      <NextImage src={IMAGE_URL + (thumbnail ?? '')} 
      height={500} 
      width={500} 
      classNames={{
        image: 'object-cover aspect-square'
      }}
      alt={name} className='w-full rounded-md'></NextImage>
      <div className="mt-3">
        <div className="flex items-center">
        {category && 
          <Link href={'/product?category='+category.slug}>
            <p className='text-xs'>{category.name}</p>
          </Link>
        }
        {brand &&
          <div className="flex items-center">
            <span className="mx-1">
            -
            </span>
            <Link href={'/product?brand='+brand.slug}>
              <p className='text-xs'>{brand.name}</p>
            </Link>
          </div>
        }
        </div>
        <p className='font-bold'>{name}</p>
        <p>{currenctFormat.format(getCheapestPrice())}</p>
      </div>
    </Link>
  )
}