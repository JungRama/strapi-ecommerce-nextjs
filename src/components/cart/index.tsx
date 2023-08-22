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

export interface propsInterface {
  trigger: JSX.Element
}

export default function Cart(props: propsInterface) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {props.trigger}
      </SheetTrigger>

      <SheetContent className="flex h-full flex-col justify-between">
        <div>
          <SheetHeader>
            <SheetTitle>My Cart (0 Items)</SheetTitle>
            <SheetDescription>Adjust your cart item here</SheetDescription>
          </SheetHeader>

          <ul role="list" className="my-6 divide-y divide-gray-200 overflow-y-auto">
            <li className="py-6">
              <CartItem></CartItem>
            </li>
          </ul>
        </div>
        
        <div className="border-t border-gray-200 py-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$262.00</p>
          </div>
          <div className="mt-6">
            <Button size={'lg'} asChild className="w-full">
              <Link href={'checkout'}>
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
  )
}