import LayoutMain from "@/components/layouts";
import DetailTransactionCard from "@/components/transaction/detail-transaction-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { getTransactionWithSecret } from "@/services/transaction";
import UseErrorHandler from "@/lib/use-error-handler";
import { OrderInterface } from "@/types/api/order";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function OrderDetailGuest() {
  const router = useRouter();
  const { showError } = UseErrorHandler();

  const [validToView, setValidToView] = useState(false);
  const [dataTransaction, setDataTransaction] = useState<OrderInterface | null>(
    null
  );
  const [secret, setSecret] = useState("");

  const { mutate: mutateGetTransaction, isLoading } = useMutation(
    getTransactionWithSecret,
    {
      onSuccess: (data) => {
        setDataTransaction(data);
        setValidToView(true);
      },
      onError: (err) => {
        showError("Error:" + (err as Error).message);
      },
    }
  );

  useEffect(() => {
    if (router.query.secret) {
      setSecret((router.query.secret as string) ?? "");

      mutateGetTransaction({
        code: router.query.id as string,
        secret: router.query.secret as string,
      });
    }
  }, [router.query.secret]);

  return (
    <LayoutMain>
      <div className="container my-20">
        <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
          {!validToView && (
            <div className="col-[1_/_span_12] md:col-[1_/_span_12] lg:col-[3_/_span_8]">
              <div className="flex justify-center items-center my-40">
                <div className="w-[320px]">
                  <p className="text-2xl text-center font-bold mb-2">
                    Enter 5 Digits Code
                  </p>
                  <p className="text-sm text-center mb-2">
                    To respect our customer privacy. you need to enter 5 digits
                    code that we are sent to the order email
                  </p>
                  <Input
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    type="text"
                    className="mb-2 text-center"
                    maxLength={5}
                    placeholder="Enter 5 digits key"
                  ></Input>
                  <Button
                    className="w-full"
                    disabled={isLoading}
                    onClick={() =>
                      mutateGetTransaction({
                        code: router.query.id as string,
                        secret,
                      })
                    }
                  >
                    {isLoading && (
                      <div className="mr-2">
                        <Spinner></Spinner>
                      </div>
                    )}
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          )}

          {validToView && (
            <div className="col-[1_/_span_12] md:col-[1_/_span_12] lg:col-[3_/_span_8]">
              <DetailTransactionCard
                refreshGetDataTransaction={() =>
                  mutateGetTransaction({
                    code: router.query.id as string,
                    secret: router.query.secret as string,
                  })
                }
                dataTransaction={{
                  order_id: dataTransaction?.order_id ?? "",
                  date: dataTransaction?.createdAt ?? "",
                  items: dataTransaction?.products.items.map((item) => {
                    return {
                      name: item.product_name ?? "",
                      qty: item.quantity ?? 0,
                      image: item.product?.thumbnail.url ?? undefined,
                      variant_name: item.variant ?? "",
                      price: item.price ?? 0,
                    };
                  }) as [],
                  customer: {
                    name: dataTransaction?.customer_contact?.name ?? "",
                    phone_number:
                      dataTransaction?.customer_contact?.phone_number ?? "",
                    email: dataTransaction?.customer_contact?.email ?? "",
                    address: dataTransaction?.customer_contact?.address ?? "",
                    state: dataTransaction?.customer_contact?.state ?? "",
                    city: dataTransaction?.customer_contact?.city ?? "",
                    country: dataTransaction?.customer_contact?.country ?? "",
                    zip_code: dataTransaction?.customer_contact?.zip_code ?? "",
                  },
                  shipping: {
                    url: dataTransaction?.tracking_url ?? null,
                    name: dataTransaction?.shipping_name ?? "",
                    code: dataTransaction?.tracking_code ?? null,
                  },
                  payment: {
                    subtotal: dataTransaction?.subtotal ?? "0",
                    shipping_price: dataTransaction?.shipping_price ?? "0",
                    total: dataTransaction?.total ?? "0",
                    payment_status: dataTransaction?.payment_status ?? "0",
                    url: dataTransaction?.stripe_url,
                  },
                }}
              ></DetailTransactionCard>
            </div>
          )}
        </div>
      </div>
    </LayoutMain>
  );
}
