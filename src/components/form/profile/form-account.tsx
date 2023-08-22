import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function FormAccount() {
  return (
    <Card>
      <CardHeader>
        <p className="font-bold">Account</p>
        <p className="text-sm opacity-50 w-[80%]">Update your account information here</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 md:gap-[15px] lg:gap[30px]">
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
        </div>
        <Button className="mt-4">Save Account Information</Button>
      </CardContent>
    </Card> 
  )
}