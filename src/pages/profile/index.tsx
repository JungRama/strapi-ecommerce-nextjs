import FormShippingInformation from "@/components/form/profile/form-shipping-information";
import ProfileLayout from "@/components/layouts/profile-layout";
import {
  Card,
  CardHeader,
} from "@/components/ui/card"

export default function Transaction() {
  return (
    <ProfileLayout>
      <div className="grid grid-cols-12 md:gap-[15px] lg:gap[30px]">
        <div className="col-span-12 md:col-span-4 lg:col-span-4">
          <h2 className="text-2xl mb-5">Hi, Welcome <br /> <b>Jung Rama</b></h2>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">Total Order</p>
                  <p>12 Order</p>
                  <p className="text-xs opacity-50">Awesome you&apos;ve done 12 orders </p>
                </div>
                <div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-8">
          <FormShippingInformation></FormShippingInformation>
        </div>
      </div>
    </ProfileLayout>
  )
}