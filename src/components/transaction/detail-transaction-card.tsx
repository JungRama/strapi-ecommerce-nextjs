import { Card, CardContent, CardHeader } from "@/components/ui/card";
import NextImage from "@/components/next-image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface propsTransactionInterface {
  order_id: string;
  date: string;
  items: {
    name: string;
    qty: number;
    image?: string;
    variant_name: string;
    price: number;
  }[];
  customer: {
    name: string;
    phone_number: string;
    email: string;
    address: string;
    state: string;
    city: string;
    country: string;
    zip_code: string;
  };
  shipping: {
    url: string | null;
    name: string;
    code: string | null;
  };
  payment: {
    subtotal: string;
    shipping_price: string;
    total: string;
    payment_status: string;
    url?: string;
  };
}

export default function DetailTransactionCard({
  dataTransaction,
  refreshGetDataTransaction,
}: {
  dataTransaction: propsTransactionInterface;
  refreshGetDataTransaction: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="font-bold">#{dataTransaction.order_id}</p>
          <p>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              minute: "2-digit",
              hour: "numeric",
            }).format(new Date(dataTransaction.date))}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-2">Items: </p>
        {dataTransaction.items.map((item) => {
          return (
            <div
              className="item-transaction"
              key={"item-transaction-" + item.name}
            >
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
                    <div className="flex flex-col gap-2">
                      <p>{item.name}</p>
                      <p className="opacity-50">Qty: {item.qty}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm">${item.price}</p>
              </div>
              <hr className="my-6" />
            </div>
          );
        })}

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
                      <td>{dataTransaction.shipping.name}</td>
                    </tr>
                    {dataTransaction.shipping.code && (
                      <tr>
                        <td>Shipping Number</td>
                        <td>:</td>
                        <td>{dataTransaction.shipping.code}</td>
                      </tr>
                    )}
                    <tr>
                      <td>Address</td>
                      <td>:</td>
                      <td>
                        <p className="font-bold">
                          {dataTransaction.customer.name}
                        </p>
                        <p>{dataTransaction.customer.phone_number}</p>
                        <p>{dataTransaction.customer.address}</p>
                        <p>
                          {dataTransaction.customer.city},{" "}
                          {dataTransaction.customer.state}
                        </p>
                        <p>
                          {dataTransaction.customer.country},{" "}
                          {dataTransaction.customer.zip_code}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {dataTransaction.shipping.url && (
                  <Button className="w-full mt-3" asChild variant={"secondary"}>
                    <Link href={dataTransaction.shipping.url}>
                      Tracking Package
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 md:col-span-12 lg:col-span-6">
            <p className="font-bold mb-2">Payment Information : </p>

            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td>Status</td>
                  <td>:</td>
                  <td className="text-right">
                    {dataTransaction.payment.payment_status}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <p>
                      If you think the payment status not updated, you can{" "}
                      <span
                        onClick={() => refreshGetDataTransaction()}
                        className="underline cursor-pointer"
                      >
                        refresh
                      </span>{" "}
                      or contact us
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <hr className="my-3" />
                  </td>
                </tr>
                <tr>
                  <td>Sub Total</td>
                  <td>:</td>
                  <td className="text-right">
                    ${dataTransaction.payment.total}
                  </td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>:</td>
                  <td className="text-right">
                    ${dataTransaction.payment.shipping_price}
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Total</td>
                  <td className="font-bold">:</td>
                  <td className="font-bold text-right">
                    ${dataTransaction.payment.total}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    <hr className="my-3" />
                  </td>
                </tr>
              </tbody>
            </table>

            {dataTransaction.payment.payment_status === "UNPAID" &&
              dataTransaction.payment.url && (
                <Button className="w-full" asChild>
                  <Link href={dataTransaction.payment.url}>Pay Now</Link>
                </Button>
              )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
