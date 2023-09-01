import { ErrorCard } from "@/components/errors/error-card";
import { SkeletonShipping } from "@/components/skeleton";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import Spinner from "@/components/ui/spinner";
import { CheckoutItem, GetShippingRate } from "@/features/checkout";
import { IMAGE_URL } from "@/features/const";
import UseErrorHandler from "@/lib/use-error-handler";
import { countryList } from "@/static/country";
import { useStoreCheckout } from "@/store/store-checkout";
import { RateItemInterface, RatesInterface } from "@/types/api/checkout";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeftCircle, BoxesIcon, Map, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function FormCheckoutShippingService({ parcelSize, cartData }: {
  parcelSize: {
    width?: number
    length?: number
    height?: number
    weight?: number
  },
  cartData: any
}) {
  const { showError } = UseErrorHandler()

  const { setCurrentForm, formShippingInformation, setFormShippingService, formShippingService } = useStoreCheckout()

  const [shippingRate, setShippingRate] = useState<RatesInterface | null>(null)

  const getCountry = () => {
    return countryList.find(item => formShippingInformation.country === item.code)?.name
  }
  
  const { mutate: mutateShippingRate, isLoading, isError, error } = useMutation(GetShippingRate, {
    onSuccess: data => {
      setShippingRate(data)
    },
    onError: (err) => {
      showError('Error:' + (err as Error).message)
    }
  });

  const { mutate: mutateCheckoutItem, isLoading: loadingCheckout, isError: isErrorCheckout, error: errorCheckout } = useMutation(
    CheckoutItem, {
    onSuccess: data => {
      window.location.href=data.url
    },
    onError: (err) => {
      showError('Error:' + (err as Error).message)
    }
  });

  const selectShippingService = (data: RateItemInterface) =>  {
    setFormShippingService({
      id: data.id,
      name: data.carrier + ' ' + data.service,
      price: data.rate
    })
  }

  useEffect(() => {
    mutateShippingRate({
      address: formShippingInformation,
      parcel: parcelSize
    })
  }, [])

  const goToPayment = () => {
    if(!formShippingService.id) {
      return showError('Please select shipping service')
    }

    console.log(formShippingInformation);

    mutateCheckoutItem({
      items: cartData.map((item: any) => {
        return {
          id: item.id,
          image: IMAGE_URL+item.image,
          display_name: `${item.name} (${item.variant_name})`,
          product_name: item.name,
          variant_id: item.variant_id,
          variant_name: item.variant_name,
          price: item.price,
          qty: item.qty
        }
      }),
      shipping: {
        id: shippingRate?.id,
        id_rate: formShippingService.id,
        name: formShippingService.name,
        price: formShippingService.price
      },
      customer: formShippingInformation
    })
  }

  const ShippingRateList = () => {
    if(isLoading) {
      return (
      <>
        {[...Array(3)].map((item, index) => {
          return (
            <div key={'skeleton-shipping-service-'+index}>
              <SkeletonShipping></SkeletonShipping>
            </div>
          )
        })}
      </>
      )
    }
    else if(isError) {
      return <ErrorCard message={(error as Error).message}></ErrorCard>
    } else {
      if(shippingRate && shippingRate.rates.length <= 0) {
        return(
          <div className="flex h-[250px] mb-10 shrink-0 items-center justify-center rounded-md border border-dashed">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <BoxesIcon></BoxesIcon>
              <p className="mt-4 text-lg font-semibold">No Shipping Service Found</p>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">Oops, it seems like that are now available shipping service for the address or the parcel. please contact our team</p>
            </div>
          </div>
        )
      }else {
        return (
          <>
            {shippingRate && shippingRate?.rates?.map(item => {
              return (
                <Card key={'rate-id-'+item.id} onClick={() => selectShippingService(item)} className={item.id === formShippingService.id ? 'bg-black text-white cursor-pointer' : 'cursor-pointer'}>
                  <CardContent className="my-4 pb-0 flex items-center justify-between">
                    <div>
                      <p>{item.carrier}</p>
                      <p className="text-gray-400 text-sm">{item.service} {item.est_delivery_days && `Est. (${item.est_delivery_days} Days)`}</p>
                    </div>
                    <p className="text-sm font-bold">${item.rate}</p>
                  </CardContent>
                </Card>
              )
            })}
          </>
        )
      }
    }
  }

  return (
    <div>
      <Card>
        <CardContent className="my-6 pb-0">
          <p className="font-bold mb-2">Shipping Information</p>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-sm">Contact Information</p>
              <div>
                <div className="font-bold text-sm flex items-center justify-end">
                  {formShippingInformation.name}
                  <User className="h-3"></User>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-right mr-5">{formShippingInformation.email}</p>
                  <p className="text-sm text-right mr-5">{formShippingInformation.phone_number}</p>
                </div>
              </div>
            </div>

            <div>
              <hr className="my-2" />
            </div>

            <div className="flex justify-between">
              <p className="text-sm">Address</p>
              <div>
                <div className="font-bold text-sm flex items-center justify-end">
                  {formShippingInformation.street_address}
                  <Map className="h-3"></Map>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-right mr-5">{formShippingInformation.city}, {formShippingInformation.state}, {getCountry()}</p>
                  <p className="text-sm text-right mr-5">{formShippingInformation.zip_code}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="font-bold mb-2 mt-5">Select Shipping</p>

      <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
        <div className="col-span-12 md:col-span-12 lg:col-span-12">
          <div className="flex flex-col gap-2">
            <ShippingRateList></ShippingRateList>
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap">
        <Button variant={'outline'} type="button" onClick={() => {
          setCurrentForm('SHIPPING_INFORMATION')
          setFormShippingService({
            id: null,
            name: null,
            price: null
          })
        }} className="mt-4 flex items-center gap-2">
          <ArrowLeftCircle></ArrowLeftCircle>
          Back
        </Button>
        <Button className="mt-4" onClick={() => goToPayment()} disabled={loadingCheckout}>
          {loadingCheckout && <div className="mr-2"><Spinner></Spinner></div>}
          <span>Continue Payment</span>
        </Button>
      </div>
    </div>
  )
}