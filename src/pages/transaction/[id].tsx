import LayoutMain from "@/components/layouts";
import DetailTransactionCard from "@/components/transaction/detail-transaction-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function OrderDetailGuest() {
  const [validToView, setValidToView] = useState(false)

  return (
    <LayoutMain>
      <div className="container my-20">
        <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
          {!validToView && 
            <div className="col-[1_/_span_12] md:col-[1_/_span_12] lg:col-[3_/_span_8]">
              <div className="flex justify-center items-center my-40">
                <div className="w-[320px]">
                  <p className="text-2xl text-center font-bold mb-2">Enter 5 Digits Code</p>
                  <p className="text-sm text-center mb-2">To respect our customer privacy. you need to enter 5 digits code that we are sent to the order email</p>
                  <Input type="text" className="mb-2 text-center" maxLength={5} placeholder="Enter 5 digits key"></Input>
                  <Button className="w-full" onClick={() => setValidToView(true)}>Confirm</Button>
                </div>
              </div>
            </div>
          }

          {validToView && 
            <div className="col-[1_/_span_12] md:col-[1_/_span_12] lg:col-[3_/_span_8]">
              <DetailTransactionCard></DetailTransactionCard>
            </div>
          }
        </div>
      </div>
    </LayoutMain>
  )
}