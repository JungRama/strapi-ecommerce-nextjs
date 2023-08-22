import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SelectSearch from "@/components/input-custom/select-search";
import { ArrowLeftCircle } from "lucide-react";


export default function FormCheckoutShippingInformation() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
        <div className="col-span-12 md:col-span-12 lg:col-span-12">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" className="name" placeholder="eg. John Doe"></Input>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div>
            <Label htmlFor="name">Email</Label>
            <Input type="text" className="name" placeholder="eg. johndoe@example.com"></Input>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div>
            <Label htmlFor="name">Phone Number</Label>
            <Input type="text" className="name" placeholder="eg. +12300000000"></Input>
          </div>
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-12">
          <hr className="mt-4 mb-3" />
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-12">
          <div>
            <Label htmlFor="name">Street Address</Label>
            <Input type="text" className="name" placeholder="eg. example street 111th"></Input>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div>
            <Label htmlFor="name">Country</Label>
            <SelectSearch 
            label="Country" items={[
              {
                name: 'Indonesia',
                value: 'indonesia'
              }
            ]}></SelectSearch>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div>
            <Label htmlFor="name">State</Label>
            <Input type="text" className="name" placeholder="eg. New York City"></Input>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div>
            <Label htmlFor="name">City</Label>
            <Input type="text" className="name" placeholder="eg. New York"></Input>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div>
            <Label htmlFor="name">Zip Code</Label>
            <Input type="text" className="name" placeholder="eg. 000000"></Input>
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap">
        <Button variant={'outline'} className="mt-4 flex items-center gap-2">
          <ArrowLeftCircle></ArrowLeftCircle>
          Back
        </Button>
        <Button className="mt-4">Continue Shipping</Button>
      </div>
    </div>
  )
}