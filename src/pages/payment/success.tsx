import LayoutMain from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/services/cart";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    clearCart();
  }, [router.query["clear-cart"]]);

  return (
    <LayoutMain>
      <div>
        <div className="flex min-h-[80vh] justify-center items-center">
          <Card>
            <CardContent>
              <svg
                viewBox="0 0 24 24"
                className="text-green-600 w-16 h-16 mx-auto my-6"
              >
                <path
                  fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                ></path>
              </svg>

              <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  Payment Done!
                </h3>
                <p className="text-gray-600 my-2">
                  Thank you for completing your secure online payment.
                </p>
                <p>We sent you an email with your order details</p>
                <div className="py-5 text-center">
                  <Button onClick={() => router.push("/")}>
                    Go to Homepage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutMain>
  );
}
