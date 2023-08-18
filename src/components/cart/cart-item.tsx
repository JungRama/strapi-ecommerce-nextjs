import NextImage from "../next-image"

export default function CartItem() {
  return (
    <div className="flex">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <NextImage src={'/images/product.png'} alt="product" width={200} height={200} className="h-full w-full object-cover object-center"></NextImage>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">Throwback Hip Bag</a>
            </h3>
            <p className="ml-4">$90.00</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">Salmon</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center gap-2">
            <button className="border hover:bg-black hover:text-white h-6 w-6 flex items-center justify-center rounded-sm">-</button>
            <p className="text-gray-500">1</p>
            <button className="border hover:bg-black hover:text-white h-6 w-6 flex items-center justify-center rounded-sm">+</button>
          </div>

          <div className="flex">
            <button type="button" className="font-medium text-slate-500">Remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}