import Link from "next/link";
import NextImage from "../next-image";

export default function ProductCard() {
  return (
    <Link href={'/product/nike'}>
      <NextImage src={'/images/product.png'} height={500} width={500} alt='product-item' className='w-full rounded-md'></NextImage>
      <div className="mt-3">
        <p className='text-xs'>Men, Running</p>
        <p className='font-bold'>New Balance 550 Men Sneakers</p>
        <p>$200</p>
      </div>
    </Link>
  )
}