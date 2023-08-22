import CartItem from "@/components/cart/cart-item";
import FormCheckoutShippingInformation from "@/components/form/checkout/form-checkout-shipping-information";
import FormCheckoutShippingService from "@/components/form/checkout/form-checkout-shipping-service";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"

export default function CheckoutPage() {
  return (
    <>
      <div className="grid min-h-[100vh] grid-cols-12 gap-[15px] lg:gap-[60px]">
        <div className="col-span-12 md:col-span-6 lg:col-span-6 md:bg-slate-50 border-l hidde">
          <div className="mx-[15px] xl:ml-[15vw]">
            <div className="pt-24 md:mx-[15px] lg:mx-[60px] h-full flex flex-col gap-5">
              <CartItem showAction={false}></CartItem>
              <CartItem showAction={false}></CartItem>
            </div>

            <Card className="md:mx-[15px] lg:mx-[60px] mt-5">
              <CardContent className="my-6 pb-0">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p className="text-sm">Subtotal</p>
                    <p className="font-bold text-sm">$80</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Shipping</p>
                    <p className="font-bold text-sm">Calculated in next step</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Discount</p>
                    <p className="font-bold text-sm text-red-500">-$80</p>
                  </div>
                  <div>
                    <hr className="my-2" />
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold">Total</p>
                    <p className="font-bold">$80</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div className="mx-[15px] mb-20 md:mb-0 md:mr-[15px] lg:mr-[60px] xl:mr-[15vw]">
            <div className="pt-24 h-full">
              <h2 className="text-xl font-bold">Shipping Information</h2>
              <div className="flex mb-12 gap-2 text-sm mt-2">
                <p>01. <br className="inline-block md:hidden" /> Shipping Information</p>
                <p>/</p>
                <p className="opacity-50">02. <br className="inline-block md:hidden" /> Shipping Service</p>
                <p>/</p>
                <p className="opacity-50">03. <br className="inline-block md:hidden" /> Payment</p>
              </div>
              {/* <FormCheckoutShippingInformation></FormCheckoutShippingInformation> */}
              <FormCheckoutShippingService></FormCheckoutShippingService>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}