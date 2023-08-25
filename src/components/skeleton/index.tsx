import { Skeleton } from "@/components/ui/skeleton"
 
export function SkeletonBanner() {
  return (
    <Skeleton className="aspect-video max-h-[400px] w-full" />
  )
}

export function SkeletonBrand() {
  return (
    <Skeleton className="h-[100px] min-w-[200px] w-full"/>
  )
}

export function SkeletonCategory() {
  return (
    <Skeleton className="h-[100px] min-w-[400px] w-full"/>
  )
}

export function SkeletonProduct() {
  return (
    <>
      <Skeleton className="aspect-square w-full"/>
      <Skeleton className="h-3 mt-3 w-[40%]"/>
      <Skeleton className="h-3 mt-3 w-[80%]"/>
      <Skeleton className="h-3 mt-1 w-[60%]"/>
      <Skeleton className="h-4 mt-3 w-[30%]"/>
    </>
  )
}

export function SkeletonCollectionList() {
  return (
    <>
      <Skeleton className="h-[200px] w-full"/>
    </>
  )
}