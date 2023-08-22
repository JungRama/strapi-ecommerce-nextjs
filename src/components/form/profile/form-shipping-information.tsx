import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SelectSearch from "@/components/input-custom/select-search";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Edit } from "lucide-react";

export default function FormShippingInformation() {
  return (
    <Card>
      <CardHeader>
        <p className="font-bold">Shipping Information</p>
        <p className="text-sm opacity-50 w-[80%]">Enter your shipping information below so next time you order, you don&apos;t have to bother filling it out again</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
          <div className="col-span-12 md:col-span-12 lg:col-span-12">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input type="text" disabled className="name" placeholder="eg. John Doe"></Input>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <div>
              <Label htmlFor="name">Email</Label>
              <Input type="text" disabled className="name" placeholder="eg. johndoe@example.com"></Input>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-6">
            <div>
              <Label htmlFor="name">Phone Number</Label>
              <Input type="text" disabled className="name" placeholder="eg. +12300000000"></Input>
            </div>
          </div>
          <div className="col-span-12 md:col-span-12 lg:col-span-12">
            <Alert>
              <Edit className="h-4 w-4" />
              <AlertTitle>Want to update name, email or phone number?</AlertTitle>
              <AlertDescription>
                You can update this information on the account page. <Link href={'/profile/account'} className="underline">Click here</Link> to update
              </AlertDescription>
            </Alert>
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
        <Button className="mt-4">Save Shipping Information</Button>
      </CardContent>
    </Card> 
  )
}