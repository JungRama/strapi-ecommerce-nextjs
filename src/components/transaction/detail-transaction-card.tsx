import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import NextImage from "@/components/next-image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DetailTransactionCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-xs">#LASKDOA2329</p>
            <p>12 August 2023</p>
          </div>
          <div>
            <Badge>Status</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-2">Items: </p>
        <div className="item-transaction">
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <div className="flex gap-5">
              <NextImage src={'/images/product.png'} className="rounded-md" width={50} height={50} alt="product" />
              <div>
                <div className="flex gap-2">
                  <p>Air Jordan One</p>
                  <p className="opacity-50">Qty: 1</p>
                </div>
                <p className="text-sm opacity-50">Size 42/White</p>
              </div>
            </div>
            <p className="text-sm">$40</p>
          </div>
          <hr className="my-6" />
        </div>

        <div className="item-transaction">
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <div className="flex gap-5">
              <NextImage src={'/images/product.png'} className="rounded-md" width={50} height={50} alt="product" />
              <div>
                <div className="flex gap-2">
                  <p>Air Jordan One</p>
                  <p className="opacity-50">Qty: 1</p>
                </div>
                <p className="text-sm opacity-50">Size 42/White</p>
              </div>
            </div>
            <p className="text-sm">$40</p>
          </div>
          <hr className="my-6" />
        </div>
        
        <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
          <div className="col-span-12 md:col-span-12 lg:col-span-6">
            <Card>
              <CardContent className="my-3">
                <p className="font-bold mb-2">Shipping Information : </p>

                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td>Shipping Service</td>
                      <td>:</td>
                      <td>USPS</td>
                    </tr>
                    <tr>
                      <td>Shipping Number</td>
                      <td>:</td>
                      <td>000000000000</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>:</td>
                      <td>
                        <p className="font-bold">Anak Agung Rama Wijaya</p>
                        <p>+6287702508076</p>
                        <p>Jl. Salya No.24 Denpasar Utara</p>
                        <p>Denpasar Utara, Kota Denpasar</p>
                        <p>Bali, 80231</p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <Button className="w-full mt-3" variant={"secondary"}>Tracking Package</Button>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 md:col-span-12 lg:col-span-6">
            <p className="font-bold mb-2">Payment Information : </p>

            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td>Payment Via</td>
                  <td>:</td>
                  <td className="text-right">Credit Card</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>:</td>
                  <td className="text-right">Waiting for Payment</td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <hr className="my-3" />
                  </td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>:</td>
                  <td className="text-right">$80</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>:</td>
                  <td className="text-red-500 text-right"> -$25 (NEWUSER)</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>:</td>
                  <td className="text-right">$20</td>
                </tr>
                <tr>
                  <td className="font-bold">Total</td>
                  <td className="font-bold">:</td>
                  <td className="font-bold text-right">$85</td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <hr className="my-3" />
                  </td>
                </tr>
              </tbody>
            </table>

            <Button className="w-full">Pay Now</Button>

          </div>

        </div>
      </CardContent>
    </Card>
  )
}