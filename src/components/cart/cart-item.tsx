import { UseCart } from "@/features/cart"
import NextImage from "../next-image"
import { IMAGE_URL } from "@/features/const"
import { currencyFormat } from "@/lib/use-currency"

interface CartItem {
  id?: number,
  name?: string,
  image?: string,
  variant_id?: number,
  variant_name?: string,
  price?: number,
  qty?: number | null
}

export default function CartItem({ showAction = true, cartItem }: { showAction?: boolean, cartItem: CartItem }) {
  const { UpdateQuantity, RemoveItemFromCart } = UseCart()
  
  return (
    <div className="flex">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <NextImage src={IMAGE_URL+cartItem.image} alt="product" width={200} height={200} className="h-full w-full object-cover object-center"></NextImage>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href="#">{ cartItem.name }</a>
            </h3>
            <p className="ml-4 text-sm">{currencyFormat(cartItem.price ?? 0)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{cartItem.variant_name}</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">

          {showAction && <div className="flex items-center gap-2">
            <button 
            onClick={() => UpdateQuantity(cartItem?.id, cartItem?.variant_id, ((cartItem?.qty ?? 1) - 1))}
            className="border hover:bg-black hover:text-white h-6 w-6 flex items-center justify-center rounded-sm">-</button>
            <p className="text-gray-500">{cartItem.qty}</p>
            <button 
            onClick={() => UpdateQuantity(cartItem?.id, cartItem?.variant_id, ((cartItem?.qty ?? 1) + 1))}
            className="border hover:bg-black hover:text-white h-6 w-6 flex items-center justify-center rounded-sm">+</button>
          </div>}

          {!showAction && <div className="flex items-center gap-2">
            Qty: {cartItem.qty}
          </div>}
          
          {showAction && <div className="flex">
            <button type="button" className="font-medium text-slate-500"
            onClick={() => RemoveItemFromCart(cartItem?.id, cartItem?.variant_id)}>
            Remove</button>
          </div>}
        </div>
      </div>
    </div>
  )
}