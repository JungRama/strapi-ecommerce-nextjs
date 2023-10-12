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
import useTransactionService from "@/services/transaction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ErrorCard } from "@/components/errors/error-card";
import { SkeletonTransactionList } from "@/components/skeleton";

export default function Transaction() {
  const { getMyTransaction } = useTransactionService();
  const session = useSession();

  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-transaction"],
    queryFn: async () => {
      return await getMyTransaction();
    },
    enabled: !!session.data,
  });

  const TransactionList = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
          {[...Array(9)].map((index) => {
            return (
              <div
                className="col-span-12 md:col-span-6 lg:col-span-6"
                key={"skeleton-transaction-list" + index}
              >
                <SkeletonTransactionList></SkeletonTransactionList>
              </div>
            );
          })}
        </div>
      );
    } else if (isError)
      return <ErrorCard message={(error as Error).message}></ErrorCard>;
    else {
      return (
        <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
          {transactions?.data.map((item) => {
            return (
              <div
                className="col-span-12 md:col-span-6 lg:col-span-6"
                key={"transaction-" + item.id}
              >
                <Link
                  className="h-full"
                  href={`/profile/transaction/${item.order_id}`}
                >
                  <Card className="h-full flex flex-col justify-between">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-xs">#{item.order_id}</p>
                          <p>
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                              minute: "2-digit",
                              hour: "numeric",
                            }).format(new Date(item.createdAt))}
                          </p>
                        </div>
                        <div>
                          <Badge>{item.payment_status}</Badge>
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
                                <p>{item.products.items[0]?.product_name}</p>
                                <p className="opacity-50 w-20 text-right">
                                  Qty: {item.products.items[0]?.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="h-3">
                            {item.products.items.length > 1 && (
                              <p className="text-xs">
                                And others {item.products.items.length - 1}{" "}
                                items...
                              </p>
                            )}
                          </div>
                        </div>
                        <hr className="mt-6" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="font-bold">Total: ${item.total}</p>
                    </CardFooter>
                  </Card>
                </Link>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <ProfileLayout>
      <TransactionList></TransactionList>
    </ProfileLayout>
  );
}
