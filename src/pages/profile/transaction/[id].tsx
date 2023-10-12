import DetailTransactionCard from "@/components/transaction/detail-transaction-card";
import ProfileLayout from "@/components/layouts/profile-layout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useTransactionService from "@/services/transaction";
import { useQuery } from "@tanstack/react-query";
import { ErrorCard } from "@/components/errors/error-card";
export default function Transaction() {
  const { getMyTransactionById } = useTransactionService();
  const router = useRouter();
  const session = useSession();

  const {
    data: dataTransaction,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my-transaction", router.query.id],
    queryFn: async () => {
      return await getMyTransactionById(router.query.id as string);
    },
    enabled: !!session.data && !!router.query.id,
  });

  if (isLoading) return "<Spinner />";
  if (isError)
    return <ErrorCard message={(error as Error).message}></ErrorCard>;

  return (
    <ProfileLayout>
      <></>
      <DetailTransactionCard
        refreshGetDataTransaction={() => refetch()}
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
            phone_number: dataTransaction?.customer_contact?.phone_number ?? "",
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
    </ProfileLayout>
  );
}
