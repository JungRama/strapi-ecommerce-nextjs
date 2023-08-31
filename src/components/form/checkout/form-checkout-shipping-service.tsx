import { SkeletonShipping } from "@/components/skeleton";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { GetShippingRate } from "@/features/checkout";
import { countryList } from "@/static/country";
import { useStoreCheckout } from "@/store/store-checkout";
import { RatesInterface } from "@/types/api/checkout";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeftCircle, Map, User } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FormCheckoutShippingService() {
  const { setCurrentForm, formShippingInformation } = useStoreCheckout()

  const [shippingRate, setShippingRate] = useState<RatesInterface | null>(null)
  const [selectedShippingRate, setSelectedShippingRate] = useState<string | null>(null)

  const getCountry = () => {
    return countryList.find(item => formShippingInformation.country === item.code)?.name
  }
  
  const { mutate: mutateShippingRate, isLoading } = useMutation(GetShippingRate, {
    onSuccess: data => {
      setShippingRate(data)
    },
    onError: () => {
      alert("there was an error")
    }
  });

  useEffect(() => {
    mutateShippingRate({
      address: formShippingInformation,
      parcel: []
    })
  }, [])

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
    }else {
      return (
        <>
          {shippingRate && shippingRate?.rates?.map(item => {
            return (
              <Card key={'rate-id-'+item.id} onClick={() => setSelectedShippingRate(item.id)} className={item.id === selectedShippingRate ? 'bg-black text-white cursor-pointer' : 'cursor-pointer'}>
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

  return (
    <div>
      <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
      </div>

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
        <Button variant={'outline'} type="button" onClick={() => setCurrentForm('SHIPPING_INFORMATION')} className="mt-4 flex items-center gap-2">
          <ArrowLeftCircle></ArrowLeftCircle>
          Back
        </Button>
        <Button className="mt-4">Continue Payment</Button>
      </div>
    </div>
  )
}