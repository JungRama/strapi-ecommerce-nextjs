import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import CartItem from "./cart-item"
import Link from "next/link"

import { useStoreCart } from "@/store/store-cart"
import { useEffect, useState } from "react"

import { useQuery } from '@tanstack/react-query';
import { UseCart } from "@/features/cart"

export interface propsInterface {
  trigger: JSX.Element
}

export default function Cart(props: propsInterface) {  
  const { GetCart, GetCartFromLocalStorage } = UseCart()
  const { setCartItem, cartProductsIdOnly, isCartOpen, setIsCartOpen, cartItem } = useStoreCart()

  // Why we need to mapping this cartItem?
  // The reason is because we only want it fetching the product 
  // data when there are new variant and product in the cart
  // We exclude the quantity, because when we are change the quantity in cart
  // It will refetch the api which is useless
  const { data: cart, isLoading, isError, error } = 
  useQuery({
    queryKey: ['cart-item', cartItem.map(item => {
      return {
        variant: item.variantId,
        productId: item.productId,
      }
    })], 
    queryFn: async () => {
      return await GetCart()
    }
  })

  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if(localStorage.getItem('cart')) {
      const cartData = JSON.parse(localStorage.getItem('cart') as string)
      setCartItem(cartData)
    }
  }, [])

  // To get the quantity of the product use this.
  const getQuantity = (productId?: number, variantId?: number) => {
    const data = cartItem.find(item => item.productId === productId && item.variantId === variantId)
    return data?.qty ?? 0
  }

  // To get the quantity of the product use this.
  const countSubTotal = () => {
    return cart?.reduce((total, item) => total + (item?.price ?? 0) * getQuantity(item.id, item.variant_id), 0)
  }

  if(!isMounted) {
    return null
  }

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={(value) => setIsCartOpen(value)}>
        <SheetTrigger asChild>
          {props.trigger}
        </SheetTrigger>

        <SheetContent className="flex h-full flex-col justify-between px-0">
          <div>
            <SheetHeader className="px-5">
              <SheetTitle>
                My Cart ({cart?.length} Items)</SheetTitle>
              <SheetDescription>Adjust your cart item here</SheetDescription>
            </SheetHeader>

            <ul role="list" className="px-5 overflow-auto h-[calc(100vh-350px)] my-6 divide-y divide-gray-200 overflow-y-auto">
              { cart?.map(item => {
                  return (
                    <li className="py-6" key={'product-cart-'+ item.id + item.variant_id}>
                      <CartItem cartItem={
                        {
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          variant_id: item.variant_id,
                          variant_name: item.variant_name,
                          price: item.price,
                          qty: getQuantity(item?.id, item?.variant_id)
                        }
                      }></CartItem>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          
          <div className="border-t border-gray-200 px-5 py-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${countSubTotal()}</p>
            </div>
            <div className="mt-6">
              <Button size={'lg'} asChild className="w-full">
                <Link href={'/checkout'}>
                  Checkout
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                <span className="mr-1">or</span>
                <SheetClose asChild>
                  <button type="button" className="font-medium text-black">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </SheetClose>
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}