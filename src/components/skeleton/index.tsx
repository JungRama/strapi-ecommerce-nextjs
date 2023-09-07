import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SkeletonBanner() {
  return <Skeleton className="aspect-video max-h-[400px] w-full" />;
}

export function SkeletonBrand() {
  return <Skeleton className="h-[100px] min-w-[200px] w-full" />;
}

export function SkeletonCategory() {
  return <Skeleton className="h-[100px] min-w-[400px] w-full" />;
}

export function SkeletonProduct() {
  return (
    <>
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="h-3 mt-3 w-[40%]" />
      <Skeleton className="h-3 mt-3 w-[80%]" />
      <Skeleton className="h-3 mt-1 w-[60%]" />
      <Skeleton className="h-4 mt-3 w-[30%]" />
    </>
  );
}

export function SkeletonCollectionList() {
  return (
    <>
      <Skeleton className="h-[200px] w-full" />
    </>
  );
}

export function SkeletonProductDetail() {
  return (
    <div className="container mx-auto my-20">
      <div className="grid grid-cols-12 gap-[15px] lg:gap-[30px]">
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <Skeleton className="aspect-square w-full" />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-5">
          <div className="flex flex-wrap items-center justify-between">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
          </div>

          <div className="flex items-center gap-5 my-2">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
          </div>

          <hr className="opacity-50" />

          <div className="mt-3 flex flex-col gap-3">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-[80%]" />
          </div>

          <div className="grid grid-cols-12 gap-[5px] my-4">
            {[...Array(6)].map((item, index) => {
              return (
                <div
                  key={"skeleton-product-variant-" + index}
                  className="col-span-6 md:col-span-4 lg:col-span-4"
                >
                  <Skeleton className="h-[40px] w-full" />
                </div>
              );
            })}
          </div>

          <Skeleton className="h-[40px] w-full" />

          <div className="mt-10 flex flex-col gap-3">
            <Skeleton className="h-[20px] w-full" />
            <hr className="opacity-50" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-[80%]" />
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <Skeleton className="h-[20px] w-full" />
            <hr className="opacity-50" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-[80%]" />
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <Skeleton className="h-[20px] w-full" />
            <hr className="opacity-50" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-[80%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonProductReview() {
  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col space-y-2">
          <Skeleton className="h-[20px] w-60%" />
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-[80%]" />
        </div>
      </div>
    </>
  );
}

export function SkeletonShipping() {
  return (
    <>
      <Skeleton className="h-[80px] w-full" />
    </>
  );
}
