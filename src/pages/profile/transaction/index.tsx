import { Badge } from "@/components/ui/badge";
import ProfileLayout from "@/components/layouts/profile-layout";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import NextImage from "@/components/next-image";
import Link from "next/link";

export default function Transaction() {
  return (
    <ProfileLayout>
      <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <Link href={"/profile/transaction/LASKDOA2329"}>
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
                <div className="item-transaction">
                  <div className="flex items-center justify-between gap-5 flex-wrap">
                    <div className="flex gap-5">
                      <NextImage
                        src={"/images/product.png"}
                        className="rounded-md"
                        width={50}
                        height={50}
                        alt="product"
                      />
                      <div>
                        <div className="flex gap-2">
                          <p>Air Jordan One</p>
                          <p className="opacity-50">Qty: 1</p>
                        </div>
                        <p className="text-sm opacity-50">Size 42/White</p>
                      </div>
                    </div>
                    <p className="text-xs">And others 2 items...</p>
                  </div>
                  <hr className="mt-6" />
                </div>
              </CardContent>
              <CardFooter>
                <p className="font-bold">Total: $490</p>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </ProfileLayout>
  );
}
