import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "@/services/reviews";
import { ErrorCard } from "../errors/error-card";
import { SkeletonProductReview } from "../skeleton";

export default function Reviews({ slug }: { slug: string }) {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews", slug],
    queryFn: async () => {
      return getProductReviews(slug as string);
    },
  });

  if (isLoading) {
    return (
      <>
        {[...Array(3)].map((item, index) => {
          return (
            <div key={"skeleton-product-review-" + index} className="my-3">
              <SkeletonProductReview></SkeletonProductReview>
            </div>
          );
        })}
      </>
    );
  }

  if (isError) {
    return <ErrorCard message={(error as Error).message}></ErrorCard>;
  }

  if (reviews.length <= 0) {
    return (
      <div className="flex h-[450px] mb-3 shrink-0 items-center justify-center rounded-md border border-dashed">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <p className="mt-4 text-lg font-semibold">No Review Yet</p>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Sorry, there is no review yet for this product.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        {reviews.map((item) => (
          <div
            key={"product-review-" + item.id}
            className="flex items-center gap-3"
          >
            <Avatar>
              <AvatarFallback>{item.name[0]}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <p className="font-bold mb-1 w-full flex items-center">
                {item.name} <Star className="h-3 text-yellow-600"></Star>{" "}
                {item.rating}
              </p>
              <p>{item.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
