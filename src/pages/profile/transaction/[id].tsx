import DetailTransactionCard from "@/components/transaction/detail-transaction-card";
import ProfileLayout from "@/components/layouts/profile-layout";
export default function Transaction() {
  return (
    <ProfileLayout>
      <DetailTransactionCard></DetailTransactionCard>
    </ProfileLayout>
  )
}