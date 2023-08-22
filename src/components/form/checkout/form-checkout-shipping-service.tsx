import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { ArrowLeftCircle, Map, User } from "lucide-react";

export default function FormCheckoutShippingService() {
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
                  Anak Agung Rama Wijaya
                  <User className="h-3"></User>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-right mr-5">jungrama.id@gmail.com</p>
                  <p className="text-sm text-right mr-5">+6287702508076</p>
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
                  Jl Salya No.24
                  <Map className="h-3"></Map>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-right mr-5">Denpasar, Bali, Indonesia</p>
                  <p className="text-sm text-right mr-5">80231</p>
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
            <Card>
              <CardContent className="my-4 pb-0 flex items-center justify-between">
                <p>Standard</p>
                <p className="text-sm font-bold">$40</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="my-4 pb-0 flex items-center justify-between">
                <p>Premium</p>
                <p className="text-sm font-bold">$20</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap">
        <Button variant={'outline'} className="mt-4 flex items-center gap-2">
          <ArrowLeftCircle></ArrowLeftCircle>
          Back
        </Button>
        <Button className="mt-4">Continue Payment</Button>
      </div>
    </div>
  )
}