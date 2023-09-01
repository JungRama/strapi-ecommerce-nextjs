import CartItem from "@/components/cart/cart-item";
import FormCheckoutShippingInformation from "@/components/form/checkout/form-checkout-shipping-information";
import FormCheckoutShippingService from "@/components/form/checkout/form-checkout-shipping-service";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { UseCart } from "@/features/cart";
import { currencyFormat } from "@/lib/use-currency";
import { useStoreCart } from "@/store/store-cart";
import { useStoreCheckout } from "@/store/store-checkout";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { currentForm, formShippingInformation, formShippingService } = useStoreCheckout()

  const { GetCart } = UseCart()
  const { cartItem } = useStoreCart()

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

  // To get the quantity of the product use this.
  const getQuantity = (productId?: number, variantId?: number) => {
    const data = cartItem.find(item => item.productId === productId && item.variantId === variantId)
    return data?.qty ?? 0
  }

  // To get the quantity of the product use this.
  const countSubTotal = () => {
    return cart?.reduce((total, item) => total + (item?.price ?? 0) * getQuantity(item.id, item.variant_id), 0)
  }

  const countTotal = () => {
    return (countSubTotal() ?? 0) + (formShippingService.price ? parseFloat(formShippingService.price) : 0)
  }

  const parcelSize = () => {
    const width = cart?.map(item => item.width ? item.width : 0) ?? [0]
    const length = cart?.map(item => item.length ? item.length : 0) ?? [0]
    const height = cart?.map(item => item.height ? item.height : 0) ?? [0]
    const weight = cart?.map(item => item.height ? item.height : 0) ?? [0]

    return {
      width: Math.max(...width) / 10,
      height: Math.max(...height) / 10,
      length: Math.max(...length) / 10,
      weight: weight?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) / 10
    }
  }

  return (
    <>
      <div className="grid min-h-[100vh] grid-cols-12 gap-[15px] lg:gap-[60px]">
        <div className="col-span-12 md:col-span-6 lg:col-span-6 md:bg-slate-50 border-l hidde">
          <div className="mx-[15px] xl:ml-[15vw]">
            <div className="pt-24 md:mx-[15px] lg:mx-[60px] h-full flex flex-col gap-5">
              { cart?.map(item => {
                  return (
                    <div key={'product-cart-'+ item.id + item.variant_id}>
                      <CartItem showAction={false} cartItem={
                        {
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          variant_id: item.variant_id,
                          variant_name: item.variant_name,
                          price: item.price,
                          qty:  getQuantity(item?.id, item?.variant_id)
                        }
                      }></CartItem>
                    </div>
                  )
                })
              }
            </div>

            <Card className="md:mx-[15px] lg:mx-[60px] mt-5">
              <CardContent className="my-6 pb-0">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p className="text-sm">Subtotal</p>
                    <p className="font-bold text-sm">{currencyFormat(countSubTotal() ?? 0)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Shipping</p>
                    <p className="font-bold text-sm">{formShippingService.price ? currencyFormat(parseFloat(formShippingService.price)) : 'Select service to calculate' }</p>
                  </div>
                  <div>
                    <hr className="my-2" />
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold">Total</p>
                    <p className="font-bold">{currencyFormat(countTotal() ?? 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div className="mx-[15px] mb-20 md:mb-0 md:mr-[15px] lg:mr-[60px] xl:mr-[15vw] pb-10">
            <div className="pt-24 h-full">
              <h2 className="text-xl font-bold">Shipping Information</h2>
              <div className="flex mb-12 gap-2 text-sm mt-2">
                <p>01. <br className="inline-block md:hidden" /> Shipping Information</p>
                <p>/</p>
                <p>02. <br className="inline-block md:hidden" /> Shipping Service</p>
                <p>/</p>
                <p>03. <br className="inline-block md:hidden" /> Payment</p>
              </div>
              {currentForm === 'SHIPPING_INFORMATION' &&
                <FormCheckoutShippingInformation></FormCheckoutShippingInformation>
              }

              {currentForm === 'SHIPPING_SERVICE' &&
                <FormCheckoutShippingService cartData={
                  cart?.map(item => {
                    return {
                      ...item,
                      qty: getQuantity(item?.id, item?.variant_id)
                    }
                  }) ?? []
                } parcelSize={parcelSize()}></FormCheckoutShippingService>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}